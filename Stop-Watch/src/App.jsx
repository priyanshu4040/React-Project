import { useState, useEffect } from 'react'
import './App.css'
import stopwatch from './assets/stopwatch.svg'

function App() {

  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false)


  useEffect(() => {
    let interval

    if (running) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10)
      }, 10)
    }

    return () => clearInterval(interval);

  }, [running])

  return (
    <>
      <div className="min-h-screen w-full bg-contain bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${stopwatch})` }}
      >
        <h1 className='text-8xl text-center'>Stop Watch</h1>
        <div
          className='text-center text-6xl mt-10 flex justify-center'
        >
          <div className='box-border w-60 bg-yellow-200 outline'>
            <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
            <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}:</span>
            <span>{("0" + Math.floor((time / 10) % 100)).slice(-2)}</span>
          </div>

        </div>

        <div className='flex justify-between text-3xl m-5 relative bottom-20'>
          {running ? (<button className='bg-red-300 outline box-border h-15 w-32' onClick={() => setRunning(false)}>STOP</button>) : (<button className='bg-green-300 outline box-border h-15 w-32' onClick={() => setRunning(true)}>START</button>)
          }

          <button className='outline bg-blue-300 box-border h-15 w-32' onClick={() => setTime(0)}>RESET</button>
        </div >
      </div>
    </>
  )
}

export default App
