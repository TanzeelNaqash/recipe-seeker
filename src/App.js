import React from 'react'
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom'
import Food from './Components/Food'

 import Recipe from './Components/Recipe'
 import './App.css'


const App = () => {
  return (
    
    <Router>
    <Routes>     
      <Route path='/' element= {<Food/>}/>
     <Route path='/:recipeid' element={<Recipe/>}/>
  </Routes>
    </Router>
    
  )
}

export default App
