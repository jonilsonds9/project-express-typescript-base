# Passo a passo para criar um projeto usando express com typescript

## Inicie o projeto:
```sh
npm init -y
```

## Instale as dependências de desenvolvimento:
```sh
npm i -D nodemon typescript ts-node @types/express @types/dotenv @types/cors @types/morgan
```

## Instalar as dependências de projeto final (produção):
```sh
npm i express dotenv cors morgan tslog
```
Observação: O `morgan` é para logs de requests HTTP. Já o `tslog` é um logger de aplicação para facilitar logs em dev e em prod.

## Adicionar scripts de execução no `package.json`:
```json
"scripts": {
  "start": "ts-node src/server.ts",
  "dev": "nodemon --exec ts-node src/server.ts"
},
```

## Pasta de código:

- Crie a pasta `src` na raiz do projeto, crie um novo arquivo com o nome `app.ts` e adicione o seguinte conteúdo:
```typescript
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
```

- Crie uma pasta `routes` dentro da pasta `src` e então crie um arquivo `index.ts` e adicione as rotas:
```typescript
import { Router } from 'express';
import { logger } from '../app';

export const router = Router();

router.get('/', (req, res) => {
    logger.info('App teste');
    res.send('API com Express e Typescript')
});
```

## Server
- Crie um arquivo com o nome `server.ts` e coloque o seguinte conteúdo:
```typescript
import app, { logger } from './src/app';

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
    logger.info(`App listening on port ${port}`);
});

process.on('SIGINT', () => {
    server.close();
    logger.info('App finished');
});
```