const mongoose = require('mongoose');

/**
 * Device Schema
 */
const DeviceSchema = mongoose.Schema({
    name: {type: String, require: true},
    isActive: {type: Boolean, require:true},
    status: {type: Boolean, require: true},
    description: {type: String, require:false}
});

const Device = module.exports = mongoose.model('device',DeviceSchema);
