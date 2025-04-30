import React, { useState } from "react";
import { Container, Logo, LogoutBtn } from "../index";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  FiPlusCircle,
  FiHome,
  FiLogIn,
  FiUserPlus,
  FiBook,
  FiMenu,
  FiX,
} from "react-icons/fi";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
      icon: <FiHome className="mr-1" />,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
      icon: <FiLogIn className="mr-1" />,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
      icon: <FiUserPlus className="mr-1" />,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
      icon: <FiBook className="mr-1" />,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
      icon: <FiPlusCircle className="mr-1" />,
    },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-100">
      <Container>
        <nav className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Logo
                width="60px"
                className="hover:opacity-90 transition-opacity"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map(
              (item) =>
                item.active && (
                  <button
                    key={item.name}
                    onClick={() => navigate(item.slug)}
                    className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors rounded-lg hover:bg-gray-50"
                  >
                    {item.icon}
                    {item.name}
                  </button>
                )
            )}
            {authStatus && (
              <div className="ml-2">
                <LogoutBtn className="text-sm" />
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-700 hover:text-blue-600 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white py-2 border-t border-gray-100 animate-fadeIn">
            {navItems.map(
              (item) =>
                item.active && (
                  <button
                    key={item.name}
                    onClick={() => {
                      navigate(item.slug);
                      setMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    {item.icon}
                    <span className="ml-2">{item.name}</span>
                  </button>
                )
            )}
            {authStatus && (
              <div className="px-4 py-3 border-t border-gray-100">
                <LogoutBtn className="w-full justify-start" />
              </div>
            )}
          </div>
        )}
      </Container>
    </header>
  );
}

export default Header;
