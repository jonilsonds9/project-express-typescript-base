import { Router } from 'express';
import { logger } from '../app';

export const router = Router();

router.get('/', (req, res) => {
    logger.info('App teste');
    res.send('API com Express e Typescript')
});