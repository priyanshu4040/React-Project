import { useState } from 'react'
import './App.css'

function App() {
  let [count, setCount] = useState(0)

  const increment = () => {

    if (count < 20) {
      count = count + 1;
      console.log("value of count", count)
      setCount(count);
    }
    else {
      console.log("Count value cannot be above 20")
    }

  }

  const decrement = () => {
    if (count > 0) {
      count = count - 1
      console.log("value of count", count)
      setCount(count)
    }
    else {
      console.log("Count value cannot be negative")
    }
  }

  return (
    <>
      <h1>Count : {count}</h1>
      <button onClick={increment}>Add Count</button>
      <br />
      <br />
      <button onClick={decrement}>Reduce Count</button>
      <p>Current value of count : {count}</p>
    </>
  )
}

export default App
