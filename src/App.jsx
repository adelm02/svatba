import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './components/HomePage'
import Quiz from './pages/Quiz'
import './App.css'
import bee from './assets/bee.png';
import leaf from './assets/leaf.png';






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