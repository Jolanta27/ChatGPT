/*
exports.chatCompletion = functions.https.onCall(async (data, context) => {
    const { prompt } = data;
    const OPEN_API_KEY = `${process.env.API_KEY}`
    const aiModel = "gpt-3.5-turbo-1106"

    const messages = [
        {
            role: "system",
            content: "you are a helpful assistant"
        },
        {
            role: "user",
            content: prompt
        },
    ]
    const completion = await openai.chat.completions.create({
        model: aiModel,
        message: messages
    })
    const aiResponse = completion.choices[0].message.content

    return {
        aiResponse
    };
});
const ChatGpt = () => {
    const [prompt, setPrompt]  = useState('');
    const [output, setOutput] = useState('');
    const [fetching, setFetching] = useState(false);

    const handleSubmit = async = () => {
        const functions = getFunctions()
        const chatCompletion = httpsCallable(functions, 'chatCompletion')
        try {
            const data = {
                prompt
            }
            setFetching(true)
            const result = await chatCompletion(data)
            setOutput(result.data.aiResponse)
        } catch (error) {

        } finally {
            setFetching(false)
        }
    }
*/

 import { useState } from 'react';
import axios from 'axios';


const ChatGpt = () => {
    const [message, setMessage] = useState([
        {
            message: "Hello, I'm ChatGPT! Ask me anything!",
            sentTime: "just now",
            sender: "ChatGPT",
        },
    ]);
    const [input, setInput] = useState('');
    const [prompt, setPrompt]  = useState('');
    const [output, setOutput] = useState('');
    const [fetching, setFetching] = useState(false);

    

    const handleInputChange = (e) => {
        setInput(e.target.value);
    };

    const handleSubmit = async () => {
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
                        'Authorization': `Bearer ${process.env.API_KEY}`,
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
                    <button style={ChatbotStyles.button} onClick={handleSubmit}>Submit Prompt</button>
                </div>
            </div>
    );  
 }
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