import mongoose, { Schema, Document } from 'mongoose';

export interface ILobby extends Document {
  title: string;
  genre: string;
  rating: number;
  streamingLink: string;
}

const LobbySchema: Schema = new Schema({
  title: { type: String, required: true },
  genre: { type: String, required: true },
  rating: { type: Number, required: true },
  streamingLink: { type: String, required: true },
});

const LobbyModel = mongoose.model<ILobby>('Lobby', LobbySchema);

export default LobbyModel;
