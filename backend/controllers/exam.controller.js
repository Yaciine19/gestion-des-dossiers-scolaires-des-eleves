import Exam from "../models/exam.modul.js";
import Subject from "../Models/subject.model.js";

export const getExams = async (req, res, next) => {
  try {
    const exams = await Exam.find()
      .populate("subject", "name")
      .populate("class", "name level")
      .populate("createdBy", "firstName lastName");

    res.status(200).json({
      success: true,
      data: exams,
    });
  } catch (error) {
    next(error);
  }
};

export const getExamDetails = async (req, res, next) => {
  try {
    const { id } = req.params;

    const exam = await Exam.findById(id)
      .populate("subject", "name") 
      .populate("class", "name level")
      .populate("createdBy", "firstName lastName");

    if (!exam) {
      const error = new Error("Exam not found");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      success: true,
      data: exam,
    });
  } catch (error) {
    next(error);
  }
};

export const CreateExam = async (req, res, next) => {
  try {
    const {
      subject,
      class: classId,
      date,
      duration,
      term,
    } = req.body;

    const existingSubject = Subject.findById(subject);

    if (!existingSubject) {
      const error = new Error("Subject not found");
      error.statusCode = 404;
      throw error;
    }

    const existingClass = Subject.findById(classId);

    if (!existingClass) {
      const error = new Error("Class not found");
      error.statusCode = 404;
      throw error;
    }

    const newExam = new Exam({
      subject,
      class: classId,
      date,
      duration,
      term,
      createdBy: req.user._id,
    });
    await newExam.save();

    res.status(201).json({
      success: true,
      message: "Created Exam successfully",
      data: newExam,
    });
  } catch (error) {
    next(error);
  }
};

export const updateExam = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { subject, class: classId, date, duration, term } = req.body;

    const exam = await Exam.findById(id);

    if (!exam) {
      const error = new Error("Exam not found");
      error.statusCode = 404;
      throw error;
    }

    if (subject) exam.title = subject;
    if (classId) exam.class = classId;
    if (duration) exam.duration = duration;
    if (date) exam.date = date;
    if (term) exam.term = term;

    await exam.save();

    res.status(201).json({
      success: true,
      message: "Updated Exam successfully",
      data: exam,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteExam = async (req, res, next) => {
  try {
    const { id } = req.params;

    const exam = await Exam.findById(id);

    if (!exam) {
      const error = new Error("Exam not found");
      error.statusCode = 404;
      throw error;
    }

    await Exam.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Deleted Exam successfully",
    });
  } catch (error) {
    next(error);
  }
};
