const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 *  name - name of publication.
 *  description - description for publicaion
 *  tagline - tagline for publication.
 *  editor - Editor id or creator id.
 *  followers - List of follower id.
 *  category - Categories list.
 *  writer - writer list .
 *  image - iamge of publication
 */
const PublicationSchema = new Schema({
  
  name: {
    type: String,
    required: true,
    unique:true
  },
  tagline: {
    type: String
  },
  description: {
    type: String
  },
  editor: {
    type: String,
    required: true
  },
  followers: {
    type: Array,
  },
  category: {
    type: Array,
  },
  tags: {
    type: Array,
  },
  writer: {
      type: Array
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  image: {
    type: String
  }
});

const Publication = mongoose.model('publication', PublicationSchema);

module.exports = Publication;
