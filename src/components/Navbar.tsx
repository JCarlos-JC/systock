import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { 
  MagnifyingGlassIcon,
  BellIcon,
  ChevronDownIcon,
  ArrowRightOnRectangleIcon,
  UserIcon,
} from '@heroicons/react/24/outline';

const Navbar: React.FC = () => {
  const { user, signOut } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="flex h-16 items-center justify-between px-6">
        {/* Search */}
        <div className="flex flex-1 items-center max-w-md">
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Pesquisar produtos, vendas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <button className="p-2 text-gray-400 hover:text-gray-500 relative">
            <BellIcon className="h-6 w-6" />
            <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white"></span>
          </button>

          {/* User menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-3 p-2 text-sm rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              <div className="flex-shrink-0">
                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-sm font-medium text-blue-600">
                    {user?.full_name?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase()}
                  </span>
                </div>
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium text-gray-700">
                  {user?.full_name || user?.email}
                </p>
                <p className="text-xs text-gray-500 capitalize">
                  {user?.role?.replace('_', ' ')}
                </p>
              </div>
              <ChevronDownIcon className="h-4 w-4 text-gray-400" />
            </button>

            {/* User dropdown menu */}
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                <button
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setShowUserMenu(false)}
                >
                  <UserIcon className="h-4 w-4 mr-3" />
                  Perfil
                </button>
                <hr className="border-gray-200 my-1" />
                <button
                  onClick={handleSignOut}
                  className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  <ArrowRightOnRectangleIcon className="h-4 w-4 mr-3" />
                  Sair
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;