import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
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

const ConversationPage = () => {
  const { itemId } = useParams()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [loading, setLoading] = useState(true)
  const [sending, setSending] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!user) {
      navigate('/login')
      return
    }
    fetchConversation()
  }, [itemId, user])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const fetchConversation = async () => {
    try {
      const response = await axios.get(`/api/messages/conversation/${itemId}`)
      setMessages(response.data)
      // Mark messages as read
      response.data
        .filter((msg: Message) => msg.receiverId === user?.id && !msg.isRead)
        .forEach((msg: Message) => {
          axios.patch(`/api/messages/${msg.id}/read`)
        })
    } catch (error) {
      console.error('Error fetching conversation:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim() || !itemId) return

    setSending(true)
    try {
      // Get the other person's ID from existing messages or item owner
      let receiverId = ''
      if (messages.length > 0) {
        const lastMsg = messages[0]
        receiverId = lastMsg.senderId === user?.id ? lastMsg.receiverId : lastMsg.senderId
      } else {
        // Need to get item owner ID
        const itemResponse = await axios.get(`/api/items/${itemId}`)
        receiverId = itemResponse.data.userId
      }

      const response = await axios.post('/api/messages', {
        itemId,
        receiverId,
        content: newMessage.trim()
      })

      setMessages([...messages, response.data])
      setNewMessage('')
    } catch (error) {
      console.error('Error sending message:', error)
      alert('Failed to send message')
    } finally {
      setSending(false)
    }
  }

  if (!user || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary-600 border-r-transparent"></div>
      </div>
    )
  }

  const itemInfo = messages[0]?.item

  return (
    <div className="py-12">
      <Container>
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-6">
            <button
              onClick={() => navigate('/messages')}
              className="text-primary-600 hover:underline mb-4 flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Messages
            </button>
            {itemInfo && (
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden">
                  {itemInfo.imageUrl ? (
                    <img src={itemInfo.imageUrl} alt={itemInfo.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-100 to-primary-200">
                      <span className="text-2xl">📦</span>
                    </div>
                  )}
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{itemInfo.title}</h1>
                  <button
                    onClick={() => navigate(`/items/${itemId}`)}
                    className="text-sm text-primary-600 hover:underline"
                  >
                    View Item
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Messages */}
          <div className="card p-6 mb-4" style={{ height: '500px', overflowY: 'auto' }}>
            {messages.length > 0 ? (
              <div className="space-y-4">
                {messages.map((message) => {
                  const isMe = message.senderId === user.id
                  return (
                    <div key={message.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-xs lg:max-w-md ${isMe ? 'order-2' : 'order-1'}`}>
                        <div className={`rounded-lg p-3 ${
                          isMe 
                            ? 'bg-primary-600 text-white' 
                            : 'bg-gray-100 text-gray-900'
                        }`}>
                          {!isMe && (
                            <p className="text-xs font-semibold mb-1">{message.sender.name}</p>
                          )}
                          <p className="text-sm">{message.content}</p>
                        </div>
                        <p className={`text-xs text-gray-500 mt-1 ${isMe ? 'text-right' : 'text-left'}`}>
                          {new Date(message.createdAt).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  )
                })}
                <div ref={messagesEndRef} />
              </div>
            ) : (
              <div className="text-center text-gray-500 mt-20">
                <p>No messages yet. Start the conversation!</p>
              </div>
            )}
          </div>

          {/* Input */}
          <form onSubmit={handleSend} className="flex gap-3">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="input-field flex-1"
              disabled={sending}
            />
            <button
              type="submit"
              disabled={sending || !newMessage.trim()}
              className="btn-primary px-8"
            >
              {sending ? 'Sending...' : 'Send'}
            </button>
          </form>
        </div>
      </Container>
    </div>
  )
}

export default ConversationPage
