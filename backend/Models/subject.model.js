import mongoose from "mongoose";

const subjectSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    teachers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    classes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Class',
    }]
}, {timestamps: true});

const Subject = mongoose.models.Subject || mongoose.model('Subject', subjectSchema);

export default Subject;