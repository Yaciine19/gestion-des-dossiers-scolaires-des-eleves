import mongoose from "mongoose";

const EventSchema = new mongoose.Schema({
  title: { 
    type: String,
    required: true
},
  description: { type: String },
  date: { 
    type: Date,
    required: true
},
  location: { type: String }, // Optional
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  audience: {
    type: String,
    enum: ["Students", "Teachers", "Both"],
    required: true,
  },
  createdAt: { 
    type: Date,
    default: Date.now },
});

const Event = mongoose.model("Event", EventSchema);
export default Event;
