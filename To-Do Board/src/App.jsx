import { useState } from 'react'
import Input from './components/Input'
import Board from './components/Board'
import './App.css'

function App() {

  const [taskList, setTaskList] = useState([])

  return (

    <>
      <h1 className=''>02-TO DO BOARD</h1>
      <Input taskList={taskList} setTaskList={setTaskList} />
      <div>
        {
          taskList.map((task, index) => (
            <Board
              key={index}
              index={index}
              task={task}
              taskList={taskList}
              setTaskList={setTaskList}
            />

          ))
        }
      </div>

    </>
  )
}

export default App
