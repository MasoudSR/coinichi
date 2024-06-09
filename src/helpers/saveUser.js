export default function saveUser(userData) {
	localStorage.setItem("user", JSON.stringify(userData));
}
