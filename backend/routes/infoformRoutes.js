import express from 'express';
import Infoform from '../models/infoformModel'
const router = express.Router();
import { getToken, isAdmin, isAuth } from '../util';

router.post('/',isAuth, isAdmin, async (req, res) => {
    const infoformdet = new Infoform({
    stfname: req.body.stfname,
    stmname: req.body.stmname,
    stlname: req.body.stlname,
    date: req.body.date,
    placeofbirth : req.body.placeofbirth,
    religion: req.body.religion,
    staddress: req.body.staddress, 
    stcontact: req.body.stcontact,
    stclass: req.body.stclass,
    stdivision: req.body.stdivision,
    stsubject: req.body.stsubject,
    fafname: req.body.fafname,
    famname: req.body.famname,
    falname: req.body.falname,
    facompname: req.body.facompname,
    facompaddress: req.body.facompaddress,
    facontact: req.body.facontact, 
    faemail: req.body.faemail,
    mofname: req.body.mofname,
    momname: req.body.momname,
    molname: req.body.molname,
    mocompname: req.body.mocompname,
    mocompaddress: req.body.mocompaddress,
    mocontact: req.body.mocontact, 
    moemail: req.body.moemail,
    });
    const newEntry = await infoformdet.save();
    if (newEntry) {
      res.send({
        _id: newEntry.id,
        stfname: newEntry.stfname,
        stmname: newEntry.stmname,
        stlname: newEntry.stlname,
        date: newEntry.date,
        placeofbirth : newEntry.placeofbirth,
        religion: newEntry.religion,
        staddress: newEntry.staddress, 
        stcontact: newEntry.stcontact,
        stclass: newEntry.stclass,
        stdivision: newEntry.stdivision,
        stsubject: newEntry.stsubject,
        fafname: newEntry.fafname,
        famname: newEntry.famname,
        falname: newEntry.falname,
        facompname: newEntry.facompname,
        facompaddress: newEntry.facompaddress,
        facontact: newEntry.facontact, 
        faemail: newEntry.faemail,
        mofname: newEntry.mofname,
        momname: newEntry.momname,
        molname: newEntry.molname,
        mocompname: newEntry.mocompname,
        mocompaddress: newEntry.mocompaddress,
        mocontact: newEntry.mocontact, 
        moemail: newEntry.moemail,
        token: getToken(newEntry),
      });
    } else {
      res.status(401).send({ message: 'Invalid  Data.' });
    }
});
    
router.get('/', async (req, res) => {
  console.log("looking for records :::: ");
  const studentdet = await Infoform.find();
  console.log(studentdet)

  if (studentdet) {
    res.send(studentdet);
  } else {
    res.status(404).send({ message: ' Not Found.' });
  }
});

router.delete('/:id', isAuth, isAdmin, async (req, res) => {
  const deletedinfo = await Infoform.findById(req.params.id);
  if (deletedinfo) {
    await deletedinfo.remove();
    res.send({ message: 'Class Deleted' });
  } else {
    res.send('Error in Deletion.');
  }
});


export default router;