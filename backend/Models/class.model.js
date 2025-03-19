import mongoose from "mongoose";
import User from "./user.model.js";

const classSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    level: {
      type: String,
      required: true,
    },
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    teachers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    // subjects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Subject" }],
  },
  { timestamps: true }
);

classSchema.pre("findOneAndDelete", async function (next) {
  const classData = await this.model.findOne(this.getFilter());

  if (classData) {
    await User.updateMany({ classId: classData._id }, { $set: { classId: null } });
  }
  next();
});

const Class = mongoose.models.Class || mongoose.model("Class", classSchema);

export default Class;
