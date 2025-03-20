import mongoose from "mongoose";

const subjectScoreSchema = mongoose.Schema({
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subject",
    required: true,
  },
  testScore: {
    type: Number,
    required: true,
    min: 0,
    max: 20,
  },
  continuousAssessment: {
    type: Number,
    required: true,
    min: 0,
    max: 20,
  },
  examScore: {
    type: Number,
    required: true,
    min: 0,
    max: 20,
  },
  finalScore: {
    type: Number,
    default: 0,
    min: 0,
    max: 20,
  },
});

const bulletinSchema = mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  class: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Class",
    required: true,
  },
  termNumber: {
    type: Number,
    required: true,
  },
  subjects: [subjectScoreSchema],
  termAverage: {
    type: Number,
    default: 0,
  },
  annualAverage: {
    type: Number,
    default: 0,
  },
});

bulletinSchema.pre("save", function (next) {
  // حساب العلامة النهائية لكل مادة
  this.subjects.forEach((subject) => {
    subject.finalScore =
      (subject.testScore + subject.continuousAssessment + subject.examScore) / 3;
  });

  // حساب معدل الفصل
  const totalScore = this.subjects.reduce(
    (sum, subject) => sum + subject.finalScore,
    0
  );
  this.termAverage = totalScore / this.subjects.length;

  next();
});

const Bulletin =
  mongoose.models.Bulletin || mongoose.model("Bulletin", bulletinSchema);
export default Bulletin;
