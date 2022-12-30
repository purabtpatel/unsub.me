import { Link, routes } from '@redwoodjs/router'
import { useAuth } from '@redwoodjs/auth'

const NavigationLayout = ({ children }) => {
  const { isAuthenticated, currentUser, logOut } = useAuth()
  return <>
    <header>
      <div>
        <h1>
          <Link to={routes.home()}>UnSub.me</Link>
        </h1>
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
          <li>
            {isAuthenticated ? (
              <div>
                <span>Logged in as {currentUser.email}</span>
                <button onClick={logOut}>Log out</button>
              </div>
            ) : (
              <Link to={routes.login()}>Log in</Link>
            )}
          </li>
        </ul>
      </nav>
    </header>
    <main>{children}</main>
    <footer>
      <div className="container">
        <p>Copyright 2021 Email Manager Tool</p>
      </div>
    </footer>
  </>
}

export default NavigationLayout
