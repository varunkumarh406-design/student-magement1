import { Link, useLocation } from 'react-router-dom';
import { GraduationCap, LayoutDashboard, LogIn, LogOut, UserPlus, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Button from './Button';

const Navbar = () => {
  const location = useLocation();
  const { user, logout } = useAuth();

  const navLinks = [
    { name: 'Home', path: '/', icon: GraduationCap },
    ...(user ? [{ name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard }] : []),
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Logo / Brand */}
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="bg-primary-100 p-2 rounded-xl group-hover:bg-primary-200 transition-colors">
                <GraduationCap className="w-6 h-6 text-primary-600" />
              </div>
              <span className="font-bold text-xl tracking-tight text-slate-900">
                Edu<span className="text-primary-600">Sync</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-1">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                const Icon = link.icon;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                      ${isActive 
                        ? 'bg-primary-50 text-primary-700' 
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                      }`}
                  >
                    <Icon className="w-4 h-4" />
                    {link.name}
                  </Link>
                )
              })}
            </div>
          </div>
          
          {/* Auth Actions */}
          <div className="flex items-center gap-3">
            {user ? (
              <>
                <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-slate-50 rounded-full border border-slate-100">
                  <User className="w-4 h-4 text-slate-400" />
                  <span className="text-sm font-medium text-slate-700">{user.name}</span>
                </div>
                <Button variant="secondary" onClick={logout} className="px-3 py-1.5 border-none shadow-none text-slate-600 hover:text-red-600 hover:bg-red-50">
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Logout</span>
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="secondary" className="px-4 py-2 border-none shadow-none text-slate-600 hover:text-primary-600">
                    <LogIn className="w-4 h-4" />
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="px-4 py-2">
                    <UserPlus className="w-4 h-4" />
                    Join
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
