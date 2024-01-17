
import './App.css';
import Chatbot from '../src/Chatbot';

function App() {
  const HeaderStyle = {
    main: {
      color: 'blue',
      textAlign: 'center'
    }
  } 
  return (
    <div>
      <h1 style={HeaderStyle.main}>Chat GPT</h1>
      <Chatbot />
    </div>
  );
}

export default App;
