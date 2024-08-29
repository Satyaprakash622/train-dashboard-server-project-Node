const db = require('../config/db.config.js');

const getAllDepartures = async () => {
    const query = `
        SELECT train_departures.id, trains.train_name, trains.train_number, 
        trains.destination, departure_time FROM train_departures 
        LEFT JOIN trains ON train_departures.train_id = trains.id
        WHERE train_departures.departure_time <= NOW() AND train_departures.
        status = 'scheduled'
    `;
    const [rows] = await db.query(query);
    return rows;
};

const markAsDeparted = async (id) => {
    const [result] = await db.query('UPDATE train_departures SET status = ? WHERE id = ?', ['departed' ,id]);
    return result;
};

const deleteDepartures = async (id) => {
    const [result] = await db.query('DELETE FROM train_departures WHERE id = ?', [id]);
    return result;
};

module.exports = {
    getAllDepartures,
    markAsDeparted,
    deleteDepartures
};
