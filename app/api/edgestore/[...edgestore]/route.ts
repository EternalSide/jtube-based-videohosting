import {initEdgeStore} from "@edgestore/server";
import {createEdgeStoreNextHandler} from "@edgestore/server/adapters/next/app";

const es = initEdgeStore.create();

/**
 * This is the main router for the Edge Store buckets.
 */
const edgeStoreRouter = es.router({
	videos: es.fileBucket({accept: ["video/*"], maxSize: 1024 * 1024 * 30}),
	videosPreviews: es.fileBucket({accept: ["image/*"]}),
	usersBg: es.fileBucket({accept: ["image/*"]}),
	usersImages: es.fileBucket({accept: ["image/*"]}),
});

const handler = createEdgeStoreNextHandler({
	router: edgeStoreRouter,
});

export {handler as GET, handler as POST};

/**
 * This type is used to create the type-safe client for the frontend.
 */
export type EdgeStoreRouter = typeof edgeStoreRouter;
