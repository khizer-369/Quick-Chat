import React, { lazy, Suspense } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Skeleton from './components/Skeleton';
import UserContext from './context/UserContext';
import { Toaster } from 'react-hot-toast';
const Home = lazy(() => import("./pages/Home"));
const SignUp = lazy(() => import("./pages/SignUp"));
const Login = lazy(() => import("./pages/Login"));
const Profile = lazy(() => import("./pages/Profile"));
const Requests = lazy(() => import("./pages/Requests"));

const App = () => {
  return (
    <BrowserRouter>
      <UserContext>
        <Toaster />
        <Suspense fallback={<Skeleton />}>
          <div className="text-white bg-[url('/bgImage.svg')] bg-cover bg-center bg-no-repeat">
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/sign-up' element={<SignUp />} />
              <Route path='/login' element={<Login />} />
              <Route path='/profile' element={<Profile />} />
              <Route path='/requests' element={<Requests />} />
            </Routes>
          </div>
        </Suspense>
      </UserContext>
    </BrowserRouter>
  )
}

export default App
