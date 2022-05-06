import './App.css'
import StoreProvider from './state_manager/StoreProvider'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'

function App() {
  return (
    <StoreProvider>
      <div className="container">
        <h1>My Task Manager</h1>
        <sub><i>Keep yourself in order ;)</i></sub>
        <TaskForm />
        <TaskList />
      </div>
    </StoreProvider>
  )
}

export default App
