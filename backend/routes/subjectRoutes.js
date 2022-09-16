import express from 'express';
import Subject from '../models/subjectModel'
const router = express.Router();
import { getToken, isAdmin, isAuth } from '../util';

router.put('/:id', isAuth, isAdmin, async (req, res) => {
  const subjectId = req.params.id;
  const subjectdet = await Subject.findById(subjectId);
  if (subjectdet) {
    subjectdet.subjectname = req.body.subjectname;
    const updatedSubject = await subjectdet.save();
    if (updatedSubject) {
      return res
        .status(200)
        .send({ message: 'Subject Updated', data: updatedSubject });
    }
  }
  return res.status(500).send({ message: ' Error in Updating Class.' });
});



router.post('/',isAuth, isAdmin, async (req, res) => {
    const subjectdet = new Subject({
      subjectname: req.body.subjectname,
      
    });
    const newSubject = await subjectdet.save();
    if (newSubject) {
      res.send({
        _id: newSubject.id,
        subjectname: newSubject.subjectname,
        token: getToken(newSubject),
      });
    } else {
      res.status(401).send({ message: 'Invalid  Data.' });
    }
});
  
var mysort = { subjectname: 1 };
router.get('/', async (req, res) => {
  console.log("looking for records :::: ");
  const subjectdet = await Subject.find().sort(mysort);
  console.log(subjectdet)

  if (subjectdet) {
    res.send(subjectdet);
  } else {
    res.status(404).send({ message: ' Not Found.' });
  }
});

router.delete('/:id', isAuth, isAdmin, async (req, res) => {
  const deletedSubject = await Subject.findById(req.params.id);
  if (deletedSubject) {
    await deletedSubject.remove();
    res.send({ message: 'Subject Deleted' });
  } else {
    res.send('Error in Deletion.');
  }
});

  
export default router;