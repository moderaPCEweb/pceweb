const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
    data: Number,
    idesp: String,
    codeStation: String
}, {timestamps: true, static: false});
 // dados:number
 //}, {tmerstamps: true, static: false});
const logModel = mongoose.model('Log', logSchema);

class Log {
    /**
     * Get all Logs from database
     * @returns {Array} Array of Logs
     */
    static getAll() {
      return new Promise((resolve, reject) => {
        LogModel.find({}).exec().then((results) => {
          resolve(results);
        }).catch((err) => {
          reject(err);
        });
      });
    }

    /**
     * Get a Log by it's id
     * @param {string} id - Log Id
     * @returns {Object} - Log Document Data
     */
    static getById(id) {
      return new Promise((resolve, reject) => {
        LogModel.findById(id).exec().then((result) => {
          resolve(result);
        }).catch((err) => {
          reject(err);
        });
      });
    }

    /**
     * Create a new Log
     * @param {Object} log - Log Document Data
     * @returns {string} - New Log Id
     */
    static create(log) {
      return new Promise((resolve, reject) => {
        LogModel.create(log).then((result) => {
          resolve(result._id);
        }).catch((err) => {
          reject(err);
        });
      });
    }

    /**
     * Update a Log
     * @param {string} id - Log Id
     * @param {Object} Log - Log Document Data
     * @returns {null}
     */
    static update(id, log) {
      return new Promise((resolve, reject) => {
        LogModel.findByIdAndUpdate(id, log).then(() => {
          resolve();
        }).catch((err) => {
          reject(err);
        });
      });
    }

    /**
    * Delete a Log
    * @param {string} id - Log Id
    * @returns {null}
    */
    static delete(id) {
     return new Promise((resolve, reject) => {
       LogModel.findByIdAndUpdate(id, { deleted: 1 }).then(() => {
         resolve();
       }).catch((err) => {
         reject(err);
       });
     });
    }

    /**
     * Get a Log by it's id
     * @param {string} idesp - Log Id
     * @returns {Object} - Log Document Data
     */
    static findOneById(id) {
      return new Promise((resolve, reject) => {
        LogModel.find({codeStation :  id}).sort({createdAt: -1}).exec().then((result) => {
          resolve(result[0]);
        }).catch((err) => {
          reject(err);
        });
      });
    }

    /**
     * Get a Log by it's id
     * @param {string} idesp - Log Id
     * @returns {Object} - Log Document Data
     */
    static getByIdData(id,data) {
      return new Promise((resolve, reject) => {
        LogModel.find({idesp :  id, data : data}).sort({createdAt: 1}).exec().then((result) => {
          resolve(result);
        }).catch((err) => {
          reject(err);
        });
      });
    }

}

  module.exports = Log;
