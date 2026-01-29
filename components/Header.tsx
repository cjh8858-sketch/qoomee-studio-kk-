
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const Header: React.FC = () => {
  const { settings } = useAppContext();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const isAdmin = location.pathname === '/admin';

  const navLinks = [
    { name: 'HOME', path: '/' },
    { name: 'SERVICES', path: '#services', isAnchor: true },
    { name: 'PORTFOLIO', path: '#portfolio', isAnchor: true },
    { name: 'CONTACT', path: '#contact', isAnchor: true },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
        isScrolled || isMenuOpen ? 'bg-black/95 backdrop-blur-xl py-4 border-b border-white/10' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-xl md:text-2xl font-black tracking-tighter flex items-center gap-2 relative z-[110]">
          <span className="text-black bg-[#FFD700] px-2 py-0.5 rounded shadow-[0_0_15px_rgba(255,215,0,0.3)]">KK</span>
          <span className="inline" style={{ color: settings.accentColor }}>{settings.siteName.toUpperCase()}</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-10 text-xs font-bold tracking-widest">
          {navLinks.map((link) => (
            link.isAnchor ? (
              <a key={link.name} href={link.path} className="hover:text-yellow-400 transition-colors uppercase">{link.name}</a>
            ) : (
              <Link key={link.name} to={link.path} className="hover:text-yellow-400 transition-colors uppercase">{link.name}</Link>
            )
          ))}
          <Link 
            to={isAdmin ? '/' : '/admin'} 
            className="border border-white/20 px-5 py-2 rounded-full hover:bg-yellow-400 hover:text-black hover:border-yellow-400 transition-all uppercase"
          >
            {isAdmin ? 'VIEW SITE' : 'ADMIN'}
          </Link>
        </nav>

        {/* Mobile Toggle */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden relative z-[110] w-10 h-10 flex flex-col items-center justify-center gap-1.5 focus:outline-none"
        >
          <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`w-6 h-0.5 bg-white transition-opacity duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-black z-[100] transition-all duration-500 md:hidden flex flex-col items-center justify-center gap-8 ${
          isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
      >
        <nav className="flex flex-col items-center gap-8 text-2xl font-black tracking-tighter">
          {navLinks.map((link) => (
            link.isAnchor ? (
              <a 
                key={link.name} 
                href={link.path} 
                onClick={() => setIsMenuOpen(false)}
                className="hover:text-yellow-400 transition-colors"
              >
                {link.name}
              </a>
            ) : (
              <Link 
                key={link.name} 
                to={link.path} 
                onClick={() => setIsMenuOpen(false)}
                className="hover:text-yellow-400 transition-colors"
              >
                {link.name}
              </Link>
            )
          ))}
          <Link 
            to={isAdmin ? '/' : '/admin'} 
            onClick={() => setIsMenuOpen(false)}
            className="mt-4 px-8 py-3 bg-yellow-400 text-black rounded-full text-lg"
          >
            {isAdmin ? 'VIEW SITE' : 'ADMIN PANEL'}
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
