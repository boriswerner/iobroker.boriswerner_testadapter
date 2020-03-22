"use strict";

/*
 * Created with @iobroker/create-adapter v1.21.0
 */

// The adapter-core module gives you access to the core ioBroker functions
// you need to create an adapter
const utils = require("@iobroker/adapter-core");
// Load your modules here, e.g.:
// const fs = require("fs");

const mapHelper = require("./lib/mapHelper");

class BoriswernerTestadapter extends utils.Adapter {

    /**
     * @param {Partial<ioBroker.AdapterOptions>} [options={}]
     */
    constructor(options) {
        super({
            ...options,
            name: "boriswerner_testadapter",
        });
        this.on("ready", this.onReady.bind(this));
        this.on("objectChange", this.onObjectChange.bind(this));
        this.on("stateChange", this.onStateChange.bind(this));
        // this.on("message", this.onMessage.bind(this));
        this.on("unload", this.onUnload.bind(this));
    }

    /**
     * Is called when databases are connected and adapter received configuration.
     */
    async onReady() {
        // Initialize your adapter here

        // The adapters config (in the instance object everything under the attribute "native") is accessible via
        // // this.config:
        // this.log.info("config option1: " + this.config.option1);
        // this.log.info("config option2: " + this.config.option2);

        /*
        For every state in the system there has to be also an object of type state
        Here a simple template for a boolean variable named "testVariable"
        Because every adapter instance uses its own unique namespace variable names can"t collide with other adapters variables
        // */
        // await this.setObjectAsync("testVariable", {
        //     type: "state",
        //     common: {
        //         name: "testVariable",
        //         type: "boolean",
        //         role: "indicator",
        //         read: true,
        //         write: true,
        //     },
        //     native: {},
        // });

        this.createChannelNotExists("map", "Maps");
        let json = {};

        //initial map setup
        json = { "maps":[{ "mapID": "1260001017", "mapIndex": 0, "mapStatus": 1, "mapIsCurrentMap": 0, "mapIsBuilt": 1, "mapName": "EG" }
            , { "mapID": "1307200506", "mapIndex": 1, "mapStatus": 1, "mapIsCurrentMap": 1, "mapIsBuilt": 1, "mapName": "OG" }] };
        mapHelper.processMaps(this, json);
        json = { "mapID": "1260001017", "mapSetID": "208", "mapSpotAreas": [{ "mapSpotAreaID": "1" }, { "mapSpotAreaID": "4" }] } ;
        mapHelper.processSpotAreas(this, json);
        json = { "mapID": "1307200506", "mapSetID": "207", "mapSpotAreas": [{ "mapSpotAreaID": "0" }, { "mapSpotAreaID": "1" }, { "mapSpotAreaID": "2" }] } ;
        mapHelper.processSpotAreas(this, json);
        json = { "mapSpotAreaID": "1", "mapSpotAreaName": "Wohnzimmer", "mapID": "1260001017" } ;
        mapHelper.processSpotAreaInfo(this, json);
        json = { "mapSpotAreaID": "4", "mapSpotAreaName": "Flur", "mapID": "1260001017" } ;
        mapHelper.processSpotAreaInfo(this, json);
        json = { "mapSpotAreaID": "0", "mapSpotAreaName": "A", "mapID": "1307200506" } ;
        mapHelper.processSpotAreaInfo(this, json);
        json = { "mapSpotAreaID": "1", "mapSpotAreaName": "B", "mapID": "1307200506" } ;
        mapHelper.processSpotAreaInfo(this, json);
        json = { "mapSpotAreaID": "2", "mapSpotAreaName": "C", "mapID": "1307200506" } ;
        mapHelper.processSpotAreaInfo(this, json);

        // //change map name of 1307200506 and remove map 1260001017
        // json = { "maps":[{ "mapID": "1307200506", "mapIndex": 1, "mapStatus": 1, "mapIsCurrentMap": 1, "mapIsBuilt": 1, "mapName": "Obergeschoss" }] };
        // mapHelper.processMaps(this, json);
        
        // //remove spotArea 1 and rename spotArea 2
        // json = { "mapID": "1307200506", "mapSetID": "207", "mapSpotAreas": [{ "mapSpotAreaID": "0" }, { "mapSpotAreaID": "2" }] } ;
        // mapHelper.processSpotAreas(this, json);
        // json = { "mapSpotAreaID": "0", "mapSpotAreaName": "A", "mapID": "1307200506" } ;
        // mapHelper.processSpotAreaInfo(this, json);
        // json = { "mapSpotAreaID": "2", "mapSpotAreaName": "Schlafzimmer", "mapID": "1307200506" } ;
        // mapHelper.processSpotAreaInfo(this, json);

        // //reactivate map 1260001017 with different status and Name, spotArea 4 (Flur) removed and 3 (Küche) added
        // json = { "maps":[{ "mapID": "1260001017", "mapIndex": 0, "mapStatus": 2, "mapIsCurrentMap": 0, "mapIsBuilt": 1, "mapName": "Erdgeschoss" }
        //     , { "mapID": "1307200506", "mapIndex": 1, "mapStatus": 1, "mapIsCurrentMap": 1, "mapIsBuilt": 1, "mapName": "Obergeschoss" }] };
        // mapHelper.processMaps(this, json);
        // json = { "mapID": "1260001017", "mapSetID": "208", "mapSpotAreas": [{ "mapSpotAreaID": "1" }, { "mapSpotAreaID": "3" }] } ;
        // mapHelper.processSpotAreas(this, json);
        // json = { "mapSpotAreaID": "1", "mapSpotAreaName": "Wohnzimmer", "mapID": "1260001017" } ;
        // mapHelper.processSpotAreaInfo(this, json);
        // json = { "mapSpotAreaID": "3", "mapSpotAreaName": "Küche", "mapID": "1260001017" } ;
        // mapHelper.processSpotAreaInfo(this, json);


        
        // //reactivate spotArea 4 (Flur)  and 3 (Küche) removed
        // json = { "mapID": "1260001017", "mapSetID": "208", "mapSpotAreas": [{ "mapSpotAreaID": "1" }, { "mapSpotAreaID": "4" }] } ;
        // mapHelper.processSpotAreas(this, json);
        // json = { "mapSpotAreaID": "1", "mapSpotAreaName": "Wohnzimmer", "mapID": "1260001017" } ;
        // mapHelper.processSpotAreaInfo(this, json);
        // json = { "mapSpotAreaID": "4", "mapSpotAreaName": "Flur", "mapID": "1260001017" } ;
        // mapHelper.processSpotAreaInfo(this, json);


        // in this template all states changes inside the adapters namespace are subscribed
        this.subscribeStates("*");

        /*
        setState examples
        you will notice that each setState will cause the stateChange event to fire (because of above subscribeStates cmd)
        */
        // the variable testVariable is set to true as command (ack=false)
        // await this.setStateAsync("testVariable", true);

        // // same thing, but the value is flagged "ack"
        // // ack should be always set to true if the value is received from or acknowledged from the target system
        // await this.setStateAsync("testVariable", { val: true, ack: true });

        // // same thing, but the state is deleted after 30s (getState will return null afterwards)
        // await this.setStateAsync("testVariable", { val: true, ack: true, expire: 30 });

        // // examples for the checkPassword/checkGroup functions
        // let result = await this.checkPasswordAsync("admin", "iobroker");
        // this.log.info("check user admin pw iobroker: " + result);

        // result = await this.checkGroupAsync("admin", "admin");
        // this.log.info("check group user admin group admin: " + result);


    }

