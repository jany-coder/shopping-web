import { Route, Routes } from 'react-router-dom'
import { WishlistProvider } from './context/WishlistProvider'
import { AdminPage } from './pages/AdminPage'
import { AuthPage } from './pages/AuthPage'
import { HomePage } from './pages/HomePage'
import { WishlistPage } from './pages/WishlistPage'

export default function App() {
  return (
    <WishlistProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
      </Routes>
    </WishlistProvider>
  )
}
