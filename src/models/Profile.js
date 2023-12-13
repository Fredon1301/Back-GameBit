const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  profileImage: {
    data: Buffer,
    contentType: String,
  },
});

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;
