import mongoose from "mongoose";

const termSchema = mongoose.Schema({
  termNumber: {
    type: Number,
    required: true,
  },
  examScore: {
    type: Number,
    required: true,
    min: 0,
    max: 20,
  },
  // علامة التقويم المستمر
  continuousAssessment: {
    type: Number,
    required: true,
    min: 0,
    max: 20,
  },
  finalScore: {
    type: Number,
    required: true,
    min: 0,
    max: 20,
  },
});

const bulletinSchema = mongoose.Schema({
  // ربط بالطالب
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
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subject",
    required: true,
  },
  terms: [termSchema], // تخزين البيانات الفصول الثلاثة
  annualAverage: {
    type: Number,
    default: 0,
  },
});

bulletinSchema.pre("save", function (next) {
  this.terms.forEach((term) => {
    term.finalScore = ( term.examScore + term.continuousAssessment ) / 2;
  });

  if (this.terms.length === 3) {
    const totalScore = this.terms.reduce(
      (sum, term) => sum + term.finalScore,
      0
    );
    this.annualAverage = totalScore / 3;
  }

  next();
});

const Bulletin = mongoose.models.Bulletin || mongoose.model("Bulletin", bulletinSchema);

export default Bulletin;
