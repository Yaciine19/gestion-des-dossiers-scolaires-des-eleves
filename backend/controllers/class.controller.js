import Class from "../models/class.model.js";

export const getClasses = async (req, res, next) => {
  try {
    const classes = await Class.find();

    res.status(200).json({
      success: true,
      data: classes,
    });
  } catch (error) {
    next(error);
  }
};

export const getClassDetails = async (req, res, next) => {
  try {
    const { id } = req.params;

    const existingClass = await Class.findById(id);

    if (!existingClass) {
      const error = new Error("Class not found");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      success: true,
      data: existingClass,
    });
  } catch (error) {
    next(error);
  }
};

export const CreateClass = async (req, res, next) => {
  try {
    const { name, level, students, teachers } = req.body;

    // Check if class exists
    const existingClass = await Class.findOne({ name, level });

    if (existingClass) {
      const error = new Error("Class already exists");
      error.statusCode = 409;
      throw error;
    }

    const newClass = new Class({
      name,
      level,
      students: students || [],
      // subjects: subjects || [],
      teachers: teachers || []
    });
    await newClass.save();

    res.status(201).json({
      success: true,
      message: "Created class successfully",
      data: newClass,
    });
  } catch (error) {
    next(error);
  }
};

export const updateClass = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, level, students, subjects } = req.body;

    const existingClass = await Class.findById(id);

    if (!existingClass) {
      const error = new Error("Class not found");
      error.statusCode = 404;
      throw error;
    }

    if (name) existingClass.name = name;
    if (level) existingClass.level = level;
    if (students) existingClass.students = students;
    if (subjects) existingClass.subjects = subjects;

    await existingClass.save();

    res.status(201).json({
      success: true,
      message: "Updated class successfully",
      data: existingClass,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteClass = async (req, res, next) => {
  try {
    const { id } = req.params;

    const existingClass = await Class.findById(id);

    if (!existingClass) {
      const error = new Error("Class not found");
      error.statusCode = 404;
      throw error;
    }

    await Class.findOneAndDelete({_id: id});

    res.status(200).json({
      success: true,
      message: "Deleted class successfully",
    });
  } catch (error) {
    next(error);
  }
};
