import mongoose from 'mongoose';

const classSchema = new mongoose.Schema({
  classno: { type: Number, required: true, unique: true },
  division: {type: String, required: false},
});

const classModel = mongoose.model('Class', classSchema);

export default classModel;