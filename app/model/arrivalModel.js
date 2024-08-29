const db = require('../config/db.config.js');

const getsAllArrivals = async () => {
  const query = `
    SELECT train_arrivals.id, trains.train_name, trains.train_number, trains.destination, train_arrivals.arrival_time FROM train_arrivals
    LEFT JOIN trains ON train_arrivals.train_id = trains.id
    WHERE train_arrivals.arrival_time <= NOW() AND train_arrivals.status = 'scheduled'
  `;
  const [rows] = await db.query(query);
  return rows;
};

const markAsArrived = async (id) => {
  const [result] = await db.query('UPDATE train_arrivals SET status = ? WHERE id = ?', ['arrived', id]);
  return result;
};

const deleteArrival = async (id) => {
  const [result] = await db.query('DELETE FROM train_arrivals WHERE id = ?', [id]);
  return result;
};

module.exports = {
  getsAllArrivals,
  markAsArrived,
  deleteArrival
};
