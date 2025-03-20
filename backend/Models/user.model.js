import mongoose from "mongoose";
import Class from "./class.model.js";
// import Bulletin from "./bulletin.model.js";
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
      // For Students and Teachers
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
      default: null,
      sparse: true,
    },
    subject: {
      // For Teachers
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
      default: null,
      sparse: true,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  if (this.isActive) {
    this.status = "active";
  }

  if (this.role === "Admin" || this.role === "Teacher") {
    this.isActive = true;
    this.status = "active";

    // Remove classId and regregistrationNumber from model of Admin and Teacher
    this.registrationNumber = undefined;
  }

  if (this.role === "Admin" || this.role === "Student") {
    this.subject = undefined;
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


userSchema.pre("findOneAndDelete", async function (next) {
  const user = await this.model.findOne(this.getFilter());

  if (user && user.role === "Teacher") {
    // حذف استاذ من المادة التي يدرسها اذا تم حذفه
    await Subject.updateMany(
      { teachers: user._id },
      { $pull: { teachers: user._id } }
    );

    // حذف استاذ من الصف الذي يدرسه اذا تم حذفه
    await Class.updateMany(
      { teachers: user._id },
      { $pull: { teachers: user._id } }
    );
  }

  // حذف التلميذ من الصف الذي يدرسه فيه اذا تم حذفه
  if (user && user.role === "Student") {
    await Class.updateMany(
      {
        students: user._id,
      },
      {
        $pull: { students: user._id },
      }
    );
  }

  next();
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
