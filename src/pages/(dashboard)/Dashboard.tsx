import { useState } from "react";
import {
  Home,
  PlusCircle,
  List,
  ShoppingCart,
  LogOut,
  X,
  Menu,
} from "lucide-react";
import { Link, Outlet } from "react-router-dom";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:static md:w-64 transition-transform duration-300 ease-in-out flex flex-col`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 shadow">
          <h2 className="text-xl font-bold text-gray-800">Dashboard</h2>
          <button className="md:hidden" onClick={toggleSidebar}>
            <X size={24} className="text-gray-600" />
          </button>
        </div>

        {/* Sidebar Menu */}
        <nav className="flex-1 p-4 flex flex-col justify-between">
          <div>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/dashboard"
                  className="flex items-center p-2 text-gray-700 hover:bg-gray-200 rounded"
                >
                  <Home size={20} className="mr-3" />
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="add-items"
                  className="flex items-center p-2 text-gray-700 hover:bg-gray-200 rounded"
                >
                  <PlusCircle size={20} className="mr-3" />
                  Add Items
                </Link>
              </li>
              <li>
                <Link
                  to="list-items"
                  className="flex items-center p-2 text-gray-700 hover:bg-gray-200 rounded"
                >
                  <List size={20} className="mr-3" />
                  List Items
                </Link>
              </li>
              <li>
                <Link
                  to="orders"
                  className="flex items-center p-2 text-gray-700 hover:bg-gray-200 rounded"
                >
                  <ShoppingCart size={20} className="mr-3" />
                  Orders
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex items-center p-2 cursor-pointer text-gray-700 hover:bg-gray-200 rounded">
            <LogOut size={20} className="mr-3" />
            Logout
          </div>
        </nav>
      </div>

      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 bg-opacity-50 z-40 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow p-4 flex items-center justify-between">
          <div className="flex items-center">
            <button className="md:hidden mr-4" onClick={toggleSidebar}>
              <Menu size={24} className="text-gray-600" />
            </button>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-gray-600">Sajal Ali</div>
            <img
              className="md:w-7 w-6 md:h-7 h-6 object-contain"
              src="/profile_icon.png"
              alt="Profile"
            />
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
