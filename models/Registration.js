import mongoose from "mongoose";

const RegistrationSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },

    // IEEE Logic
    isIEEEMember: {
      type: Boolean,
      required: true,
    },
    ieeeSB: {
      type: String,
      default: null,
    },
    ieeeId: {
      type: String,
      default: null,
    },
    universityName: {
      type: String,
      default: null,
    },

    // Challenger Logic
    isChallenger: {
      type: Boolean,
      required: true,
    },
    teamName: {
      type: String,
      default: null,
    },

    // Payment for Admin later
    paid: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Registration ||
  mongoose.model("Registration", RegistrationSchema);