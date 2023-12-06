import app from './src/app';
import connectToDatabase from './src/db';
const PORT = process.env.PORT || 4000;




connectToDatabase(
  () => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  },
  (error) => {
    console.error('Application failed to start:', error);
  }
);
