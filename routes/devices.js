const device = require('../models/device');

const express = require('express');
const router = express.Router();

module.exports.pumpStatus = function(name,value){
    if(value == 1){
        console.log('value:1 ' + name);
        device.updateDeviceStatus(name,true);
    }else{
        console.log('value:0 ' + name);
        device.updateDeviceStatus(name,false);
    }
}

router.post('/addDevice', (req, res, next) => {
    let newDevice = new Device({
        name: req.body.name,
        isActive: req.body.isActive,
        status: req.body.status
    })
    Device.addDevice(newDevice, (err, device) => {
        if (err) throw err
    })
})

module.exports = router;