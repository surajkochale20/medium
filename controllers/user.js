const User = require('../models/user');
const mongoose = require('mongoose');

const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const multer = require('multer');
const crypto = require('crypto');
const path = require('path');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config({ path:'./config/config.env'});
const Story = require('../models/stories');
const Publication = require('../models/publication');


let gfs;

let connection = mongoose.connection;
connection.on('error', console.error.bind(console, 'connection error:'));

connection.once('open', function () {
  console.log("Connected!")
  var mongoDriver = mongoose.mongo;
  gfs = new Grid(connection.db, mongoDriver);
  gfs.collection('uploads');
});
// Create storage engine
console.log(process.env.MOGNODB_URI);
const storage = new GridFsStorage({
  url: process.env.MOGNODB_URI,//'mongodb://localhost:27017/assignment',
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'uploads'
        };
        resolve(fileInfo);
      });
    });
  }
});

const upload = multer({
  storage
});

// @route POST /upload
// @desc  Uploads file to DB

uploadSinglefile = upload.single('file')

uploadFile = async (req, res, next) =>{
  const type = req.body.type;
  // res.json({ file: req.file });
  try {
    const user = await User.findById({_id: req.user._id });
    if(!user){
      res.status(401).send("User not exixts.");
      return;
    }

    if(type == 'profile'){
      await User.findByIdAndUpdate({ _id: req.user._id }, { profilePicture: req.file.filename });
      const user = await User.findById({_id: req.user._id });
      res.send({ sucess: true, image:req.file.filename, message: 'User image uploaded successfully'})
    } else if (type == 'story') {
      const story = await Story.findById({_id: req.body.id });

      if(story && story.author == req.user._id){
        await Story.updateOne({ _id: req.body.id }, { images: req.file.filename });
        res.send({ sucess: true,image:req.file.filename, message: 'Story image uploaded successfully'})
      } else {
        res.status(401).send({ sucess: false, image:req.file.filename, message: "User not authorized."});
      }
    } else if (type == 'publication') {
      const publication = await Publication.findById({_id: req.body.id });

      if(publication && publication.editor == req.user._id){
        await Publication.updateOne({ _id: req.body.id }, { image: req.file.filename });
        res.send({ sucess: true, image:req.file.filename,message: 'Publication image uploaded successfully'})
      } else {
        res.status(401).send({ sucess: false, data: "User not authorized."});
      }
    }

  } catch (e) {
    console.log(error);
    res.send(error)
  }

};


displayimage = (req, res) => {
  gfs.files.findOne({
    filename: req.params.filename
  }, (err, file) => {
    // Check if file
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: 'Image not found'
      });
    }

    // Check if image
    if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
      // Read output to browser
      //let type = 
      res.set('Content-Type', file.contentType);
      const readstream = gfs.createReadStream(file.filename);
      readstream.pipe(res);
    } else {
      res.status(404).json({
        err: 'Not an image'
      });
    }
  });
};

// @route DELETE /files /: id
// @desc  Delete file
deleteFile = (req, res) => {
  gfs.remove({
    filename: req.params.filename,
    root: 'uploads'
  }, (err, gridStore) => {
    if (err) {
      return res.status(404).json({
        err: err
      });
    }

    res.status(200).send({ sucess: true, message: "image deleted."})
  });
};


register = async (req, res, next) => {
  const data = req.body;
  try {
    const user = await User.create(data);
    if (user) {
      //user => res.send(user)
      createSendToken(user, 200, res);
    }
    else {
      next();
    }
    //res.send(user);
  } catch (err) {
    next(err);
  }
};

update = async (req, res, next) => {
  const userProps = req.body;

  if(!userProps) {
    res.status(400).send("User data is empty.");
    return;
  }

  try {
    const user = await User.updateMany({_id: req.user._id }, userProps)
    res.status(200).send({ sucess: true, message: "User data updated successfully"})
  } catch (err) {
    next(err);
  }
};

login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email }).select('+password')
    if (!user || !(await user.correctPassword(password, user.password))) {

      res.status(401).send({
        sucess: false,
        message: "Incorrect email or password."
      })
    }
    else {
      createSendToken(user, 200, res);
    }

  } catch (err) {
    next(err);
  }
};
remove = async (req, res, next) => {
  const userId = req.user._id;
  try {
    const user = await User.findByIdAndRemove({
      _id: userId
    })
    res.status(200).send({sucess: true, message: "Your deleted successfully."});
  } catch (e) {
    next(e);
  }
};

followUser = async (req, res, next) => {
  const { followUser } = req.body;
  try {
    const user = await User.findOne({ _id: followUser.id });

    if(!user) {
      res.status(200).send({ sucess:false, message: `User does not exist`});  
      return;
    }
    await User.updateOne({_id: req.user._id }, { $push: { following: followUser.id }})
    res.status(200).send({ sucess: true, message :`You are following ${user.firstName} ${user.lastName}`});
  } catch (e) {
    next(e);
  }
};

unfollowUser = async (req, res, next) => {
  const { unfollowUser } = req.body;
  try {
    const user = await User.findOne({ _id: unfollowUser.id });

    if(!user) {
      res.status(200).send({ sucess:false, message: `Specified user does not exist`});  
      return;
    }
    await User.updateOne({ _id: req.user._id }, { $pull: { following: unfollowUser.id } });
    res.status(200).send({sucess:true, message: `You are no longer following ${user.firstName} ${user.lastName}`});
  } catch (e) {
    next(e);
  }
};

following = async (req, res, next) => {
  //const userId = req.user._id;

  try {
    //const user = await User.findOne({ _id: userId });
    const userList = await User.find({_id: { $in: req.user.following } });
    res.status(200).send({ sucess:true, user: userList});
  } catch (e) {
    next(e);
  }
};

const signToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
 
  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user
    }
  });
};

module.exports = {
  register,
  login,
  update,
  remove,
  followUser,
  unfollowUser,
  following,
  uploadSinglefile,
  uploadFile,
  displayimage,
  deleteFile
};