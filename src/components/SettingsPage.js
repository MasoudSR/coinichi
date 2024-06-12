import React from "react";

function SettingsPage({ page, setPage, user }) {
	return (
		<div
			className={`bg-slate-900 p-4 rounded-t-2xl text-white max-w-xl fixed -bottom-[59%] left-0 w-full transition-all duration-500 mx-auto h-[70%] z-20 inset-x-0 ${
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
		</div>
	);
}

export default SettingsPage;
