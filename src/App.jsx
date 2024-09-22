import { RouterProvider } from 'react-router-dom'
import './App.css'
import { router } from './routes/router'
import '@mantine/core/styles.css';
function App() {

  return (
    <div className="container-fluid">
      <RouterProvider router={router} />
    </div>
  )
}

export default App
