function LogOutBtn({ toggle, setToggle, logout }) {
	return (
		<div className={`mt-4 relative flex transition-all duration-500 ${toggle ? "gap-3" : "gap-0"} select-none`}>
			<div
				className={`absolute top-[50%] -translate-y-[50%] w-full transition-all duration-500 flex gap-1 cursor-pointer  ${
					toggle ? "scale-0" : "scale-100"
				}
				`}
				onClick={() => {
					setToggle(true);
				}}>
				<span
					className={`transition-all w-[50%] duration-500 text-right origin-left ${toggle ? "scale-0" : "scale-100"}`}>
					Log
				</span>
				<span className={`transition-all w-[50%] duration-500 origin-right ${toggle ? "scale-0" : "scale-100"}`}>
					Out
				</span>
			</div>
			<button
				className={`origin-left w-[50%] transition-all duration-500 text-center inline-block p-3 ${
					toggle ? "bg-red-500 rounded-xl" : "bg-red-800 rounded-l-xl"
				}`}
				onClick={() => {
					toggle ? logout() : setToggle(true);
				}}>
				<p className={`transition-all duration-500 origin-right ${toggle ? "scale-100" : "scale-0"}`}>Yes, Log Out</p>
			</button>
			<button
				className={` origin-left w-[50%] transition-all duration-500 text-center inline-block p-3 ${
					toggle ? "bg-teal-600 rounded-xl" : "bg-red-800  rounded-r-xl"
				}`}
				onClick={() => {
					toggle ? setToggle(false) : setToggle(true);
				}}>
				<p className={`transition-all duration-500 origin-left ${toggle ? "scale-100" : "scale-0"}`}>No, Stay In</p>
			</button>
		</div>
	);
}

export default LogOutBtn;
