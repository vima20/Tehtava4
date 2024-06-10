const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog',
    },
  ],
}, { timestamps: true });

userSchema.pre('save', async function (next) {
  if (this.isNew) {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

userSchema.virtual('posts', {
  ref: 'Blog',
  localField: '_id',
  foreignField: 'author',
  justOne: false,
});

module.exports = mongoose.model('User', userSchema);
