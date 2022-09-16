import mongoose from 'mongoose';
import { text } from 'express';

const divisionSchema = new mongoose.Schema({
  divname: {type: String, required: true, uppercase: true},  
  classno: { type: Number, required: true },
  divdesc: {type: String, required: true},
});

const divisionModel = mongoose.model('Division', divisionSchema);

export default divisionModel;