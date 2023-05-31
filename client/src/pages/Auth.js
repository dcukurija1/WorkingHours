import {
	Box, 
	Button, TextField
} from "@mui/material";
import { useState } from "react";
import { useCookies } from "react-cookie";


const Auth = () => {
	const [cookies, setCookie, removeCookie] = useCookies(null);
	const [isLogIn, setIsLogin] = useState(true);
	const [email, setEmail] = useState(null);
	const [password, setPassword] = useState(null);
	const [confirmPassword, setConfirmPassword] = useState(null);
	const [fullName, setFullName] = useState(null);
	const [error, setError] = useState(null);

	const viewLogin = (status) => {
		setError(null);
		setIsLogin(status);
	};

	const handleSubmit = async (e, endpoint) => {
		e.preventDefault();
		if (!isLogIn && password !== confirmPassword) {
			setError("Make sure passwords match!");
			return;
		}

		try {
			let body
			if (endpoint === 'login') {
				body = JSON.stringify({email, password})
			} else {
				body = JSON.stringify({"email": email, "password": password, "passwordConfirmation": confirmPassword,"name": fullName})
			}
			console.log(body);
			const response = await fetch('http://localhost:5000/auth/' + endpoint,
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: body,
				}
			);
			const data = await response.json();

			if (data.detail) {
				setError(data.detail);
			} else {
				setCookie("Email", data.email);
				setCookie("AuthToken", data.token);
				setCookie("UserId", data.id);
				setCookie("UserName", data.name);

				window.location.reload();
			}
		} catch (err) {
			setError(err);
		}

		
	};
	
	return (
		<Box>
			<Box>
				<form>
					<h3>{isLogIn ? "Please log in" : "Please sign up!"}</h3>
					<TextField
						type="email"
						placeholder="email"
						onChange={(e) => setEmail(e.target.value)}
					/>
					<TextField
						type="password"
						placeholder="password"
						onChange={(e) => setPassword(e.target.value)}
					/>
					{!isLogIn && (
						<TextField
							type="password"
							placeholder="confirm password"
							onChange={(e) => setConfirmPassword(e.target.value)}
						/>
					)}
					{!isLogIn && (
						<TextField
							placeholder="full name"
							onChange={(e) => setFullName(e.target.value)}
						/>
					)}
					<Button
						variant="contained"
						sx={{
							bgcolor: "rgb(50,50,50)",
							m: "5%",
							"&:hover": {
								color: "black",
								backgroundColor: "#ccc",
							},
						}}
						type="submit"
						className="submit-button"
						onClick={(e) => handleSubmit(e, isLogIn ? "login" : "register")}
					>
						{isLogIn ? "Login" : "Sign up"}
					</Button>
					{error && <p>{error}</p>}
				</form>
				<div className="auth-options">
					<button
						onClick={() => viewLogin(false)}
						style={{
							backgroundColor: !isLogIn
								? "rgb(255, 255, 255)"
								: "rgb(188, 188, 188)",
							border: isLogIn ? "1px solid #ccc" : "none",
						}}
					>
						Sign Up
					</button>
					<button
						onClick={() => viewLogin(true)}
						style={{
							backgroundColor: isLogIn
								? "rgb(255, 255, 255)"
								: "rgb(188, 188, 188)",
							border: !isLogIn ? "1px solid #ccc" : "none",
						}}
					>
						Login
					</button>
				</div>
			</Box>
		</Box>
	);
};

export default Auth;
