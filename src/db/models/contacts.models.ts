import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "Please add the contact name"],
    },
    email: {
      type: String,
      require: [true, "Please add the contact email"],
    },
    phone: {
      type: String,
      require: [true, "Please add the phone number"],
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Users",
    },
  },
  {
    timestamps: true,
  }
);

const Contacts = mongoose.model("Contacts", contactSchema);
export { Contacts };
