import {
	PASSWORD_RESET_REQUEST_TEMPLATE,
	PASSWORD_RESET_SUCCESS_TEMPLATE,
	VERIFICATION_EMAIL_TEMPLATE,
	WELCOME_EMAIL_TEMPLATE,
} from "./emailTemplates.js";
import { transporter } from "./nodemailer.js";
import dotenv from "dotenv";

dotenv.config();

export const sendVerificationEmail = async (email, verificationToken) => {

	try {
		const response = await transporter.sendMail({
			from: process.env.SENDER_EMAIL,
			to: email,
			subject: "Verify your email",
			html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
		});

		console.log("Email sent successfully");
	} catch (error) {
		console.error(`Error sending verification`, error);

		throw new Error(`Error sending verification email: ${error}`);
	}
};

export const sendWelcomeEmail = async (email, name) => {

	try {
		const response = await transporter.sendMail({
			from: process.env.SENDER_EMAIL,
			to: email,
			subject: 'Welcome to Clarify',
            html: WELCOME_EMAIL_TEMPLATE.replace("{email}", email)
		});

		console.log("Welcome email sent successfully", response);
	} catch (error) {
		console.error(`Error sending welcome email`, error);

		throw new Error(`Error sending welcome email: ${error}`);
	}
};

export const sendPasswordResetEmail = async (email, resetURL) => {

	try {
		const response = await transporter.sendMail({
			from: process.env.SENDER_EMAIL,
			to: email,
			subject: "Reset your password",
			html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
		});
	} catch (error) {
		console.error(`Error sending password reset email`, error);

		throw new Error(`Error sending password reset email: ${error}`);
	}
};

export const sendResetSuccessEmail = async (email) => {

	try {
		const response = await transporter.sendMail({
			from: process.env.SENDER_EMAIL,
			to: email,
			subject: "Password Reset Successful",
			html: PASSWORD_RESET_SUCCESS_TEMPLATE,
		});

		console.log("Password reset email sent successfully", response);
	} catch (error) {
		console.error(`Error sending password reset success email`, error);

		throw new Error(`Error sending password reset success email: ${error}`);
	}
};