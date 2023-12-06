import mongoose, { ConnectOptions } from 'mongoose';

const MONGODB_URI = 'mongodb://127.0.0.1:27017/movie'; // Change this to your MongoDB URI

const dbOptions: ConnectOptions = {
  bufferCommands: true

};

function connectToDatabase(onSuccess: () => void, onError: (error: Error) => void): void {
  mongoose.connect(MONGODB_URI, dbOptions)
    .then(() => {
      console.log('Connected to the database');
      onSuccess();
    })
    .catch((error) => {
      console.error('Connection error:', error);
      onError(error);
    });
}

export default connectToDatabase;