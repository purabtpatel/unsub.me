import { Link, routes } from '@redwoodjs/router'

const NavigationLayout = ({ children }) => {
  return <>
    <header>
      <h1>
        <Link to={routes.home()}>UnSub.me</Link>
      </h1>
      <nav>
        <ul>
          <li>
            <Link to={routes.home()}>Home</Link>
          </li>
          <li>
            <Link to={routes.about()}>About</Link>
          </li>
        </ul>
      </nav>
    </header>
    <main>{children}</main>
  </>
}

export default NavigationLayout
