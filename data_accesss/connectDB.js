const mongoose = require('mongoose');
const uri = process.env.DB_URI;
mongoose
    .connect(
        uri,
        { useNewUrlParser: true}
    )
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));