const express = require('express');
const { WebSocketServer } = require('ws');
const path = require('path');

const app = express();
// Railway сам передаст нужный порт через process.env.PORT
const PORT = process.env.PORT || 3000;

// Раздаем все файлы из текущей папки (твою игру)
app.use(express.static(path.join(__dirname)));

const server = app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});

// Запускаем WebSocket-сервер для будущего мультиплеера
const wss = new WebSocketServer({ server });

wss.on('connection', (ws) => {
    console.log('Новый игрок подключился!');
    ws.on('message', (message) => {
        console.log(`Получено сообщение: ${message}`);
    });
});