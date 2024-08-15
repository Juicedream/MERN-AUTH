import { Navigate, Route, Routes } from "react-router-dom";
//components
import FloatingShape from "./components/FloatingShape";
import LoadingSpinner from "./components/LoadingSpinner";
//pages created
import SignUpPage from "./Pages/SignUpPage";
import LoginPage from "./Pages/LoginPage";
import EmailVerificationPage from "./Pages/EmailVerificationPage";
import DashBoardPage from "./Pages/DashBoardPage";
import ForgotPasswordPage from "./Pages/ForgotPasswordPage";
import ResetPasswordPage from "./Pages/ResetPasswordPage";

import { Toaster } from "react-hot-toast"; //for notifications
import { useAuthStore } from "./store/authStore";
import { useEffect } from "react";


//protect routes that require authentication
const ProtectedRoute = ({children}) => {
  const {isAuthenticated, user} = useAuthStore();

  if(!isAuthenticated){
    return <Navigate to="/login" replace/>
  }
  if(!user.isVerified){
    return <Navigate to="/verify-email" replace />
  }

  return children;
}


//redirect authenticated users to the home page
const RedirectAuthenticatedUser = ({children}) => {
  const {isAuthenticated, user} = useAuthStore();
  if(isAuthenticated && user.isVerified){
    return <Navigate to ="/" replace />
  }
  return children;
}
function App() {
  const {checkAuth, isCheckingAuth,} = useAuthStore();
  useEffect(() => {checkAuth()}, [checkAuth]);
  if(isCheckingAuth) return <LoadingSpinner />

  return (
    // background color with green and light green motion floating circlular shapes 
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900 flex items-center justify-center relative overflow-hidden">
      {/* floatng shapes */}
      <FloatingShape
        color="bg-green-500"
        size="w-64 h-64"
        top="-5%"
        left="10%"
        delay={0}
      />
      <FloatingShape
        color="bg-emerald-500"
        size="w-48 h-48"
        top="70%"
        left="80%"
        delay={5}
      />
      <FloatingShape
        color="bg-lime-500"
        size="w-32 h-32"
        top="40%"
        left="-10%"
        delay={2}
      />
      <Routes>
        <Route path='/' element={
          <ProtectedRoute>
            <DashBoardPage />
          </ProtectedRoute>
        } />
        <Route path='/signup' element={
        //  redirect authenticated users who signed up or loged in to the Home page
         <RedirectAuthenticatedUser> 
            <SignUpPage/>
          </RedirectAuthenticatedUser>
        } />
        <Route path='/login' element={
          <RedirectAuthenticatedUser>
            <LoginPage/>
          </RedirectAuthenticatedUser>
        } />
        <Route path='/verify-email' element={
          <RedirectAuthenticatedUser>
            <EmailVerificationPage/>
          </RedirectAuthenticatedUser>
        } />
        <Route path='/forgot-password' element={
          <RedirectAuthenticatedUser>
            <ForgotPasswordPage/>
          </RedirectAuthenticatedUser>
        } />
        <Route path='/reset-password/:token' element={
          <RedirectAuthenticatedUser>
            <ResetPasswordPage/>
          </RedirectAuthenticatedUser>
        } />
        {/* Catch all other routes */}
        <Route path='*' element={
         <Navigate to= '/' replace />
        } />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
