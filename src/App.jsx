import './App.css'
import StoreProvider from './state_manager/StoreProvider'
import TaskForm from './components/TaskForm'
import CategoryForm from './components/CategoryForm'

function App() {
  return (
    <StoreProvider>
      <div className="container">
        <h1>My Task Manager</h1>
        <sub><i>Keep yourself in order ;)</i></sub>
        <CategoryForm />
      </div>
    </StoreProvider>
  )
}

export default App
