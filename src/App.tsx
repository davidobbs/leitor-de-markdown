import { Routes, Route } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { ReadPage } from './pages/ReadPage'
import { FileLaunchHandler } from './components/FileLaunchHandler'

export default function App() {
  return (
    <>
      <FileLaunchHandler />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/read/:id" element={<ReadPage />} />
        <Route path="/open" element={<HomePage openMode />} />
        <Route path="/share" element={<HomePage />} />
      </Routes>
    </>
  )
}
