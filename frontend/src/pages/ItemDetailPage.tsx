import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Container from '../components/ui/Container'
import { useAuth } from '../context/AuthContext'

interface Item {
  id: string
  userId: string
  title: string
  description: string
  category: string
  condition: string
  isFree: boolean
  price?: number
  location: string
  imageUrl?: string
  createdAt: string
  user?: {
    id: string
    name: string
    email: string
    phone?: string
    location: string
  }
}

const ItemDetailPage = () => {
  const { id } = useParams()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [item, setItem] = useState<Item | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchItem()
  }, [id])

  const fetchItem = async () => {
    try {
      const response = await axios.get(`/api/items/${id}`)
      setItem(response.data)
    } catch (error: any) {
      console.error('Error fetching item:', error)
      setError(error.response?.data?.message || 'Failed to load item. Please ensure the backend is running.')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    const confirmMessage = `Are you sure you want to delete "${item?.title}"?\n\nThis action cannot be undone.`
    if (!confirm(confirmMessage)) return

    try {
      await axios.delete(`/api/items/${id}`)
      alert('Item deleted successfully!')
      navigate('/dashboard/my-items')
    } catch (error) {
      console.error('Error deleting item:', error)
      alert('Failed to delete item. Please try again.')
    }
  }

  const handleContactSeller = async () => {
    if (!item?.user || !user) {
      navigate('/login')
      return
    }
    
    // Create or navigate to conversation
    try {
      await axios.post('/api/messages', {
        itemId: id,
        receiverId: item.userId,
        content: `Hi, I'm interested in your item "${item.title}". Is it still available?`
      })
      navigate(`/messages/${id}`)
    } catch (error) {
      console.error('Error starting conversation:', error)
      navigate(`/messages/${id}`)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary-600 border-r-transparent"></div>
      </div>
    )
  }

  if (error) {
    return (
      <Container className="py-12">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-red-50 border border-red-200 rounded-lg p-8">
            <span className="text-6xl mb-4 block">⚠️</span>
            <h1 className="text-2xl font-bold text-red-900 mb-2">Error Loading Item</h1>
            <p className="text-red-700 mb-4">{error}</p>
            <button onClick={() => navigate('/items')} className="btn-primary">
              Back to Items
            </button>
          </div>
        </div>
      </Container>
    )
  }

  if (!item) {
    return (
      <Container className="py-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Item not found</h1>
        </div>
      </Container>
    )
  }

  const isOwner = user?.id === item.userId

  return (
    <div className="py-12">
      <Container>
        <div className="max-w-5xl mx-auto">
          <div className="card overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Image */}
              <div className="h-96 bg-gray-200">
                {item.imageUrl ? (
                  <img 
                    src={item.imageUrl} 
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-100 to-primary-200">
                    <span className="text-9xl">📦</span>
                  </div>
                )}
              </div>

              {/* Details */}
              <div className="p-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">{item.title}</h1>

                {/* Price or Free Badge */}
                <div className="mb-6">
                  {item.isFree ? (
                    <span className="bg-primary-100 text-primary-700 px-6 py-2 rounded-full text-lg font-semibold inline-block">
                      Free
                    </span>
                  ) : (
                    <span className="text-4xl font-bold text-primary-600">
                      ${item.price}
                    </span>
                  )}
                </div>

                {/* Description */}
                <div className="mb-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-2">Description</h2>
                  <p className="text-gray-700 leading-relaxed">{item.description}</p>
                </div>

                {/* Details Grid */}
                <div className="space-y-4 mb-6">
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-gray-500 w-32">Category:</span>
                    <span className="text-gray-900 bg-gray-100 px-3 py-1 rounded-full text-sm">
                      {item.category}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-gray-500 w-32">Condition:</span>
                    <span className="text-gray-900">{item.condition}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-gray-500 w-32">Location:</span>
                    <span className="text-gray-900 flex items-center">
                      <svg className="w-4 h-4 mr-1 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {item.location}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-gray-500 w-32">Posted:</span>
                    <span className="text-gray-900">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                {/* Seller Info (only show if not owner) */}
                {!isOwner && item.user && (
                  <div className="bg-gray-50 rounded-lg p-4 mb-6">
                    <h3 className="text-sm font-semibold text-gray-700 mb-2">Seller Information</h3>
                    <div className="space-y-2">
                      <p className="text-gray-900 font-medium">{item.user.name}</p>
                      <p className="text-sm text-gray-600 flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {item.user.location}
                      </p>
                    </div>
                  </div>
                )}

                {/* Actions */}
                {isOwner ? (
                  <div className="flex gap-3">
                    <button 
                      onClick={() => navigate(`/items/${id}/edit`)}
                      className="flex-1 bg-white border-2 border-primary-600 text-primary-600 px-6 py-3 rounded-lg font-medium hover:bg-primary-50 transition-all flex items-center justify-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Edit
                    </button>
                    <button 
                      onClick={handleDelete} 
                      className="flex-1 bg-red-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-700 transition-all flex items-center justify-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Delete
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {!item.isFree && (
                      <button 
                        onClick={() => navigate(`/checkout/${id}`)}
                        className="btn-primary w-full flex items-center justify-center gap-2"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        Buy Now - ${item.price?.toFixed(2)}
                      </button>
                    )}
                    <button 
                      onClick={handleContactSeller}
                      className={`w-full flex items-center justify-center gap-2 ${
                        item.isFree ? 'btn-primary' : 'bg-white border-2 border-primary-600 text-primary-600 px-6 py-3 rounded-lg font-medium hover:bg-primary-50 transition-all'
                      }`}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      {item.isFree ? 'Contact Owner' : 'Message Seller'}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default ItemDetailPage
