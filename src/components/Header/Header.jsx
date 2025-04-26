import React from "react";
import { Container, Logo, LogoutBtn } from "../index";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  FiPlusCircle,
  FiHome,
  FiLogIn,
  FiUserPlus,
  FiBook,
} from "react-icons/fi";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

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
    <header className="sticky top-0 z-50 bg-white shadow-sm backdrop-blur-sm bg-opacity-80 border-b border-gray-100 rounded-lg">
      <Container>
        <nav className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Logo
                width="60px"
                className="hover:opacity-90 transition-opacity"
              />
              <span className="ml-2 text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent"></span>
            </Link>
          </div>

          {/* Navigation Items */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map(
              (item) =>
                item.active && (
                  <button
                    key={item.name}
                    onClick={() => navigate(item.slug)}
                    className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors rounded-lg hover:bg-gray-50"
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
          <div className="md:hidden">
            <button className="p-2 rounded-md text-gray-700 hover:bg-gray-100">
              <svg
                className="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </nav>
      </Container>

      {/* Mobile Menu (would need state to toggle) */}
      <div className="md:hidden bg-white py-2 px-4 shadow-lg">
        {navItems.map(
          (item) =>
            item.active && (
              <button
                key={item.name}
                onClick={() => navigate(item.slug)}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg"
              >
                {item.name}
              </button>
            )
        )}
        {authStatus && (
          <div className="px-4 py-2">
            <LogoutBtn />
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
