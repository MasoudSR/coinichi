import React, { useState } from "react";
import Loading from "./Loading";
import saveUser from "@/helpers/saveUser";

function LoginPage({ user, setUser, setPage, setCoins }) {
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const loginHandler = () => {
		setIsLoading(true);
		fetch("api/user/coins", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ id: user.id, password }),
		})
			.then((res) => {
				if (res.ok) {
					return res.json();
				} else {
					return Promise.reject(res);
				}
			})
			.then((data) => {
				setCoins(data.coins);
				saveUser(data.userData);
				setUser(data.userData);
				setPage("");
			})
			.catch((res) => {
				setIsLoading(false);
				res.json().then((json) => {
					setError(json.error);
				});
			});
	};
	return (
		<>
			{isLoading && <Loading />}
			<div className="fixed flex justify-center items-center bg-gray-500/20 w-full h-full z-20 backdrop-blur-md">
				<div className="p-4 rounded-xl bg-yellow-800/70 text-white flex flex-col gap-3">
					<p className="text-lg">Welcome back, {user.name}</p>
					<p className="text-xs">Please enter your password</p>
					{error && <p className="text-sm bg-red-500 p-1 text-center rounded-2xl">{error}</p>}
					<form className="flex flex-col gap-2" action={loginHandler}>
						<input
							type="password"
							className="rounded-2xl p-1 text-black focus:outline-none focus:shadow-inner pl-3"
							placeholder="Your Password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
						<button type="submit" className="bg-blue-500 p-2 rounded-lg">
							Submit
						</button>
					</form>
					<hr />
					<p>Forget Password?</p>
					<button
						className="bg-blue-500 p-2 rounded-lg"
						onClick={() => {
							setPage("signup");
						}}>
						Create Another Account
					</button>
				</div>
			</div>
		</>
	);
}

export default LoginPage;
