import mongoose from 'mongoose';

const infoformSchema = new mongoose.Schema({
    stfname: { type: String, required: true },
    stmname: { type: String, required: true },
    stlname: { type: String, required: true },
    date: { type: Date, required: true },
    placeofbirth: {type: String, required: true},
    religion: { type: String, required: true },
    staddress: { type: String, required: true },
    stcontact: {type: Number, required: true},
    stclass: {type: Number, required: true},
    stdivision: {type: String, required: true},
    stsubject: {type: Object, required: true},
    fafname: { type: String, required: true },
    famname: { type: String, required: true },
    falname: { type: String, required: true },
    facompname: { type: String, required: true },
    facompaddress: { type: String, required: true },
    facontact: { type: Number, required: true },
    faemail: {type: String, unique: true, required: true},
    mofname: { type: String, required: true },
    momname: { type: String, required: true },
    molname: { type: String, required: true },
    mocompname: { type: String, required: true },
    mocompaddress: { type: String, required: true },
    mocontact: { type: Number, required: true },
    moemail: {type: String, unique: true, required: true}
});

const infoformModel = mongoose.model('Infoform', infoformSchema);

export default infoformModel;