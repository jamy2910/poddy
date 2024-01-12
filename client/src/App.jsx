import './App.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Landing from './pages/Landing'
import CreateChannel from './pages/CreateChannel'
import Activity from './pages/Activity'
import MyChannels from './pages/MyChannels'
import ManageAccount from './pages/ManageAccount'
import MyProfile from './pages/MyProfile'
import SinglePodcast from './pages/SinglePodcast'
import RegisterConfirmation from './pages/RegisterConfirmation'
import Register from './pages/Register'
import Login from './pages/Login'
import Live from './pages/Live'
import Trending from './pages/Trending'
import Explore from './pages/Explore'
import PageLayout from './pages/PageLayout'



const router = createBrowserRouter([
  {
    element: <PageLayout />,
    children: [
      {
        path: '/',
        element: <Landing />
      },
      {
        path: '/explore',
        element: <Explore />
      },
      {
        path: '/trending',
        element: <Trending />
      },
      {
        path: '/live',
        element: <Live />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/register',
        element: <Register />
      },
      {
        path: '/register-confirm',
        element: <RegisterConfirmation />
      },
      {
        path: '/podcast/:id',
        element: <SinglePodcast />
      },
      {
        path: '/myprofile',
        element: <MyProfile />
      },
      {
        path: '/manageaccount',
        element: <ManageAccount />
      },
      {
        path: '/mychannels',
        element: <MyChannels />
      },
      {
        path: '/activity',
        element: <Activity />
      },
      {
        path: '/createchannel',
        element: <CreateChannel />
      }
    ]
  }

])

function App() {

  return (
    <RouterProvider router={router} />
  )
}

export default App
