const express = require('express');
const firebase = require('firebase');
const auth = require('./middleware/auth');
const Device = require('../models/devices');
const Client = require('../models/clients');
const Station = require('../models/station');
const Manager = require('../models/manager');
const Sensor = require('../models/sensor');


const router = express.Router();

router.get('/list',auth.isAuthenticated,auth.isADM, (req, res) => {
  Device.getAll().then((devices) => {
    res.render('admin/deviceList', { title: 'Cadastro de Aparelho', devices });
  }).catch((error) => {
    res.redirect('error');
    console.log(error);
  });
});

router.get('/movimentation/:id',auth.isAuthenticated,auth.isADM, (req, res) => {
  Device.getById(req.params.id).then((device) => {
    Client.getById(device.client).then((client) => {
      console.log(client);
      res.render('admin/deviceMove', { title: 'Movimentação de Aparelhos', device, client });
    });
  });
});

router.get('/signup',auth.isAuthenticated,auth.isADM, (req, res) => {
  res.render('admin/deviceRegistration', { title: 'Cadastro de Aparelho' });
});

router.post('/signup',auth.isAuthenticated,auth.isADM, (req, res) => {
  const ativa = req.body.device;
  Device.create(ativa).then((id) => {
    console.log("Aparelho criado com sucesso!");
    res.redirect('/device/list');
    }).catch((error) =>{
      console.log(error);
  });
});


router.post('/receiveData::idesp::data::idmac', (req, res) =>{
  if(! (req.params.idesp && req.params.idmac && req.params.data) ){
    return res.send("Formato inválido");
  }
  // console.log("ID do esp: " + req.params.idesp);
  // console.log("MAC do esp: " + req.params.idmac);
  // console.log("Variável recebida: " + req.params.data);
  const ativa = req.params;
  console.log(ativa);
  Sensor.create(ativa).then((id) =>{
    Station.getByIdesp(ativa.idesp).then((station) => {
      if(ativa.data == 0){
        // console.log("Em uso");
        station[0].dataesp = "Em uso";
        Station.update(station[0]._id, station[0]).then(() =>{
        }).catch((error) =>{
          console.log(error);
      });
      }
      else if(ativa.data == 1){
        // console.log("Desligado");

        station[0].dataesp = "Desligado";
        Station.update(station[0]._id, station[0]).then(() =>{
        }).catch((error) =>{
          console.log(error);
        });
      }
      // console.log(station);
    });
  }).catch((error) =>{
  console.log(error);
    });
  return res.send("Recebido");
});


router.post('/:id',auth.isAuthenticated,auth.isADM, (req, res) => {
  const device = req.body.device;
  const deviceId = req.params.id;
  Device.getById(req.params.id).then((oldDevice) => {
    Client.removeDevice(oldDevice.client, deviceId).catch((error) => {
      console.log(error);
      res.redirect('/error');
    });
    Client.getByCodClient(device.codClient).then((client) => {
      device.client = client;
      delete device.codClient;
      Client.addDevice(client, deviceId).catch((error) => {
        console.log(error);
        res.redirect('/error');
      });
      Device.update(req.params.id, device).then(() => {
        res.redirect('/device/list');
      }).catch((error) => {
        console.log(error);
        res.redirect('/error');
      });
    });
  });
});

module.exports = router;
