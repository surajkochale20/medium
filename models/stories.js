/**
 *  title - Title of story.
 *  image - iamge of Story
 *  description - description for Story
 *  content - content for story.
 *  author - creator of story.
 *  followers - List of follower id.
 *  tags - tags associated with story.
 *  topics - topics associated with story .
 *  isPublic - story is public or not
 */
const mongoose = require('mongoose')
const storySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  images: {
    type: String
  },
  description: {
    type: String
  },
  content:{
    type: String
  },
  author: {
    type: String,
    required: true
  },
  likes: {
    type: Number,
  },
  isPublic:{
    type:Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  tags: {
    type: Array,
  },
  publicationId: {
    type: String,
  },
  topics: {
    type: Array
  },
});


module.exports = mongoose.model('stories', storySchema)