import { GraphHint, GraphRegion, GraphLocation, GraphEntrance, GraphItem, GraphHintGoal } from "../GraphPlugin.js";

type _HintArea = {
    vague_preposition: string | null,
    clear_preposition: string | null,
    str: string,
    short_name: string | null,
    color: string,
    dungeon_name: string | null,
}

type HintAreaDict = {
    [area: string]: _HintArea
}

export const HintAreas: HintAreaDict = {
    ROOT                   : {vague_preposition: 'in',     clear_preposition: 'in',     str: "Link's pocket",              short_name: 'Free',                   color: 'White',      dungeon_name: null},
    HYRULE_FIELD           : {vague_preposition: 'in',     clear_preposition: 'in',     str: 'Hyrule Field',               short_name: 'Hyrule Field',           color: 'Light Blue', dungeon_name: null},
    LON_LON_RANCH          : {vague_preposition: 'at',     clear_preposition: 'at',     str: 'Lon Lon Ranch',              short_name: 'Lon Lon Ranch',          color: 'Light Blue', dungeon_name: null},
    MARKET                 : {vague_preposition: 'in',     clear_preposition: 'in',     str: 'the Market',                 short_name: 'Market',                 color: 'Light Blue', dungeon_name: null},
    TEMPLE_OF_TIME         : {vague_preposition: 'inside', clear_preposition: 'inside', str: 'the Temple of Time',         short_name: 'Temple of Time',         color: 'Light Blue', dungeon_name: null},
    CASTLE_GROUNDS         : {vague_preposition: 'on',     clear_preposition: 'on',     str: 'the Castle Grounds',         short_name: null,                     color: 'Light Blue', dungeon_name: null},
    HYRULE_CASTLE          : {vague_preposition: 'at',     clear_preposition: 'at',     str: 'Hyrule Castle',              short_name: 'Hyrule Castle',          color: 'Light Blue', dungeon_name: null},
    OUTSIDE_GANONS_CASTLE  : {vague_preposition: null,     clear_preposition: null,     str: "outside Ganon's Castle",     short_name: "Outside Ganon's Castle", color: 'Light Blue', dungeon_name: null},
    INSIDE_GANONS_CASTLE   : {vague_preposition: 'inside', clear_preposition: null,     str: "inside Ganon's Castle",      short_name: "Inside Ganon's Castle",  color: 'Light Blue', dungeon_name: 'Ganons Castle'},
    GANONDORFS_CHAMBER     : {vague_preposition: 'in',     clear_preposition: 'in',     str: "Ganondorf's Chamber",        short_name: "Ganondorf's Chamber",    color: 'Light Blue', dungeon_name: null},
    KOKIRI_FOREST          : {vague_preposition: 'in',     clear_preposition: 'in',     str: 'Kokiri Forest',              short_name: "Kokiri Forest",          color: 'Green',      dungeon_name: null},
    DEKU_TREE              : {vague_preposition: 'inside', clear_preposition: 'inside', str: 'the Deku Tree',              short_name: "Deku Tree",              color: 'Green',      dungeon_name: 'Deku Tree'},
    LOST_WOODS             : {vague_preposition: 'in',     clear_preposition: 'in',     str: 'the Lost Woods',             short_name: "Lost Woods",             color: 'Green',      dungeon_name: null},
    SACRED_FOREST_MEADOW   : {vague_preposition: 'at',     clear_preposition: 'at',     str: 'the Sacred Forest Meadow',   short_name: "Sacred Forest Meadow",   color: 'Green',      dungeon_name: null},
    FOREST_TEMPLE          : {vague_preposition: 'in',     clear_preposition: 'in',     str: 'the Forest Temple',          short_name: "Forest Temple",          color: 'Green',      dungeon_name: 'Forest Temple'},
    DEATH_MOUNTAIN_TRAIL   : {vague_preposition: 'on',     clear_preposition: 'on',     str: 'the Death Mountain Trail',   short_name: "Death Mountain Trail",   color: 'Red',        dungeon_name: null},
    DODONGOS_CAVERN        : {vague_preposition: 'within', clear_preposition: 'in',     str: "Dodongo's Cavern",           short_name: "Dodongo's Cavern",       color: 'Red',        dungeon_name: 'Dodongos Cavern'},
    GORON_CITY             : {vague_preposition: 'in',     clear_preposition: 'in',     str: 'Goron City',                 short_name: "Goron City",             color: 'Red',        dungeon_name: null},
    DEATH_MOUNTAIN_CRATER  : {vague_preposition: 'in',     clear_preposition: 'in',     str: 'the Death Mountain Crater',  short_name: "Death Mountain Crater",  color: 'Red',        dungeon_name: null},
    FIRE_TEMPLE            : {vague_preposition: 'on',     clear_preposition: 'in',     str: 'the Fire Temple',            short_name: "Fire Temple",            color: 'Red',        dungeon_name: 'Fire Temple'},
    ZORA_RIVER             : {vague_preposition: 'at',     clear_preposition: 'at',     str: "Zora's River",               short_name: "Zora's River",           color: 'Blue',       dungeon_name: null},
    ZORAS_DOMAIN           : {vague_preposition: 'at',     clear_preposition: 'at',     str: "Zora's Domain",              short_name: "Zora's Domain",          color: 'Blue',       dungeon_name: null},
    ZORAS_FOUNTAIN         : {vague_preposition: 'at',     clear_preposition: 'at',     str: "Zora's Fountain",            short_name: "Zora's Fountain",        color: 'Blue',       dungeon_name: null},
    JABU_JABUS_BELLY       : {vague_preposition: 'in',     clear_preposition: 'inside', str: "Jabu Jabu's Belly",          short_name: "Jabu Jabu's Belly",      color: 'Blue',       dungeon_name: 'Jabu Jabus Belly'},
    ICE_CAVERN             : {vague_preposition: 'inside', clear_preposition: 'in'    , str: 'the Ice Cavern',             short_name: "Ice Cavern",             color: 'Blue',       dungeon_name: 'Ice Cavern'},
    LAKE_HYLIA             : {vague_preposition: 'at',     clear_preposition: 'at',     str: 'Lake Hylia',                 short_name: "Lake Hylia",             color: 'Blue',       dungeon_name: null},
    WATER_TEMPLE           : {vague_preposition: 'under',  clear_preposition: 'in',     str: 'the Water Temple',           short_name: "Water Temple",           color: 'Blue',       dungeon_name: 'Water Temple'},
    KAKARIKO_VILLAGE       : {vague_preposition: 'in',     clear_preposition: 'in',     str: 'Kakariko Village',           short_name: "Kakariko Village",       color: 'Pink',       dungeon_name: null},
    BOTTOM_OF_THE_WELL     : {vague_preposition: 'within', clear_preposition: 'at',     str: 'the Bottom of the Well',     short_name: "Bottom of the Well",     color: 'Pink',       dungeon_name: 'Bottom of the Well'},
    GRAVEYARD              : {vague_preposition: 'in',     clear_preposition: 'in',     str: 'the Graveyard',              short_name: "Graveyard",              color: 'Pink',       dungeon_name: null},
    SHADOW_TEMPLE          : {vague_preposition: 'within', clear_preposition: 'in',     str: 'the Shadow Temple',          short_name: "Shadow Temple",          color: 'Pink',       dungeon_name: 'Shadow Temple'},
    GERUDO_VALLEY          : {vague_preposition: 'at',     clear_preposition: 'at',     str: 'Gerudo Valley',              short_name: "Gerudo Valley",          color: 'Yellow',     dungeon_name: null},
    GERUDO_FORTRESS        : {vague_preposition: 'at',     clear_preposition: 'at',     str: "Gerudo's Fortress",          short_name: "Gerudo's Fortress",      color: 'Yellow',     dungeon_name: null},
    THIEVES_HIDEOUT        : {vague_preposition: 'in',     clear_preposition: 'in',     str: "the Thieves' Hideout",       short_name: "Thieves' Hideout",       color: 'Yellow',     dungeon_name: null},
    GERUDO_TRAINING_GROUND : {vague_preposition: 'within', clear_preposition: 'on',     str: 'the Gerudo Training Ground', short_name: "Gerudo Training Ground", color: 'Yellow',     dungeon_name: 'Gerudo Training Ground'},
    HAUNTED_WASTELAND      : {vague_preposition: 'in',     clear_preposition: 'in',     str: 'the Haunted Wasteland',      short_name: "Haunted Wasteland",      color: 'Yellow',     dungeon_name: null},
    DESERT_COLOSSUS        : {vague_preposition: 'at',     clear_preposition: 'at',     str: 'the Desert Colossus',        short_name: "Desert Colossus",        color: 'Yellow',     dungeon_name: null},
    SPIRIT_TEMPLE          : {vague_preposition: 'inside', clear_preposition: 'in',     str: 'the Spirit Temple',          short_name: "Spirit Temple",          color: 'Yellow',     dungeon_name: 'Spirit Temple'},
};

export class Hint implements GraphHint {
    public type: string;
    public area: GraphRegion | null = null;
    public location: GraphLocation | null = null;
    public entrance: GraphEntrance | null = null;
    public goal: HintGoal | null = null;
    public item: GraphItem | null = null;

    constructor(hint_type: string) {
        this.type = hint_type;
    }

    equals(other_hint: GraphHint) {
        return (
            this.type === other_hint.type
            && this.area === other_hint.area
            && this.location === other_hint.location
            && this.entrance === other_hint.entrance
            && this.item?.name === other_hint.item?.name
            && this.item?.player === other_hint.item?.player
            && this.item?.price === other_hint.item?.price
            && this.goal?.location === other_hint.goal?.location
            && this.goal?.item_count === other_hint.goal?.item_count
            && this.goal?.item?.name === other_hint.goal?.item?.name
            && this.goal?.item?.player === other_hint.goal?.item?.player
            && this.goal?.item?.price === other_hint.goal?.item?.price
        );
    }
}

export class HintGoal implements GraphHintGoal {
    public location: GraphLocation | null = null;
    public item: GraphItem | null = null;
    public item_count: number = 0;
}