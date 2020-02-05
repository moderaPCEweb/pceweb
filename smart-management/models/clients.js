const mongoose = require('mongoose');

const ClientSchema = new mongoose.Schema({
  codClient:{
    type: String,
    unique: true,
  },
    corporateName: String,
    fantasyname: String,
    cnpj: Number,
    uid: {
      type: String
    },
    address: {
      street: String,
      number: Number,
      city: String,
      state: String,
      cep: Number,
    },
    email: String,
    phone: Number,
    nameContact: String,
    status: String,
    type: {
      type: String,
      default: 'Cliente'
    },
    devices: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Device'
    }]
}, {timestamps: true, static: false});

const ClientModel = mongoose.model('Client', ClientSchema);

class Client {
   /**
    * Get all Clients from database
    * @returns {Array} Array of Clients
    */
   static getAll() {
     return new Promise((resolve, reject) => {
       ClientModel.find({}).exec().then((results) => {
         resolve(results);
       }).catch((err) => {
         reject(err);
       });
     });
   }

   /**
    * Get a Client by it's id
    * @param {string} id - Client Id
    * @returns {Object} - Client Document Data
    */
   static getById(id) {
     return new Promise((resolve, reject) => {
       ClientModel.findById(id).exec().then((result) => {
         resolve(result);
       }).catch((err) => {
         reject(err);
       });
     });
   }

   /**
    * Create a new Client
    * @param {Object} Client - Client Document Data
    * @returns {string} - New Client Id
    */
   static create(Client) {
     return new Promise((resolve, reject) => {
       ClientModel.create(Client).then((result) => {
         resolve(result);
         console.log(result);
       }).catch((err) => {
         reject(err);
       });
     });
   }

   /**
    * Update a Client
    * @param {string} id - Client Id
    * @param {Object} Client - Client Document Data
    * @returns {null}
    */
   static update(id, Client) {
     return new Promise((resolve, reject) => {
       ClientModel.findByIdAndUpdate(id, Client).then(() => {
         resolve();
       }).catch((err) => {
         reject(err);
       });
     });
   }

   /**
   * Delete a Client
   * @param {string} id - Client Id
   * @returns {null}
   */
   static delete(id) {
    return new Promise((resolve, reject) => {
      ClientModel.findOneAndDelete({_id: id}).then(() => {
        resolve();
      }).catch((err) => {
        reject(err);
      });
    });
   }

   /**
    * Get a Client by it's email
    * @param {string} id - Client Email
    * @returns {Object} - Client Document Data
    */
   static getByEmail(id) {
     return new Promise((resolve, reject) => {
       ClientModel.findOne({ email: id }).exec().then((result) => {
         resolve(result);
       }).catch((err) => {
         reject(err);
       });
     });
   }

   /**
    * Get a Client by it's codId
    * @param {string} id - Client CodId
    * @returns {Object} - Client Document Data
    */
   static getByCodClient(id) {
     return new Promise((resolve, reject) => {
       ClientModel.findOne({ codClient: id }).exec().then((result) => {
         resolve(result);
       }).catch((err) => {
         reject(err);
       });
     });
   }

   /**
    * Add Device
    * @param {string} id - Client Id
    * @param {string} transaction - Device Id
    * @returns {null}
    */
   static addDevice(id, device) {
     return new Promise((resolve, reject) => {
       ClientModel.findByIdAndUpdate(id, { $push: { devices: device } }).catch((err) => {
         reject(err);
       });
     });
   }

   /**
    * Remove Device
    * @param {string} id - Client Id
    * @param {string} device - Device Id
    * @returns {null}
    */
    static removeDevice(id, device) {
      return new Promise((resolve, reject) => {
        ClientModel.findByIdAndUpdate(id, { $pull: { devices: device } }).catch((err) => {
          reject(err);
        });
      });
    }

    /**
    * Get a User by it's uid
    * @param {string} id - User Uid
    * @returns {Object} - User Document Data
    */
    static getByUid(id) {
      return new Promise((resolve, reject) => {
        ClientModel.findOne({ uid: id }).exec().then((result) => {
          resolve(result);
        }).catch((err) => {
          reject(err);
        });
      });
    }
}


 module.exports = Client;
