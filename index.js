const express = require('express');
const connectDB = require('./connectDB');
const cors = require('cors')
const PORT = 5000;
const app = express();

connectDB()

app.use(cors())
app.use(express.json({extended: true}))

app.use('/api/auth', require('./routes/auth.route'));
app.use('/api/todo', require('./routes/todo.route'));

app.listen(PORT, () => console.log(`Server has been started on ${PORT}`))
