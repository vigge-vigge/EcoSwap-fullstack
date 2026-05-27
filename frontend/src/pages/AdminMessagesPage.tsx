import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Container from '../components/ui/Container'
import axios from 'axios'

interface Message {
  id: string
  content: string
  createdAt: string
  isRead: boolean
  sender: {
    id: string
    name: string
    email: string
  }
  receiver: {
    id: string
    name: string
    email: string
  }
  item: {
    id: string
    title: string
    imageUrl: string | null
  }
}

const AdminMessagesPage = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterUser, setFilterUser] = useState('')

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/items')
      return
    }

    fetchMessages()
  }, [user, navigate])

  const fetchMessages = async () => {
    try {
      const response = await axios.get('/api/admin/messages')
      setMessages(response.data)
    } catch (error) {
      console.error('Error fetching messages:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredMessages = messages.filter((message) => {
    const matchesSearch = 
      message.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.sender.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.receiver.name.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesUser = filterUser === '' ||
      message.sender.email === filterUser ||
      message.receiver.email === filterUser

    return matchesSearch && matchesUser
  })

  const uniqueUsers = Array.from(
    new Set(
      messages.flatMap(m => [
        `${m.sender.name} (${m.sender.email})`,
        `${m.receiver.name} (${m.receiver.email})`
      ])
    )
  ).sort()

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-12">
      <Container>
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">All Messages</h1>
              <p className="text-gray-600">View all user conversations ({messages.length} total)</p>
            </div>
            <button
              onClick={() => navigate('/items')}
              className="btn-primary flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Browse Items to Message
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="card p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search Messages
              </label>
              <input
                type="text"
                placeholder="Search by content, item, or user..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filter by User
              </label>
              <select
                value={filterUser}
                onChange={(e) => setFilterUser(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="">All Users</option>
                {uniqueUsers.map((user) => (
                  <option key={user} value={user.match(/\((.*?)\)/)?.[1] || ''}>
                    {user}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="card p-4 bg-gradient-to-br from-blue-50 to-white">
            <p className="text-sm text-gray-600">Total Messages</p>
            <p className="text-2xl font-bold text-gray-900">{messages.length}</p>
          </div>
          <div className="card p-4 bg-gradient-to-br from-green-50 to-white">
            <p className="text-sm text-gray-600">Filtered Results</p>
            <p className="text-2xl font-bold text-gray-900">{filteredMessages.length}</p>
          </div>
          <div className="card p-4 bg-gradient-to-br from-purple-50 to-white">
            <p className="text-sm text-gray-600">Unique Conversations</p>
            <p className="text-2xl font-bold text-gray-900">
              {new Set(messages.map(m => `${m.sender.id}-${m.receiver.id}-${m.item.id}`)).size}
            </p>
          </div>
        </div>

        {/* Messages List */}
        <div className="space-y-4">
          {filteredMessages.length === 0 ? (
            <div className="card p-12 text-center">
              <p className="text-gray-500">No messages found</p>
            </div>
          ) : (
            filteredMessages.map((message) => (
              <div key={message.id} className="card p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  {/* Item Image */}
                  {message.item.imageUrl && (
                    <img
                      src={message.item.imageUrl}
                      alt={message.item.title}
                      className="w-20 h-20 object-cover rounded"
                    />
                  )}
                  
                  {/* Message Content */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">
                          About: <span className="font-medium text-gray-900">{message.item.title}</span>
                        </p>
                        <div className="flex items-center gap-2 text-sm">
                          <span className="font-medium text-primary-600">{message.sender.name}</span>
                          <span className="text-gray-400">→</span>
                          <span className="font-medium text-purple-600">{message.receiver.name}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <span>{message.sender.email}</span>
                          <span>→</span>
                          <span>{message.receiver.email}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-500">
                          {new Date(message.createdAt).toLocaleDateString()} {new Date(message.createdAt).toLocaleTimeString()}
                        </p>
                        {!message.isRead && (
                          <span className="inline-block mt-1 px-2 py-1 bg-red-100 text-red-600 text-xs rounded-full">
                            Unread
                          </span>
                        )}
                      </div>
                    </div>
                    
                    {/* Message Text */}
                    <div className="bg-gray-50 rounded-lg p-4 mt-3">
                      <p className="text-gray-800">{message.content}</p>
                    </div>

                    {/* Admin Actions */}
                    <div className="flex gap-2 mt-3">
                      <button
                        onClick={() => navigate(`/messages/${message.item.id}?userId=${message.sender.id}`)}
                        className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                      >
                        View Conversation →
                      </button>
                      <button
                        onClick={() => navigate(`/messages/${message.item.id}`)}
                        className="text-sm text-purple-600 hover:text-purple-700 font-medium"
                      >
                        Send Reply →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </Container>
    </div>
  )
}

export default AdminMessagesPage
