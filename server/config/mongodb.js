import mongoose from "mongoose";

const connectDB = async () => {

    mongoose.connect(`${process.env.MONGO_URL}/clarify-auth`)
        .then(() => console.log('Database Connected'))
        .catch((err) => console.log('Error in connecting database', err))
}

export default connectDB;