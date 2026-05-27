import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import axios from 'axios'
import Container from '../components/ui/Container'
import ItemCard from '../components/ui/ItemCard'

interface Item {
  id: string
  title: string
  description: string
  category: string
  condition: string
  isFree: boolean
  price?: number
  location: string
  imageUrl?: string
  createdAt: string
}

const MyItemsPage = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [items, setItems] = useState<Item[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!user) {
      navigate('/login')
      return
    }
    fetchMyItems()
  }, [user])

  const fetchMyItems = async () => {
    try {
      const response = await axios.get('/api/items/my-items')
      setItems(response.data)
    } catch (error: any) {
      console.error('Error fetching my items:', error)
      setError(error.response?.data?.message || 'Failed to load your items. Please ensure the backend is running.')
    } finally {
      setLoading(false)
    }
  }

  if (!user) return null

  return (
    <div className="py-12">
      <Container>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Items</h1>
          <p className="text-gray-600">Manage your posted items</p>
        </div>

        {error ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-8 text-center">
            <span className="text-6xl mb-4 block">⚠️</span>
            <h2 className="text-2xl font-semibold text-red-900 mb-2">Error Loading Items</h2>
            <p className="text-red-700 mb-4">{error}</p>
            <button onClick={fetchMyItems} className="btn-primary">
              Retry
            </button>
          </div>
        ) : loading ? (
          <div className="text-center py-12">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary-600 border-r-transparent"></div>
          </div>
        ) : items.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {items.map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📦</div>
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">No items yet</h2>
            <p className="text-gray-500 mb-6">Start by posting your first item</p>
            <button
              onClick={() => navigate('/post-item')}
              className="btn-primary"
            >
              Post an Item
            </button>
          </div>
        )}
      </Container>
    </div>
  )
}

export default MyItemsPage
