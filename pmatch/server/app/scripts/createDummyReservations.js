const mongoose = require('mongoose');
require('dotenv').config();
const { Reservation, User, Pro } = require('../src/models/model');

mongoose.connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).catch(error => console.error('Mongoose connection error:', error));

async function createDummyReservations() {
    try {
        const users = await User.find({}).select('_id');
        const userIds = users.map(user => user._id);

        const pros = await Pro.find({}).select('_id');
        const proIds = pros.map(pro => pro._id);

        if (userIds.length < 5 || proIds.length < 5) {
            throw new Error('Not enough users or pros to create dummy reservations');
        }

        const reservations = [
            { user_id: userIds[0], pro_id: proIds[0], reservation_date: new Date(), duration: 60, place: "655594dac536e45817e1a6ec", status: 'confirmed', created_date: new Date(), remainingSessions:5},
            { user_id: userIds[1], pro_id: proIds[1], reservation_date: new Date(), duration: 45, place: "655594dac536e45817e1a6ec", status: 'pending', created_date: new Date(), remainingSessions:5},
            { user_id: userIds[2], pro_id: proIds[2], reservation_date: new Date(), duration: 30, place: "655594dac536e45817e1a6ec", status: 'cancelled', created_date: new Date(), remainingSessions:5},
            { user_id: userIds[3], pro_id: proIds[3], reservation_date: new Date(), duration: 90, place: "655594dac536e45817e1a6ec", status: 'confirmed', created_date: new Date(), remainingSessions:5},
            { user_id: userIds[4], pro_id: proIds[4], reservation_date: new Date(), duration: 120, place: "655594dac536e45817e1a6ec", status: 'pending', created_date: new Date(), remainingSessions:5 }
        ];

        for (const reservationData of reservations) {
            const reservation = new Reservation(reservationData);
            await reservation.save();
        }

        console.log('Reservations created successfully');
    } catch (error) {
        console.error('Error creating reservations:', error);
    } finally {
        mongoose.disconnect();
    }
}

createDummyReservations();
