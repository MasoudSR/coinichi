import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";

export async function POST(req) {
	try {
		await connectMongoDB();
	} catch (error) {
		return Response.json({ error: "internal server error" }, { status: 500 });
	}

	const userData = await req.json();

	const user = await User.findOne({ id: userData.id });
	if (!user) {
		return Response.json({ error: "user not found" }, { status: 404 });
	}
	if (user.passwordProtected) {
		if (userData.password !== user.password) {
		return Response.json({ error: "ID or password is incorrect" }, { status: 401 });
		}
	}

	return Response.json({coins: user.coins , userData:{id:user.id,name:user.name,passwordProtected:user.passwordProtected}});
}

export async function PATCH(req) {
	try {
		await connectMongoDB();
	} catch (error) {
		return Response.json({ error: "internal server error" }, { status: 500 });
	}

	const body = await req.json();

	const user = await User.findOne({ id: body.id });
	user.coins = body.coins;

	await user.save();

	return Response.json("coins saved");
}
