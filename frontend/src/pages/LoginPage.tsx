import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Container from '../components/ui/Container'

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await login(email, password)
      
      // Get the updated user from localStorage after login
      const userStr = localStorage.getItem('user')
      const user = userStr ? JSON.parse(userStr) : null
      
      // Redirect based on role
      if (user?.role === 'admin') {
        navigate('/admin')
      } else {
        navigate('/items')
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials and ensure the backend is running.')
    } finally {
      setLoading(false)
    }
  }

  const fillTestCredentials = (testEmail: string, testPassword: string = 'password123') => {
    setEmail(testEmail)
    setPassword(testPassword)
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4">
      <Container>
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
            <p className="text-gray-600">Sign in to your EcoSwap account</p>
          </div>

          <div className="card p-8">
            {/* Admin Account */}
            <div className="mb-4 bg-purple-50 border border-purple-200 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <span className="text-xl">👑</span>
                <div className="flex-1">
                  <h3 className="font-semibold text-purple-900 text-sm mb-1">Admin Account</h3>
                  <p className="text-xs text-purple-700 mb-2">
                    Click to auto-fill admin credentials (password: admin123)
                  </p>
                  <button
                    type="button"
                    onClick={() => fillTestCredentials('admin@ecoswap.com', 'admin123')}
                    className="text-xs px-3 py-1.5 bg-white rounded hover:bg-purple-50 transition-colors border border-purple-200 font-medium"
                  >
                    Admin Login
                  </button>
                </div>
              </div>
            </div>

            {/* Test Accounts Info */}
            <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <span className="text-xl">🔑</span>
                <div className="flex-1">
                  <h3 className="font-semibold text-blue-900 text-sm mb-1">Test Accounts</h3>
                  <p className="text-xs text-blue-700 mb-2">
                    Click to auto-fill login credentials (password: password123)
                  </p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <button
                      type="button"
                      onClick={() => fillTestCredentials('carlos@example.com')}
                      className="text-xs px-3 py-1.5 bg-white rounded hover:bg-blue-50 transition-colors border border-blue-200"
                    >
                      Carlos (Madrid)
                    </button>
                    <button
                      type="button"
                      onClick={() => fillTestCredentials('maria@example.com')}
                      className="text-xs px-3 py-1.5 bg-white rounded hover:bg-blue-50 transition-colors border border-blue-200"
                    >
                      María (Barcelona)
                    </button>
                    <button
                      type="button"
                      onClick={() => fillTestCredentials('javier@example.com')}
                      className="text-xs px-3 py-1.5 bg-white rounded hover:bg-blue-50 transition-colors border border-blue-200"
                    >
                      Javier (Valencia)
                    </button>
                    <button
                      type="button"
                      onClick={() => fillTestCredentials('ana@example.com')}
                      className="text-xs px-3 py-1.5 bg-white rounded hover:bg-blue-50 transition-colors border border-blue-200"
                    >
                      Ana (Sevilla)
                    </button>
                    <button
                      type="button"
                      onClick={() => fillTestCredentials('pablo@example.com')}
                      className="text-xs px-3 py-1.5 bg-white rounded hover:bg-blue-50 transition-colors border border-blue-200"
                    >
                      Pablo (Bilbao)
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field"
                  placeholder="you@example.com"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field"
                  placeholder="••••••••"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full"
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Don't have an account?{' '}
                <Link to="/register" className="text-primary-600 font-medium hover:underline">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default LoginPage
