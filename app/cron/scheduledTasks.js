const cron = require('node-cron');
const arrivalModel = require('../model/arrivalModel.js');
const departureModel = require('../model/departureModel.js');

cron.schedule('* * * * *', async () => {
  try {
    const arrivals = await arrivalModel.getsAllArrivals();
    for (const arrival of arrivals) {
      await arrivalModel.markAsArrived(arrival.id);
    }
  } catch (error) {
    console.error('Error processing arrivals:', error);
  }
});

cron.schedule('* * * * *', async () => {
  try {
    const departures = await departureModel.getAllDepartures();
    for (const departure of departures) {
      await departureModel.markAsDeparted(departure.id);
    }
  } catch (error) {
    console.error('Error processing departures:', error);
  }
});
