const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws, req) => {
const urlParams = new URLSearchParams(req.url.split('?')[1]);
const chatId = urlParams.get('id'); // Получаем идентификатор чата

ws.on('message', (message) => {
console.log(`Получено сообщение в чате ${chatId}: ${message}`);

// Отправляем сообщение всем клиентам, подключенным к этому чату
wss.clients.forEach((client) => {
if (client.readyState === WebSocket.OPEN && client.chatId === chatId) {
client.send(message);
}
});
});

// Сохраняем идентификатор чата для этого клиента
ws.chatId = chatId;

ws.on('close', () => {
console.log(`Клиент отключился от чата ${chatId}`);
});
});

console.log('Сервер запущен на порту 8080');