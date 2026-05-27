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
  buyer: {
    id: string
    name: string
    email: string
  }
}

const MySalesPage = () => {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null)

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      const response = await api.get('/api/orders/sales')
      setOrders(response.data)
    } catch (error) {
      console.error('Failed to fetch orders:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      setUpdatingStatus(orderId)
      await api.patch(
        `/api/orders/${orderId}/status`,
        { status: newStatus }
      )
      // Update local state
      setOrders(orders.map(order => 
        order.id === orderId ? { ...order, status: newStatus } : order
      ))
    } catch (error) {
      console.error('Failed to update status:', error)
      alert('Failed to update order status')
    } finally {
      setUpdatingStatus(null)
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

  const getNextStatus = (currentStatus: string) => {
    const statusFlow = {
      'pending': 'confirmed',
      'confirmed': 'shipped',
      'shipped': 'delivered'
    }
    return statusFlow[currentStatus as keyof typeof statusFlow]
  }

  const getStatusLabel = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1)
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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Sales</h1>
        <p className="text-gray-600">Manage your orders and shipments</p>
      </div>

      {orders.length === 0 ? (
        <div className="card p-12 text-center">
          <div className="text-6xl mb-4">📦</div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">No sales yet</h2>
          <p className="text-gray-600 mb-6">When someone purchases your items, they'll appear here</p>
          <Link to="/items/post" className="btn-primary inline-block">
            Post an Item
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

                  {/* Buyer Info */}
                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      Buyer Information
                    </h4>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <span className="text-gray-500">Name:</span>
                        <span className="ml-2 font-medium text-gray-900">{order.buyerName}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Email:</span>
                        <span className="ml-2 font-medium text-gray-900">{order.buyerEmail}</span>
                      </div>
                      {order.buyerPhone && (
                        <div>
                          <span className="text-gray-500">Phone:</span>
                          <span className="ml-2 font-medium text-gray-900">{order.buyerPhone}</span>
                        </div>
                      )}
                      <div>
                        <span className="text-gray-500">Payment:</span>
                        <span className="ml-2 font-medium text-gray-900">{order.paymentMethod.replace('_', ' ')}</span>
                      </div>
                    </div>
                    {order.shippingAddress && (
                      <div className="mt-3 pt-3 border-t">
                        <span className="text-gray-500 text-sm">Shipping Address:</span>
                        <p className="font-medium text-gray-900 mt-1">{order.shippingAddress}</p>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold text-primary-600">
                      ${order.amount.toFixed(2)}
                    </div>
                    <div className="flex gap-3">
                      {getNextStatus(order.status) && (
                        <button
                          onClick={() => updateOrderStatus(order.id, getNextStatus(order.status)!)}
                          disabled={updatingStatus === order.id}
                          className="btn-primary flex items-center gap-2"
                        >
                          {updatingStatus === order.id ? (
                            <>
                              <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Updating...
                            </>
                          ) : (
                            <>
                              Mark as {getStatusLabel(getNextStatus(order.status)!)}
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </>
                          )}
                        </button>
                      )}
                      {order.status === 'pending' && (
                        <button
                          onClick={() => updateOrderStatus(order.id, 'cancelled')}
                          disabled={updatingStatus === order.id}
                          className="btn-secondary"
                        >
                          Cancel Order
                        </button>
                      )}
                    </div>
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

export default MySalesPage
