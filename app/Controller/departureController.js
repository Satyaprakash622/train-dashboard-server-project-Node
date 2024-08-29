const departureModel = require('../model/departureModel');

const getAllDeparture = async (req, res) => {
  try {
    const departures = await departureModel.getAllDepartures();
    res.json({
      message: 'Departure train retrieved successfully!',
      data: departures
    });
  } catch (error) {
    res.status(500).send({
      message: 'Error retrieving departure trains.',
    });
  }
};

const markTrainAsDeparted = async (req, res) => {
  try {
    const id = req.params.id;
    const status = req.body.status
      if (!id || !status) {
      return res.status(400).send({
        message: 'Missing required field: id is required.'
      });
    }

    const result = await departureModel.markAsDeparted(id);
    if (result.affectedRows === 0) {
      return res.status(404).send({
        message: 'Train not found'
      });
    }

    res.json({
      data: result,
      message: 'Train marked as departed successfully!'
    });
  } catch (error) {
    res.status(500).send({
      message: 'Error marking train as departed'
    });
  }
};

const deleteDeparture = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).send({
        message: 'Missing required field: id is required.'
      });
    }

    const result = await departureModel.deleteDepartures(id);
    if (!result ||result.affectedRows === 0) {
      return res.status(404).send({
        message: `Departure train with id ${id} not found.`
      });
    }
    res.status(200).send({
        message:'Departure train deleted successfully'
    });
  } catch (error) {
    res.status(500).send({
      message: 'Error deleting departure train',
    });
  }
};

module.exports = {
  getAllDeparture,
  markTrainAsDeparted,
  deleteDeparture
};
