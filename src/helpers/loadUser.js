
export default function loadUser() {
	const user = localStorage.getItem("user");
	if (user === null) {
		return "notExist";
	} else {
		return JSON.parse(user);
	}
}
