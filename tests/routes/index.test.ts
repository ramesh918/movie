import express, {  Request, Response } from 'express';
import request from 'supertest';
import indexRoute from '../../src/routes/index';
import authRoutes from '../../src/routes/loginRoute';
import lobbyRoutes from '../../src/routes/lobbyRoutes';
describe('Index Route', () => {
    let app: express.Application;
    let authRouteHandler: jest.Mock;
    let lobbyRouteHandler: jest.Mock;
    
    beforeAll(() => {
      app = express();
      app.use('/', indexRoute);
  
      authRouteHandler = jest.fn((req: Request, res: Response) => {
        res.sendStatus(200);
      });
  
      lobbyRouteHandler = jest.fn((req: Request, res: Response) => {
        res.sendStatus(200);
      });
  
      authRoutes.get('/login', authRouteHandler); // Assuming 'login' is one of the routes in authRoutes
      lobbyRoutes.get('/', lobbyRouteHandler); // Assuming the base route is handled in lobbyRoutes
    });
  
    it('should call the auth route handler for /v1/auth/login', async () => {
      await request(app).get('/v1/auth/login');
  
      expect(authRouteHandler).toHaveBeenCalled();
    });

  });
