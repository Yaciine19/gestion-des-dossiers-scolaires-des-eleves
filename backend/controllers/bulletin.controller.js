import Bulletin from "../models/bulletin.model.js";

export const updateBulletin = async (req, res, next) => {
  try {
    const {
      studentId,
      classId,
      termNumber,
      subjectId,
      examScore,
      continuousAssessment,
    } = req.body;

    let bulletin = await Bulletin.findOne({
      student: studentId,
      class: classId,
      termNumber,
    });

    if (!bulletin) {
      bulletin = new Bulletin({
        student: studentId,
        class: classId,
        termNumber,
        subjects: [],
      });
    }

    let subjectData = bulletin.subjects.find(
      (s) => s.subject.toString() === subjectId
    );

    if (!subjectData) {
      subjectData = {
        subject: subjectId,
        examScore: 0,
        continuousAssessment: 0,
        finalScore: 0,
      };
      bulletin.subjects.push(subjectData);
    }

    subjectData.examScore = examScore;
    subjectData.continuousAssessment = continuousAssessment;
    subjectData.finalScore = (examScore + continuousAssessment) / 2;

    await bulletin.save();

    res.json({ success: true, message: "Udpated grade of subject successfully" });
  } catch (error) {
    next(error);
  }
};

export const generateBulletins = async (req, res, next) => {
  try {
    const { termNumber } = req.body;

    const students = await Bulletin.find({ termNumber }).populate(
      "student class"
    );

    for (const bulletin of students) {
      const totalScore = bulletin.subjects.reduce(
        (sum, subject) => sum + subject.finalScore,
        0
      );
      bulletin.termAverage = totalScore / bulletin.subjects.length;
      await bulletin.save();
    }

    res.json({ success: true, message: "Bulletins Created successfully" });
  } catch (error) {
    next(error);
  }
};

export const getStudentBulletin = async (req, res) => {
  try {
    const { studentId, termNumber } = req.params;

    const bulletin = await Bulletin.findOne({
      student: studentId,
      termNumber,
    }).populate("student class subjects.subject");

    if (!bulletin) {
        const error = new Error('Bulletin not found')
        error.statusCode = 404;
        throw error;
    }

    res.json({ success: true, data: bulletin });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
