const express = require('express');
const app = express();
const port = 3001;
const { getVersion } = require('@electron/fiddle-core');

app.get('/api/fiddle-version', async (req, res) => {
  const version = await getVersion();
  res.json({ version });
});

app.get('/api/hello', (req, res) => {
  res.send({ message: 'Hello from Express!' });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});