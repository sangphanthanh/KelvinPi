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

module.exports.addDevice = function(){
    let newDevice = new Device({
        name: 'pump1',
        isActive: true,
        status: true
    })
    Device.addDevice(newDevice, (err, device) => {
        if (err) throw err
    })
}
