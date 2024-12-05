import React from "react";
import PropTypes from "prop-types";
import NavButton from "./navigation/NavButton";
import { navItems } from "./constants/navItems";
import CustomWalletConnect from "./wallet/CustomWalletConnect";
import { Link } from "react-router-dom";

function Navbar({ currentPage, setCurrentPage }) {
  return (
    <nav className="absolute w-full border-b border-dark-700 backdrop-blur-sm bg-dark-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16 justify-between">
          <Link
            to="/get_user_balance"
            className="text-white text-2xl font-extrabold"
          >
            bloccBank
          </Link>
          <div className="flex space-x-4">
            {navItems.map((item) => (
              <NavButton
                key={item.id}
                item={item}
                isActive={currentPage === item.id}
                onClick={() => setCurrentPage(item.id)}
                to={item.path}
              />
            ))}
          </div>

          <CustomWalletConnect />
        </div>
      </div>
    </nav>
  );
}

Navbar.propTypes = {
  currentPage: PropTypes.oneOf(["send", "swap", "create"]).isRequired,
  setCurrentPage: PropTypes.func.isRequired,
};

export default Navbar;
