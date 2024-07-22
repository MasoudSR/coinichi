import saveUser from "@/helpers/saveUser";
import React, { useState } from "react";
import Loading from "./Loading";
import { IoIosArrowForward } from "react-icons/io";

function SignPage({ setUser, setPage, setCoins }) {
	const [id, setId] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [showPasswordField, setShowPasswordField] = useState(false);

	const newAccHandler = () => {
		setIsLoading(true);
		fetch("api/user/new")
			.then((res) => res.json())
			.then((data) => {
				saveUser(data);
				setUser(data);
				setPage("");
			});
	};

	const signinHandler = () => {
		setIsLoading(true);
		fetch("api/user/coins", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ id, password }),
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
			<div className="fixed flex justify-center items-center bg-gray-500/20 w-full h-full top-0 z-20 backdrop-blur-md">
				<div className="p-4 rounded-xl bg-yellow-800/70 text-white flex flex-col gap-3">
					<p>Signin Using ID:</p>
					{error && <p className="text-sm bg-red-500 p-1 text-center rounded-2xl">{error}</p>}
					<form className="flex flex-col gap-2" action={signinHandler}>
						<input
							type="text"
							className="rounded-2xl p-1 text-black pl-3 focus:outline-none focus:shadow-inner"
							placeholder="Your ID"
							value={id}
							onChange={(e) => setId(e.target.value)}
						/>
						<div className="relative overflow-hidden rounded-2xl">
							<div
								className={`absolute bg-sky-500 p-1 border border-white w-full rounded-2xl flex items-center gap-2 cursor-pointer select-none transition-all duration-500 ${
									showPasswordField && "translate-x-[86%]"
								}`}
								onClick={() => (showPasswordField ? setShowPasswordField(false) : setShowPasswordField(true))}>
								<div
									className={`bg-white p-1 rounded-full text-sky-500 transition-all duration-500 ${
										showPasswordField && "rotate-180"
									}`}>
									<IoIosArrowForward />
								</div>{" "}
								I have a password
							</div>
							<input
								type="password"
								className="rounded-2xl p-1 text-black pl-3 border focus:outline-none focus:shadow-inner"
								placeholder="Your Password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</div>
						<button type="submit" className="bg-blue-500 p-2 rounded-lg">
							Submit
						</button>
					</form>
					<hr />
					<p>Don&apos;t have an account?</p>
					<button className="bg-blue-500 p-2 rounded-lg" onClick={newAccHandler}>
						Create New Account
					</button>
				</div>
			</div>
		</>
	);
}

export default SignPage;
