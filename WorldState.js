const { ItemInfo, ItemFactory } = require("./Item");
const { escape_name } = require("./RulesCommon");

class WorldState {
    constructor(parent) {
        this.prog_items = {};
        this.world = parent;
        this.search = null;
        this._won = this.world.triforce_hunt ? this.won_triforce_hunt : this.won_normal;
    }

    won() {
        return this._won();
    }

    won_triforce_hunt() {
        return this.has('Triforce Piece', this.world.triforce_count);
    }

    won_normal() {
        return this.has('Triforce');
    }

    has(item, count=1) {
        return !!this.prog_items[item] && this.prog_items[item] >= count;
    }

    has_any_of(items) {
        for (const item of items) {
            if (!!this.prog_items[item] && this.prog_items[item]) return true;
        }
        return false;
    }

    has_all_of(items) {
        for (const item of items) {
            if (!(!!this.prog_items[item] && this.prog_items[item])) return false;
        }
        return true;
    }

    count_of(items) {
        let s = 0;
        for (const i of items) {
            s += !!this.prog_items[i] ? this.prog_items[i] : 0;
        };
        return s;
    }

    item_count(item) {
        return this.prog_items[item];
    }

    has_bottle() {
        return this.has_any_of(ItemInfo.bottles.values()) || this.has('Rutos Letter', 2);
    }

    has_hearts(count) {
        return this.heart_count() >= count;
    }

    heart_count() {
        return (~~(this.item_count('Piece of Heart') / 4) + 3);
    }

    has_medallions(count) {
        return this.count_of(ItemInfo.medallions.values()) >= count;
    }

    has_stones(count) {
        return this.count_of(ItemInfo.stones.values()) >= count;
    }

    has_dungeon_rewards(count) {
        return (this.count_of(ItemInfo.medallions.values()) + this.count_of(ItemInfo.stones.values())) >= count;
    }

    had_night_start() {
        let stod = this.world.settings.starting_tod;
        // These are all not between 6:30 and 18:00
        if (stod == 'sunset' ||         // 18
            stod == 'evening' ||        // 21
            stod == 'midnight' ||       // 00
            stod == 'witching-hour') {  // 03
            return true;
        } else {
            return false;
        }
    }

    can_live_dmg(hearts) {
        let mult = this.world.settings.damage_multiplier;
        if (hearts*4 >= 3) {
            return mult != 'ohko' && mult != 'quadruple';
        } else if (hearts*4 < 3) {
            return mult != 'ohko';
        } else {
            return true;
        }
    }

    guarantee_hint() {
        return this.world.parser.parse_rule('guarantee_hint')(this);
    }

    collect(item) {
        if (item.name.includes('Small Key Ring') && this.world.settings.keyring_give_bk) {
            let dungeon_name = item.name.substring(0, item.name.length-1).split('(')[1];
            if (['Forest Temple', 'Fire Temple', 'Water Temple', 'Shadow Temple', 'Spirit Temple'].contains(dungeon_name)) {
                let bk = `Boss Key (${dungeon_name})`;
                this.prog_items[`Boss Key (${dungeon_name})`] = 1;
            }
        }
        if (!!item.alias) {
            if (!!this.prog_items[item.alias[0]]) {
                this.prog_items[item.alias[0]] += item.alias[1];
            } else {
                this.prog_items[item.alias[0]] = item.alias[1];
            }
        }
        if (item.advancement) {
            if (!!this.prog_items[item.name]) {
                this.prog_items[item.name] += 1;
            } else {
                this.prog_items[item.name] = 1;
            }
        }
        console.log(`collected ${item.name}`);
        //(item in this.prog_items) ? this.prog_items[item] += 1 : this.prog_items[item] = 1;
    }

    collect_starting_items() {
        let starting_item;
        for (let item_name of Object.keys(this.world.settings.starting_items)) {
            starting_item = ItemFactory(item_name === 'Bottle with Milk (Half)' ? 'Bottle' : item_name, this.world);
            for (let i = 0; i < this.world.settings.starting_items[item_name]; i++) {
                this.collect(starting_item);
            }
        }
    }

    remove(item) {
        if (item.name.includes('Small Key Ring') && this.world.settings.keyring_give_bk) {
            let dungeon_name = item.name.substring(0, item.name.length-1).split('(')[1];
            if (['Forest Temple', 'Fire Temple', 'Water Temple', 'Shadow Temple', 'Spirit Temple'].contains(dungeon_name)) {
                this.prog_items[`Boss Key (${dungeon_name})`] = 0;
            }
        }
        if (!!item.alias && this.prog_items[item.alias[0]] > 0) {
            this.prog_items[item.alias[0]] -= item.alias[1];
            if (this.prog_items[item.alias[0]] <= 0) {
                delete this.prog_items[item.alias[0]];
            }
        }
        if (this.prog_items[item.name] > 0) {
            this.prog_items[item.name] -= 1;
            if (this.prog_items[item.alias[0]] <= 0) {
                delete this.prog_items[item.name];
            }
        }
        console.log(`disposed of ${item.name}`);
    }

    region_has_shortcuts(region_name) {
        return this.world.region_has_shortcuts(region_name);
    }
}

module.exports = WorldState;