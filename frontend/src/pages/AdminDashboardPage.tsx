import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Container from '../components/ui/Container'
import axios from 'axios'

interface Stats {
  totalUsers: number
  totalItems: number
  totalMessages: number
  recentUsers: any[]
  recentItems: any[]
  categoryCounts: any[]
}

const AdminDashboardPage = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/items')
      return
    }

    fetchStats()
  }, [user, navigate])

  const fetchStats = async () => {
    try {
      const response = await axios.get('/api/admin/stats')
      setStats(response.data)
    } catch (error) {
      console.error('Error fetching stats:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (!stats) {
    return <div>Error loading stats</div>
  }

  return (
    <div className="min-h-screen py-12">
      <Container>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Welcome back, {user?.name}</p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <button
            onClick={() => navigate('/admin/users')}
            className="card p-6 hover:shadow-lg transition-shadow text-left group"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600">
                Manage Users
              </h3>
              <div className="text-3xl">👥</div>
            </div>
            <p className="text-gray-600 text-sm">
              View, edit, and manage all user accounts
            </p>
          </button>

          <button
            onClick={() => navigate('/admin/items')}
            className="card p-6 hover:shadow-lg transition-shadow text-left group"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600">
                Manage Items
              </h3>
              <div className="text-3xl">📦</div>
            </div>
            <p className="text-gray-600 text-sm">
              Browse, moderate, and manage all listings
            </p>
          </button>

          <button
            onClick={() => navigate('/admin/messages')}
            className="card p-6 hover:shadow-lg transition-shadow text-left group"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600">
                View Messages
              </h3>
              <div className="text-3xl">💬</div>
            </div>
            <p className="text-gray-600 text-sm">
              Monitor all user conversations and messages
            </p>
          </button>

          <button
            onClick={() => navigate('/items')}
            className="card p-6 hover:shadow-lg transition-shadow text-left group"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600">
                Browse Items
              </h3>
              <div className="text-3xl">🔍</div>
            </div>
            <p className="text-gray-600 text-sm">
              View marketplace and send messages to users
            </p>
          </button>
        </div>

        {/* Stats Overview */}
        <div className="mb-4">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Platform Statistics</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <button
              onClick={() => navigate('/admin/users')}
              className="card p-6 bg-gradient-to-br from-blue-50 to-white hover:shadow-lg transition-shadow text-left"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Users</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.totalUsers}</p>
                  <p className="text-xs text-gray-500 mt-2">Registered accounts</p>
                </div>
                <div className="text-4xl">👥</div>
              </div>
            </button>

            <button
              onClick={() => navigate('/admin/items')}
              className="card p-6 bg-gradient-to-br from-green-50 to-white hover:shadow-lg transition-shadow text-left"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Items</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.totalItems}</p>
                  <p className="text-xs text-gray-500 mt-2">Active listings</p>
                </div>
                <div className="text-4xl">📦</div>
              </div>
            </button>

            <button
              onClick={() => navigate('/admin/messages')}
              className="card p-6 bg-gradient-to-br from-purple-50 to-white hover:shadow-lg transition-shadow text-left"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Messages</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.totalMessages}</p>
                  <p className="text-xs text-gray-500 mt-2">User conversations</p>
                </div>
                <div className="text-4xl">💬</div>
              </div>
            </button>
          </div>
        </div>

        {/* Category Distribution */}
        <div className="card p-6 mb-8 mt-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">📊 Items by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.categoryCounts.map((cat) => (
              <div key={cat.category} className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
                <p className="text-sm text-gray-600 capitalize mb-1">{cat.category}</p>
                <p className="text-2xl font-bold text-gray-900">{cat._count.category}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mb-4">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h2>
        </div>

        {/* Recent Users */}
        <div className="card p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900">👥 Recent Users</h3>
            <button
              onClick={() => navigate('/admin/users')}
              className="text-sm text-primary-600 hover:text-primary-700 font-medium"
            >
              View All →
            </button>
          </div>
          <div className="space-y-4">
            {stats.recentUsers.map((user) => (
              <div key={user.id} className="flex items-center justify-between border-b border-gray-200 pb-4 last:border-0 last:pb-0 hover:bg-gray-50 -mx-2 px-2 py-2 rounded transition-colors">
                <div>
                  <p className="font-medium text-gray-900">{user.name}</p>
                  <p className="text-sm text-gray-600">{user.email}</p>
                  <p className="text-xs text-gray-500">{user.location}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">{user._count.items} items</p>
                  <p className="text-sm text-gray-600">{user._count.sentMessages} messages</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Items */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900">📦 Recent Items</h3>
            <button
              onClick={() => navigate('/admin/items')}
              className="text-sm text-primary-600 hover:text-primary-700 font-medium"
            >
              View All →
            </button>
          </div>
          <div className="space-y-4">
            {stats.recentItems.map((item) => (
              <div key={item.id} className="flex items-center gap-4 border-b border-gray-200 pb-4 last:border-0 last:pb-0 hover:bg-gray-50 -mx-2 px-2 py-2 rounded transition-colors">
                {item.imageUrl && (
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-16 h-16 object-cover rounded"
                  />
                )}
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{item.title}</p>
                  <p className="text-sm text-gray-600">by {item.user.name}</p>
                  <p className="text-xs text-gray-500 capitalize">{item.category} • {item.location}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">
                    {item.isFree ? '🆓 Free' : `€${item.price}`}
                  </p>
                  <p className="text-xs text-gray-500 capitalize">{item.condition}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  )
}

export default AdminDashboardPage
