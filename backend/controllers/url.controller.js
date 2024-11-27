import Url from "../models/url.models.js";
import shortid from "shortid";

export const shortenUrl = async (req, res) => {
	const { originalUrl } = req.body;

	if (!originalUrl) {
		return res.status(400).json({ error: "URL is required" });
	}

	const shortId = shortid.generate();
	const newUrl = new Url({ originalUrl, shortId });

	try {
		await newUrl.save();
		res
			.status(201)
			.json({ shortUrl: `${req.protocol}://${req.get("host")}/${shortId}` });
	} catch (err) {
		res.status(500).json({
			message: "Failed to Shorten the URL" + err.message,
			success: false,
		});
	}
};

export const redirectToOriginal = async (req, res) => {
	const { shortId } = req.params;

	try {
		const url = await Url.findOneAndUpdate(
			{ shortId },
			{ $inc: { clicks: 1 }, lastAccessed: new Date() },
			{ new: true },
		);

		if (!url) {
			return res.status(404).json({ error: "URL not found" });
		}

		const redirectUrl = url.originalUrl.startsWith("http")
			? url.originalUrl
			: `http://${url.originalUrl}`;

		res.status(200).json({ message: redirectUrl, success: true });
	} catch (err) {
		res.status(500).json({
			message: "Failed to Redirect the URL" + err.message,
			success: false,
		});
	}
};

export const getStats = async (req, res) => {
	const { shortId } = req.params;

	try {
		const url = await Url.findOne({ shortId });

		if (!url) {
			return res.status(404).json({ error: "URL not found" });
		}

		res.json({
			originalUrl: url.originalUrl,
			clicks: url.clicks,
			lastAccessed: url.lastAccessed,
		});
	} catch (err) {
		res.status(500).json({
			message: "Failed to Get the URL" + err.message,
			success: false,
		});
	}
};
