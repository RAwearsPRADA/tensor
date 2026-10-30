import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/main/page.tsx'
import LoginPage from './pages/log-in/page.tsx'
import SignUpPage from './pages/sign-up/page.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>
  },
  {
    path: "/log-in",
    element: <LoginPage/>
  },
  {
    path: "/sign-up",
    element: <SignUpPage/>
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
