import { useState } from 'react'
import './App.css'

function App() {

  const [color, setColor] = useState("orange")

  return (

    <div className="w-full h-screen " style={{ backgroundColor: color }}>
      <div className=' fixed flex flex-wrap w-full justify-center rounded-lg bottom-12 inset-x-0 px-2' >

        <div className=' flex flex-wrap bg-white w-100 justify-center rounded-lg  px-2  ' >
          <button className='bg-red-500 w-25 text-center text-white rounded-md m-1' onClick={() => setColor("red")}>Red</button>
          <button className='bg-blue-500 w-25 text-center text-white rounded-md m-1' onClick={() => setColor("blue")}>Blue</button>
          <button className='bg-green-500 w-25 text-center text-white rounded-md m-1' onClick={() => setColor("green")}>Green</button>
        </div>
      </div>
    </div>
  )
}

export default App
