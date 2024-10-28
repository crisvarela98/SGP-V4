const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;
const dataHandler = require('/api/dataHandler'); // Asegúrate de que el path sea correcto

app.use(express.json());

app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/js', express.static(path.join(__dirname, 'js')));
app.use('/views', express.static(path.join(__dirname, 'views')));
app.use('/json', express.static(path.join(__dirname, 'json')));
app.use('/data', express.static(path.join(__dirname, 'data')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/index.html'));
});

app.post('/data', dataHandler.saveData);
app.get('/data/:type', dataHandler.loadData);

app.listen(PORT, () => {
    console.log(`Servidor funcionando en el puerto ${PORT} - http://localhost:${PORT}`);
});

