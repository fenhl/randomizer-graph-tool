class TimeOfDay {
    constructor() {}

    NONE() { return 0; }
    DAY() { return 1; }
    DAMPE() { return 2; }
    ALL() { return this.DAY | this. DAMPE }
}

class Region {
    constructor({name='', type=null} = {}) {
        this.name = name;
        this.type = type;
        this.entrances = [];
        this.exits = [];
        this.locations = [];
        this.dungeon = null;
        this.world = null;
        this.hint_name = null;
        this.alt_hint_name = null;
        this.price = null;
        this.world = null;
        this.time_passes = false;
        this.provides_time = TimeOfDay.NONE;
        this.scene = null;
        this.is_boss_room = false;
        this.savewarp = null;

    }
}

module.exports = { TimeOfDay, Region };