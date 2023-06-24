import classNames from "classnames"
import PropTypes from "prop-types"
import { ReactElement } from "react"
import { NavLink } from "react-router-dom"

type NavBarProps = {
  routes: {label:string,to:string, icon:ReactElement}[],
  className: string
}

function NavBar({ routes, className }:NavBarProps) {
  return (
    <nav
      className={classNames(
        "flex items-center justify-center text-white bg-pink-800 z-50",
        className ?? ""
      )}
    >
      {routes.map((route) => (
        <NavLink
          className={({ isActive }) => classNames(
            'py-1 px-4 lg:py-4 lg:px-8 flex flex-col items-center lg:gap-2 text-white hover:bg-pink-400/20 rounded-lg m-4 transition',
            {'bg-pink-400/20': isActive }
            )}
          key={route.to}
          to={route.to}
        >
          {route.icon}
          <span className="font-serif font-bold text-xl">{route.label}</span>
        </NavLink>
      ))}
    </nav>
  )
}

NavBar.propTypes = {
  routes: PropTypes.array,
  className: PropTypes.string
}

export default NavBar
