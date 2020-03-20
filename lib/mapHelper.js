
let adapterInstance = null;
class MapHelper {
    constructor(adapterInstance) {
        this.adapterInstance = adapterInstance;
    }
    processMaps(maps) {
        
        let mapArray = [];
        if (typeof maps != "object")
            return false;
        for (let i in maps) {
            mapArray[maps["mapID"]] = maps[i];
        }
        adapterInstance.getChannelsOf("map", function(err, mapObjs) { //check existing map states
            for (let r in mapObjs) {
                let mapObj = mapObjs[r];
                adapterInstance.log.debug("processing channel: " + mapObj);
                let extMapId = mapObj._id.split(".").pop();
                let map = mapArray[extMapId];
                if (!map) { //map not existent (anymore)
                    adapterInstance.setStateChanged(mapObj._id + ".mapStatus", 'not available', true, function(err,id,notChanged){
                        if (!notChanged){ //map was available before
                            adapterInstance.log.info("Map: " + extMapId + " not available");
                            // adapterInstance.delObject(mapObj._id + ".mapID");
                            // adapterInstance.delObject(mapObj._id + ".mapName");
                        }
                    });
                } else {
                    adapterInstance.setStateChanged(mapObj._id + ".mapIndex", map, true, function(err,id,notChanged){
                        if (!notChanged){ //map was previously not available
                            adapterInstance.log.info("Map: " + extMapId + " mapped with index " + map)
                            adapterInstance.setObjectNotExists(id + ".mapID", maps[extMapId].mapID);
                            adapterInstance.setObjectNotExists(id + ".mapName", maps[extMapId].mapName);
                        }
                    });
                    delete mapArray[extMapId];
                }
                
            }
            for (let extMapId in mapArray) { //create new map states
                adapterInstance.getObject("map." + extMapId, function (err, mapObj) {
                    if (mapObj)
                        adapterInstance.setStateChanged(mapObj._id + ".mapIndex", mapArray[extMapId], true);
                    else 
                        adapterInstance.setObjectNotExists("map."+extMapId+".mapID", maps[extMapId].mapID);
                        adapterInstance.setObjectNotExists("map."+extMapId+".mapID", maps[extMapId].mapName);
                });
            }
        });
    }
}