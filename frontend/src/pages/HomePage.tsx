import { Link, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Container from '../components/ui/Container'

const HomePage = () => {
  const { user } = useAuth()

  // Redirect logged-in users to appropriate page
  if (user?.role === 'admin') {
    return <Navigate to="/admin" replace />
  }
  if (user) {
    return <Navigate to="/items" replace />
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-primary-100 py-20">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Give Items a Second Life
            </h1>
            <p className="text-xl text-gray-700 mb-8">
              Join the sustainable revolution. Exchange, give away, or sell unused items 
              and reduce waste together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/items" className="btn-primary inline-block">
                Browse Items
              </Link>
              <Link to="/post-item" className="btn-secondary inline-block">
                Post an Item
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <Container>
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            How EcoSwap Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">📸</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">List Your Items</h3>
              <p className="text-gray-600">
                Take a photo, add details, and post items you no longer need in minutes.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🔍</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Find What You Need</h3>
              <p className="text-gray-600">
                Browse items in your area and discover treasures waiting for a new home.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🌍</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Make an Impact</h3>
              <p className="text-gray-600">
                Reduce waste, save money, and contribute to a more sustainable future.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-600 py-16">
        <Container>
          <div className="text-center text-white">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-xl mb-8 text-primary-100">
              Join thousands of users making a difference today.
            </p>
            <Link to="/register" className="bg-white text-primary-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-all inline-block shadow-lg">
              Create Your Account
            </Link>
          </div>
        </Container>
      </section>
    </div>
  )
}

export default HomePage
