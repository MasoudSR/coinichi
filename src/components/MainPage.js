"use client";

import loadUser from "@/helpers/loadUser";
import saveUser from "@/helpers/saveUser";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

function MainPage() {
	const [user, setUser] = useState({});
	const [coins, setCoins] = useState(0);
	const [isStarted, setIsStarted] = useState(false);
	const timeoutRef = useRef(null);

	useEffect(() => {
		const userData = loadUser();
		if (userData === "notExist") {
			// create new user from api
			fetch("api/user/new")
				.then((res) => res.json())
				.then((data) => {
					saveUser(data);
					setUser(data);
				});
		} else {
			// get user coins from api
			fetch("api/user/coins", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(userData),
			})
				.then((res) => res.json())
				.then((coinsData) => {
					setCoins(coinsData);
					setUser(userData);
				});
		}
	}, []);

	useEffect(() => {
		if (isStarted) {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}

			timeoutRef.current = setTimeout(() => {
				fetch("api/user/coins", {
					method: "PATCH",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ id: user.id, coins }),
				});
			}, 3000);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [coins]);

	const coinClickHandler = () => {
		isStarted || setIsStarted(true);
		setCoins((prev) => prev + 1);
	};

	return (
		<>
			<div className="fixed top-8 left-0 w-full max-w-xl text-center text-4xl font-bold p-3 mx-auto inset-x-0 z-10 text-white ">
				<p className="drop-shadow-lg">🪙 {coins.toLocaleString()}</p>
			</div>
			<div className="flex justify-center z-0">
				<button onClick={coinClickHandler} className="w">
					<Image className="drop-shadow-lg" src="/coinichi.png" alt="Coinichi" width={300} height={300} priority />
				</button>
			</div>
			<div className="bg-slate-900 p-3 rounded-t-2xl text-white max-w-xl fixed bottom-0 left-0 w-full mx-auto inset-x-0">
				<div>{user.name} ⚙️</div>
				<div className="text-[8px] text-gray-300">id: {user.id}</div>
			</div>
		</>
	);
}

export default MainPage;
