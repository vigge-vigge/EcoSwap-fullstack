import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import MainLayout from './layouts/MainLayout'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ItemsPage from './pages/ItemsPage'
import ItemDetailPage from './pages/ItemDetailPage'
import PostItemPage from './pages/PostItemPage'
import MyItemsPage from './pages/MyItemsPage'
import EditItemPage from './pages/EditItemPage'
import MessagesPage from './pages/MessagesPage'
import ConversationPage from './pages/ConversationPage'
import CheckoutPage from './pages/CheckoutPage'
import OrderSuccessPage from './pages/OrderSuccessPage'
import MySalesPage from './pages/MySalesPage'
import MyPurchasesPage from './pages/MyPurchasesPage'
import AdminDashboardPage from './pages/AdminDashboardPage'
import AdminUsersPage from './pages/AdminUsersPage'
import AdminItemsPage from './pages/AdminItemsPage'
import AdminMessagesPage from './pages/AdminMessagesPage'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="items" element={<ItemsPage />} />
            <Route path="items/:id" element={<ItemDetailPage />} />
            <Route path="items/:id/edit" element={<EditItemPage />} />
            <Route path="post-item" element={<PostItemPage />} />
            <Route path="dashboard/my-items" element={<MyItemsPage />} />
            <Route path="dashboard/my-sales" element={<MySalesPage />} />
            <Route path="dashboard/my-purchases" element={<MyPurchasesPage />} />
            <Route path="messages" element={<MessagesPage />} />
            <Route path="messages/:itemId" element={<ConversationPage />} />
            <Route path="checkout/:id" element={<CheckoutPage />} />
            <Route path="orders/:id" element={<OrderSuccessPage />} />
            <Route path="admin" element={<AdminDashboardPage />} />
            <Route path="admin/users" element={<AdminUsersPage />} />
            <Route path="admin/items" element={<AdminItemsPage />} />
            <Route path="admin/messages" element={<AdminMessagesPage />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
