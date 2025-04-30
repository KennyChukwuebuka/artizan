const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/users');
const messageRoutes = require('./routes/messages');
const app = express();

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/artisanConnect', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'));

app.use('/api/users', userRoutes);
app.use('/api/messages', messageRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
