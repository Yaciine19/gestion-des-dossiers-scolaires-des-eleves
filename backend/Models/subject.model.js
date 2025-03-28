import mongoose from "mongoose";
import User from "./user.model.js";

const subjectSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    teachers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    // classes: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Class",
    //   },
    // ],
  },
  { timestamps: true }
);

subjectSchema.pre("findOneAndDelete", async function (next) {
  const subject = await this.model.findOne(this.getFilter());

  if (subject) {
    await User.updateMany(
      {
        subject: subject._id,
      },
      {
        $set: { subject: null },
      }
    );
  }
  next();
});

const Subject =
  mongoose.models.Subject || mongoose.model("Subject", subjectSchema);

export default Subject;
