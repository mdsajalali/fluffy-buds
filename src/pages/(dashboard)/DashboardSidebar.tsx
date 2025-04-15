import {
  LayoutDashboard,
  List,
  LogOut,
  PlusCircle,
  ShoppingCart,
  X,
} from "lucide-react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";

const navItems = [
  {
    to: "/dashboard",
    label: "Dashboard",
    icon: <LayoutDashboard size={20} className="mr-3" />,
  },
  {
    to: "add-items",
    label: "Add Items",
    icon: <PlusCircle size={20} className="mr-3" />,
  },
  {
    to: "list-items",
    label: "List Items",
    icon: <List size={20} className="mr-3" />,
  },
  {
    to: "orders",
    label: "Orders",
    icon: <ShoppingCart size={20} className="mr-3" />,
  },
];

// type
type DashboardSidebarProps = {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
};

const DashboardSidebar = ({
  isSidebarOpen,
  toggleSidebar,
}: DashboardSidebarProps) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  /* @ts-ignore */
  const { logOut } = useContext(StoreContext);
  return (
    <div
      className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0 md:static md:w-64 transition-transform duration-300 ease-in-out flex flex-col`}
    >
      {/* Sidebar Header */}
      <div className="flex items-center justify-between p-4">
        <Link to="/">
          <img className="w-24" src="/logo.webp" alt="Logo" />
          <h2 className="text-xl font-bold text-gray-800">Admin Panel</h2>
        </Link>
        <button className="md:hidden" onClick={toggleSidebar}>
          <X size={24} className="text-gray-600" />
        </button>
      </div>

      {/* Sidebar Menu */}
      <nav className="flex-1 p-4 flex flex-col justify-between">
        <div>
          <ul className="space-y-2">
            {navItems.map((item, index) => (
              <li key={index}>
                <Link
                  to={item.to}
                  className="flex items-center p-2 text-gray-700 hover:bg-gray-200 rounded"
                >
                  {item.icon}
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div
          onClick={logOut}
          className="flex items-center p-2 cursor-pointer text-gray-700 hover:bg-gray-200 rounded"
        >
          <LogOut size={20} className="mr-3" />
          Logout
        </div>
      </nav>
    </div>
  );
};

export default DashboardSidebar;
