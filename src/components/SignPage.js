import saveUser from "@/helpers/saveUser";
import React, { useState } from "react";
import Loading from "./Loading";

function SignPage({ setUser, setPage, setCoins }) {
	const [id, setId] = useState("");
    const [error , setError] = useState("")
    const [isLoading , setIsLoading] = useState(false)

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
			body: JSON.stringify(id),
		})
			.then((res) => {
				if (res.ok) {
					return res.json();
				} else {
                    return Promise.reject(res)
				}
			})
			.then((user) => {
				setCoins(user.coins);
				saveUser({ id: user.id, name: user.name });
				setUser({ id: user.id, name: user.name });
				setPage("");
			})
			.catch((res) => {
                setIsLoading(false);
				res.json().then(json=>{setError(json.error)});
			});
	};

	return (
        <>
        {isLoading && <Loading />}
		<div className="fixed flex justify-center items-center bg-gray-500/20 w-full h-full z-20 backdrop-blur-md">
			<div className="p-4 rounded-xl bg-yellow-800/70 text-white flex flex-col gap-3">
				<p>Signin Using ID:</p>
                {error && <p className="text-sm bg-red-500 p-1 text-center rounded-2xl">{error}</p>}
				<form className="flex flex-col gap-2" action={signinHandler}>
					<input type="text" className="rounded-lg p-1 text-black" value={id} onChange={(e) => setId(e.target.value)} />
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
