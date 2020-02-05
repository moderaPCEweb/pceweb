const mongoose = require('mongoose');

const DeviceSchema = new mongoose.Schema({
  numLot: String,
  numId:{
    type: String,
    unique: true,
  }, // ou tipo Number?
  dateFab: String,
  provider: String,
  status: {
    type: String,
    default: "Pendente"
  },
  dateMov: String,
  note: {
    type: String,
    default: " "
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client'
  }
});

const DeviceModel = mongoose.model('Device', DeviceSchema);

class Device {
    /**
     * Get all Devices from database
     * @returns {Array} Array of Devices
     */
    static getAll() {
      return new Promise((resolve, reject) => {
        DeviceModel.find({}).exec().then((results) => {
          resolve(results);
        }).catch((err) => {
          reject(err);
        });
      });
    }

    /**
     * Get a Device by it's id
     * @param {string} id - Device Id
     * @returns {Object} - Device Document Data
     */
    static getById(id) {
      return new Promise((resolve, reject) => {
        DeviceModel.findById(id).exec().then((result) => {
          resolve(result);
        }).catch((err) => {
          reject(err);
        });
      });
    }

    /**
     * Create a new Device
     * @param {Object} device - Device Document Data
     * @returns {string} - New Device Id
     */
    static create(device) {
      return new Promise((resolve, reject) => {
        DeviceModel.create(device).then((result) => {
          resolve(result);
        }).catch((err) => {
          reject(err);
        });
      });
    }

    /**
     * Update a Device
     * @param {string} id - Device Id
     * @param {Object} Device - Device Document Data
     * @returns {null}
     */
    static update(id, device) {
      return new Promise((resolve, reject) => {
        DeviceModel.findByIdAndUpdate(id, device).then(() => {
          resolve();
        }).catch((err) => {
          reject(err);
        });
      });
    }

    /**
    * Delete a Device
    * @param {string} id - Device Id
    * @returns {null}
    */
    static delete(id) {
     return new Promise((resolve, reject) => {
       DeviceModel.findByIdAndUpdate(id, { deleted: 1 }).then(() => {
         resolve();
       }).catch((err) => {
         reject(err);
       });
     });
    }
  }

  module.exports = Device;
