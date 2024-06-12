import React, { useState } from "react";
import Loading from "./Loading";

function SettingsPage({ page, setPage, user, setUser }) {
	const [newName, setNewName] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const nameChangeHandler = () => {
		setIsLoading(true);
		fetch("api/user/name", {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ id: user.id, newName: newName }),
		})
			.then((res) => res.json())
			.then((userData) => {
				setUser(userData);
				setIsLoading(false);
				setNewName("");
			});
	};

	return (
		<>
			{isLoading && <Loading />}
			<div
				className={`bg-slate-900 p-4 rounded-t-2xl text-white max-w-xl flex flex-col gap-4 fixed -bottom-[59%] left-0 w-full transition-all duration-500 mx-auto h-[70%] z-20 inset-x-0 ${
					page === "settings" && "-translate-y-[70%]"
				}`}>
				<div className="flex justify-between">
					<div>
						<p className="text-lg">{user.name}</p>
						<div className="text-[8px] text-gray-300" onClick={() => navigator.clipboard.writeText(user.id)}>
							id: {user.id}
						</div>
					</div>
					<button
						className="border-white border w-12 h-12 rounded-lg"
						onClick={() => (page === "" ? setPage("settings") : setPage(""))}>
						{page === "settings" ? "⬇️" : "⚙️"}
					</button>
				</div>
				{page === "settings" && (
					<div>
						<input
							type="text"
							className="text-black w-full rounded-md p-2 mb-2"
							value={newName}
							onChange={(e) => setNewName(e.target.value)}
						/>
						<button className="bg-blue-500 w-full p-3 rounded-lg" onClick={nameChangeHandler}>
							Change Name
						</button>
					</div>
				)}
			</div>
		</>
	);
}

export default SettingsPage;
