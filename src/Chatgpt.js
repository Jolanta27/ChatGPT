 import { useState, useEffect} from 'react';
 import axios from 'axios';


const ChatGpt = () => {
        const [message, setMessage] = useState([]);
        const [newUserMessage, setNewUserMessage] = useState(null);
        const [input, setInput] = useState('');
    
        const handleInputChange = (e) => {
            setInput(e.target.value);
        };

        useEffect(() => {

            const fetchResponse = async () => {
                const conversation = Array.isArray(message) ? message.map(message => message.content).join('\n') : '';
                    try {
                        const response = await axios.post(
                "https://api.openai.com/v1/engines/davinci/completions",
                {
                    model: 'text-davinci-002',
                    prompt:`${conversation}\nChatGPT:`,
                    max_tokens: 150,
                    temperature: 0.5
                },  
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${process.env.REACT_APP_API_KEY}`
                    }      
                }
                        
            );

            const botResponse = response.data.choices[0].text.trim();

            setMessage(prevMessages => [...prevMessages, {role: 'ChatGPT', content: botResponse}]);
            } catch (error) {
                console.log('Error sending message:', error);
            }
                };
        if(newUserMessage) {
        setMessage(prevMessages => [...prevMessages, newUserMessage]);
        setNewUserMessage(null);
        fetchResponse();
                }
                }, [newUserMessage]);

            const handleSubmit = async () => {
                if (input.trim() !== '') {
                    setNewUserMessage({role: 'user', content: input});
                    setInput('');
                }
            };

            return (
                <div className='chatbot' style={ChatbotStyles.chatbot}>
                     <div className='chatbox' style={ChatbotStyles.chatbox}>
                    <div className='messages' style={ChatbotStyles.messages}>
                        {message.map((message, index) => (
                            <div key={index} className='message' style={ChatbotStyles.message}>
                                {message.role === 'system' ? (
                                    <div className='bot-message' style={ChatbotStyles.botMessage}>{message.content}</div>
                                ) : (
                                    <div className='user-message'>{message.content}</div>
                                )}
                            </div>
                        ))}
                    </div>
                    <input type="text" value={input} onChange={handleInputChange} placeholder='How can I help you?' style={ChatbotStyles.input} />
                    <button style={ChatbotStyles.button} onClick={handleSubmit}>Submit Prompt</button>
                </div>
            </div>
        );

        };
    const ChatbotStyles = {
        chatbot: {
            width: '500px',
            height: '400px',
            backgroundColor: '#f0f0f0',
            border: '1px solid #ccc',
            borderRadius: '5px',
            margin: '0 auto',
            padding: '1px 7px 10px 5px',
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
            maxWidth: '100%',
            padding: '8px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            marginBottom: '5px',
            height: '30px'
        },
        '&:focus': {
            outline: 'none'
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
 export default ChatGpt;