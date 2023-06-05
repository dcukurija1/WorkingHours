import {
	Box, Button, FormControl, Link, TextField, Typography
} from "@mui/material";
import { useState } from "react";
import { useCookies } from "react-cookie";


const Auth = ({setError}) => {
	const [cookies, setCookie, removeCookie] = useCookies(null);
	const [isLogIn, setIsLogin] = useState(true);
	const [email, setEmail] = useState(null);
	const [password, setPassword] = useState(null);
	const [confirmPassword, setConfirmPassword] = useState(null);
	const [fullName, setFullName] = useState(null);

	const handleSubmit = async (e, endpoint) => {
		e.preventDefault();
		// empty field
		if (!email || !password || (!isLogIn&&!confirmPassword) || (!isLogIn&&!fullName)) {
			setError("All fields are required!")
			return
		}
		// match passwords
		if (!isLogIn && password !== confirmPassword) {
			setError("Make sure passwords match!");
			return;
		}
		try {
			let body
			if (endpoint === 'login') {
				body = JSON.stringify({email, password})
			} else {
				body = JSON.stringify({
					"email": email,
					"password": password,
					"passwordConfirmation": confirmPassword,
					"name": fullName,
				})
			}
			const response = await fetch('http://localhost:5000/auth/' + endpoint,
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: body,
				}
			);
			const data = await response.json();
			console.log(data)
			if (data?.errors) {
				isLogIn ? 
					setError("Wrong email or password")
				: setError("Email not valid")
				return
			} else {
				console.log({data})
				setCookie("Email", data.email)
				setCookie("AuthToken", data.token)
				setCookie("UserId", data.id)
				setCookie("UserName", data.name)
				setError(null)
				// window.location.reload();
			}
		} catch (err) {
			setError(err.message);
		}

		
	};
	
	return (
		<Box sx={{ display: "flex", justifyContent: "center", p: 10 }}>
			<FormControl>
				<Typography variant="h3">
					{isLogIn ? "Please log in" : "Please sign up!"}
				</Typography>
				<TextField
					sx={{ p: 2 }}
					type="email"
					placeholder="email"
					onChange={(e) => setEmail(e.target.value)}
				/>
				<TextField
					sx={{ p: 2 }}
					type="password"
					placeholder="password"
					onChange={(e) => setPassword(e.target.value)}
				/>
				{!isLogIn && (
					<TextField
						sx={{ p: 2 }}
						type="password"
						placeholder="Confirm password"
						onChange={(e) => setConfirmPassword(e.target.value)}
					/>
				)}
				{!isLogIn && (
					<TextField
						sx={{ p: 2 }}
						placeholder="Full name"
						onChange={(e) => setFullName(e.target.value)}
					/>
				)}
				<Button
					variant="outlined"
					sx={{ m: "5%" }}
					color="primary"
					type="submit"
					className="submit-button"
					onClick={(e) => handleSubmit(e, isLogIn ? "login" : "register")}
				>
					{isLogIn ? "Login" : "Sign up"}
				</Button>
				<div className="auth-options">
					<Link
						variant="body1"
						onClick={() => setIsLogin(!isLogIn)}
						sx={{ p: 3}}
					>
						{isLogIn
							? "Don't have and account? Sign up!"
							: "Alredy have an account? Log in?"}
					</Link>
					{/* <Button
						onClick={() => viewLogin(false)}
						color="primary"
						variant={!isLogIn ? "outlined" : "contained"}
					>
						Sign Up
					</Button>
					<Button
						onClick={() => viewLogin(true)}
						variant={isLogIn ? "outlined" : "contained"}
						color="primary"
					>
						Login
					</Button> */}
				</div>
			</FormControl>
		</Box>
	);
};

export default Auth;
