import {authMiddleware} from "@clerk/nextjs";

export default authMiddleware({
	publicRoutes: [
		"/",
		"/api/webhook",
		"/video/:id",
		"/playlist/:id",
		"/:username",
		"/new",
		"/top",
	],
	ignoredRoutes: ["/api/webhook"],
});

export const config = {
	matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
