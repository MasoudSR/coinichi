import React from "react";

function Loading() {
	return (
		<div className="fixed top-0 flex flex-col gap-2 justify-center items-center bg-gray-500/20 w-full h-full z-30 backdrop-blur-md font-bold text-white">
			<div className="animate-bounce text-7xl">🪙</div>
			<p className="drop-shadow-lg">Loading</p>
		</div>
	);
}

export default Loading;
