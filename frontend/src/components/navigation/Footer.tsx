import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">🌱</span>
              </div>
              <span className="text-2xl font-bold text-white">EcoSwap</span>
            </div>
            <p className="text-gray-400 max-w-md">
              Join the sustainable revolution. Exchange, give away, or sell unused items and reduce waste together.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/items" className="hover:text-primary-400 transition-colors">
                  Browse Items
                </Link>
              </li>
              <li>
                <Link to="/post-item" className="hover:text-primary-400 transition-colors">
                  Post Item
                </Link>
              </li>
              <li>
                <Link to="/dashboard/my-items" className="hover:text-primary-400 transition-colors">
                  My Items
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="text-gray-400">support@ecoswap.com</li>
              <li className="text-gray-400">Community driven</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} EcoSwap. All rights reserved. Building a sustainable future together.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
