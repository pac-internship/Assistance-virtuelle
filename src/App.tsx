import { useState } from 'react'
import './App.css'
import InputBox from './component/inputBox'  


function App() {
 const [count, setCount] = useState(0)

  return (
    
      
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <InputBox />
    
    </div>
  )
}

export default App;
