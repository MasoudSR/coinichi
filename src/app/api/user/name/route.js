import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";

export async function PATCH(req) {
	try {
		await connectMongoDB();
	} catch (error) {
		return Response.json({ error: "internal server error" }, { status: 500 });
	}

	const body = await req.json();

	const regex = /^[A-Za-z0-9]+([A-Za-z0-9]*|[._-]?[A-Za-z0-9]+)*$/g;
	const valid = body.newName.match(regex);

	if (!valid) {
		return Response.json({ error: "invalid name" }, { status: 400 });
	}

	const user = await User.findOne({ id: body.id });
	user.name = body.newName;

	await user.save();

	return Response.json({ id: body.id, name: user.name });
}
