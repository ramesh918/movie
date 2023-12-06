import { Request, Response } from 'express';
import LobbyModel from '../models/Lobby'; // Import your lobby model

const LobbyController = {
  async createLobby(req: Request, res: Response) {
    try {
      const lobbyData = req.body;
      const lobby = await LobbyModel.create(lobbyData);
      res.status(201).json(lobby);
    } catch (error) {
      res.status(500).json({ error: 'Could not create lobby' });
    }
  },

  async getAllLobbies(req: Request, res: Response) {
    try {
      const lobbies = await LobbyModel.find();
      res.json(lobbies);
    } catch (error) {
      res.status(500).json({ error: 'Could not fetch lobbies' });
    }
  },

  async getLobbyById(req: Request, res: Response) {
    try {
      const lobbyId = req.params.id;
      const lobby = await LobbyModel.findById(lobbyId);
      if (!lobby) {
        return res.status(404).json({ error: 'Lobby not found' });
      }
      res.json(lobby);
    } catch (error) {
      res.status(500).json({ error: 'Could not fetch lobby' });
    }
  },

  async updateLobby(req: Request, res: Response) {
    try {
      const lobbyId = req.params.id;
      const lobbyData = req.body;
      const lobby = await LobbyModel.findByIdAndUpdate(lobbyId, lobbyData, { new: true });
      if (!lobby) {
        return res.status(404).json({ error: 'Lobby not found' });
      }
      res.json(lobby);
    } catch (error) {
      res.status(500).json({ error: 'Could not update lobby' });
    }
  },

  async deleteLobby(req: Request, res: Response) {
    try {
      const lobbyId = req.params.id;
      const lobby = await LobbyModel.findByIdAndDelete(lobbyId);
      if (!lobby) {
        return res.status(404).json({ error: 'Lobby not found' });
      }
      res.json({ message: 'Lobby deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Could not delete lobby' });
    }
  },

  async searchLobby(req: Request, res: Response) {
    try {
      const { q  } = req.query;

      // If both title and genre are not provided in query, return all lobbies
      const movies = await LobbyModel.find({
        $or: [
          { title: { $regex: q, $options: 'i' } }, // Case-insensitive search for title
          { genre: { $regex: q, $options: 'i' } }, // Case-insensitive search for genre
        ],
      });
  
      res.status(200).json(movies);
    } catch (error) {
      res.status(500).json({ error: 'Search failed' });
    }
  },
};

export default LobbyController;
