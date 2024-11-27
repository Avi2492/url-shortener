import mongoose from "mongoose";

const UrlSchema = new mongoose.Schema(
	{
		originalUrl: {
			type: String,
			required: true,
		},
		shortId: {
			type: String,
			required: true,
			unique: true,
		},
		clicks: {
			type: Number,
			default: 0,
		},
		lastAccessed: {
			type: Date,
		},
	},
	{ timestamps: true },
);

UrlSchema.index({ shortId: 1 });

const Url = mongoose.model("Url", UrlSchema);

export default Url;
