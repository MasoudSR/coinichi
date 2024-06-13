import React from "react";

function Bubble({ isStarted, bubbleText }) {
	return (
		<div
			className={`absolute z-10 translate-x-20 -translate-y-10 transition-all origin-bottom-left duration-500 max-w-28 ${
				isStarted ? "scale-0" : "scale-100"
			} `}>
			<div className="bg-white p-3 rounded-3xl text-center shadow-lg">
				<p className="break-words">{bubbleText}</p>
			</div>
			<div className="bg-white w-4 h-4 rounded-full shadow-lg"></div>
		</div>
	);
}

export default Bubble;
