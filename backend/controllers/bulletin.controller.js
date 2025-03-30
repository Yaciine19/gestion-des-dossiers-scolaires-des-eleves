import Bulletin from "../models/bulletin.model.js";
import User from "../models/user.model.js";

export const updateBulletin = async (req, res, next) => {
  try {
    const {classId, subject} = req.user;
    const {studentId} = req.params;
    const {
      termNumber,
      testScore,
      continuousAssessment,
      examScore,
    } = req.body;

    const teacher = await User.findById(req.user.id);

    if (!teacher || teacher.role !== "Teacher") {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }

    // التحقق مما إذا كان المعلم يدرّس هذه المادة
    if (teacher.subject.toString() !== subject.toString()) {
      return res.status(403).json({
        success: false,
        message: "You can only update grades for your assigned subject",
      });
    }

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

    let subjectIndex = bulletin.subjects.findIndex(
      (s) => s.subject.toString() === subject.toString()
    );

    if (subjectIndex === -1) {
      // إضافة المادة إذا لم تكن موجودة
      bulletin.subjects.push({
        subject,
        testScore,
        continuousAssessment,
        examScore,
        finalScore: (testScore + continuousAssessment + examScore) / 3,
      });
    } else {
      // تحديث القيم إذا كانت المادة موجودة
      bulletin.subjects[subjectIndex].testScore = testScore;
      bulletin.subjects[subjectIndex].continuousAssessment = continuousAssessment;
      bulletin.subjects[subjectIndex].examScore = examScore;
      bulletin.subjects[subjectIndex].finalScore =
        (testScore + continuousAssessment + examScore) / 3;
    }

    await bulletin.save();

    res.json({ success: true, message: "Updated grade of subject successfully" });
  } catch (error) {
    next(error);
  }
};


export const calculateAnnualAverage = async (req, res, next) => {
  try {
    const { studentId } = req.params;

    const bulletins = await Bulletin.find({ student: studentId });

    if (bulletins.length !== 3) {
      return res.status(400).json({
        success: false,
        message: "Annual average can only be calculated after 3 terms.",
      });
    }

    const totalAverage = bulletins.reduce(
      (sum, bulletin) => sum + bulletin.termAverage,
      0
    );
    const annualAverage = totalAverage / 3;

    // تحديث معدل السنة الدراسية في الفصل الثالث فقط
    const finalBulletin = bulletins.find((b) => b.termNumber === 3);
    finalBulletin.annualAverage = annualAverage;
    await finalBulletin.save();

    res.json({ success: true, message: "Annual average calculated successfully", annualAverage });
  } catch (error) {
    next(error);
  }
};

// جلب سجل الدرجات لطالب معين
export const getStudentBulletin = async (req, res) => {
  try {
    const { studentId, termNumber } = req.params;

    const bulletin = await Bulletin.findOne({
      student: studentId,
      termNumber,
    }).populate("student class subjects.subject");

    if (!bulletin) {
      return res.status(404).json({ success: false, message: "Bulletin not found" });
    }

    res.json({ success: true, data: bulletin });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

//  المعلم يعرض السجل الأكاديمي للطلاب الذين يدرسهم
export const getStudentsAcademicHistory = async (req, res, next) => {
  try {
    const teacherId = req.user.id;

    const teacher = await User.findOne({_id: teacherId, role: "Teacher"});

    if (!teacher) {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }

    const students = await User.find({ classId: teacher.classId, role: "Student" });

    // جلب السجل الأكاديمي للطلاب
    const academicHistory = await Bulletin.find({
      student: { $in: students.map((s) => s._id) },
    })
      .populate("student", "firstName lastName")
      .populate("subjects.subject", "name");

    res.json({ success: true, data: academicHistory });
  } catch (error) {
    next(error);
  }
};

// الطالب يعرض سجله الأكاديمي الخاص
export const getStudentAcademicRecord = async (req, res, next) => {
  try {
    const studentId = req.user.id;

    const student = await User.findOne({_id: studentId, role: "Student"});

    if(!student) {
      return res.status(403).json({success: false, message: 'Unauthorized'})
    }

    const record = await Bulletin.find({ student: studentId })
      .populate("subjects.subject", "name")
      .populate("class", "name level");

    res.json({ success: true, data: record });
  } catch (error) {
    next(error);
  }
};
