import { useState, useEffect} from 'react';


const ChatGpt = () => {
        const [message, setMessage] = useState([]);
        const [newUserMessage, setNewUserMessage] = useState(null);
        const [input, setInput] = useState('');
    
        const handleInputChange = (e) => {
            setInput(e.target.value);
        };
        const handleKeyDown = (event) => {
            if(event.key === 'Enter'){
                event.preventDefault();
                handleSubmit();
            }
        
        }
        useEffect(() => {

            const fetchResponse = async () => {
                    try {
                        const response = await fetch(
                'https://api.openai.com/v1/chat/completions',
                {   
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${process.env.REACT_APP_API_KEY}`
                    },
                    body: JSON.stringify(
                        {
                            model: 'gpt-3.5-turbo',
                            messages: [{role: 'system', content: ''}, {role: 'user', content: newUserMessage.content}],
                            max_tokens: 600,
                        }),   
                },   
                        
            );
            const data = await response.json();
            console.log(data);
            const botResponse = data.choices[0].message.content;

            setMessage(prevMessages => [...prevMessages, {role: 'chat GPT', content: botResponse}]);
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
                    <input
                    type="text" 
                    value={input} 
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    placeholder='How can I help you?' 
                    style={ChatbotStyles.input} />
                    <button style={ChatbotStyles.button} 
                    onClick={handleSubmit}>Submit Prompt</button>
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