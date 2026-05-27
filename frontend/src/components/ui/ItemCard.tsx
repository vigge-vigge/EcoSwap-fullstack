import { Link } from 'react-router-dom'

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
  sold?: boolean
  createdAt: string
}

interface ItemCardProps {
  item: Item
}

const ItemCard = ({ item }: ItemCardProps) => {
  return (
    <Link to={`/items/${item.id}`} className="card overflow-hidden group">
      {/* Image */}
      <div className="h-48 bg-gray-200 overflow-hidden relative">
        {item.imageUrl ? (
          <img 
            src={item.imageUrl} 
            alt={item.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-100 to-primary-200">
            <span className="text-6xl">📦</span>
          </div>
        )}
        {/* SOLD Badge */}
        {item.sold && (
          <div className="absolute top-3 right-3 bg-red-600 text-white px-4 py-2 rounded-lg font-bold text-sm shadow-lg transform rotate-3">
            SOLD
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">
          {item.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {item.description}
        </p>

        {/* Meta Info */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
            {item.category}
          </span>
          <span className="text-xs text-gray-500">
            {item.condition}
          </span>
        </div>

        {/* Location */}
        <div className="flex items-center text-sm text-gray-500 mb-3">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {item.location}
        </div>

        {/* Price or Free Badge */}
        <div className="flex items-center justify-between">
          {item.isFree ? (
            <span className="bg-primary-100 text-primary-700 px-4 py-1.5 rounded-full text-sm font-semibold">
              Free
            </span>
          ) : (
            <span className="text-2xl font-bold text-primary-600">
              ${item.price}
            </span>
          )}
          <span className="text-primary-600 font-medium group-hover:underline">
            View →
          </span>
        </div>
      </div>
    </Link>
  )
}

export default ItemCard
