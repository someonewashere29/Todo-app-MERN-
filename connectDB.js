const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://Marsel:Marselhere@cluster0.ne5qa.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: true
        })
        console.log('Mongo is connected');
    } catch(err) {
        console.error(err)
        process.exit(1)
    }
}

module.exports = connectDB;