const db = require('../config/db.config.js');

const getAllTrains = async () => {
  const [rows] = await db.query('SELECT * FROM trains');
  return rows;
};

const createTrains = async (train_name, train_number, destination) => {
  const [result] = await db.query('INSERT INTO trains (train_name, train_number, destination) VALUES (?, ?, ?)', [train_name, train_number, destination]);
  return result;
};

const deleteTrains = async (id) => {
  const [result] = await db.query('DELETE FROM trains WHERE id = ?', [id]);
  return result;
};

const updateTrains = async(id,train_name) => {
  const [result] = await db.query('UPDATE trains SET train_name = ? WHERE `trains`.`id` = ?',[train_name, id])
  return result;
}

module.exports = {
  getAllTrains,
  createTrains,
  deleteTrains,
  updateTrains
};
