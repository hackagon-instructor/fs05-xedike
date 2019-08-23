const mongoose = require('mongoose');

const TripSchema = new mongoose.Schema({
  driverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  locationFrom: String,
  locationTo: String,
  startTime: Date,
  availableSeats: Number, // 7 cho = 5 ghe trong + 2tai xe
  fee: Number,
  passengers: [
    {
      passengerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      },
      numberOfBookingSeats: Number
    }
  ], // [ {userId: 123, numberOfBookingSeats: 3}, {userId: 456, numberOfBookingSeats: 2]
  isFinished: { type: Boolean, default: false }
})

const Trip = mongoose.model("Trip", TripSchema, "Trip");

module.exports = {
  TripSchema, Trip
}