import { Menu } from "lucide-react";

type DashboardHeaderProps = {
  toggleSidebar: () => void;
};

const DashboardHeader = ({ toggleSidebar }: DashboardHeaderProps) => {
  return (
    <header className="bg-white shadow p-4 flex items-center justify-between">
      <div className="flex items-center">
        <button className="md:hidden mr-4" onClick={toggleSidebar}>
          <Menu size={24} className="text-gray-600" />
        </button>
      </div>
      <div className="flex items-center space-x-4">
        <div className="text-gray-600">Admin Panel</div>
      </div>
    </header>
  );
};

export default DashboardHeader;
