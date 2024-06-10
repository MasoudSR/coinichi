import saveUser from "@/helpers/saveUser";
import React, { useState } from "react";

function SignPage({ setUser, setPage, setCoins }) {
	const [id, setId] = useState("");

	const newAccHandler = () => {
		setPage("loading");
		fetch("api/user/new")
			.then((res) => res.json())
			.then((data) => {
				saveUser(data);
				setUser(data);
				setPage("");
			});
	};

	const signinHandler = () => {
		setPage("loading");
		fetch("api/user/coins", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(id),
		})
			.then((res) => res.json())
			.then((user) => {
				setCoins(user.coins);
				saveUser({ id: user.id, name: user.name });
				setUser({ id: user.id, name: user.name });
				setPage("");
			});
	};

	return (
		<div className="fixed flex justify-center items-center bg-gray-500/20 w-full h-full z-20 backdrop-blur-md">
			<div className="p-4 rounded-xl bg-yellow-800/70 text-white flex flex-col gap-3">
				<p>Signin Using ID:</p>
				<form className="flex flex-col gap-2" action={signinHandler}>
					<input type="text" className="rounded-md p-1 text-black" value={id} onChange={(e) => setId(e.target.value)} />
					<button type="submit" className="bg-blue-500 p-2 rounded-md">
						Submit
					</button>
				</form>
				<hr />
				<p>Don&apos;t have an account?</p>
				<button className="bg-blue-500 p-2 rounded-md" onClick={newAccHandler}>
					Create New Account
				</button>
			</div>
		</div>
	);
}

export default SignPage;
