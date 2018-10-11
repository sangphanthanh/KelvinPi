const device = require('../models/device');



module.exports.pumpStatus = function(name,value){
    if(value == 1){
        device.updateDeviceStatus(name,true);
    }else{
        device.updateDeviceStatus(name,false);
    }
}