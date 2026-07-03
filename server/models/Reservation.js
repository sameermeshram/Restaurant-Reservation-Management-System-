import mongoose from 'mongoose';

const reservationSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Customer is required'],
    },
    table: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Table',
      required: [true, 'Table is required'],
    },
    reservationDate: {
      type: Date,
      required: [true, 'Reservation date is required'],
    },
    timeSlot: {
      type: String,
      required: [true, 'Time slot is required'],
      trim: true,
    },
    guests: {
      type: Number,
      required: [true, 'Guests is required'],
      min: [1, 'Guests must be greater than 0'],
    },
    status: {
      type: String,
      enum: ['confirmed', 'cancelled'],
      default: 'confirmed',
    },
  },
  {
    timestamps: true,
  }
);

reservationSchema.index(
  { table: 1, reservationDate: 1, timeSlot: 1 },
  {
    unique: true,
    partialFilterExpression: { status: 'confirmed' },
  }
);

const Reservation = mongoose.model('Reservation', reservationSchema);

export default Reservation;
