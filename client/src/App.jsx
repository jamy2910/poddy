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
import AuthContext from './auth/AuthContext'
import ProtectedRoute from './auth/ProtectedRoute'
import CustomToast from './components/CustomToast'
import SingleChannel from './pages/SingleChannel'
import StatusContext from './components/StatusContext'
import UploadPodcast from './pages/UploadPodcast'



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
        path: '/channel/:channelId',
        element: <SingleChannel />
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: '/upload/:channelId',
            element: <UploadPodcast />
          },
          {
            path: '/createchannel',
            element: <CreateChannel />
          },
          {
            path: '/activity',
            element: <Activity />
          },
          {
            path: '/manageaccount',
            element: <ManageAccount />
          },
          {
            path: '/myprofile',
            element: <MyProfile />
          },
          {
            path: '/mychannels',
            element: <MyChannels />
          },
        ]
      }
    ]
  }

]);

function App() {

  return (
    <StatusContext>
      <AuthContext>
        <RouterProvider router={router} />
        <CustomToast />
      </AuthContext>
    </StatusContext>
  )
}

export default App
