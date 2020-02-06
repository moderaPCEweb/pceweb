const mongoose = require('mongoose');

const StationSchema = new mongoose.Schema({
    codeStation: {
      type: String,
      unique: true
    }, //trabalhar com o erro depois em cach error
    // devicecode: String,
    id_m: {
      type: String,
    },
    idesp: String,
    dataesp: {
      type: String,
      default: "Desligado",
    },
    nameEmployed: String,
    toleranceTime: String,
    status: String,
    officeHours: String,
    inputTime: {
      inputHour: Number,
      inputMin: Number,
    },
    outputTime: {
    outputHour: Number,
    outputMin: Number
    },
    weekday: {
      monday: {
        type: Boolean,
        default: 0
      },
      tuesday: {
        type: Boolean,
        default: 0
      },
      wednesday: {
        type: Boolean,
        default: 0
      },
      thursday: {
        type: Boolean,
        default: 0
      },
      friday: {
        type: Boolean,
        default: 0
      },
      saturday: {
        type: Boolean,
        default: 0
      },
      sunday: {
        type: Boolean,
        default: 0
      }
    },
    manager: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Manager'
    }
}, {timestamps: true, static: false});

const StationModel = mongoose.model('Station', StationSchema);

class Station {
   /**
    * Get all Stations from database
    * @returns {Array} Array of Stations
    */
   static getAll() {
     return new Promise((resolve, reject) => {
       StationModel.find({}).exec().then((results) => {
         resolve(results);
       }).catch((err) => {
         reject(err);
       });
     });
   }

   /**
    * Get a Station by it's id
    * @param {string} id - Station Id
    * @returns {Object} - Station Document Data
    */
    static getById(id) {
      return new Promise((resolve, reject) => {
        StationModel.findById(id).exec().then((result) => {
          resolve(result);
        }).catch((err) => {
          reject(err);
        });
      });
    }

    /**
    * Get a Station by it's id
    * @param {string} id - Station Id
    * @returns {Object} - Station Document Data
    */
   static getByCode(id) {
    return new Promise((resolve, reject) => {
      StationModel.find({codeStation: id}).exec().then((result) => {
        resolve(result);
      }).catch((err) => {
        reject(err);
      });
    });
  }

       /**
    * Get a Station by it's manager
    * @param {string} id - Station manager
    * @returns {Object} - Station Document Data
    */
   static getByManager(id) {
    return new Promise((resolve, reject) => {
      StationModel.find({ manager: id }).exec().then((result) => {
        resolve(result);
      }).catch((err) => {
        reject(err);
      });
    });
  }

      /**
    * Get a Station by idesp
    * @param {string} id - idesp
    * @returns {Object} - Station Document Data
    */
    static getByIdesp(id) {
    return new Promise((resolve, reject) => {
     StationModel.find({ idesp: id }).exec().then((result) => {
       resolve(result);
     }).catch((err) => {
       reject(err);
     });
    });
    }

      /**
    * Get a Station by id_m
    * @param {string} id - id_m
    * @returns {Object} - Station Document Data
    */
    static getByIdm(id) {
    return new Promise((resolve, reject) => {
     StationModel.find({ id_m: id }).exec().then((result) => {
       resolve(result);
     }).catch((err) => {
       reject(err);
     });
    });
    }
   /**
    * Create a new Station
    * @param {Object} Station - Station Document Data
    * @returns {string} - New Station Id
    */
   static create(Station) {
     return new Promise((resolve, reject) => {
       StationModel.create(Station).then((result) => {
         resolve(result._id);
         console.log(result);
       }).catch((err) => {
         reject(err);
       });
     });
   }

   /**
    * Update a Station
    * @param {string} id - Station Id
    * @param {Object} Station - Station Document Data
    * @returns {null}
    */
   static update(id, Station) {
     return new Promise((resolve, reject) => {
       StationModel.findByIdAndUpdate(id, Station).then(() => {
         resolve();
       }).catch((err) => {
         reject(err);
       });
     });
   }

