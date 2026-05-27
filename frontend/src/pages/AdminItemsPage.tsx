import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Container from '../components/ui/Container'
import axios from 'axios'

interface Item {
  id: string
  title: string
  description: string
  category: string
  condition: string
  isFree: boolean
  price: number | null
  location: string
  imageUrl: string | null
  createdAt: string
  user: {
    id: string
    name: string
    email: string
    location: string | null
  }
  _count: {
    messages: number
  }
}

const AdminItemsPage = () => {
  const { user: currentUser } = useAuth()
  const navigate = useNavigate()
  const [items, setItems] = useState<Item[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    if (!currentUser || currentUser.role !== 'admin') {
      navigate('/items')
      return
    }

    fetchItems()
  }, [currentUser, navigate])

  const fetchItems = async () => {
    try {
      const response = await axios.get('/api/admin/items')
      setItems(response.data)
    } catch (error) {
      console.error('Error fetching items:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteItem = async (itemId: string, itemTitle: string) => {
    if (!window.confirm(`Are you sure you want to delete "${itemTitle}"?`)) {
      return
    }

    try {
      await axios.delete(`/api/admin/items/${itemId}`)
      setItems(items.filter(item => item.id !== itemId))
    } catch (error) {
      console.error('Error deleting item:', error)
      alert('Failed to delete item')
    }
  }

  const filteredItems = filter === 'all' 
    ? items 
    : items.filter(item => item.category === filter)

  const categories = Array.from(new Set(items.map(item => item.category)))

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
          <button
            onClick={() => navigate('/admin')}
            className="text-primary-600 hover:text-primary-700 mb-4 flex items-center gap-2"
          >
            ← Back to Dashboard
          </button>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Item Moderation</h1>
          <p className="text-gray-600">Total Items: {items.length}</p>
        </div>

        {/* Filter */}
        <div className="mb-6 flex gap-2 flex-wrap">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === 'all' ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All ({items.length})
          </button>
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === category ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category} ({items.filter(i => i.category === category).length})
            </button>
          ))}
        </div>

        {/* Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div key={item.id} className="card overflow-hidden">
              {item.imageUrl && (
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-gray-900">{item.title}</h3>
                  <span className="text-primary-600 font-medium whitespace-nowrap ml-2">
                    {item.isFree ? 'Free' : `€${item.price}`}
                  </span>
                </div>
                
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{item.description}</p>
                
                <div className="space-y-1 text-xs text-gray-500 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Posted by:</span>
                    <span>{item.user.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Email:</span>
                    <span>{item.user.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Location:</span>
                    <span>{item.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Category:</span>
                    <span>{item.category}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Condition:</span>
                    <span>{item.condition}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Messages:</span>
                    <span>{item._count.messages}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Posted:</span>
                    <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => navigate(`/items/${item.id}`)}
                    className="flex-1 btn-secondary text-sm py-2"
                  >
                    View
                  </button>
                  <button
                    onClick={() => handleDeleteItem(item.id, item.title)}
                    className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No items found in this category
          </div>
        )}
      </Container>
    </div>
  )
}

export default AdminItemsPage
