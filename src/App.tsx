import { createBrowserRouter, Navigate, RouterProvider, useLocation } from 'react-router-dom'
import { Home } from './pages/home'
import { StarchipsDetails } from './pages/starchips-details'
import { Nav } from './components/Nav'
import { Header } from './components/Header'
import { AuthProvider, useAuth } from './context/auth'
import { Login } from './pages/login'


function RequireAuth({ children }: { children: JSX.Element }) {
      const { user } = useAuth()
        const location = useLocation();

        if (!user) {
            return <Navigate to='/' state={{ from: location }} replace />
        }
        return children
    }

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/starchips/:id',
    element: <StarchipsDetails />
  },
  {
    path: '/person/:id',
    element: <RequireAuth><StarchipsDetails /></RequireAuth>
  },
  {
    path: '/login',
    element: <Login/>
  }
])
export function App() {
  return (
    <>
      <AuthProvider>
      <Nav />
      <Header />
        <RouterProvider router={router} />
      </AuthProvider>
    </>
  )
}
