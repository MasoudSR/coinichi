import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";

export async function POST(req) {
	try {
		await connectMongoDB();
	} catch (error) {
		return Response.json({ error: "Internal server error" }, { status: 500 });
	}

	const body = await req.json();

	const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/g;
	const valid = body.newPassword.match(regex);

	if (!valid) {
		return Response.json({ error: "Invalid password" }, { status: 400 });
	}

	const user = await User.findOne({ id: body.id });
	let message = "";

	if (user.passwordProtected) {
		if (user.password !== body.oldPassword) {
			return Response.json({ error: "Your password is incorrect" }, { status: 400 });
		}
		message = "Password Changed Successfully";
	} else {
		user.passwordProtected = true;
		message = "Password Set Successfully";
	}

	user.password = body.newPassword;

	await user.save();

	return Response.json({
		message,
		userData: { id: body.id, name: user.name, passwordProtected: user.passwordProtected },
	});
}
