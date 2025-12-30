import { useState } from 'react'


function Input({ taskList, setTaskList }) {

  const [input, setInput] = useState("")

  const handleAddTask = (e) => {
    e.preventDefault()
    setTaskList([...taskList, input])
    setInput("")
  }

  return (
    <>
      <form >
        <input
          id="taskInput"
          type="text"
          placeholder='Add a task'
          value={input}
          onChange={(e) => {
            setInput(e.target.value)
          }} />

        <button onClick={handleAddTask}>Add</button>
      </form>
    </>
  )
}

export default Input