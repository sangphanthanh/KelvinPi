const Device = require('../models/device');


module.exports.pumpStatus = function(name,value){
    if(value == 1){
        console.log('value:1 ' + name);
        Device.updateDeviceStatus(name,true, (err, device)=>{
            if(err) throw err;
            if(device){
                console.log('Device: '+device.name+ ' status: '+device.status);
            }
        });
    }else{
        console.log('value:0 ' + name);
        Device.updateDeviceStatus(name,false, (err,device)=>{
            if(err) throw err;
            if(device){
                console.log('Device: '+device.name+ ' status: '+device.status);
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
