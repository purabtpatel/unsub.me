import { Link, routes } from '@redwoodjs/router'
import { useAuth } from '@redwoodjs/auth'

const NavigationLayout = ({ children }) => {
  const { isAuthenticated, currentUser, logOut } = useAuth()
  return <>
    <header>
      <div className="flex-between">

        <h1>
          <Link to={routes.home()}>UnSub.me</Link>
        </h1>
        {isAuthenticated ? (
          <div>
            <span>Logged in as {currentUser.email}</span>
            <button onClick={logOut}>Log out</button>
          </div>
        ) : (
          <Link to={routes.login()}>Log in</Link>
        )}


      </div>
      <nav>
        <ul>
          <li>
            <Link to={routes.home()}>Home</Link>
          </li>
          <li>
            <Link to={routes.about()}>About</Link>
          </li>
          <li>
            <Link to={routes.contact()}>Contact</Link>
          </li>
        </ul>
      </nav>
    </header>
    <main>{children}</main>
  </>
}

export default NavigationLayout
