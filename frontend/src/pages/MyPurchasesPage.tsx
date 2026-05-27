import { useState, useEffect } from 'react'
import api from '../config/api'
import { Link } from 'react-router-dom'

interface Order {
  id: string
  amount: number
  status: string
  paymentMethod: string
  buyerName: string
  buyerEmail: string
  buyerPhone?: string
  shippingAddress?: string
  createdAt: string
  item: {
    id: string
    title: string
    imageUrl?: string
  }
  seller: {
    id: string
    name: string
    email: string
    location: string
  }
}

const MyPurchasesPage = () => {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      const response = await api.get('/api/orders/purchases')
      setOrders(response.data)
    } catch (error) {
      console.error('Failed to fetch orders:', error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'confirmed': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'shipped': return 'bg-purple-100 text-purple-800 border-purple-200'
      case 'delivered': return 'bg-green-100 text-green-800 border-green-200'
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getStatusLabel = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1)
  }

  const getStatusMessage = (status: string) => {
    switch (status) {
      case 'pending': return 'Waiting for seller confirmation'
      case 'confirmed': return 'Seller confirmed - preparing for shipment'
      case 'shipped': return 'Item has been shipped'
      case 'delivered': return 'Order completed'
      case 'cancelled': return 'Order was cancelled'
      default: return ''
    }
  }

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center">Loading...</div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Purchases</h1>
        <p className="text-gray-600">Track your orders and delivery status</p>
      </div>

      {orders.length === 0 ? (
        <div className="card p-12 text-center">
          <div className="text-6xl mb-4">🛒</div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">No purchases yet</h2>
          <p className="text-gray-600 mb-6">Start shopping and your orders will appear here</p>
          <Link to="/items" className="btn-primary inline-block">
            Browse Items
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="card p-6 hover:shadow-lg transition-shadow">
              <div className="flex gap-6">
                {/* Item Image */}
                <div className="w-32 h-32 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                  {order.item.imageUrl ? (
                    <img src={order.item.imageUrl} alt={order.item.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-primary-100">
                      <span className="text-4xl">📦</span>
                    </div>
                  )}
                </div>

                {/* Order Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{order.item.title}</h3>
                      <p className="text-sm text-gray-500">
                        Order #{order.id.slice(0, 8)}... • {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <span className={`px-4 py-2 rounded-full text-sm font-semibold border-2 ${getStatusColor(order.status)}`}>
                      {getStatusLabel(order.status)}
                    </span>
                  </div>

                  {/* Status Message */}
                  <div className="mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{getStatusMessage(order.status)}</span>
                    </div>
                  </div>

                  {/* Seller Info */}
                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      Seller Information
                    </h4>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <span className="text-gray-500">Seller:</span>
                        <span className="ml-2 font-medium text-gray-900">{order.seller.name}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Location:</span>
                        <span className="ml-2 font-medium text-gray-900">{order.seller.location}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Email:</span>
                        <span className="ml-2 font-medium text-gray-900">{order.seller.email}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Payment:</span>
                        <span className="ml-2 font-medium text-gray-900">{order.paymentMethod.replace('_', ' ')}</span>
                      </div>
                    </div>
                  </div>

                  {/* Delivery Address */}
                  {order.shippingAddress && (
                    <div className="bg-blue-50 rounded-lg p-4 mb-4">
                      <div className="flex items-start gap-2">
                        <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <div>
                          <span className="text-sm font-semibold text-blue-900">Delivery Address</span>
                          <p className="text-sm text-blue-800 mt-1">{order.shippingAddress}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Amount */}
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold text-primary-600">
                      ${order.amount.toFixed(2)}
                    </div>
                    {order.status === 'pending' && (
                      <div className="text-sm text-yellow-700 bg-yellow-50 px-4 py-2 rounded-lg border border-yellow-200">
                        💳 Payment received - Awaiting seller confirmation
                      </div>
                    )}
                    {order.status === 'shipped' && (
                      <div className="text-sm text-purple-700 bg-purple-50 px-4 py-2 rounded-lg border border-purple-200">
                        📦 Your item is on the way!
                      </div>
                    )}
                    {order.status === 'delivered' && (
                      <div className="text-sm text-green-700 bg-green-50 px-4 py-2 rounded-lg border border-green-200">
                        ✅ Order completed
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default MyPurchasesPage
