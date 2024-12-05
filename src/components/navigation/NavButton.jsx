import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function NavButton({ item, isActive, onClick, to }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`px-4 py-2 rounded-lg transition-all duration-200 ${
        isActive
          ? "bg-primary-600 text-white shadow-lg shadow-primary-500/20"
          : "text-gray-300 hover:bg-dark-700 hover:text-white hover:shadow-lg hover:shadow-primary-500/10"
      }`}
    >
      {item.label}
    </Link>
  );
}

NavButton.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }).isRequired,
  isActive: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  to: PropTypes.string,
};

export default NavButton;
