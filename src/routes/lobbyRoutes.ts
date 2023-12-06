import express from 'express';
import LobbyController from '../controllers/lobbyController'; // Import your lobby controller
import validateRequest from '../middlewares/validationRequest'
import { lobbyValidationSchema } from '../validations/lobyValidation';
import authenticate from '../middlewares/authenticate'; 
import authorize from "../middlewares/authorization"
const router = express.Router();

// Create a new lobby
router.post('/', validateRequest(lobbyValidationSchema, "body"),authenticate, authorize, LobbyController.createLobby);

// Get all lobbies
router.get('/', authenticate, LobbyController.getAllLobbies);
router.get('/search', authenticate,  LobbyController.searchLobby);

// Get lobby by ID
router.get('/:id', authenticate, LobbyController.getLobbyById);

// Update lobby by ID
router.put('/:id', authenticate, authorize, validateRequest(lobbyValidationSchema, "body"), LobbyController.updateLobby);

// Delete lobby by ID
router.delete('/:id', authenticate, authorize, LobbyController.deleteLobby);

// Search lobby by title or genre


export default router;
