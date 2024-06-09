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
		isStarted || setIsStarted(true)
		setCoins((prev) => prev + 1);
	};

	return (
		<div>
			<div>$ {coins}</div>
			<div>
				<button onClick={coinClickHandler}>
					<Image
						className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
						src="/coinichi.png"
						alt="Coinichi"
						width={180}
						height={37}
						priority
					/>
				</button>
			</div>
		</div>
	);
}

export default MainPage;
