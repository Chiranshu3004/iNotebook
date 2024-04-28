const express = require('express');
const User = require("../models/User")
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator')


const JWT_SECRET = 'MyselfChiranshu';


// ROUTE 1: Create a User using: POST "/api/auth/createuser". No login required
router.post('/createuser', [

    // yeh hmne condition laga di ki name ki length min 3 honi chahiye email id valid honi chahiye password ki bhi length 5 min honi chahiye
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
],async (req, res) => {
    // let obj = {
    //     a : 'correct',
    //     number: 21
    // }

    //res.json ke andar obj daalne se ek json object bnega or obj k andar jo hai vo pura essai ki essai aa jayega
    // res.json(obj)

    // console.log(req.body);
    // const user= User(req.body);
    // // user.save() mongodb mei data store karane k liye karte hai
    // user.save();
    // res.send(req.body);


    let success = false;

    //isse hm error check kar sakte hai ki data mei error hai ya nhi
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }


    try{
      //check whether the user with this email exist already
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({ success, error: "Sorry a user with this email already exists" })
      }

      // salt isliye use karte hai jab hm database mei data store karte hai vo hash function kform mei store hota hai nut kuch common password hote hai jo ki hecker spata laga leta hash function se isliye hm salt ka use karte hai yeh hash function k kuch bhi genrate kar dega jiise password koi bhi hecker nhi chura sakta database se
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      user = await User.create({
          name: req.body.name,
          email: req.body.email,
          password: secPass
        })
        
      //   .then(user => res.json(user))
      //     // catch laagne se jo baar baar crash ho rahi thi site vo nhi hogi ... Yadi koi error aayegi to error show kardega site crashed karne ki jagah mtlb hme baar baar nodemon index.js nhi chalana padega
      //   .catch((err)=>{
      //     console.log(err)
      //     res.json({error: 'Please enter a unique value for email', message: err.message})
      // })

      // jwt token ka use hm isliye krte hai jab client ek baar sign in karne k baad dubara sign in karta hai to hm check karte hai ki usne data sahi daala hai ya nhi

      // yaha hmne id se isliye token generate karwa rahe hai kyuki id se hi sabse jayda feasible hai to check ki koi bhi user ek id se sign in kar sakta hai
      const data = {
        user: {
          id: user.id
        }
      }

      // jwt.sign se yeh hoga ki ek token generate hoga or fir vo token ko client ko send karega 
      const jwtdata = jwt.sign(data, JWT_SECRET);
      // console.log(jwtdata);

      // res.json(user)
      success= true;

      // isse response mei pura data nhi dega usse bs ek authtoken dega 
      res.json({success, jwtdata});
    }catch(error)
    {
      console.log(error.message);
      res.status(500).send("Internal Server Error")
    }

});


// ROUTE 2: Authenticate a User using: POST "/api/auth/login". No login required
router.post('/login', [
  // isEmail isliye use kiya to check vo email hai ya nhi mtlb kuch bhi no bagera nhi daal sakte
  body('email', 'Enter a valid email').isEmail(),
  //exist ka use isliye kiya hai for check that ki password is not empty
  body('password', 'Password cannot be blank').exists(),
], async (req, res) => {


  let success = false;

  // If there are errors, return Bad request and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // yaha pr hmne body se email password uthaye or check kiye ki vo exist karte hai ya nhi
  const { email, password } = req.body;
  try {
    // yaha pr hm check krte hai ki user exist hai ya nhi by email
    let user = await User.findOne({ email });
    if (!user) {
      success = false
      return res.status(400).json({success, error: "Please try to login with correct credentials" });
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      success = false
      return res.status(400).json({ success, error: "Please try to login with correct credentials" });
    }

    const data = {
      user: {
        id: user.id
      }
    }
    const authtoken = jwt.sign(data, JWT_SECRET);
    success = true;
    res.json({ success, authtoken })

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }

});

// ROUTE 3: Get loggedin User Details using: POST "/api/auth/getuser". Login required
router.post('/getuser', fetchuser,  async (req, res) => {

  // password k alawa hme user in details chahiye toh hmne yeh router use kiya
  try {
    // hm token se details nikal rahe hai or yeh hme pata hai ki token k pass id hai kyuki hmne (route2)data mei id hi di thi 
    const userId = req.user.id;

    //-password ka matlab hai ki password k alawa saari details bhej do
    const user = await User.findById(userId).select("-password")
    res.send(user)
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
})
module.exports = router