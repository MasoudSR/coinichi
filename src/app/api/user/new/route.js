import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { nanoid } from "nanoid";

export async function GET() {
	try {
		await connectMongoDB();
	} catch (error) {
		return Response.json({ error: "internal server error" }, { status: 500 });
	}

	const id = nanoid();
	await User.create({ id, name: "new user", coins: 0 });

	return Response.json({ id, name: "new user" });
}
