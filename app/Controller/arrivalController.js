const arrivalModel = require('../model/arrivalModel.js');

const getAllArrivals = async (req, res) => {
  try {
    const arrivals = await arrivalModel.getsAllArrivals();
    res.json({
      message: 'Arrivals train retrieved successfully!',
      data: arrivals
    });
  } catch (error) {
    res.status(500).send({
      message: 'Error retrieving arrivals'
    });
  }
};

const markTrainAsArrived = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).send({
        message: 'Missing required field: id is required.'
      });
    }

    const result = await arrivalModel.markAsArrived(id);
    if (!result || result.affectedRows === 0) {
      return res.status(404).send({
        message: 'Train not found'
      });
    }
    // console.log('Train marked as arrived successfully');
    res.json({
      message: 'Train marked as arrived successfully!'
    })
  } catch (error) {
    res.status(500).send({
      message: 'Error marking train has arrived'
    });
  }
};

const deleteArrival = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).send({
        message: 'Missing required field: id is required.'
      });
    }
    const result = await arrivalModel.deleteArrival(id);
    if (result.affectedRows === 0) {
      return res.status(404).send({
        message: `Arrival train with id ${id} not found.`
      });
    }
    res.status(200).send({
      message: 'Arrival Train deleted successfully!',
    });
  } catch (error) {
    res.status(500).send({
      message: 'Error in deleting arrival train',
    });
  }
};

module.exports = {
  getAllArrivals,
  markTrainAsArrived,
  deleteArrival
};
