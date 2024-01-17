import { useState } from 'react';
import axios from 'axios';


const Chatbot = () => {
    const [message, setMessage] = useState([
        {
            message: "Hello, I'm ChatGPT! Ask me anything!",
            sentTime: "just now",
            sender: "ChatGPT",
        },
    ]);
    const [input, setInput] = useState('');

    const ChatbotStyles = {
        chatbot: {
            width: '300px',
            backgroundColor: '#f0f0f0',
            border: '1px solid #ccc',
            borderRadius: '5px',
            margin: '0 auto',
            padding: '10px',
        },
        chatbox: {
            display: 'flex',
            flexDirection: 'column',
        },
        messages: {
            maxHeight: '300px',
            overflowY: 'scroll',
        },
        message: {
            marginBottom: '10px',
        },
        botMessage: {
            backgroundColor: '#007bff',
            color: 'white',
            padding: '5px 10px',
            borderRadius: '5px',
            marginLeft: 'auto',
        },
        input: {
            width: '100%',
            padding: '5px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            marginBottom: '10px',
        },
        button: {
            backgroundColor: 'blue',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '5px',
            cursor: 'pointer',
        },
    };

    const handleInputChange = (e) => {
        setInput(e.target.value);
    };

    const handleSendMessage = async () => {
        if (input.trim() === '') return;

        setMessage([...message, {role: 'user', text: input}]);
        try {
            const response = await 
            axios.post(
                "https://api.openai.com/v1/chat/completions",
                {
                    prompt: `User: ${input}\nChatGPT:`,
                    max_tokens: 150,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${process.env.OpenAIAPIKey}`,
                    },
                    
                }
              
            );

            const botResponse = response.data.choices[0].text;

            setMessage([...message, {role: 'bot', text: botResponse}]);

           
        } catch (error) {
            console.log('Error sending message:', error);
        };
        setInput('');
    };
    return (
        <div className='chatbot' style={ChatbotStyles.chatbot}>
            <div className='chatbox' style={ChatbotStyles.chatbox}>
                <div className='messages' style={ChatbotStyles.messages}>
                    {message.map((message, index) => (
                        <div key={index} className='message' style={ChatbotStyles.message}>
                            {message.role === 'bot' ? (
                                <div className='bot-message' style={ChatbotStyles.botMessage}>{message.text}</div>
                            ) : (
                            <div className='user-message'>{message.text}</div>
                            )}
                            </div>
                    ))}
                    </div>
                    <input type="text" value={input} onChange={handleInputChange} placeholder='How can I help you?' style={ChatbotStyles.input}/>
                    <button onClick={handleSendMessage} style={ChatbotStyles.button}>Send</button>
                </div>
            </div>
    );
 }
 export default Chatbot;