const { body, validationResult } = require('express-validator'); // Validate isEmail, isPassword is in correct format
const express = require('express');                              // Import Express
const mongoose = require('mongoose');                            // Import Moongoes For database connectivity
const bcrypt = require('bcryptjs');                              // Encrypt the password 
const jwt = require('jsonwebtoken');                             // Generate the token for the browser
const fetchuser = require('./middleware/fetchuser')
const app = express();                                           // Import express methods
const port = 4000;                                               // Secure the port no. for backend
var cors = require('cors')


app.use(express.json());                                         // Give Support of JSON to get & post
app.use(cors());

//Create a Connection to MongoDB database 
mongoose.connect("mongodb+srv://dev:007007007@cluster0.fyb1off.mongodb.net/");

// Schema for creating user model
const Users = mongoose.model('Users', {
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true
  },
  password: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now
  }
});

// Schema for creating notes model
const Notes = mongoose.model('Notes', {
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  tag: {
    type: String,
    default: "General"
  },
  date: {
    type: Date,
    default: Date.now
  }
})

// Route 1 : Create an endpoint at ip:4000/ for checking connection to backend
app.get('/', (req, res) => {
  res.send('api working')

})

// Route 2 : Create an endpoint at ip:4000/auth for regestring the user in data base & sending token
app.post('/signup',
  body('email').isEmail(),                                    // checks email is valid or not
  body('name').isLength({ min: 2 }),                          // check the length of name is more than 2 char or not
  body('password').isLength({ min: 8 }),                      // check the length of password is min8 char or not
  async (req, res) => {
    const errors = validationResult(req);
    let success =false;
    if (!errors.isEmpty()) {
      return res.status(400).json({success:success, errors: "Enter Valid email/password" });
    }
    let check = await Users.findOne({ email: req.body.email });
    if (check) {
      return res.status(400).json({ success:success,errors: "existing user found with this email" });
    }
    const salt = bcrypt.genSaltSync(10);
    const hash = await bcrypt.hashSync(req.body.password, salt);
    const user = new Users({
      name: req.body.name,
      email: req.body.email,
      password: hash
    });
    user.save().then(() => console.log("User Saved"));
    const data = {
      user: {
        id: user.id
      }
    }
    const token = jwt.sign(data, 'secret_dev');
    success =true;
    res.json({success, token })
  })

// Route 3 : Create an endpoint at ip:4000/login for login the user and giving token
app.post('/login', body('email').isEmail(), body('password').isLength({ min: 8 }), async (req, res) => {
  const errors = validationResult(req);
  let success = false;
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: "enter valid email/password" });
  }
  let user = await Users.findOne({ email: req.body.email });
  if (user) {
    const passCompare = await bcrypt.compare(req.body.password, user.password);
    if (passCompare) {
      const data = {
        user: {
          id: user.id
        }
      }
      success = true;
      const token = jwt.sign(data, 'secret_dev');
      res.json({ success, token });
    }
    else {
      return res.status(400).json({ success: success, errors: "please try with correct email/password" })
    }
  }
  else {
    return res.status(400).json({ success: success, errors: "please try with correct email/password" })
  }

})

// Route 4 : Create an endpoint at ip:4000/notes for saving the notes in database
app.post('/getuser', fetchuser, async (req, res) => {
  try {
    const userid = req.user.id;
    const user = await Users.findById(userid).select("-password");
    res.send(user);
  } catch (error) {

  }

})

// Route 5 : Create an endpoint at ip:4000/addnotes for saving the notes in database
app.post('/addnote', fetchuser, body('title', 'Enter a valid title').isLength({ min: 1 }), body('description', 'Enter a bigger description').isLength({ min: 2 }), async (req, res) => {

  //Check For Validation Error
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { title, description, tag } = req.body;
  const note = new Notes({
    user: req.user.id,
    title,
    description,
    tag
  });
  note.save().then(() => res.json({ "Success": "note saved" }));
})

// Route 6 : Create an endpoint at ip:4000/updatenote for updating the notes in database
app.put('/updatenote/:id', fetchuser, async (req, res) => {

  const { title, description, tag } = req.body;
  const newNote = {};
  if (title) { newNote.title = title };
  if (description) { newNote.description = description };
  if (tag) { newNote.tag = tag };

  // Find note to be update
  let note = await Notes.findById(req.params.id);
  if (!note) { res.status(404).send("not found"); }
  if (note.user.toString() !== req.user.id) { res.status(404).send("not allowed"); }

  note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
  res.json({ "Success": "note updated" });
})


// Route 7 : Create an endpoint at ip:4000/deletenote for deleting the notes in database
app.delete('/deletenote/:id', fetchuser, async (req, res) => {

  // Find note to be deleted
  let note = await Notes.findById(req.params.id);
  if (!note) { res.status(404).send("not found"); }

  // Verify the user is same or not
  if (note.user.toString() !== req.user.id) { res.status(404).send("not allowed"); }

  note = await Notes.findByIdAndDelete(req.params.id);
  res.json({ "Success": "note deleted" })
})


// Route 8 : Create an endpoint at ip:4000/fetchallnotes for getting user notes from database
app.get('/fetchallnotes', fetchuser, async (req, res) => {
  const notes = await Notes.find({ user: req.user.id });
  res.json(notes)
})

// Print the current active port on console
app.listen(port, () => {
  console.log(`Note-Taker listening on port ${port}`)
})