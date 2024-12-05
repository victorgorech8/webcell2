import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [chatId, setChatId] = useState('');
    const navigate = useNavigate();

    const createChat = () => {
        if (chatId) {
            navigate(`/chat/${chatId}`);
        } else {
            alert('Пожалуйста, введите имя чата.');
        }
    };

    return (
        <div>
            <h1>Создать новый чат</h1>
            <input
                type="text"
                placeholder="Введите имя чата"
                value={chatId}
                onChange={(e) => setChatId(e.target.value)}
            />
            <button onClick={createChat}>Создать чат</button>
        </div>
    );
};

export default Home;
