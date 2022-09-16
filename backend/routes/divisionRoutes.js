import express from 'express';
import Division from '../models/divisionModel';
const router = express.Router();

import { getToken, isAdmin, isAuth } from '../util';

router.put('/:id', isAuth, isAdmin, async (req, res) => {
  const divisionId = req.params.id;
  const divisiondet = await Division.findById(divisionId);
    if (divisiondet) {
        divisiondet.divname = req.body.divname;
        divisiondet.classno = req.body.classno;
        divisiondet.divdesc = req.body.divdesc;
    const updatedDivision = await divisiondet.save();
    if (updatedDivision) {
      return res
        .status(200)
        .send({ message: 'Division Updated', data: updatedDivision });
    }
  }
  return res.status(500).send({ message: ' Error in Updating Division.' });
});

router.post('/',isAuth, isAdmin, async (req, res) => {
    const divisiondet = new Division({
        divname: req.body.divname,
      classno: req.body.classno,
      divdesc: req.body.divdesc,
      
    });
    const newDivision = await divisiondet.save();
    if (newDivision) {
      res.send({
          _id: newDivision.id,
          divname: newDivision.divname,
        classno: newDivision.classno,
        divdesc: newDivision.divdesc,
        token: getToken(newDivision),
      });
    } else {
      res.status(401).send({ message: 'Invalid  Data.' });
    }
});
  

var mysort = { divname: 1 };

router.get('/', async (req, res) => {
  console.log("looking for records :::: ");
  const divisiondet = await Division.find().sort(mysort);
  console.log(divisiondet)

  if (divisiondet) {
    res.send(divisiondet);
  } else {
    res.status(404).send({ message: ' Not Found.' });
  }
});

router.delete('/:id', isAuth, isAdmin, async (req, res) => {
  const deletedDivision = await Division.findById(req.params.id);
  if (deletedDivision) {
    await deletedDivision.remove();
    res.send({ message: 'Divison Deleted' });
  } else {
    res.send('Error in Deletion.');
  }
});

  
export default router;