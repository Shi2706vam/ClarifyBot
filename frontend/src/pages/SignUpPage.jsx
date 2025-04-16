import { motion } from "framer-motion";
import Input from "../components/Input.jsx";
import { Loader, Lock, Mail, User } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PasswordStrengthMeter from "../components/PasswordStrengthMeter.jsx";
import { useAuthStore } from "../store/authStore.js";

const SignUpPage = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	const { signup, error, isLoading } = useAuthStore();

	const handleSignUp = async (e) => {
		e.preventDefault();

		try {
			await signup(email, password, name);
			navigate("/verify-email");
		} catch (error) {
			console.log(error);
		}
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
					Create Account
				</h2>

				<form onSubmit={handleSignUp}>
					<div className='space-y-4'>
						<Input
							icon={User}
							type='text'
							placeholder='Full Name'
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
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

					{error && <p className='text-red-500 text-sm sm:text-base font-semibold mt-2'>{error}</p>}

					<PasswordStrengthMeter password={password} />

					<motion.button
						className='mt-4 sm:mt-5 w-full py-2 sm:py-3 px-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-lg shadow-lg hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200 text-sm sm:text-base'
						whileHover={{ scale: 1.02 }}
						whileTap={{ scale: 0.98 }}
						type='submit'
						disabled={isLoading}
					>
						{isLoading ? (
							<Loader className='animate-spin mx-auto' size={20} />
						) : (
							"Sign Up"
						)}
					</motion.button>
				</form>
			</div>
			<div className='px-6 sm:px-8 py-3 sm:py-4 bg-gray-900 bg-opacity-50 flex justify-center'>
				<p className='text-xs sm:text-sm text-gray-400'>
					Already have an account?{" "}
					<Link to={"/login"} className='text-blue-400 hover:underline'>
						Login
					</Link>
				</p>
			</div>
		</motion.div>
	);
};
export default SignUpPage;
