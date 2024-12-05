import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Chat = () => {
const { id } = useParams(); // Получаем идентификатор текущего чата из URL
const [messages, setMessages] = useState([]); // Храним сообщения текущего чата
const [messageInput, setMessageInput] = useState('');
const [socket, setSocket] = useState(null);

useEffect(() => {
const newSocket = new WebSocket(`ws://localhost:8080?id=${id}`);
setSocket(newSocket);

newSocket.onopen = () => {
console.log('Соединение установлено');
};

newSocket.onmessage = (event) => {
// Проверяем, является ли полученное сообщение Blob
if (event.data instanceof Blob) {
const reader = new FileReader();
reader.onload = () => {
const message = reader.result; // Получаем строковое представление сообщения
setMessages((prevMessages) => [...prevMessages, message]); // Добавляем сообщение в состояние
};
reader.readAsText(event.data); // Читаем Blob как текст
} else {
// Если сообщение уже строка, просто добавляем его
setMessages((prevMessages) => [...prevMessages, event.data]);
}
};

newSocket.onerror = (error) => {
console.error('Ошибка WebSocket:', error);
};

newSocket.onclose = () => {
console.log('Соединение закрыто');
};

return () => {
newSocket.close();
};
}, [id]);

const sendMessage = () => {
if (messageInput) {
console.log('Отправка сообщения:', messageInput); // Лог отправляемого сообщения
socket.send(messageInput); // Отправляем сообщение на сервер
setMessageInput(''); // Очищаем поле ввода
}
};

return (
<div>
<h1>Чат: {id}</h1>
<div>
{messages.map((msg, index) => (
<div key={index}>{msg}</div> // Отображаем только сообщения текущего чата
))}
</div>
<input
type="text"
placeholder="Введите ваше сообщение"
value={messageInput}
onChange={(e) => setMessageInput(e.target.value)}
/>
<button onClick={sendMessage}>Отправить</button>
</div>
);
};

export default Chat;