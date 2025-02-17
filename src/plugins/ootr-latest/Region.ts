import { GraphRegion, GraphHintGoal } from "../GraphPlugin.js";

import { HintAreas } from "./Hints.js";
import Entrance from './Entrance.js';
import { Location } from "./Location.js";
import World from './World.js';
import { RegionGroup } from "./RegionGroup.js";
import { Item } from "./Item.js";
import { Boulder } from "./Boulders.js";

export const TimeOfDay: {[key: string]: number} = {
    NONE: 0,
    DAY: 1,
    DAMPE: 2,
    ALL: 3,
};

const RegionType = {
    OVERWORLD: 1,
    INTERIOR: 2,
    DUNGEON: 3,
    GROTTO: 4,
}

export class Region implements GraphRegion {
    constructor(
        public name: string = '',
        public world: World,
        public type: number = RegionType.OVERWORLD,
        public entrances: Entrance[] = [],
        public exits: Entrance[] = [],
        public locations: Location[] = [],
        public boulders: Boulder[] = [],
        public dungeon: string | null = null,
        public hint_name: string | null = null,
        public alt_hint_name: string | null = null,
        public time_passes: boolean = false,
        public provides_time: number = TimeOfDay.NONE,
        public scene: string | null = null,
        public is_boss_room: boolean = false,
        public savewarp: Entrance | null = null,
        public alias: string = '',
        public parent_group: RegionGroup | null = null,
        public child_regions: RegionGroup[] = [],
        public page: string = '',
        public viewable: boolean = false,
        public is_required: boolean = false,
        public required_for: GraphHintGoal[] = [],
        public is_not_required: boolean = false,
        public hinted_items: Item[] = [],
        public num_major_items: number | null = null,
    ) {
        this.alias = this.name;
    }

    hint() {
        if (!!this.hint_name) {
            return HintAreas[this.hint_name];
        }
        if (this.dungeon) {
            return HintAreas[this.dungeon.toUpperCase().replaceAll(' ', '_')];
        }
        return null;
    }

    alt_hint() {
        if (!!this.alt_hint_name) {
            return HintAreas[this.alt_hint_name];
        }
        return null;
    }

    get local_entrances(): Entrance[] {
        return this.entrances;
    }

    get local_exits(): Entrance[] {
        return this.exits;
    }

    get local_locations(): Location[] {
        return this.locations;
    }
}