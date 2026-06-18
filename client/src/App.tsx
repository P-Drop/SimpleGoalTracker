import { Route, Routes } from 'react-router-dom'


function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold p-4">Simple Goal Tracker</h1>
      <Routes>
        <Route path="/" element={<p className="p-4">Lista de metas</p>} />
      </Routes>
    </div>
  )
}


export default App
