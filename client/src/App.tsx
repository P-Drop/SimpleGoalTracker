import { Route, Routes } from 'react-router-dom'
import MainLayout from './components/layout/MainLayout'
import HomePage from './pages/HomePage'

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Routes>
        <Route element={<MainLayout />}>
          <Route path={'/'} element = {<HomePage/>}></Route>
        </Route>
      </Routes>
    </div>
  )
}


export default App
