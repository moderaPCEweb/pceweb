const express = require('express');
const firebase = require('firebase');
const auth = require('./middleware/auth');
const Device = require('../models/devices');
const Client = require('../models/clients');
const Station = require('../models/station');
const Manager = require('../models/manager');
const User = require('../models/user');
const Sector = require('../models/sector');


const router = express.Router();

router.get('/signup',auth.isAuthenticated, auth.isClienteADM, function(req, res, next) {
  res.render('client/managerRegistration', { title: 'Cadastro de Gestores', layout: 'layoutdashboardclientadm'});
});

router.get('/list',auth.isAuthenticated, auth.isClienteADM, (req, res) => {
  Manager.getByClient(req.session._id).then((managers) => {
    res.render('client/managerList', { title: 'Lista de Gestores', layout: 'layoutdashboardclientadm', managers });
  }).catch((error)=> {
    res.redirect('/error');
    console.log(error);
  });
});

router.get('/managerlist',auth.isAuthenticated, auth.isClienteADM, (req, res) => {
  Manager.getAll().then((managers) => {
    res.render('client/managerList', { title: 'Lista de Gestores', layout: 'layoutdashboardclientadm', managers });
  }).catch((error)=> {
    res.redirect('/error');
    console.log(error);
  });
});

router.get('/edit/:id',auth.isAuthenticated,auth.isClienteADM, (req, res) => {
  Manager.getById(req.params.id).then((manager) => {
    res.render('client/managerRegistrationedit', { title: 'Edição de Perfil', layout:'layoutdashboardclientadm',manager });
  });
});

router.post('/signup',auth.isAuthenticated,auth.isClienteADM, function(req, res, next) {
  const ativa = req.body.manager;
  ativa.type = "Gestor";
  ativa.client = req.session._id;
  firebase.auth().createUserWithEmailAndPassword(ativa.email, ativa.password).then((userF) => {
    ativa.uid = userF.user.uid;
    var usuario = ativa;
    Manager.create(ativa).then((id) => {
      User.create(usuario).then((id) =>{
        console.log("Usuario deu bom");
      }).catch((error) => {

        console.log(error);
        res.redirect('/manager/signup');
      });
      res.redirect('/manager/list');
    }).catch((error) => {
      req.flash('danger',"O código do Gestor inserido já está sendo utilizado");
      console.log(error);
      res.redirect('/manager/signup');
    });
  }).catch((error) => {
    switch (error.code) {
      case 'auth/email-already-in-use':
        req.flash('danger', 'Email já está sendo utilizado');
        break;
      case 'auth/weak-password':
        req.flash('danger', 'A senha deve ter no mínimo 6 caracteres');
        break;
    }
    res.redirect('/manager/signup');
    console.log(error);
  });
});

router.post('/:id',auth.isAuthenticated,auth.isClienteADM, (req, res) => {
  const manager = req.body.manager;
  Manager.update(req.params.id, manager).then(() => {
    res.redirect('/manager/list');
  }).catch((error) => {
    console.log(error);
    res.redirect('/error');
  });
});
module.exports = router;
