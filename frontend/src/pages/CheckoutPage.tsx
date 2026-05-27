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
  price: number
  location: string
  imageUrl?: string
  sold?: boolean
  user: {
    name: string
    location: string
  }
}

const CheckoutPage = () => {
  const { id } = useParams()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [item, setItem] = useState<Item | null>(null)
  const [loading, setLoading] = useState(true)
  const [processing, setProcessing] = useState(false)
  const [formData, setFormData] = useState({
    buyerName: user?.name || '',
    buyerEmail: user?.email || '',
    buyerPhone: '',
    shippingAddress: '',
    paymentMethod: 'credit_card'
  })

  useEffect(() => {
    if (!user) {
      navigate('/login')
      return
    }
    fetchItem()
  }, [id, user])

  const fetchItem = async () => {
    try {
      const response = await axios.get(`/api/items/${id}`)
      setItem(response.data)
    } catch (error) {
      console.error('Error fetching item:', error)
      alert('Failed to load item')
      navigate('/items')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setProcessing(true)

    try {
      const response = await axios.post('/api/orders', {
        itemId: id,
        ...formData
      })

      // Success - redirect to order success page
      navigate(`/orders/${response.data.id}`)
    } catch (error: any) {
      console.error('Error processing payment:', error)
      const errorMessage = error.response?.data?.message || 'Payment failed. Please try again.'
      
      // Show error in a more user-friendly way
      const errorDiv = document.createElement('div')
      errorDiv.className = 'fixed top-4 right-4 bg-red-100 border-2 border-red-400 text-red-800 px-6 py-4 rounded-lg shadow-lg z-50 max-w-md'
      errorDiv.innerHTML = `
        <div class="flex items-start gap-3">
          <span class="text-2xl">⚠️</span>
          <div>
            <p class="font-semibold">Payment Failed</p>
            <p class="text-sm mt-1">${errorMessage}</p>
          </div>
        </div>
      `
      document.body.appendChild(errorDiv)
      setTimeout(() => errorDiv.remove(), 5000)
      setProcessing(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary-600 border-r-transparent"></div>
      </div>
    )
  }

  if (!item) return null

  // Check if item is sold
  if (item.sold) {
    return (
      <Container className="py-12">
        <div className="max-w-2xl mx-auto">
          <div className="card p-12 text-center">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">⚠️</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-3">Item Already Sold</h1>
            <p className="text-gray-600 mb-6">
              Sorry, this item has already been purchased by another buyer.
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => navigate('/items')}
                className="btn-primary"
              >
                Browse Other Items
              </button>
              <button
                onClick={() => navigate(-1)}
                className="btn-secondary"
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      </Container>
    )
  }

  return (
    <Container className="py-12">
      {/* Processing Overlay */}
      {processing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-sm mx-4 text-center shadow-2xl">
            <div className="inline-block h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary-600 border-r-transparent mb-4"></div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Processing Payment</h3>
            <p className="text-gray-600">Please wait while we process your order...</p>
            <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-500">
              <span className="inline-block w-2 h-2 bg-primary-600 rounded-full animate-pulse"></span>
              <span className="inline-block w-2 h-2 bg-primary-600 rounded-full animate-pulse delay-75"></span>
              <span className="inline-block w-2 h-2 bg-primary-600 rounded-full animate-pulse delay-150"></span>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Secure Checkout</h1>
          <p className="text-gray-600">Complete your purchase securely</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Item Summary */}
          <div className="card p-8 shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Order Summary</h2>
            </div>
            
            <div className="space-y-6">
              <div className="flex gap-4 p-4 bg-gray-50 rounded-xl">
                <div className="w-28 h-28 bg-gray-200 rounded-xl overflow-hidden flex-shrink-0 shadow-md">
                  {item.imageUrl ? (
                    <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-primary-100">
                      <span className="text-4xl">📦</span>
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 text-lg mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600 line-clamp-2 mb-3">{item.description}</p>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span className="font-medium">{item.user.name}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>{item.user.location}</span>
                  </div>
                </div>
              </div>

              <div className="border-t-2 pt-4 space-y-3">
                <div className="flex justify-between items-center text-gray-700">
                  <span className="font-medium">Item Price</span>
                  <span className="font-semibold">${item.price.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-gray-700">
                  <span className="font-medium">Shipping</span>
                  <span className="text-green-600 font-semibold">Free</span>
                </div>
                <div className="border-t-2 pt-3 flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-900">Total</span>
                  <span className="text-2xl font-bold text-primary-600">${item.price.toFixed(2)}</span>
                </div>
              </div>

              <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <span className="text-xl">🔒</span>
                  <div>
                    <p className="font-semibold text-green-900 text-sm">Secure Payment</p>
                    <p className="text-green-800 text-xs mt-1">Your payment information is protected and encrypted</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Form */}
          <div className="card p-8 shadow-lg">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Payment Details</h2>
            </div>
            <p className="text-sm text-gray-500 mb-6">
              Fields marked with <span className="text-red-500 font-semibold">*</span> are required
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <span className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Full Name <span className="text-red-500">*</span>
                  </span>
                </label>
                <input
                  type="text"
                  value={formData.buyerName}
                  onChange={(e) => setFormData({ ...formData, buyerName: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all placeholder-gray-400"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <span className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Email Address <span className="text-red-500">*</span>
                  </span>
                </label>
                <input
                  type="email"
                  value={formData.buyerEmail}
                  onChange={(e) => setFormData({ ...formData, buyerEmail: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all placeholder-gray-400"
                  placeholder="your.email@example.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <span className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    Phone Number <span className="text-gray-400 text-xs font-normal">(Optional)</span>
                  </span>
                </label>
                <input
                  type="tel"
                  value={formData.buyerPhone}
                  onChange={(e) => setFormData({ ...formData, buyerPhone: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all placeholder-gray-400"
                  placeholder="+1 (555) 123-4567"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <span className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Shipping Address <span className="text-red-500">*</span>
                  </span>
                </label>
                <textarea
                  value={formData.shippingAddress}
                  onChange={(e) => setFormData({ ...formData, shippingAddress: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all min-h-[90px] resize-none placeholder-gray-400"
                  placeholder="123 Main Street&#10;City, State 12345"
                  required
                />
              </div>

              <div className="pt-2">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  <span className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                    Payment Method <span className="text-red-500">*</span> 
                    <span className="text-gray-400 text-xs font-normal ml-1">(Demo Mode)</span>
                  </span>
                </label>
                <div className="space-y-3">
                  <label className="flex items-center p-4 border-2 rounded-xl cursor-pointer hover:bg-gray-50 hover:border-primary-300 transition-all has-[:checked]:border-primary-500 has-[:checked]:bg-primary-50 has-[:checked]:shadow-md">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="credit_card"
                      checked={formData.paymentMethod === 'credit_card'}
                      onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                      className="mr-3 w-5 h-5 text-primary-600"
                      required
                    />
                    <span className="flex items-center gap-2 font-semibold text-gray-800">
                      💳 Credit Card
                    </span>
                    {formData.paymentMethod === 'credit_card' && (
                      <span className="ml-auto text-primary-600 text-sm font-medium">Selected ✓</span>
                    )}
                  </label>
                  <label className="flex items-center p-4 border-2 rounded-xl cursor-pointer hover:bg-gray-50 hover:border-primary-300 transition-all has-[:checked]:border-primary-500 has-[:checked]:bg-primary-50 has-[:checked]:shadow-md">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="paypal"
                      checked={formData.paymentMethod === 'paypal'}
                      onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                      className="mr-3 w-5 h-5 text-primary-600"
                      required
                    />
                    <span className="flex items-center gap-2 font-semibold text-gray-800">
                      💰 PayPal
                    </span>
                    {formData.paymentMethod === 'paypal' && (
                      <span className="ml-auto text-primary-600 text-sm font-medium">Selected ✓</span>
                    )}
                  </label>
                  <label className="flex items-center p-4 border-2 rounded-xl cursor-pointer hover:bg-gray-50 hover:border-primary-300 transition-all has-[:checked]:border-primary-500 has-[:checked]:bg-primary-50 has-[:checked]:shadow-md">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cash"
                      checked={formData.paymentMethod === 'cash'}
                      onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                      className="mr-3 w-5 h-5 text-primary-600"
                      required
                    />
                    <span className="flex items-center gap-2 font-semibold text-gray-800">
                      💵 Cash on Pickup
                    </span>
                    {formData.paymentMethod === 'cash' && (
                      <span className="ml-auto text-primary-600 text-sm font-medium">Selected ✓</span>
                    )}
                  </label>
                </div>
              </div>

              <div className="bg-gradient-to-r from-yellow-50 to-amber-50 border-2 border-yellow-300 rounded-xl p-4 text-sm">
                <div className="flex items-start gap-3">
                  <span className="text-xl">🚧</span>
                  <div>
                    <p className="font-semibold text-yellow-900">Prototype Mode</p>
                    <p className="text-yellow-800 mt-1">This is a demo checkout. No real payment will be processed.</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => navigate(`/items/${id}`)}
                  className="flex-1 px-6 py-3.5 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 hover:border-gray-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={processing}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3.5 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl font-semibold hover:from-primary-700 hover:to-primary-800 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  disabled={processing}
                >
                  {processing ? (
                    <>
                      <div className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-white border-r-transparent"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Complete Payment - ${item.price.toFixed(2)}
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default CheckoutPage
