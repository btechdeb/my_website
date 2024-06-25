const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

const createUser = async (username, password, role) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = new User({
    username,
    password: hashedPassword,
    role
  });

  await user.save();
  console.log(`${role} created: ${username}`);
};

const createUsers = async () => {
  await createUser('admin', 'adminPassword123', 'admin');
  await createUser('user', 'userPassword123', 'user');
  mongoose.disconnect();
};

createUsers();
