import classNames from "classnames"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"
function NavBar({ routes, className }) {
  return (
    <nav
      className={classNames(
        "flex items-center justify-center text-white bg-pink-800",
        className ?? ""
      )}
    >
      {routes.map((route) => (
        <Link
          className="py-1 px-4 lg:py-4 lg:px-8 flex flex-col items-center lg:gap-2 text-white hover:bg-pink-400/20 rounded-lg m-4 transition"
          key={route.to}
          to={route.to}
        >
          {route.icon}
          <span className="font-serif font-bold text-xl">{route.label}</span>
        </Link>
      ))}
    </nav>
  )
}

NavBar.propTypes = {
  routes: PropTypes.array,
  className: PropTypes.string
}

export default NavBar
