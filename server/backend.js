const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const cors = require('cors')
const app = express();
app.use(cors())
app.use(express.json());

const adminSchema = new mongoose.Schema({
    username: String,
    password: String
  });

  const courseSchema = new mongoose.Schema({
    title: String,
    description: String,
    image: String,
  });
  
  const userSchema = new mongoose.Schema({
    username: {type: String},
    password: String,
  });

  const ADMINS = mongoose.model('Admin', adminSchema);
  const COURSES = mongoose.model('Course', courseSchema);
  const USERS = mongoose.model('User', userSchema);

console.log(ADMINS);

const SECRET = process.env.SECRETKEY;

const authenticateJwt = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true, dbName: "demoC" });

app.get('/admin/me',authenticateJwt,(req,res)=>{
   res.json({
    username: req.user.username
   })
})
app.get('/admin/id',authenticateJwt,(req,res)=>{
  res.json({ courses: COURSES });
})
// Admin routes
app.post('/admin/signup', async(req, res) => {
  const { username, password } = req.body;
  const admin = await ADMINS.findOne({username});
  console.log("admin signup");
  if (admin) {
    res.status(403).json({ message: 'Admin already exists' });
  } else {
    const obj = { username: username, password: password };
      const newAdmin = new ADMINS(obj);
      await  newAdmin.save();
      const token = jwt.sign({ username, role: 'admin' }, SECRET, { expiresIn: '1h' });
      res.json({ message: 'Admin created successfully', token });
  }
});
app.delete('/admin/delete', authenticateJwt,async (req,res) =>{
  const course = await COURSES.findByIdAndDelete(req.body.id);
  if(course){
    console.log(course);
  }
  else{
    console.log("sorry");
  }
  res.json({ message: 'Course updated successfully' });
});
console.log(ADMINS);
console.log(COURSES.length)

app.post('/admin/login', async(req, res) => {
    console.log(ADMINS);
    const { username, password } = req.body;
    const admin = await ADMINS.findOne({ username,password });
    console.log(admin);
    if (admin) {
      const token = jwt.sign({ username, role: 'admin' }, SECRET, { expiresIn: '1h' });
      res.json({ ADMINS, token });
    } else {
      res.status(403).json(admin);
    }
  }
);
app.post('/admin/courses', authenticateJwt, async (req, res) => {
  const course = new COURSES(req.body);
  await course.save();
  res.json({ message: 'Course created successfully', courseId: course.id });
});

app.put('/admin/courses', authenticateJwt, async (req, res) => {
  const course = await COURSES.findByIdAndUpdate(req.body.id,req.body,{ new: true });
  if (course) {
    res.json({ message: 'Course updated successfully' });
  } else {
    res.status(404).json({ message: 'Course not found' });
  }
});

app.get('/admin/courses', authenticateJwt, async (req, res) => {
  const courses = await COURSES.find({});
  res.json({ courses });
});

// User routes
app.post('/users/signup', async(req, res) => {
  const { username, password } = req.body;
  const user = USERS.find(u => u.username === username);
  if (user) {
    res.status(403).json({ message: 'User already exists' });
  } else {
    const newUser = { username, password };
    USERS.push(newUser);
    fs.writeFileSync('users.json', JSON.stringify(USERS));
    const token = jwt.sign({ username, role: 'user' }, SECRET, { expiresIn: '1h' });
    res.json({ message: 'User created successfully', token });
  }
});

app.post('/users/login', (req, res) => {
  const { username, password } = req.headers;
  const user = USERS.find(u => u.username === username && u.password === password);
  if (user) {
    const token = jwt.sign({ username, role: 'user' }, SECRET, { expiresIn: '1h' });
    res.json({ message: 'Logged in successfully', token });
  } else {
    res.status(403).json({ message: 'Invalid username or password' });
  }
});

app.get('/users/courses', authenticateJwt, (req, res) => {
  res.json({ courses: COURSES });
});

app.post('/users/courses/:courseId', authenticateJwt, (req, res) => {
  const course = COURSES.find(c => c.id === parseInt(req.params.courseId));
  if (course) {
    const user = USERS.find(u => u.username === req.user.username);
    if (user) {
      if (!user.purchasedCourses) {
        user.purchasedCourses = [];
      }
      user.purchasedCourses.push(course);
      fs.writeFileSync('users.json', JSON.stringify(USERS));
      res.json({ message: 'Course purchased successfully' });
    } else {
      res.status(403).json({ message: 'User not found' });
    }
  } else {
    res.status(404).json({ message: 'Course not found' });
  }
});

app.get('/users/purchasedCourses', authenticateJwt, (req, res) => {
  const user = USERS.find(u => u.username === req.user.username);
  if (user) {
    res.json({ purchasedCourses: user.purchasedCourses || [] });
  } else {
    res.status(403).json({ message: 'User not found' });
  }
});

app.listen(3002, () => console.log('Server running on port 3000'));
