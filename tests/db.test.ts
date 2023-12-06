import mongoose from 'mongoose';
import connectToDatabase from '../src/db';

jest.mock('mongoose'); // Mock the mongoose module

describe('Database Connection', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear mocks before each test
  });

  it('should connect to the database successfully', async () => {
    const onSuccess = jest.fn();
    const onError = jest.fn();

    // Mock the resolved value for mongoose.connect
    (mongoose.connect as jest.Mock).mockResolvedValueOnce('default');

    await connectToDatabase(onSuccess, onError);

    expect(mongoose.connect).toHaveBeenCalledWith(
      'mongodb://127.0.0.1:27017/movie',
      expect.objectContaining({
        bufferCommands: true,
      })
    );

    expect(onSuccess).toHaveBeenCalled();
    expect(onError).not.toHaveBeenCalled();
  });

  it('should handle connection error', async () => {
    const onSuccess = jest.fn();
    const onError = jest.fn();

    const error = new Error('Connection error');
    // Mock the rejected value for mongoose.connect
    (mongoose.connect as jest.Mock).mockRejectedValueOnce(error);

    await connectToDatabase(onSuccess, onError);

    expect(mongoose.connect).toHaveBeenCalledWith(
      'mongodb://127.0.0.1:27017/movie',
      expect.objectContaining({
        bufferCommands: true,
      })
    );

    expect(onSuccess).not.toHaveBeenCalled();
  });
});
