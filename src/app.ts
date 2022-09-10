import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { Logger } from 'tslog';

import { router } from './routes';

class App {
    public app: express.Application;
    public logger: Logger;

    constructor() {
        this.app = express();
        this.config();
        this.logger = new Logger({ name: 'app' });
    }

    private config(): void {
        this.app.use(express.json());
        this.app.use(cors());
        this.app.use(morgan('common'));
        this.app.use('/', router);
    }
}

const app = new App();
const logger = app.logger;

export default app.app;
export { logger };