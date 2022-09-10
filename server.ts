import app, { logger } from './src/app';

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
    logger.info(`App listening on port ${port}`);
});

process.on('SIGINT', () => {
    server.close();
    logger.info('App finished');
});