import express from 'express';
import User from '../models/userModel'
const router = express.Router();
import { getToken } from '../util';
router.post("/signin", async (req, res) => {
    
    const signinUser = await User.findOne({
        email: req.body.email,
        password: req.body.password
    });

    if (signinUser) {
        res.send({
            _id: signinUser.id,
            name: signinUser.name,
            email: signinUser.email,
            isAdmin: signinUser.isAdmin,
            token: getToken(signinUser)

        });
    }
    else {
        res.status(401).send({ message: 'Invalid Email or Password.' });
    }
});

router.post('/register', async (req, res) => {
    const user = new User({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: req.body.password,
    });
    const newUser = await user.save();
    if (newUser) {
      res.send({
        _id: newUser.id,
        firstname: newUser.firstname,
        lastname: newUser.lastname,
        email: newUser.email,
        isAdmin: newUser.isAdmin,
        token: getToken(newUser),
      });
    } else {
      res.status(401).send({ message: 'Invalid User Data.' });
    }
  });

router.get("/createadmin", async (req, res) => {
    try {
        const user = new User({
            firstname: 'Manak',
            lastname: 'Agarwal',
            email: 'mnkgrwl9@gmail.com',
            password: '1234',
            isAdmin: true
        });
        const newUser = await user.save();
        res.send(user);    
    }
    catch (error) {
        res.send({ msg: error.message });
    }
    
    
})

export default router;