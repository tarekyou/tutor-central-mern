const { Schema, model } = require("mongoose");
const User = require("./User");
const { default: mongoose } = require("mongoose");

const tutorSchema = new Schema(
  {
    userId: { type: mongoose.Types.ObjectId, ref: User, required: true },
    hourlyRate: {
      type: String,
    },
    knownSubjects: {
      type: String,
    },
    bio: {
      type: String,
      maxlength: 250,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

const Tutor = model("Tutor", tutorSchema);

module.exports = Tutor;
