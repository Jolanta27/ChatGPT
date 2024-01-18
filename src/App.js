
import './App.css';
import ChatGpt from '../src/Chatgpt';
import AiImage from './Aipic.jpeg';

function App() {

  return (
    <div style={AiStyle.overlayedContainer}>
      <img style={AiStyle.img}src={AiImage} alt="AI"></img>
      <div style={AiStyle.botPosition}>
      <h1 style={AiStyle.main}>Chat GPT</h1>
      <ChatGpt />
      </div>
    </div>
  );
}
const AiStyle = {
  overlayedContainer: {
    position: 'relative',
  },
  img: {
    width: '100%',
    height: '100vh',
    opacity: 0.6
  },
  botPosition: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 1
  },
    main: {
      color: '#007bff',
      textAlign: 'center',
      display: 'block',
      backgroundColor: '#f0f0f0',
      padding: '16px',
      border: '1px solid #ccc',
      borderRadius: '5px'
    }
  } 

export default App;
