import { useState, useEffect } from 'react'
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
  price?: number | null
  location: string
  imageUrl?: string | null
  createdAt: string
}

const ItemsPage = () => {
  const [items, setItems] = useState<Item[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [locationFilter, setLocationFilter] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    fetchItems()
  }, [])

  const fetchItems = async () => {
    setLoading(true)
    setError(null)
    try {
      const url = searchQuery 
        ? `/api/items?location=${encodeURIComponent(searchQuery)}`
        : '/api/items'
      const response = await axios.get(url)
      setItems(response.data)
    } catch (error: any) {
      console.error('Error fetching items:', error)
      setError(error.response?.data?.message || 'Failed to load items. Please ensure the backend is running.')
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = () => {
    setSearchQuery(locationFilter)
    fetchItems()
  }

  const handleClearFilter = () => {
    setLocationFilter('')
    setSearchQuery('')
    fetchItems()
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <div className="py-12">
      <Container>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Browse Items</h1>
          
          {/* Filter Section */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex flex-col sm:flex-row gap-4 items-end">
              <div className="flex-1">
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                  Filter by Location
                </label>
                <input
                  id="location"
                  type="text"
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="input-field"
                  placeholder="Enter city or state..."
                />
              </div>
              <button
                onClick={handleSearch}
                className="btn-primary whitespace-nowrap"
              >
                Search
              </button>
              {searchQuery && (
                <button
                  onClick={handleClearFilter}
                  className="btn-secondary whitespace-nowrap"
                >
                  Clear Filter
                </button>
              )}
            </div>
          </div>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <span className="text-2xl">⚠️</span>
              <div>
                <h3 className="font-semibold text-red-900 mb-1">Connection Error</h3>
                <p className="text-sm text-red-800 mb-3">{error}</p>
                <button
                  onClick={fetchItems}
                  className="btn-primary text-sm py-1.5 px-4"
                >
                  Retry
                </button>
              </div>
            </div>
          </div>
        )}

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary-600 border-r-transparent"></div>
          </div>
        ) : !error && items.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {items.map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>
        ) : !error && items.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📦</div>
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">No items found</h2>
            <p className="text-gray-500">
              {searchQuery 
                ? 'Try adjusting your location filter'
                : 'Be the first to post an item!'}
            </p>
          </div>
        ) : null}
      </Container>
    </div>
  )
}

export default ItemsPage
