import express from 'express';
import authRoutes from './loginRoute'
import lobbyRoutes from "./lobbyRoutes"



const version1 = 'v1'

const router = express.Router();

const defaultRoutes = [
  {
    path: `/${version1}/auth`,
    route: authRoutes,
  },
  {
    path: `/${version1}/movies`,
    route: lobbyRoutes,
  },
];


defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});


export default router;