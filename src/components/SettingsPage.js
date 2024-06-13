import React, { useState } from "react";
import Loading from "./Loading";
import { IoSettingsOutline, IoCopyOutline } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";

function SettingsPage({ page, setPage, user, setUser }) {
	const [newName, setNewName] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [changeNameToggle, setChangeNameToggle] = useState(false);
	const [error, setError] = useState("");
	const [showId, setShowId] = useState(false);

	const showError = (error) => {
		setError(error);
		setTimeout(() => {
			setError("");
		}, 7000);
	};

	const nameChangeHandler = () => {
		setError("");
		setIsLoading(true);
		fetch("api/user/name", {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ id: user.id, newName: newName }),
		})
			.then((res) => {
				if (res.ok) {
					return res.json();
				} else {
					return Promise.reject(res);
				}
			})
			.then((userData) => {
				setUser(userData);
				setIsLoading(false);
				setNewName("");
				setChangeNameToggle(false);
			})
			.catch((res) => {
				setIsLoading(false);
				res.json().then((json) => {
					showError(json.error);
				});
			});
	};

	const minimizeSettings = () => {
		setPage("");
		setChangeNameToggle(false);
		setShowId(false);
	};

	return (
		<>
			{isLoading && <Loading />}
			<div
				className={`bg-slate-900 p-4 rounded-t-2xl text-white max-w-xl flex flex-col gap-4  fixed bottom-20 left-0 w-full transition-all duration-500 mx-auto h-[100%] z-20 inset-x-0 ${
					page === "settings" ? "translate-y-[40%]" : " translate-y-[100%]"
				}`}>
				<div className="flex justify-between items-center mb-2">
					<p className="text-3xl ml-2">{user.name}</p>
					<button
						className="border-white border w-11 h-11 rounded-xl flex justify-center items-center"
						onClick={() => (page === "" ? setPage("settings") : minimizeSettings())}>
						{page === "settings" ? <IoIosArrowDown size={30} /> : <IoSettingsOutline size={25} />}
					</button>
				</div>
				<div className="flex justify-center">
					<p
						className={`text-sm bg-red-500 flex justify-center items-center rounded-2xl transition-all duration-500 ${
							error ? "w-full h-8 scale-100" : "w-0 h-0 scale-0"
						} `}>
						{error}
					</p>
				</div>
				<div className={`transition-all duration-500 ${changeNameToggle ? "h-28" : "h-12"}`}>
					<input
						type="text"
						className="text-black w-full rounded-lg p-2 mb-2"
						placeholder="Enter You're New Name"
						value={newName}
						onChange={(e) => setNewName(e.target.value)}
					/>
					<div className={`flex transition-all relative duration-500 ${changeNameToggle || "-translate-y-[50px]"}`}>
						<button
							className={`bg-blue-500 p-3 transition-all duration-500 z-20 rounded-lg w-full ${
								changeNameToggle ? "max-w-[67%]" : "max-w-[1000px]"
							}`}
							onClick={() => (changeNameToggle ? nameChangeHandler() : setChangeNameToggle(true))}>
							{changeNameToggle ? "OK" : "Change Name"}
						</button>
						<button
							className={`bg-red-400 w-[30%] transition-all duration-500 block absolute right-0 top-0 z-10 rounded-lg p-3 ${
								changeNameToggle ? "scale-100" : "scale-0"
							} `}
							onClick={() => {
								setChangeNameToggle(false);
								setNewName("");
							}}>
							Cancel
						</button>
					</div>
				</div>
				<div
					className={`transition-all duration-500 bg-slate-500 rounded-lg overflow-hidden ${
						showId ? "max-h-56" : "max-h-12"
					}`}>
					<button
						className={` p-3 transition-all duration-500 z-20 w-full shadow-md ${
							showId ? "bg-slate-300 text-black" : "bg-slate-500 text-white"
						} `}
						onClick={() => setShowId(!showId)}>
						{showId ? "Hide ID" : "Show ID"}
					</button>
					<div className="p-4 flex text-white justify-between items-center">
						<div>
							<p className="text-[11px] sm:text-xs">Keep you&apos;re id to recover account</p>
							<p className="text-[15px] sm:text-xl">{user.id}</p>
						</div>
						<button
							className="flex flex-col border justify-center items-center rounded-lg h-10 w-10 sm:w-12 sm:h-12  border-gray-200"
							onClick={() => navigator.clipboard.writeText(user.id)}>
							<IoCopyOutline />
							<span className="text-[8px]">Copy</span>
						</button>
					</div>
				</div>
			</div>
		</>
	);
}

export default SettingsPage;
