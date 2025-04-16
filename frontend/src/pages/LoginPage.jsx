import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, Loader } from "lucide-react";
import { Link } from "react-router-dom";
import Input from "../components/Input.jsx";
import { useAuthStore } from "../store/authStore.js"

const LoginPage = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const { login, isLoading, error } = useAuthStore();

	const handleLogin = async (e) => {
		e.preventDefault();
		await login(email, password);
	};

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			className='w-full mx-7 max-w-xs sm:max-w-sm md:max-w-md bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden'
		>
			<div className='p-6 sm:p-8'>
				<h2 className='text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text'>
					Welcome Back
				</h2>

				<form onSubmit={handleLogin}>
					<div className='space-y-4'>
						<Input
							icon={Mail}
							type='email'
							placeholder='Email Address'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>

						<Input
							icon={Lock}
							type='password'
							placeholder='Password'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>

					<div className='flex items-center mt-4 mb-4 sm:mb-6'>
						<Link to='/forgot-password' className='text-xs sm:text-sm text-blue-400 hover:underline'>
							Forgot password?
						</Link>
					</div>

					{error && <p className='text-red-500 text-sm sm:text-base font-semibold mb-2'>{error}</p>}

					<motion.button
						whileHover={{ scale: 1.02 }}
						whileTap={{ scale: 0.98 }}
						className='w-full py-2 sm:py-3 px-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-lg shadow-lg hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200 text-sm sm:text-base'
						type='submit'
						disabled={isLoading}
					>
						{isLoading ? <Loader className='w-5 h-5 sm:w-6 sm:h-6 animate-spin mx-auto' /> : "Login"}
					</motion.button>
				</form>
			</div>

			<div className='px-6 sm:px-8 py-3 sm:py-4 bg-gray-900 bg-opacity-50 flex justify-center'>
				<p className='text-xs sm:text-sm text-gray-400'>
					Don't have an account?{" "}
					<Link to='/signup' className='text-blue-400 hover:underline'>
						Sign up
					</Link>
				</p>
			</div>
		</motion.div>
	);
};
export default LoginPage;
