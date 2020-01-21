const mongoose = require('mongoose');

const sensorSchema = new mongoose.Schema({
    data: Number,
    idesp: String,
    idmac: String
}, {timestamps: true, static: false});
 // dados:number
 //}, {tmerstamps: true, static: false});
const SensorModel = mongoose.model('Sensor', sensorSchema);

class Sensor {
    /**
     * Get all Sensors from database
     * @returns {Array} Array of Sensors
     */
    static getAll() {
      return new Promise((resolve, reject) => {
        SensorModel.find({}).exec().then((results) => {
          resolve(results);
        }).catch((err) => {
          reject(err);
        });
      });
    }

    /**
     * Get a Sensor by it's id
     * @param {string} id - Sensor Id
     * @returns {Object} - Sensor Document Data
     */
    static getById(id) {
      return new Promise((resolve, reject) => {
        SensorModel.findById(id).exec().then((result) => {
          resolve(result);
        }).catch((err) => {
          reject(err);
        });
      });
    }

    /**
     * Create a new Sensor
     * @param {Object} sensor - Sensor Document Data
     * @returns {string} - New Sensor Id
     */
    static create(sensor) {
      return new Promise((resolve, reject) => {
        SensorModel.create(sensor).then((result) => {
          resolve(result._id);
        }).catch((err) => {
          reject(err);
        });
      });
    }

    /**
     * Update a Sensor
     * @param {string} id - Sensor Id
     * @param {Object} Sensor - Sensor Document Data
     * @returns {null}
     */
    static update(id, sensor) {
      return new Promise((resolve, reject) => {
        SensorModel.findByIdAndUpdate(id, sensor).then(() => {
          resolve();
        }).catch((err) => {
          reject(err);
        });
      });
    }

    /**
    * Delete a Sensor
    * @param {string} id - Sensor Id
    * @returns {null}
    */
    static delete(id) {
     return new Promise((resolve, reject) => {
       SensorModel.findByIdAndUpdate(id, { deleted: 1 }).then(() => {
         resolve();
       }).catch((err) => {
         reject(err);
       });
     });
    }

    /**
     * Get a Sensor by it's id
     * @param {string} idesp - Sensor Id
     * @returns {Object} - Sensor Document Data
     */
    static findOneById(id) {
      return new Promise((resolve, reject) => {
        SensorModel.find({idesp :  id}).sort({createdAt: -1}).exec().then((result) => {
          resolve(result[0]);
        }).catch((err) => {
          reject(err);
        });
      });
    }

    /**
     * Get a Sensor by it's id
     * @param {string} idesp - Sensor Id
     * @returns {Object} - Sensor Document Data
     */
    static getByIdData(id,data) {
      return new Promise((resolve, reject) => {
        SensorModel.find({idesp :  id, data : data}).sort({createdAt: 1}).exec().then((result) => {
          resolve(result);
        }).catch((err) => {
          reject(err);
        });
      });
    }

}

  module.exports = Sensor;
