import React, { useEffect } from 'react'
import FloatingShape from './components/FloatingShape.jsx'
import { Navigate, Route, Routes } from 'react-router-dom'
import SignUpPage from "./pages/SignUpPage.jsx"
import LoginPage from "./pages/LoginPage.jsx"
import Footer from "./components/footer/Footer.jsx"
import Navbar from './components/navbar/Navbar.jsx'
import EmailVerificationPage from './pages/EmailVerificationPage.jsx'
import Header from "./pages/header/Header.jsx"
import { Toaster } from "react-hot-toast"
import LoadingSpinner from "./components/LoadingSpinner.jsx"
import ForgotPasswordPage from "./pages/ForgotPasswordPage.jsx"
import ResetPasswordPage from "./pages/ResetPasswordPage.jsx"

import { useAuthStore } from "./store/authStore";
import Bot from './pages/Bot.jsx'

// protect routes that require authentication
const ProtectedRoute = ({ children }) => {
	const { isAuthenticated, user } = useAuthStore();

	if (!isAuthenticated) {
		return <Navigate to='/login' replace />;
	}

	if (!user.isVerified) {
		return <Navigate to='/verify-email' replace />;
	}

	return children;
};

// redirect authenticated users to the home page
const RedirectAuthenticatedUser = ({ children }) => {
	const { isAuthenticated, user } = useAuthStore();

	if (isAuthenticated && user.isVerified) {
		return <Navigate to='/' replace />;
	}

	return children;
};

const App = () => {

	const { isCheckingAuth, checkAuth, isAuthenticated, user } = useAuthStore();

	useEffect(() => {
		checkAuth();
	}, [checkAuth]);

	if (isCheckingAuth) return <LoadingSpinner />;
	// console.log("isAuthenticated", isAuthenticated);
	// console.log("user", user);

	return (
		<div className='min-h-screen  bg-gradient-to-br from-gray-900 via-blue-950 to-purple-950 flex flex-col items-center justify-center relative overflow-hidden'>
			<FloatingShape color='bg-blue-500' size='w-64 h-64' top='-5%' left='10%' delay={0} />
			<FloatingShape color='bg-purple-500' size='w-48 h-48' top='70%' left='80%' delay={5} />
			<FloatingShape color='bg-cyan-500' size='w-32 h-32' top='40%' left='-10%' delay={2} />

			<Navbar />
			<Routes>

				<Route path='/' element={
					<ProtectedRoute>
						<Header />
						<Bot />
					</ProtectedRoute>
				} />

				<Route path='/signup' element={
					<RedirectAuthenticatedUser>
						<SignUpPage />
					</RedirectAuthenticatedUser>
				} />

				<Route path='/login' element={
					<RedirectAuthenticatedUser>
						<LoginPage />
					</RedirectAuthenticatedUser>
				} />

				<Route path='/verify-email' element={<EmailVerificationPage />} />

				<Route
					path='/forgot-password'
					element={
						<RedirectAuthenticatedUser>
							<ForgotPasswordPage />
						</RedirectAuthenticatedUser>
					}
				/>

				<Route
					path='/reset-password/:token'
					element={
						<RedirectAuthenticatedUser>
							<ResetPasswordPage />
						</RedirectAuthenticatedUser>
					}
				/>

				{/* catch all routes */}
				<Route path='*' element={<Navigate to='/' replace />} />

			</Routes>

			<Footer />
			<Toaster />
		</div>
	)
}

export default App
