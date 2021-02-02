const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const petitionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      min: 10,
      max: 50,
      unique: true,
      index: true,
    },

    type: { type: mongoose.Schema.Types.ObjectId, ref: 'PetitionType', required: true } ,

    recipients:{
        type: String,
        required: true,
        trim: true
    },

    problem: {
        type: String,
        required: true,
        trim: true
    },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    updatedAt: Date,

    photo: { type: String }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Petition", petitionSchema);
