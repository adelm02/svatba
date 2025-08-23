import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './components/HomePage'
import Quiz from './pages/Quiz'
import './App.css'
import bee from './assets/bee.png';
import leaf from './assets/leaf.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

const players = [];      // každý prvek: { id, name, score, finished }

const questions = [
  { id: 'q1', text: 'Který rok se potkali Adel s Petrem?', choices: ['A','B','C'], correctIndex: 1 },
  { id: 'q2', text: 'Co má Petr nejraději k snídani?', choices: ['A','B','C'], correctIndex: 0 },
];

const answers = [];      // každý prvek: { playerId, questionId, selectedIndex, isCorrect }





function App() {
  return (

    <Router>
      <div className="app-background" />
        <img className='img-1' src={bee}/>
        <img className='img-2' src={leaf}/>
       
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/quiz" element={<Quiz />} />
        </Routes>
    </Router>
    
  )
}

export default App