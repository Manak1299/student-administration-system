import express from 'express';
import Class from '../models/classModel'
const router = express.Router();
import { getToken, isAdmin, isAuth } from '../util';

router.put('/:id', isAuth, isAdmin, async (req, res) => {
  const classId = req.params.id;
  const classdet = await Class.findById(classId);
  if (classdet) {
    classdet.classno = req.body.classno;
    classdet.division = req.body.division;
    const updatedClass = await classdet.save();
    if (updatedClass) {
      return res
        .status(200)
        .send({ message: 'Class Updated', data: updatedClass });
    }
  }
  return res.status(500).send({ message: ' Error in Updating Class.' });
});



router.post('/',isAuth, isAdmin, async (req, res) => {
    const classdet = new Class({
      classno: req.body.classno,
      division: req.body.division,
      
    });
    const newClass = await classdet.save();
    if (newClass) {
      res.send({
        _id: newClass.id,
        classno: newClass.classno,
        division: newClass.division,
        token: getToken(newClass),
      });
    } else {
      res.status(401).send({ message: 'Invalid  Data.' });
    }
});
  
var mysort = { classno: 1 };
router.get('/', async (req, res) => {
  console.log("looking for records :::: ");
  const classdet = await Class.find().sort(mysort);
  console.log(classdet)

  if (classdet) {
    res.send(classdet);
  } else {
    res.status(404).send({ message: ' Not Found.' });
  }
});

router.delete('/:id', isAuth, isAdmin, async (req, res) => {
  const deletedClass = await Class.findById(req.params.id);
  if (deletedClass) {
    await deletedClass.remove();
    res.send({ message: 'Class Deleted' });
  } else {
    res.send('Error in Deletion.');
  }
});

  
export default router;