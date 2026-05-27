import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import axios from 'axios'
import Container from '../components/ui/Container'

interface Message {
  id: string
  itemId: string
  senderId: string
  receiverId: string
  content: string
  isRead: boolean
  createdAt: string
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
    imageUrl?: string
  }
}

const MessagesPage = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!user) {
      navigate('/login')
      return
    }
    fetchMessages()
  }, [user])

  const fetchMessages = async () => {
    try {
      const response = await axios.get('/api/messages')
      setMessages(response.data)
    } catch (error: any) {
      console.error('Error fetching messages:', error)
      setError('Failed to load messages')
    } finally {
      setLoading(false)
    }
  }

  const groupMessagesByItem = () => {
    const grouped: { [key: string]: Message[] } = {}
    messages.forEach(msg => {
      if (!grouped[msg.itemId]) {
        grouped[msg.itemId] = []
      }
      grouped[msg.itemId].push(msg)
    })
    return grouped
  }

  const getOtherPerson = (message: Message) => {
    return message.senderId === user?.id ? message.receiver : message.sender
  }

  const getLastMessage = (itemMessages: Message[]) => {
    return itemMessages[0] // Already sorted by createdAt desc
  }

  if (!user) return null

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary-600 border-r-transparent"></div>
      </div>
    )
  }

  const groupedMessages = groupMessagesByItem()

  return (
    <div className="py-12">
      <Container>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Messages</h1>
          <p className="text-gray-600">Your conversations about items</p>
        </div>

        {error ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-8 text-center">
            <p className="text-red-700">{error}</p>
            <button onClick={fetchMessages} className="btn-primary mt-4">
              Retry
            </button>
          </div>
        ) : Object.keys(groupedMessages).length > 0 ? (
          <div className="space-y-4">
            {Object.entries(groupedMessages).map(([itemId, itemMessages]) => {
              const lastMsg = getLastMessage(itemMessages)
              const otherPerson = getOtherPerson(lastMsg)
              const unreadCount = itemMessages.filter(
                m => m.receiverId === user.id && !m.isRead
              ).length

              return (
                <div
                  key={itemId}
                  onClick={() => navigate(`/messages/${itemId}`)}
                  className="card p-4 hover:shadow-lg transition-shadow cursor-pointer"
                >
                  <div className="flex gap-4">
                    <div className="w-20 h-20 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                      {lastMsg.item.imageUrl ? (
                        <img
                          src={lastMsg.item.imageUrl}
                          alt={lastMsg.item.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-100 to-primary-200">
                          <span className="text-3xl">📦</span>
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-1">
                        <h3 className="font-semibold text-gray-900 truncate">
                          {lastMsg.item.title}
                        </h3>
                        {unreadCount > 0 && (
                          <span className="bg-primary-600 text-white text-xs px-2 py-1 rounded-full ml-2">
                            {unreadCount}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        Conversation with {otherPerson.name}
                      </p>
                      <p className="text-sm text-gray-500 truncate">
                        {lastMsg.content}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {new Date(lastMsg.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">💬</div>
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">No messages yet</h2>
            <p className="text-gray-500 mb-6">Start a conversation about an item</p>
            <button
              onClick={() => navigate('/items')}
              className="btn-primary"
            >
              Browse Items
            </button>
          </div>
        )}
      </Container>
    </div>
  )
}

export default MessagesPage
