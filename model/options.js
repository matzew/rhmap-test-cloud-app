"use strict";

const DEFAULT_CONFIG_TTL = -1;
const DEFAULT_OPTIONS_BROADCAST = false;

class Options {
    constructor() {
        this.config = new Config();
        this.criteria = new Criteria();
        this.apps = [];
        this.broadcast = DEFAULT_OPTIONS_BROADCAST;
    }

    get aliases() {
        return this.criteria.alias;
    }
}

class Criteria {
    constructor() {
        this.alias = [];
        this.deviceType;
        this.categories;
        this.variants;
    }
}

class Config {
    constructor() {
        this.ttl = DEFAULT_CONFIG_TTL;
    }
}

module.exports = Options;
