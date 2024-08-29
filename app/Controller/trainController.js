const trainModel = require('../model/trainModel.js');

const getAllTrains = async (req, res) => {
  try {
    const trains = await trainModel.getAllTrains();
    res.json({
      message: 'Trains retrieved successfully!',
      data: trains
    });
  } catch (error) {
    res.status(500).send({
      message: 'Error in retrieving Trains',
    });
  }
};

const createTrain = async (req, res) => {
  try {
    const { train_name, train_number, destination } = req.body;
    if (!train_name || !train_number || !destination) {
      return res.status(400).send({
        message: 'Missing required fields: train_name, train_number, and destination are required.',
      });
    }

    const result = await trainModel.createTrains(train_name, train_number, destination);
    res.status(201).json({
      id: result.insertId,
      message: 'Train created successfully!',
    });
  } catch (error) {
    res.status(500).send({
      message: 'Error in creating train',
    });
  }
};

const deleteTrain = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await trainModel.deleteTrains(id);

    if (result.affectedRows === 0) {
      return res.status(404).send({
        message: `Train with id ${id} not found.`
      });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).send({
      message: 'Error in deleting train',
    });
  }
};

const updateTrain = async (req,res) => {
  try{
    const id = req.params.id;
    const { train_name } = req.body;
    if (!id || !train_name) {
      return res.status(400).send({
        message: 'Missing required field: id is required.'
      });
    }

    const result = await trainModel.updateTrains(id,train_name);
    if(result.affectedRows === 0){
      return res.status(404).send({
        message: 'Train not found with id'
      });
    }
    res.json({
      message: 'Train name updated  successfully!'
    })

  } catch(error) {
    res.status(500).send({
      message: 'Error in updating train',
    });
  }
}

module.exports = {
  getAllTrains,
  createTrain,
  deleteTrain,
  updateTrain
};
