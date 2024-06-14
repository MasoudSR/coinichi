import mongoose, { Schema, models } from "mongoose";

const userSchema = new Schema({
	id: {
		type: String,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	password: {
		type: String,
	},
	passwordProtected: {
		type: Boolean,
		required: true,
	},
	coins: {
		type: Number,
	},
});

const User = models.User || mongoose.model("User", userSchema);
export default User;
