/**
 *  firstname - first naem of user.
 *  lastname - Last name of user
 *  password - 
 *  following - List of userid.
 *  profilePicture - Profile picture o
 *  email - email/userid  .
 */

const mongoose = require('mongoose');
//const uniqueValidator = require('mongoose-unique-validator')
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    validate: {
      validator: async function (email) {
        const user = await this.constructor.findOne({
          email
        });
        if (user) {
          if (this.id === user.id) {
            return true;
          }
          return false;
        }
        return true;
      },
      message: props => 'The specified email address is already in use.'
    },
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    select:false
  },
  following: {
    type: Array,
  },
  applyForPromotions: {
    type: Boolean,
    default: false
  },
  profilePicture: {
    type: String
  },
  aboutme: {
    type: String
  }
 });

UserSchema.pre('save', async function(next) {
  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

UserSchema.methods.correctPassword = async function( password, userPassword ) {
  return await bcrypt.compare(password, userPassword);
};


const User = mongoose.model('user', UserSchema);

module.exports = User;