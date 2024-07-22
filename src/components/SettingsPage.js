import React, { useState } from "react";
import Loading from "./Loading";
import { IoSettingsOutline, IoCopyOutline } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import saveUser from "@/helpers/saveUser";
import LogOutBtn from "./modules/LogOutBtn";

function SettingsPage({ page, setPage, user, setUser }) {
	const [newName, setNewName] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [changeNameToggle, setChangeNameToggle] = useState(false);
	const [error, setError] = useState("");
	const [showId, setShowId] = useState(false);
	const [passwordBtnToggle, setPasswordBtnToggle] = useState(false);
	const [logoutBtnToggle, setLogoutBtnToggle] = useState(false);
	const [passwordFields, setPasswordFields] = useState({ newPass: "", confirmPass: "", oldPass: "" });
	const [passwordNotification, setPasswordNotification] = useState({ error: false, message: "" });

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
		setPasswordBtnToggle(false);
		setLogoutBtnToggle(false);
	};

	const logout = () => {
		localStorage.removeItem("user");
		setUser({});
		setPage("signup");
		setChangeNameToggle(false);
		setShowId(false);
		setPasswordBtnToggle(false);
		setLogoutBtnToggle(false);
	};

	const setPasswordHandler = () => {
		if (user.passwordProtected && !passwordFields.oldPass) {
			setPasswordNotification({ error: true, message: "Current password field is empty" });
		} else if (!passwordFields.newPass) {
			setPasswordNotification({ error: true, message: "New password field is empty" });
		} else if (!passwordFields.confirmPass) {
			setPasswordNotification({ error: true, message: "Confirm password field is empty" });
		} else if (passwordFields.newPass !== passwordFields.confirmPass) {
			setPasswordNotification({ error: true, message: "Passwords doesn't match" });
		} else {
			setPasswordNotification({ error: false, message: "" });
			setIsLoading(true);

			fetch("api/user/password", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ id: user.id, newPassword: passwordFields.newPass, oldPassword: passwordFields.oldPass }),
			})
				.then((res) => {
					if (res.ok) {
						return res.json();
					} else {
						return Promise.reject(res);
					}
				})
				.then((data) => {
					console.log(data);
					setUser(data.userData);
					saveUser(data.userData);
					setIsLoading(false);
					setPasswordFields({ newPass: "", confirmPass: "", oldPass: "" });
					setPasswordNotification({ error: false, message: data.message });
				})
				.catch((res) => {
					setIsLoading(false);
					res.json().then((json) => {
						setPasswordNotification({ error: true, message: json.error });
					});
				});
		}
	};

	return (
		<>
			{isLoading && <Loading />}
			<div
				className={`bg-slate-900 px-4 pt-4 rounded-t-2xl text-white max-w-xl flex flex-col gap-4 fixed bottom-20 left-0 w-full transition-all duration-500 mx-auto h-[70%] z-10 inset-x-0 ${
					page === "settings" ? "translate-y-20" : " translate-y-[100%]"
				}`}>
				<div className="flex justify-between items-center mb-2">
					<p className="text-xl truncate">{user.name}</p>
					<button
						className="border-white border p-2 rounded-xl flex justify-center items-center"
						onClick={() => (page === "" ? setPage("settings") : minimizeSettings())}>
						{page === "settings" ? <IoIosArrowDown size={25} /> : <IoSettingsOutline size={25} />}
					</button>
				</div>
				<div className="overflow-scroll no-scrollbar h-full">
					<div className="flex flex-col justify-between h-full">
						<div>
							<div className="flex justify-center mb-2">
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
									className="text-black w-full rounded-lg p-2 mb-2 focus:outline-none focus:shadow-[inset_0_0_5px_rgba(50,50,93,0.25)]"
									placeholder="Enter Your New Name"
									value={newName}
									onChange={(e) => setNewName(e.target.value)}
									autoComplete="nickname"
								/>
								<div
									className={`flex transition-all relative duration-500 ${changeNameToggle || "-translate-y-[50px]"}`}>
									<button
										className={`bg-blue-500 p-3 transition-all duration-500 z-20 rounded-lg w-full ${
											changeNameToggle ? "max-w-[67%]" : "max-w-[1000px]"
										}`}
										onClick={() => (changeNameToggle ? nameChangeHandler() : setChangeNameToggle(true))}>
										{changeNameToggle ? "OK" : "Change Name"}
									</button>
									<button
										className={`bg-red-400 origin-left w-[30%] transition-all duration-500 block absolute right-0 top-0 z-10 rounded-lg p-3 ${
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
								className={`transition-all  mt-4 duration-500 bg-slate-500 rounded-lg overflow-hidden ${
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
										<p className="text-[11px] sm:text-xs">Keep your id to recover account</p>
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
							<div
								className={`transition-all mt-4 duration-500 bg-cyan-700 rounded-lg overflow-hidden ${
									passwordBtnToggle ? "max-h-96" : "max-h-12"
								}`}>
								<button
									className={` p-3 transition-all duration-500 z-20 w-full shadow-md ${
										passwordBtnToggle ? "bg-cyan-400 text-black" : "bg-cyan-600 text-white"
									} `}
									onClick={() => setPasswordBtnToggle(!passwordBtnToggle)}>
									{user.passwordProtected ? "Change Password" : "Set Password"}
								</button>
								<div className="p-4 gap-3 flex flex-col text-white justify-between items-center">
									<p
										className={`text-sm  flex justify-center overflow-hidden items-center origin-bottom rounded-2xl transition-all duration-500 ${
											passwordNotification.error ? "bg-red-500" : "bg-green-500"
										} ${passwordNotification.message ? "w-full h-8" : "w-0 h-0"} `}>
										{passwordNotification.message}
									</p>
									<form className="flex flex-col gap-3 w-full" action={setPasswordHandler}>
										<input hidden type="text" defaultValue={user.id || ""} autoComplete="username" />
										{user.passwordProtected ? (
											<>
												<input hidden type="text" defaultValue={user.id || ""} autoComplete="username" />
												<input
													className="text-black p-2 rounded-md"
													placeholder="Current Password"
													type="password"
													value={passwordFields.oldPass}
													onChange={(e) => setPasswordFields((pre) => ({ ...pre, oldPass: e.target.value }))}
													autoComplete="current-password"
												/>
											</>
										) : (
											<p className="text-[11px] sm:text-xs">Set a password to protect your account</p>
										)}
										<input
											className="text-black p-2 rounded-md"
											placeholder={`${user.passwordProtected ? "New " : ""}Password`}
											type="password"
											value={passwordFields.newPass}
											onChange={(e) => setPasswordFields((pre) => ({ ...pre, newPass: e.target.value }))}
											autoComplete="new-password"
										/>
										<input
											className="text-black p-2 rounded-md"
											placeholder="Confirm Password"
											type="password"
											value={passwordFields.confirmPass}
											onChange={(e) => setPasswordFields((pre) => ({ ...pre, confirmPass: e.target.value }))}
											autoComplete="new-password"
										/>
										<button
											className="flex flex-col border-2 border-sky-200 justify-center items-center rounded-lg p-3"
											type="submit">
											OK
										</button>
									</form>
								</div>
							</div>
						</div>
						<LogOutBtn toggle={logoutBtnToggle} setToggle={setLogoutBtnToggle} logout={logout} />
					</div>
				</div>
			</div>
		</>
	);
}

export default SettingsPage;
