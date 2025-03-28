import Subject from "../models/subject.model.js";

export const getSubjects = async (req, res, next) => {
  try {
    const subjects = await Subject.find();

    res.status(200).json({
      success: true,
      data: subjects,
    });
  } catch (error) {
    next(error);
  }
};

export const getSubjectDetails = async (req, res, next) => {
  try {
    const { id } = req.params;

    const subject = await Subject.findOne({ _id: id }).populate(
      "teachers",
      "firstName lastName email"
    );

    if (!subject) {
      return res
        .status(404)
        .json({ success: false, message: "Subject not found" });
      // const error = new Error("Subject not found");
      // error.statusCode = 404;
      // throw error;
    }

    res.status(200).json({
      success: true,
      data: subject,
    });
  } catch (error) {
    next(error);
  }
};

export const CreateSubject = async (req, res, next) => {
  try {
    const { name, teachers, classes } = req.body;

    // Check if subject exists
    const subject = await Subject.findOne({ name });

    if (subject) {
      return res
        .status(409)
        .json({ success: false, message: "Subject already exists" });
    }

    const newSubject = new Subject({
      name,
      teachers: teachers || [],
      classes: classes || [],
    });
    await newSubject.save();

    res.status(201).json({
      success: true,
      message: "Created subject successfully",
      data: newSubject,
    });
  } catch (error) {
    next(error);
  }
};

export const updateSubject = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, teachers, classes } = req.body;

    const subject = await Subject.findById(id);

    if (!subject) {
      const error = new Error("Class not found");
      error.statusCode = 404;
      throw error;
    }

    if (name) subject.name = name;
    if (teachers) subject.teachers = teachers;
    if (classes) subject.classes = classes;

    await subject.save();

    res.status(201).json({
      success: true,
      message: "Updated subject successfully",
      data: subject,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteSubject = async (req, res, next) => {
  try {
    const { id } = req.params;

    const subject = await Subject.findById(id);

    if (!subject) {
      const error = new Error("subject not found");
      error.statusCode = 404;
      throw error;
    }

    await Subject.findOneAndDelete({ _id: id });

    res.status(200).json({
      success: true,
      message: "Deleted subject successfully",
    });
  } catch (error) {
    next(error);
  }
};
