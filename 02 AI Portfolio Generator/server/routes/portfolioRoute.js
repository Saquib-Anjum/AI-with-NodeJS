import express from 'express';
import {portfolio} from '../controller/portfolioController.js'
const portfolioRouter = express.Router();
portfolioRouter.post('/portfolio',portfolio);


export default portfolioRouter;