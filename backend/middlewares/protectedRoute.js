import { RateLimiterMemory } from "rate-limiter-flexible";

const rateLimiter = new RateLimiterMemory({
	points: 100,
	duration: 60,
});

const protectedRoute = (req, res, next) => {
	const ip = req.headers["x-forwarded-for"] || req.ip;
	rateLimiter
		.consume(ip)
		.then(() => next())
		.catch(() => {
			res.status(429).json({
				message: "Too many requests. Please try again later.",
				success: false,
			});
		});
};

export default protectedRoute;
