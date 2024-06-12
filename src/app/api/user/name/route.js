import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";

export async function PATCH(req) {
	try {
		await connectMongoDB();
	} catch (error) {
		return Response.json({ error: "internal server error" }, { status: 500 });
	}

	const body = await req.json();

	const user = await User.findOne({ id: body.id });
	user.name = body.newName;

	await user.save();

	return Response.json({ id: body.id, name: user.name });
}
