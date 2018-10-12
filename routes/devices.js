const Device = require('../models/device');


module.exports.pumpStatus = function(name,value){
    if(value == 1){
        Device.updateDeviceStatus(name,true, (err, device)=>{
            if(err) throw err;
            if(device){
            }
        });
    }else{
        Device.updateDeviceStatus(name,false, (err,device)=>{
            if(err) throw err;
            if(device){
            }
        });
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
