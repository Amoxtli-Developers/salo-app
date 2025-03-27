// server/index.ts
import express from 'express';

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

// Ruta de prueba
app.get('/api/hello', (_req, res) => {
  res.json({ message: 'Hola desde el backend con Express!' });
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor backend escuchando en http://localhost:${port}`);
});
