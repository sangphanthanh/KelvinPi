const device = require('../models/device');



module.exports.pumpStatus = function(name,value){
    if(value == 1){
        console.log('value:1 ' + name);
        device.updateDeviceStatus(name,true);
    }else{
        console.log('value:0 ' + name);
        device.updateDeviceStatus(name,false);
    }
}