import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'

const HomePage = () => {
  return (
    <>
      <MetaTags title="Home" description="Home page" />
      <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
      Home
    </>
  )
}

export default HomePage
