import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/Navbar'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import FeaturedBooks from './pages/FeaturedBooks'
import BookDetail from './pages/BookDetailPage' 
import BookCreatePage from './pages/BookCreatePage'
import ReviewForm from './pages/ReviewForm'

function App() {
  return (
    <div>
      <AuthProvider>
        <Navbar />
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/featured-books" element={<FeaturedBooks />} />
            <Route path="/book/:id" element={<BookDetail />} />
            <Route path="/create-book" element={<BookCreatePage />} />
            <Route path="/review/:id" element={<ReviewForm />} />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  )
}

export default App