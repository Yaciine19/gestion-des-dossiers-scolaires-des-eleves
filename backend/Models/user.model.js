import mongoose from "mongoose";
import Class from "./class.model.js";
import Bulletin from "./bulletin.model.js";
import Subject from "./subject.model.js";

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please enter a first Name"],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, "Please enter a Last Name"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please enter a email"],
      trim: true,
      unique: true,
      lowercase: true,
      match: [/\S+@\S+\.\S+/, "Please fill a valid email"],
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["Admin", "Teacher", "Student"],
      default: "Student",
      required: true,
    },
    isActive: {
      // The account is inactive until the admin approves it
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "inactive",
    },
    registrationNumber: {
      type: String,
      unique: true,
      sparse: true, // Only for Students
      trim: true,
    },
    classId: {
      // For Students
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
      default: null,
    },
    subjects: {
      // For Teachers
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
      default: null,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  if (this.role === "Admin" || this.role === "Teacher") {
    this.isActive = true;
    this.status = "active";
    this.registrationNumber = undefined;
  }

  next();
});

// userSchema.pre("remove", async function (next) {
//   if (this.role === "Student") {
//     await Class.updateMany(
//       { students: this._id },
//       { $pull: { students: this._id } }
//     );
//     await Bulletin.deleteMany({ studentId: this._id });
//   }

//   if (this.role === "Teacher") {
//     await Subject.updateMany(
//       { teacher: this._id },
//       { $unset: { teacher: "" } }
//     );
//   }

//   next();
// });

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
