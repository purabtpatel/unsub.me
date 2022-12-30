import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'
import { useAuth } from '@redwoodjs/auth'

const HomePage = () => {

  return (
    <>
      <MetaTags title="Home" description="Home page" />
      <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
      <div className="container">
        <main>
          <div className="container">
            <h1>Effortlessly manage your emails and subscriptions</h1>
            <p>Our email manager tool helps you organize and clean your inbox more efficiently. Try it out for free today!</p>
            <Link to={routes.signup()} className="cta-button">Sign up for free</Link>

          </div>
        </main>

      </div>
    </>
  )
}

export default HomePage