    /**
     * Is called when adapter shuts down - callback has to be called under any circumstances!
     * @param {() => void} callback
     */
    onUnload(callback) {
        try {
            this.log.info("cleaned everything up...");
            callback();
        } catch (e) {
            callback();
        }
    }

    /**
     * Is called if a subscribed object changes
     * @param {string} id
     * @param {ioBroker.Object | null | undefined} obj
     */
    onObjectChange(id, obj) {
        if (obj) {
            // The object was changed
            this.log.info(`object ${id} changed: ${JSON.stringify(obj)}`);
        } else {
            // The object was deleted
            this.log.info(`object ${id} deleted`);
        }
    }

    /**
     * Is called if a subscribed state changes
     * @param {string} id
     * @param {ioBroker.State | null | undefined} state
     */
    onStateChange(id, state) {
        if (state) {
            // The state was changed
            this.log.info(`state ${id} changed: ${state.val} (ack = ${state.ack})`);
        } else {
            // The state was deleted
            this.log.info(`state ${id} deleted`);
        }
    }

    // /**
    //  * Some message was sent to this instance over message box. Used by email, pushover, text2speech, ...
    //  * Using this method requires "common.message" property to be set to true in io-package.json
    //  * @param {ioBroker.Message} obj
    //  */
    // onMessage(obj) {
    // 	if (typeof obj === "object" && obj.message) {
    // 		if (obj.command === "send") {
    // 			// e.g. send email or pushover or whatever
    // 			this.log.info("send command");

    // 			// Send response in callback if required
    // 			if (obj.callback) this.sendTo(obj.from, obj.command, "Message received", obj.callback);
    // 		}
    // 	}
    // }


    async createChannelNotExists(id, name) {
        this.setObjectNotExists(id, {
            type: "channel",
            common: {
                name: name
            },
            native: {}
        });
    }
    
    async createObjectNotExists(id, name, type, role, write, def, unit) {
        this.setObjectNotExists(id, {
            type: "state",
            common: {
                name: name,
                type: type,
                role: role,
                read: true,
                write: write,
                def: def,
                unit: unit
            },
            native: {}
        });
    }
}

// @ts-ignore parent is a valid property on module
if (module.parent) {
    // Export the constructor in compact mode
    /**
     * @param {Partial<ioBroker.AdapterOptions>} [options={}]
     */
    module.exports = (options) => new BoriswernerTestadapter(options);
} else {
    // otherwise start the instance directly
    new BoriswernerTestadapter();
}