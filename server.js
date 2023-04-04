import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const root = path.join(__dirname, 'dist', '.');

console.log(root);

app.use(express.static(root));

app.get('/ping', (req, res) => {
  return res.send('pong');
});

app.get('/*', (req, res) => {
  res.sendFile('index.html', { root });
});

app.listen(process.env.PORT || 8080);
