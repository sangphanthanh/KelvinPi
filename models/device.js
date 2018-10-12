const mongoose = require('mongoose');

/**
 * Device Schema
 */
const DeviceSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    isActive: {
        type: Boolean,
        require: true
    },
    status: {
        type: Boolean,
        require: true
    },
    description: {
        type: String,
        require: false
    }
});

const Device = module.exports = mongoose.model('device', DeviceSchema);

module.exports.updateDevice = function (device, callback) {
    Device.findByIdAndUpdate(device._id, {
        $set: {
            name: device.name,
            isActive: device.isActive,
            status: device.status,
            description: device.description
        }
    }, callback);
}


module.exports.updateDeviceStatus = function (vname, vstatus, callback) {
    console.log('updated Device ' + vname + ' : ' + vstatus);
        Device.findOneAndUpdate({
            name: vname
        }, {
            $set: {
                status: vstatus
            }
        }, callback);
}

module.exports.addDevice = function (newDevice, callback) {
    newDevice.save(callback);
}
