import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";

export async function POST(req) {
	try {
		await connectMongoDB();
	} catch (error) {
		return Response.json({ error: "internal server error" }, { status: 500 });
	}

	const id = await req.json();

	const user = await User.findOne({ id: id });
	if (!user) {
		return Response.json({ error: "user not found" }, { status: 404 });
	}

	return Response.json(user);
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