   static getCodestationByTimeAndIdesp(id_esp,dia,hour,min) {
    return new Promise((resolve, reject) => {
    //console.log(id_esp+dia+hour+min);

     StationModel.find({ idesp: id_esp }).exec().then((result) => {

      result.forEach(station => {
        console.log(station);

        if(station.status=="Trabalho"){
          switch (dia) {
            case 0:
              if (station.weekday.sunday){
                if (station.inputTime.inputHour<station.outputTime.outputHour) {
                  if (station.inputTime.inputHour<hour) {
                    if (station.outputTime.outputHour>hour) {
                      resolve(station);
                    } else if (station.outputTime.outputHour==hour) {
                      if (station.outputTime.outputMin>=min) {
                        resolve(station);
                      }
                    }
                  }
                  else if (station.inputTime.inputHour==hour) {
                    if (station.inputTime.inputHour<=min) {
                      resolve(station);
                    }
                  }
                }
                else if (station.outputTime.outputHour<station.inputTime.inputHour) {
                  if ((station.inputTime.inputHour>hour)||(station.outputTime.outputHour>hour)||((station.inputTime.inputHour==hour)&&(station.inputTime.inputMin<=min))||((station.outputTime.outputHour==hour)&&(station.outputTime.outputMin>min))) {
                    resolve(station);
                  }
                }
              }
              break;
            case 1:
              if (station.weekday.monday){
                if (station.inputTime.inputHour<station.outputTime.outputHour) {
                  if (station.inputTime.inputHour<hour) {
                    if (station.outputTime.outputHour>hour) {
                      resolve(station);
                    } else if (station.outputTime.outputHour==hour) {
                      if (station.outputTime.outputMin>=min) {
                        resolve(station);
                      }
                    }
                  }
                  else if (station.inputTime.inputHour==hour) {
                    if (station.inputTime.inputHour<=min) {
                      resolve(station);
                    }
                  }
                }
                else if (station.outputTime.outputHour<station.inputTime.inputHour) {
                  if ((station.inputTime.inputHour>hour)||(station.outputTime.outputHour>hour)||((station.inputTime.inputHour==hour)&&(station.inputTime.inputMin<=min))||((station.outputTime.outputHour==hour)&&(station.outputTime.outputMin>min))) {
                    resolve(station);
                  }
                }
              }
              break;
            case 2:
              if (station.weekday.tuesday){
                if (station.inputTime.inputHour<station.outputTime.outputHour) {
                  if (station.inputTime.inputHour<hour) {
                    if (station.outputTime.outputHour>hour) {
                      resolve(station);
                    } else if (station.outputTime.outputHour==hour) {
                      if (station.outputTime.outputMin>=min) {
                        resolve(station);
                      }
                    }
                  }
                  else if (station.inputTime.inputHour==hour) {
                    if (station.inputTime.inputHour<=min) {
                      resolve(station);
                    }
                  }
                }
                else if (station.outputTime.outputHour<station.inputTime.inputHour) {
                  if ((station.inputTime.inputHour>hour)||(station.outputTime.outputHour>hour)||((station.inputTime.inputHour==hour)&&(station.inputTime.inputMin<=min))||((station.outputTime.outputHour==hour)&&(station.outputTime.outputMin>min))) {
                    resolve(station);
                  }
                }
              }
              break;
            case 3:
              if (station.weekday.wednesday){
                if (station.inputTime.inputHour<station.outputTime.outputHour) {
                  if (station.inputTime.inputHour<hour) {
                    if (station.outputTime.outputHour>hour) {
                      resolve(station);
                    } else if (station.outputTime.outputHour==hour) {
                      if (station.outputTime.outputMin>=min) {
                        resolve(station);
                      }
                    }
                  }
                  else if (station.inputTime.inputHour==hour) {
                    if (station.inputTime.inputHour<=min) {
                      resolve(station);
                    }
                  }
                }
                else if (station.outputTime.outputHour<station.inputTime.inputHour) {
                  if ((station.inputTime.inputHour>hour)||(station.outputTime.outputHour>hour)||((station.inputTime.inputHour==hour)&&(station.inputTime.inputMin<=min))||((station.outputTime.outputHour==hour)&&(station.outputTime.outputMin>min))) {
                    resolve(station);
                  }
                }
              }
              break;
            case 4:
              if (station.weekday.thursday){
                if (station.inputTime.inputHour<station.outputTime.outputHour) {
                  if (station.inputTime.inputHour<hour) {
                    if (station.outputTime.outputHour>hour) {
                      resolve(station);
                    } else if (station.outputTime.outputHour==hour) {
                      if (station.outputTime.outputMin>=min) {
                        resolve(station);
                      }
                    }
                  }
                  else if (station.inputTime.inputHour==hour) {
                    if (station.inputTime.inputHour<=min) {
                      resolve(station);
                    }
                  }
                }
                else if (station.outputTime.outputHour<station.inputTime.inputHour) {
                  if ((station.inputTime.inputHour>hour)||(station.outputTime.outputHour>hour)||((station.inputTime.inputHour==hour)&&(station.inputTime.inputMin<=min))||((station.outputTime.outputHour==hour)&&(station.outputTime.outputMin>min))) {
                    resolve(station);
                  }
                }
              }
              break;
            case 5:
              if (station.weekday.friday){
                if (station.inputTime.inputHour<station.outputTime.outputHour) {
                  if (station.inputTime.inputHour<hour) {
                    if (station.outputTime.outputHour>hour) {
                      resolve(station);
                    } else if (station.outputTime.outputHour==hour) {
                      if (station.outputTime.outputMin>=min) {
                        resolve(station);
                      }
                    }
                  }
                  else if (station.inputTime.inputHour==hour) {
                    if (station.inputTime.inputHour<=min) {
                      resolve(station);
                    }
                  }
                }
                else if (station.outputTime.outputHour<station.inputTime.inputHour) {
                  if ((station.inputTime.inputHour>hour)||(station.outputTime.outputHour>hour)||((station.inputTime.inputHour==hour)&&(station.inputTime.inputMin<=min))||((station.outputTime.outputHour==hour)&&(station.outputTime.outputMin>min))) {
                    resolve(station);
                  }
                }
              }
              break;
            case 6:
              if (station.weekday.saturday){
                if (station.inputTime.inputHour<station.outputTime.outputHour) {
                  if (station.inputTime.inputHour<hour) {
                    if (station.outputTime.outputHour>hour) {
                      resolve(station);
                    } else if (station.outputTime.outputHour==hour) {
                      if (station.outputTime.outputMin>=min) {
                        resolve(station);
                      }
                    }
                  }
                  else if (station.inputTime.inputHour==hour) {
                    if (station.inputTime.inputHour<=min) {
                      resolve(station);
                    }
                  }
                }
                else if (station.outputTime.outputHour<station.inputTime.inputHour) {
                  if ((station.inputTime.inputHour>hour)||(station.outputTime.outputHour>hour)||((station.inputTime.inputHour==hour)&&(station.inputTime.inputMin<=min))||((station.outputTime.outputHour==hour)&&(station.outputTime.outputMin>min))) {
                    resolve(station);
                  }
                }
              }
          }


        }

      });

     }).catch((err) => {
       reject(err);
     });
    });
    }
   /**
   * Delete a Station
   * @param {string} id - Station Id
   * @returns {null}
   */
   static delete(id) {
    return new Promise((resolve, reject) => {
      StationModel.findOneAndDelete({_id: id}).then(() => {
        resolve();
      }).catch((err) => {
        reject(err);
      });
    });
   }
}

 module.exports = Station;
