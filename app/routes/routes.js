const express = require('express');
const router = express.Router();
const trainController = require('../controller/trainController.js');
const departureController = require('../controller/departureController.js');
const arrivalController = require('../controller/arrivalController.js');

router.get('/findAllTrains', trainController.getAllTrains);
router.post('/trains', trainController.createTrain);
router.delete('/trains/:id', trainController.deleteTrain);
router.put('/trains/:id/name', trainController.updateTrain);

router.get('/departures', departureController.getAllDeparture);
router.put('/departures/:id/departed', departureController.markTrainAsDeparted);
router.delete('/departures/:id', departureController.deleteDeparture);

router.get('/arrivals', arrivalController.getAllArrivals);
router.put('/arrivals/:id/arrived', arrivalController.markTrainAsArrived);
router.delete('/arrivals/:id', arrivalController.deleteArrival);

module.exports = router;
