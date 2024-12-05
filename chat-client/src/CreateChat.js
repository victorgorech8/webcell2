import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateChat = () => {
    const [chatId, setChatId] = useState('');
    const navigate = useNavigate();

    const handleCreateChat = (e) => {
        e.preventDefault();
        if (chatId) {
            navigate(`/chat/${chatId}`);
        }
    };

    return (
        <div>
            <h1>Create a New Chat</h1>
            <form onSubmit={handleCreateChat}>
                <input
                    type="text"
                    value={chatId}
                    onChange={(e) => setChatId(e.target.value)}
                    placeholder="Enter chat ID..."
                />
                <button type="submit">Create Chat</button>
            </form>
        </div>
    );
};

export default CreateChat;
