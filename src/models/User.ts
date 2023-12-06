import mongoose, { Document, Schema } from 'mongoose';
export interface IUser extends Document {
  password: string;
  role: string;
  firstName: string;
  lastName: string;
  email: string; // Should be unique
}
const UserSchema = new Schema<IUser>({
  password: { type: String, required: true },
  role: { type: String},
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true }
});
const UserModel = mongoose.model<IUser>('User', UserSchema);
export default UserModel;