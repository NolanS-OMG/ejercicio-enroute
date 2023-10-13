import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect( "mongodb://0.0.0.0:27017/resistances" );
    console.log( 'DB is connected' );
  } catch (error) {
    console.log( 'db.js ->', error );
  }
  
}