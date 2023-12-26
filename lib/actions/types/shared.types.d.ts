type userId = {
	userId: string;
};

export interface HandleUserHistoryParams extends userId {
	path: string;
	isSavingHistory: boolean;
}

export interface GetUserFollowingsVideosParams extends userId {}

export interface GetWatchedHistoryParams extends userId {
	searchParams?: string;
	page?: number;
}

export interface ClearUserHistoryParams extends userId {
	path: string;
}

type VideoId = {
	videoId: string;
};

export interface GetVideoByIdParams extends VideoId {}

export interface IncreaseVideoViewParams extends VideoId {}

export interface HandleFollowUserParams {
	isFollowing: boolean;
	userId: string;
	currentUserId: string;
	path: string;
}

export interface GetUserByUsernameParams {
	username: string;
	sortOptions?: string;
	searchQuery?: string;
}

export interface CreateUserParams {
	clerkId: string;
	name: string;
	username: string;
	email: string;
	picture: string;
}

export interface UploadVideoParams {
	values: {
		video_title: string;
		video_description?: string;
		videoUrl: string;
		videoPreviewUrl: string;
		author: string;
		tags: string[] | any;
	};
	path: string;
}

export interface AddToHistoryParams {
	videoId: string;
	userId: string;
}

export interface HandleAddToWatchedListParams {
	inWatchedList: boolean;
	currentUserId: string;
	path: string;
	videoId: string;
}

export interface HandleLikeActionParams {
	path: string;
	currentUserId: string;
	isLiked: boolean;
	videoId: string;
	type: "like" | "dislike";
	isDisliked: boolean;
}

export interface LeaveCommentParams {
	path: string;
	userId: string;
	authorId: string;
	text: string;
	videoId: string;
}
