import { GraphRegion, GraphHintGoal } from "../GraphPlugin.js";

import Entrance from './Entrance.js';
import { Location } from "./Location.js";
import World from './World.js';
import { Region } from "./Region.js";
import { display_names } from './DisplayNames.js';
import { Item } from "./Item.js";
import { Boulder } from "./Boulders.js";

export class RegionGroup implements GraphRegion {
    constructor(
        public name: string = '',
        public world: World,
        public parent_group: RegionGroup | null = null,
        public sub_groups: RegionGroup[] = [],
        public _sub_regions: Region[] = [],
        public _entrances: Entrance[] = [],
        public _exits: Entrance[] = [],
        public _locations: Location[] = [],
        public boulders: Boulder[] = [],
        public alias: string = '',
        public page: string = 'Overworld',
        public viewable: boolean = false,
        public is_required: boolean = false,
        public required_for: GraphHintGoal[] = [],
        public is_not_required: boolean = false,
        public hinted_items: Item[] = [],
        public num_major_items: number | null = null,
    ) {
        this.alias = this.name;
    }

    get child_regions(): RegionGroup[] {
        return this.sub_groups;
    }

    get sub_regions(): Region[] {
        let region_list: Region[] = [...this._sub_regions];
        if (this.sub_groups.length > 0) {
            region_list.push(...this.sub_groups.flatMap(r => r._sub_regions))
        }
        return region_list;
    }

    get entrances(): Entrance[] {
        let entrance_list: Entrance[] = [...this._entrances];
        if (this.sub_groups.length > 0) {
            entrance_list.push(...this.sub_groups.flatMap(r => r._entrances))
        }
        return entrance_list;
    }

    get exits(): Entrance[] {
        let exit_list: Entrance[] = [...this._exits];
        if (this.sub_groups.length > 0) {
            exit_list.push(...this.sub_groups.flatMap(r => r._exits))
        }
        return exit_list;
    }

    get locations(): Location[] {
        let location_list: Location[] = [...this._locations];
        if (this.sub_groups.length > 0) {
            location_list.push(...this.sub_groups.flatMap(r => r._locations))
        }
        return location_list;
    }

    get local_entrances(): Entrance[] {
        return [...this._entrances];
    }

    get local_exits(): Entrance[] {
        return [...this._exits];
    }

    get local_locations(): Location[] {
        return [...this._locations];
    }

    add_region(region: Region): void {
        this._sub_regions.push(region);
        if (this.parent_group === null) {
            region.parent_group = this;
            if (region.dungeon) this.page = 'Dungeons';
        } else {
            region.parent_group = this;
            this.page = this.parent_group.page;
        }
        for (let exit of region.exits) {
            if (!!exit.type && exit.type !== 'Extra') {
                this._exits.push(exit);
            }
        }
        for (let entrance of region.entrances) {
            if (!!entrance.type) {
                this._entrances.push(entrance);
            }
        }
        for (let location of region.locations) {
            if ((location.type !== 'Event' || location.public_event) && location.type !== 'Drop') {
                this._locations.push(location);
            }
        }
    }

    get_new_sub_group(name: string): RegionGroup {
        let sub_group = this.sub_groups.filter(r => r.name === name);
        if (sub_group.length === 1) {
            return sub_group[0];
        } else if (sub_group.length === 0) {
            let new_group = new RegionGroup(name, this.world, this);
            this.sub_groups.push(new_group);
            return new_group;
        } else {
            throw(`Multiple region group definitions for subgroup ${name}`);
        }
    }

    sort_lists(): void {
        let location_order = Object.keys(display_names.location_aliases);
        let entrance_order = Object.keys(display_names.entrance_aliases);
        this._locations.sort((a, b) => location_order.findIndex(l => l === a.name) - location_order.findIndex(l => l === b.name));
        this._exits.sort((a, b) => entrance_order.findIndex(e => e === a.name) - entrance_order.findIndex(e => e === b.name));
    }

    update_exits(): void {
        for (let region of this._sub_regions) {
            for (let exit of region.exits) {
                if (!!exit.type && exit.type !== 'Extra') {
                    this._exits.push(exit);
                }
            }
            for (let entrance of region.entrances) {
                if (!!entrance.type) {
                    this._entrances.push(entrance);
                    // Set reverse interior source groups
                    if (entrance.source_group === null && !!entrance.parent_region.parent_group) {
                        entrance.source_group = entrance.parent_region.parent_group;
                    }
                }
            }
        }
    }

    get_sub_group_for_exit(e: Entrance): RegionGroup | null {
        // assumes the exit is contained in this group or its subgroups
        if (this._exits.includes(e)) {
            return this;
        } else {
            for (let sub_group of this.sub_groups) {
                if (sub_group._exits.includes(e)) {
                    return sub_group;
                }
            }
        }
        return null;
    }

    connect_entrance_from_sub_region(r: Region, e: Entrance): void {
        if (this._sub_regions.includes(r)) {
            this._entrances.push(e);
        } else if (this.sub_groups.length > 0) {
            let pushes = 0;
            for (let sub_group of this.sub_groups) {
                if (sub_group._sub_regions.includes(r)) {
                    sub_group._entrances.push(e);
                    pushes++;
                }
            }
            if (pushes <= 0) {
                throw(`Failed to connect entrance ${e.name} to ${this.name}: Entrance does not exist in region group`);
            }
        } else {
            throw(`Failed to connect entrance ${e.name} to ${this.name}: Entrance connected region does not exist in region group`)
        }
    }

    disconnect_entrance_from_sub_region(r: Region, e: Entrance): void {
        if (this._sub_regions.includes(r)) {
            if (!this.disconnect_entrance(e)) {
                throw(`Failed to disconnect entrance ${e.name} from ${this.name}: Entrance does not exist in region group`);
            };
        } else if (this.sub_groups.length > 0) {
            let splices = 0;
            for (let sub_group of this.sub_groups) {
                if (sub_group._sub_regions.includes(r)) {
                    sub_group.disconnect_entrance(e);
                    splices++;
                }
            }
            if (splices <= 0) {
                throw(`Failed to disconnect entrance ${e.name} from ${this.name}: Entrance does not exist in region group`);
            }
        } else {
            throw(`Failed to disconnect entrance ${e.name} from ${this.name}: Entrance connected region does not exist in region group`)
        }
    }

    disconnect_entrance(e: Entrance): boolean {
        let i = this._entrances.indexOf(e);
        if (i > -1) {
            this._entrances.splice(i, 1);
            return true;
        } else {
            return false;
        }
    }
}