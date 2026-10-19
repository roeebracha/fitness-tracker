const mongoose = require('mongoose');

exports.connectDB = async () => {
    try{
   const connection =await  mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}.mongodb.net/${process.env.DB_NAME}`)
    console.log(`mongoDB connected successfully: ${connection.connection.host}`)
    console.log(`mongoDB connected successfully: ${connection.connection.name}`)
    console.log(`mongoDB connected successfully: ${connection.connection.port}`)
    } catch(error){
        console.error("failed to connect to mongoDB");
        console.error(error_message);

        process.exit(1);
    }
}

