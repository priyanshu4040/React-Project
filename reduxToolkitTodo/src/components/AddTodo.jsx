import React from 'react'
import { addTodo } from '../features/todo/todoSlice'
import { useDispatch } from 'react-redux'


function AddTodo() {

  const [input, setInput] = React.useState('')
  // useDispatch() is a hook provided by React Redux to let you send actions to the Redux store from a React component.

  const dispatch = useDispatch()

  const addTodoHandler = (e) => {
    e.preventDefault()
    // You call dispatch(addTodo(input)) to send the action.
    dispatch(addTodo(input))
    //use setInput('') to clean the filled input in the form
    setInput('')
  }

  return (
    //Normal form
    <form onSubmit={addTodoHandler} className="space-x-3 mt-12">
      <input
        type="text"
        className="bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        placeholder="Enter a Todo..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        type="submit"
        className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
      >
        Add Todo
      </button>
    </form>
  )
}

export default AddTodo