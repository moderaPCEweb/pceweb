const express = require('express');
const firebase = require('firebase');
const auth = require('./middleware/auth');
const Device = require('../models/devices');
const Client = require('../models/clients');
const Station = require('../models/station');
const Manager = require('../models/manager');
const Sensor = require('../models/sensor');

const moment = require('moment');
const router = express.Router();

router.get('/receberDados', (req,res) => {
  sensor.getAll().then((result)=>{
    res.send(result);
  });
});

router.get('/',auth.isAuthenticated,auth.isManager, (req, res) => {
  res.render('manager/onlineTracking', { title: 'Acompanhamento Online', layout: 'layoutdashboardmanager' });
});

router.get('/user/:codeStation',auth.isAuthenticated,auth.isManager, (req, res) => {

  Station.getByCode(req.params.codeStation).then((stations) => {
    res.render('manager/onlineTrackingUser', { title: 'Acompanhamento Online', layout: 'layoutdashboardmanager', stations ,...req.session});
  });
});

router.get('/signup',auth.isAuthenticated,auth.isManager, function(req, res, next) {
  res.render('manager/', { title: '' });
});

router.get('/getstation',(req,res) => {
  const manager = req.session._id;
  console.log(manager);
    Station.getByManager(manager).then((stations) => {
      console.log(stations);
      res.send(stations);
    });
});

router.get('/list',auth.isAuthenticated,auth.isManager, (req, res) => {
  Sensor.getAll().then((sensor) => {
    const manager = req.session._id;
    console.log(manager);
      Station.getByManager(manager).then((stations) => {

        var d = new Date();
        var h = d.getHours();
        var m = d.getMinutes();
        var dia = d.getDay();
        console.log("********************************");
        console.log("Weekday "+stations);

        console.log(dia + "time: "+h+":"+m);

        console.log("********************************");

        // console.log(sensor[0].createdAt);
      // oi = sensor[0].createdAt;

      // console.log(oi);
      // console.log(moment(oi).format("YYYY-MM-DD HH:mm:ss"));
      // console.log("Date: "+moment(oi).format("YYYY-MM-DD"));
      // console.log("Year: "+moment(oi).format("YYYY"));
      // console.log("Month: "+moment(oi).format("MM"));
      // console.log("Month: "+moment(oi).format("MMMM"));
      // console.log("Day: "+moment(oi).format("DD"));
      // console.log("Day: "+moment(oi).format("dddd"));
      // console.log("Time: "+moment(oi).format("HH:mm"));
      // var hora = moment(oi).format("HH");
      // var minuto = moment(oi).format("mm");
      // var segundo = moment(oi).format("ss")
      // console.log("----------------------------------");


      // var date = oi;
      // var now = new Date();
      // console.log(" Seconds from now : " + parseInt( (now.getTime() - date.getTime())/1000 ) );
      // var ff = parseInt( (now.getTime() - date.getTime())/1000 )
      // console.log("total-------------"+ff);
      // ss = ff%60;
      // mi = ff/60;
      // console.log(mi.toFixed(0)+":"+ss);

    res.render('manager/onlineTrackingHome', { title: 'Acompanhamento Online',h,m,dia, layout: 'layoutdashboardmanager',stations ,...req.session});
  }).catch((error) => {
    res.redirect('error');
    console.log(error);
  });

     }).catch((error)=> {
     res.redirect('/error');
     console.log(error);
   });
});

router.get('/edit/:id',auth.isAuthenticated,auth.isManager, (req, res) => {
  Station.getById(req.params.id).then((station) => {
    res.render('admin/clientsRegistrationEdit', { title: 'Edição de Perfil', layout: 'layoutdashboardmanager',station });
  });
});

module.exports = router;
