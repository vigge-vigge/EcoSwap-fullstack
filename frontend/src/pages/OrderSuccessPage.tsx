import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Container from '../components/ui/Container'
import { useAuth } from '../context/AuthContext'

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
    description: string
    imageUrl?: string
  }
  seller: {
    name: string
    email: string
    location: string
  }
}

const OrderSuccessPage = () => {
  const { id } = useParams()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) {
      navigate('/login')
      return
    }
    fetchOrder()
  }, [id, user])

  const fetchOrder = async () => {
    try {
      const response = await axios.get(`/api/orders/${id}`)
      setOrder(response.data)
    } catch (error) {
      console.error('Error fetching order:', error)
      alert('Failed to load order')
      navigate('/items')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary-600 border-r-transparent"></div>
      </div>
    )
  }

  if (!order) return null

  return (
    <Container className="py-12">
      <div className="max-w-2xl mx-auto">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment Successful!</h1>
          <p className="text-gray-600">Your order has been confirmed</p>
        </div>

        {/* Order Details Card */}
        <div className="card p-6 mb-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Order #{order.id.slice(0, 8)}</h2>
              <p className="text-sm text-gray-500">
                {new Date(order.createdAt).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>
            <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
              {order.status}
            </span>
          </div>

          {/* Item Info */}
          <div className="border-t border-b py-4 mb-4">
            <div className="flex gap-4">
              <div className="w-20 h-20 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                {order.item.imageUrl ? (
                  <img src={order.item.imageUrl} alt={order.item.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-primary-100">
                    <span className="text-2xl">📦</span>
                  </div>
                )}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{order.item.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{order.item.description.substring(0, 100)}...</p>
                <p className="text-lg font-bold text-primary-600 mt-2">${order.amount.toFixed(2)}</p>
              </div>
            </div>
          </div>

          {/* Delivery & Payment Info */}
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-2">Seller Information</h3>
              <p className="text-sm text-gray-900">{order.seller.name}</p>
              <p className="text-sm text-gray-600">{order.seller.email}</p>
              <p className="text-sm text-gray-600">{order.seller.location}</p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-2">Shipping Address</h3>
              <p className="text-sm text-gray-900">{order.shippingAddress}</p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-2">Payment Method</h3>
              <p className="text-sm text-gray-900 capitalize">{order.paymentMethod.replace('_', ' ')}</p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-2">Contact Information</h3>
              <p className="text-sm text-gray-900">{order.buyerName}</p>
              <p className="text-sm text-gray-600">{order.buyerEmail}</p>
              {order.buyerPhone && <p className="text-sm text-gray-600">{order.buyerPhone}</p>}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={() => navigate('/items')}
            className="flex-1 btn-secondary"
          >
            Continue Shopping
          </button>
          <button
            onClick={() => navigate(`/messages/${order.item.id}`)}
            className="flex-1 btn-primary"
          >
            Message Seller
          </button>
        </div>

        {/* Info Box */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-blue-900 mb-2">What's Next?</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• The seller has been notified of your purchase</li>
            <li>• You can message the seller to coordinate pickup/delivery</li>
            <li>• A confirmation email has been sent to {order.buyerEmail}</li>
          </ul>
        </div>
      </div>
    </Container>
  )
}

export default OrderSuccessPage
