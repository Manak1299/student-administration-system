import mongoose from 'mongoose';

const subjectSchema = new mongoose.Schema({
  subjectname: { type: String, required: true, unique: true },
});

const subjectModel = mongoose.model('Subject', subjectSchema);

export default subjectModel;