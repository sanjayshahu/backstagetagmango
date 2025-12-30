/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface ApiResponseDto {
  /**
   * Human-readable message based on HTTP status code
   * @example "Successful"
   */
  message: string;
  /** Response data (present for successful responses) */
  result?: object;
}

export interface ApiErrorResponseDto {
  /**
   * Error message
   * @example "Not found"
   */
  message: string;
  /**
   * Detailed error information
   * @example "Stage with slug "test" not found"
   */
  error?: string;
  /**
   * Validation errors (for 422 responses)
   * @example ["email must be a valid email","name should not be empty"]
   */
  errors?: string[];
}

export interface PingResponseDto {
  /**
   * Response message
   * @example "pong"
   */
  message: string;
  /**
   * Server timestamp
   * @example "2024-01-15T10:30:00.000Z"
   */
  timestamp: string;
}

export interface StageOwnerDto {
  /**
   * Owner user ID
   * @example "user_123"
   */
  id: string;
  /**
   * Owner display name
   * @example "John Doe"
   */
  name: string;
  /**
   * Owner profile image URL
   * @example "https://example.com/avatar.jpg"
   */
  image: object | null;
}

export interface StageResponseDto {
  /**
   * Stage ID
   * @example "stage_123"
   */
  id: string;
  /**
   * Stage name
   * @example "My Awesome Stage"
   */
  name: string;
  /**
   * Stage URL slug
   * @example "my-awesome-stage"
   */
  slug: string;
  /**
   * Stage description
   * @example "A stage for awesome people"
   */
  description: object | null;
  /**
   * Stage cover image URL
   * @example "https://example.com/cover.jpg"
   */
  image: object | null;
  /**
   * Number of subscribers
   * @example 150
   */
  subscribersCount: number;
  /**
   * Number of posts
   * @example 42
   */
  postsCount: number;
  /**
   * Creation timestamp
   * @format date-time
   * @example "2024-01-15T10:30:00.000Z"
   */
  createdAt: string;
  /** Stage owner information */
  owner: StageOwnerDto;
  /**
   * Total views
   * @example 1000
   */
  totalViews: number;
}

export interface UpdateStageDto {
  /**
   * Stage name
   * @maxLength 100
   * @example "My Awesome Stage"
   */
  name?: string;
  /**
   * Stage description
   * @maxLength 500
   * @example "A stage for awesome content creators"
   */
  description?: string;
}

export interface PassSubscriptionInfoDto {
  /**
   * Subscription ID
   * @example "sub_abc123"
   */
  id: string;
  /**
   * Subscription status
   * @example "active"
   */
  status: "active" | "inactive" | "past_due" | "cancelled";
  /**
   * Subscription period start
   * @format date-time
   * @example "2024-01-15T10:30:00.000Z"
   */
  currentPeriodStart: string;
  /**
   * Subscription period end (null for lifetime/onetime passes)
   * @example "2024-02-15T10:30:00.000Z"
   */
  currentPeriodEnd?: object | null;
  /**
   * Subscription creation timestamp
   * @format date-time
   * @example "2024-01-15T10:30:00.000Z"
   */
  createdAt: string;
}

export interface PassResponseDto {
  /**
   * Pass ID
   * @example "pass_abc123"
   */
  id: string;
  /**
   * Stage ID this pass belongs to
   * @example "stage_xyz789"
   */
  stageId: string;
  /**
   * Pass name
   * @example "Free Community Access"
   */
  name: string;
  /**
   * Pass description
   * @example "Get free access to community posts and discussions"
   */
  description?: object | null;
  /**
   * Pass type
   * @example "free"
   */
  passType: "free" | "paid";
  /**
   * Recurring type
   * @example "onetime"
   */
  recurringType: "onetime" | "recurring";
  /**
   * Price in multiple currencies (for paid passes). At least one currency is required.
   * @example {"usdCents":999,"inrPaise":82917}
   */
  price?: object | null;
  /**
   * Duration in days (for recurring passes)
   * @example 30
   */
  durationDays?: object | null;
  /**
   * Pass visibility
   * @example "public"
   */
  visibility: "public" | "hidden";
  /**
   * Whether this is the ground pass for the stage
   * @example false
   */
  isGroundPass: boolean;
  /**
   * Whether subscribers to this pass can create posts
   * @example false
   */
  allowSubscriberPosting: boolean;
  /**
   * Pass theme for visual styling
   * @example "silver"
   */
  theme: "silver" | "bronze" | "charcoal" | "gold" | "navy";
  /**
   * Display order rank (lower values appear first)
   * @example 0
   */
  rank: number;
  /**
   * Pass creation timestamp
   * @format date-time
   * @example "2024-01-15T10:30:00.000Z"
   */
  createdAt: string;
  /**
   * Pass last update timestamp
   * @format date-time
   * @example "2024-01-15T10:30:00.000Z"
   */
  updatedAt: string;
  /** User's subscription to this pass (present if authenticated user is subscribed) */
  subscription?: PassSubscriptionInfoDto;
  /**
   * Number of unique active subscribers to this pass (only present for stage owners)
   * @example 42
   */
  memberCount?: number;
  /**
   * Total lifetime earnings in USD cents for this pass (only present for stage owners)
   * @example 150000
   */
  totalLifetimeEarnings?: number;
}

export interface PassPriceDto {
  /**
   * Price in USD cents
   * @min 0
   * @example 999
   */
  usdCents?: number;
  /**
   * Price in INR paise
   * @min 0
   * @example 82917
   */
  inrPaise?: number;
}

export interface CreatePassDto {
  /**
   * Pass name
   * @maxLength 100
   * @example "Premium Access"
   */
  name: string;
  /**
   * Pass description
   * @maxLength 500
   * @example "Get full access to all premium content"
   */
  description?: string;
  /**
   * Pass type - free or paid
   * @default "free"
   * @example "paid"
   */
  passType?: "free" | "paid";
  /**
   * Recurring type - onetime (lifetime) or recurring (subscription)
   * @default "onetime"
   * @example "recurring"
   */
  recurringType?: "onetime" | "recurring";
  /**
   * Pass price (required for paid passes). At least one currency must be provided.
   * @example {"usdCents":999,"inrPaise":82917}
   */
  price?: PassPriceDto;
  /**
   * Duration in days for recurring passes (e.g., 30 for monthly)
   * @min 1
   * @example 30
   */
  durationDays?: number;
  /**
   * Pass visibility
   * @default "public"
   * @example "public"
   */
  visibility?: "public" | "hidden";
  /**
   * Whether this is the ground pass (default pass for the stage). Only one ground pass per stage.
   * @default false
   * @example false
   */
  isGroundPass?: boolean;
  /**
   * Whether subscribers to this pass can create posts. When enabled, users with active subscriptions can post.
   * @default false
   * @example false
   */
  allowSubscriberPosting?: boolean;
  /**
   * Pass theme for visual styling
   * @default "silver"
   * @example "gold"
   */
  theme?: "silver" | "bronze" | "charcoal" | "gold" | "navy";
}

export interface UpdatePassDto {
  /**
   * Pass name
   * @maxLength 100
   * @example "Updated Pass Name"
   */
  name?: string;
  /**
   * Pass description
   * @maxLength 500
   * @example "Updated description for the pass"
   */
  description?: string;
  /**
   * Pass type - free or paid
   * @example "paid"
   */
  passType?: "free" | "paid";
  /**
   * Recurring type - onetime (lifetime) or recurring (subscription)
   * @example "recurring"
   */
  recurringType?: "onetime" | "recurring";
  /**
   * Pass price. At least one currency must be provided for paid passes.
   * @example {"usdCents":999,"inrPaise":82917}
   */
  price?: PassPriceDto;
  /**
   * Duration in days for recurring passes (e.g., 30 for monthly)
   * @min 1
   * @example 30
   */
  durationDays?: number;
  /**
   * Pass visibility
   * @example "public"
   */
  visibility?: "public" | "hidden";
  /**
   * Whether this is the ground pass (default pass for the stage). Only one ground pass per stage.
   * @example false
   */
  isGroundPass?: boolean;
  /**
   * Whether subscribers to this pass can create posts. When enabled, users with active subscriptions can post.
   * @example false
   */
  allowSubscriberPosting?: boolean;
  /**
   * Pass theme for visual styling
   * @example "gold"
   */
  theme?: "silver" | "bronze" | "charcoal" | "gold" | "navy";
}

export interface ReorderPassesDto {
  /**
   * Array of pass IDs in the desired order. The rank of each pass will be set to its position in the array (0-indexed).
   * @example ["pass_abc123","pass_def456","pass_ghi789"]
   */
  passIds: string[];
}

export type ReactionCountsDto = object;

export interface PostAuthorDto {
  /**
   * Author user ID
   * @example "user_123"
   */
  id: string;
  /**
   * Author display name
   * @example "John Doe"
   */
  name: string;
  /**
   * Author profile image URL
   * @example "https://example.com/avatar.jpg"
   */
  image: object | null;
  /**
   * Whether the author account is deleted
   * @example false
   */
  isDeleted: boolean;
}

export interface PostPassDto {
  /**
   * Pass ID
   * @example "pass_123"
   */
  id: string;
  /**
   * Pass name
   * @example "VIP Pass"
   */
  name: string;
  /**
   * Whether the pass is ground pass
   * @example false
   */
  isGroundPass: boolean;
}

export interface PostMediaDto {
  /**
   * Asset ID
   * @example "asset_123"
   */
  id: string;
  /**
   * Asset type
   * @example "image"
   */
  type: "image" | "video" | "audio";
  /**
   * Public URL to access the asset
   * @example "https://cdn.example.com/image.jpg"
   */
  url: string;
  /**
   * Compressed version URL (for images)
   * @example "https://cdn.example.com/image-compressed.jpg"
   */
  compressedUrl?: object | null;
  /**
   * MIME type
   * @example "image/jpeg"
   */
  mimeType: string;
  /**
   * Duration in seconds (for video/audio)
   * @example 120
   */
  durationInSeconds?: object | null;
  /**
   * Display order in the post
   * @example 0
   */
  displayOrder: number;
  /**
   * Transcoder config
   * @example {"mux":{"status":"preparing","assetId":"some-asset-id","createdAt":"2025-12-23T17:03:11.130Z"}}
   */
  transcoderConfig?: object | null;
}

export interface PostResponseDto {
  /**
   * Post ID
   * @example "post_123"
   */
  id: string;
  /**
   * Stage ID
   * @example "stage_123"
   */
  stageId: string;
  /**
   * Post text content
   * @example "Check out this exclusive content!"
   */
  text?: object | null;
  /**
   * Whether the post is pinned
   * @example false
   */
  isPinned: boolean;
  /**
   * When the post was pinned
   * @example "2024-01-15T10:30:00.000Z"
   */
  pinnedAt?: object | null;
  /**
   * When the post was published
   * @format date-time
   * @example "2024-01-15T10:30:00.000Z"
   */
  publishedAt: string;
  /**
   * Total view count
   * @example 150
   */
  totalViews: number;
  /**
   * Reaction counts by emoji
   * @example {"👍":10,"❤️":5,"😂":3}
   */
  reactionCounts: ReactionCountsDto;
  /**
   * Total comment count
   * @example 10
   */
  totalComments: number;
  /**
   * Total share count
   * @example 5
   */
  totalShares: number;
  /**
   * When the post was created
   * @format date-time
   * @example "2024-01-15T10:30:00.000Z"
   */
  createdAt: string;
  /** Post author information */
  author: PostAuthorDto;
  /** Passes that grant access to this post */
  passes: PostPassDto[];
  /** Media attachments */
  media: PostMediaDto[];
  /**
   * Current user's reaction emoji to this post. Null if not authenticated or no reaction.
   * @example "👍"
   */
  userReaction?: "👍" | "❤️" | "😂" | "😮" | "😢" | "😡" | null;
  /**
   * Challenge-related metadata (present only for challenge check-in and instructional posts)
   * @example {"challengeId":"challenge_123","checkinId":"checkin_456","checkinNumber":1,"isInstructional":false}
   */
  challengeMetadata?: object | null;
}

export interface CreatePostDto {
  /**
   * Stage ID to post to
   * @example "stage_123"
   */
  stageId: string;
  /**
   * Post text content (max 3000 characters)
   * @maxLength 3000
   * @example "Check out this exclusive content!"
   */
  text: string;
  /**
   * Pass IDs that grant access to this post. If empty, defaults to the ground pass (free pass).
   * @example ["pass_123","pass_456"]
   */
  passIds?: string[];
  /**
   * Asset IDs to attach to the post (max 20). Assets must be owned by the user and be of type image, video, or audio.
   * @maxItems 20
   * @example ["asset_123","asset_456"]
   */
  assets?: string[];
  /**
   * ISO 8601 date string for when to publish the post. Must be in the future. If not provided, post is published immediately.
   * @example "2024-12-25T10:00:00.000Z"
   */
  scheduledFor?: string;
}

export interface ListPostsResponseDto {
  /** List of posts */
  posts: PostResponseDto[];
  /**
   * Cursor for next page. Pass this as `cursor` query param to get the next page. Null if no more posts.
   * @example "post_abc123:2024-01-15T10:30:00.000Z"
   */
  nextCursor?: object | null;
  /**
   * Whether there are more posts to load
   * @example true
   */
  hasMore: boolean;
}

export interface PinPostResponseDto {
  /**
   * Post ID
   * @example "post_123"
   */
  id: string;
  /**
   * Whether the post is now pinned
   * @example true
   */
  isPinned: boolean;
  /**
   * When the post was pinned (null if unpinned)
   * @example "2024-01-15T10:30:00.000Z"
   */
  pinnedAt: object | null;
}

export interface UpdatePostDto {
  /**
   * Updated text content for the post (max 3000 characters)
   * @maxLength 3000
   * @example "Updated post content here"
   */
  text?: string;
  /**
   * Pass IDs that grant access to this post. If empty array, defaults to the ground pass (free pass). Same validation rules as post creation apply.
   * @example ["pass_123","pass_456"]
   */
  passIds?: string[];
}

export interface CommentAuthorDto {
  /**
   * Author user ID
   * @example "user_123"
   */
  id: string;
  /**
   * Author display name
   * @example "John Doe"
   */
  name: string;
  /**
   * Author profile image URL
   * @example "https://example.com/avatar.jpg"
   */
  image: object | null;
  /**
   * Whether the author account is deleted
   * @example false
   */
  isDeleted: boolean;
}

export interface CommentResponseDto {
  /**
   * Comment ID
   * @example "comment_123"
   */
  id: string;
  /**
   * Post ID
   * @example "post_123"
   */
  postId: string;
  /**
   * Parent comment ID (if this is a reply)
   * @example "comment_456"
   */
  parentId?: object | null;
  /**
   * Comment text content
   * @example "Great post! Thanks for sharing."
   */
  text: string;
  /**
   * Total likes count
   * @example 5
   */
  totalLikes: number;
  /**
   * Whether the current user has liked this comment
   * @example false
   */
  isLikedByMe: boolean;
  /**
   * Number of replies to this comment
   * @example 3
   */
  repliesCount: number;
  /**
   * When the comment was created
   * @format date-time
   * @example "2024-01-15T10:30:00.000Z"
   */
  createdAt: string;
  /** Comment author information */
  author: CommentAuthorDto;
  /**
   * Whether the comment has been deleted (soft delete)
   * @example false
   */
  isDeleted: boolean;
}

export interface CreateCommentDto {
  /**
   * Comment text content (max 1000 characters)
   * @maxLength 1000
   * @example "Great post! Thanks for sharing."
   */
  text: string;
  /**
   * Parent comment ID for replies. Only one level of replies is allowed (no reply to reply).
   * @example "comment_123"
   */
  parentId?: string;
}

export interface ListCommentsResponseDto {
  /** List of comments */
  comments: CommentResponseDto[];
  /**
   * Cursor for next page. Pass this as `cursor` query param to get the next page. Null if no more comments.
   * @example "comment_abc123:2024-01-15T10:30:00.000Z"
   */
  nextCursor?: object | null;
  /**
   * Whether there are more comments to load
   * @example true
   */
  hasMore: boolean;
}

export interface ToggleLikeResponseDto {
  /**
   * Whether the comment is now liked by the user
   * @example true
   */
  liked: boolean;
  /**
   * Updated total likes count
   * @example 6
   */
  totalLikes: number;
}

export interface CommentLikeUserDto {
  /**
   * User ID
   * @example "user_123"
   */
  id: string;
  /**
   * User display name
   * @example "John Doe"
   */
  name: string;
  /**
   * User profile image URL
   * @example "https://example.com/avatar.jpg"
   */
  image: object | null;
  /**
   * Whether the user account is deleted
   * @example false
   */
  isDeleted: boolean;
  /**
   * When the user liked the comment
   * @format date-time
   * @example "2024-01-15T10:30:00.000Z"
   */
  likedAt: string;
}

export interface ListCommentLikesResponseDto {
  /** List of users who liked the comment */
  likes: CommentLikeUserDto[];
  /**
   * Cursor for next page. Null if no more likes.
   * @example "like_abc123:2024-01-15T10:30:00.000Z"
   */
  nextCursor?: object | null;
  /**
   * Whether there are more likes to load
   * @example true
   */
  hasMore: boolean;
}

export interface CreateReactionResponseDto {
  /**
   * Reaction ID
   * @example "reaction_abc123"
   */
  id: string;
  /**
   * Emoji reaction
   * @example "👍"
   */
  emoji: "👍" | "❤️" | "😂" | "😮" | "😢" | "😡";
  /**
   * Updated reaction counts for the post
   * @example {"👍":5,"❤️":3}
   */
  reactionCounts: ReactionCountsDto;
}

export interface CreateReactionDto {
  /**
   * Emoji reaction
   * @example "👍"
   */
  emoji: "👍" | "❤️" | "😂" | "😮" | "😢" | "😡";
}

export interface DeleteReactionResponseDto {
  /**
   * Updated reaction counts for the post
   * @example {"👍":5,"❤️":2}
   */
  reactionCounts: ReactionCountsDto;
}

export interface ReactionUserDto {
  /**
   * User ID
   * @example "user_123"
   */
  id: string;
  /**
   * User display name
   * @example "John Doe"
   */
  name: string;
  /**
   * User profile image URL
   * @example "https://example.com/avatar.jpg"
   */
  image: object | null;
}

export interface ReactionResponseDto {
  /**
   * Reaction ID
   * @example "reaction_abc123"
   */
  id: string;
  /**
   * Post ID
   * @example "post_xyz"
   */
  postId: string;
  /**
   * Emoji reaction
   * @example "👍"
   */
  emoji: "👍" | "❤️" | "😂" | "😮" | "😢" | "😡";
  /**
   * When the reaction was created
   * @format date-time
   * @example "2024-01-15T10:30:00.000Z"
   */
  createdAt: string;
  /** User who reacted */
  user: ReactionUserDto;
}

export interface ListReactionsResponseDto {
  /** List of reactions */
  reactions: ReactionResponseDto[];
  /**
   * Cursor for next page. Pass as `cursor` query param. Null if no more pages.
   * @example "reaction_abc120:2024-01-15T10:28:00.000Z"
   */
  nextCursor?: object | null;
  /**
   * Whether there are more reactions to load
   * @example true
   */
  hasMore: boolean;
}

export interface SubscriptionResponseDto {
  /**
   * Subscription ID
   * @example "sub_abc123"
   */
  id: string;
  /**
   * User ID
   * @example "user_xyz789"
   */
  userId: string;
  /**
   * Stage ID
   * @example "stage_def456"
   */
  stageId: string;
  /**
   * Pass ID
   * @example "pass_ghi012"
   */
  passId: string;
  /**
   * Subscription status
   * @example "active"
   */
  status: "active" | "inactive" | "past_due" | "cancelled";
  /**
   * Subscription period start
   * @format date-time
   * @example "2024-01-15T10:30:00.000Z"
   */
  currentPeriodStart: string;
  /**
   * Subscription period end (null for lifetime/onetime passes)
   * @example "2024-02-15T10:30:00.000Z"
   */
  currentPeriodEnd?: object | null;
  /**
   * Subscription creation timestamp
   * @format date-time
   * @example "2024-01-15T10:30:00.000Z"
   */
  createdAt: string;
}

export interface JoinPassResponseDto {
  /**
   * Result type: subscription for free passes, redirect for paid passes
   * @example "subscription"
   */
  type: "subscription" | "redirect";
  /** Subscription data (present when type is "subscription") */
  data?: SubscriptionResponseDto;
  /**
   * Redirect URL for payment (present when type is "redirect")
   * @example "https://buy.stripe.com/..."
   */
  url?: string;
}

export interface PassMemberDto {
  /**
   * Member user ID
   * @example "user_123"
   */
  id: string;
  /**
   * Member display name
   * @example "John Doe"
   */
  name: string;
  /**
   * Member email address
   * @example "john@example.com"
   */
  email: string;
  /**
   * Member profile image URL
   * @example "https://example.com/avatar.jpg"
   */
  image: object | null;
  /**
   * Whether the member account is deleted
   * @example false
   */
  isDeleted: boolean;
  /**
   * When the member first subscribed to this pass
   * @format date-time
   * @example "2024-01-15T10:30:00.000Z"
   */
  joinedAt: string;
}

export interface ListPassMembersResponseDto {
  /** List of members */
  members: PassMemberDto[];
  /**
   * Cursor for next page. Pass this as `cursor` query param to get the next page. Null if no more members.
   * @example "user_abc123:2024-01-15T10:30:00.000Z"
   */
  nextCursor?: object | null;
  /**
   * Total count of members matching the filter criteria
   * @example 150
   */
  total: number;
}

export interface VideoCallAuthorDto {
  /**
   * Author user ID
   * @example "user_123"
   */
  id: string;
  /**
   * Author name
   * @example "John Doe"
   */
  name: string;
  /**
   * Author profile image URL
   * @example "https://example.com/avatar.jpg"
   */
  image?: object;
  /**
   * Whether the author account is deleted
   * @example false
   */
  isDeleted: boolean;
}

export interface VideoCallPassDto {
  /**
   * Pass ID
   * @example "pass_123"
   */
  id: string;
  /**
   * Pass name
   * @example "VIP Pass"
   */
  name: string;
}

export interface VideoCallResponseDto {
  /**
   * Video call ID
   * @example "vc_123"
   */
  id: string;
  /**
   * Stage ID
   * @example "stage_123"
   */
  stageId: string;
  /**
   * Video call title
   * @example "Weekly Q&A Session"
   */
  title: string;
  /**
   * Video call description
   * @example "Join us for our weekly Q&A session!"
   */
  description?: object;
  /**
   * Scheduled start time
   * @format date-time
   * @example "2024-12-25T10:00:00.000Z"
   */
  scheduledStartAt: string;
  /**
   * Scheduled end time
   * @format date-time
   * @example "2024-12-25T11:00:00.000Z"
   */
  scheduledEndAt: string;
  /**
   * Actual start time (when call went live)
   * @example "2024-12-25T10:02:00.000Z"
   */
  actualStartAt?: object;
  /**
   * Actual end time
   * @example "2024-12-25T11:05:00.000Z"
   */
  actualEndAt?: object;
  /**
   * Call status
   * @example "scheduled"
   */
  status: "scheduled" | "live" | "ended" | "cancelled";
  /**
   * Whether a join URL is available (true if live or starting soon)
   * @example true
   */
  hasJoinUrl: boolean;
  /**
   * Join URL for the video call (only included when hasJoinUrl is true)
   * @example "https://zoom.us/j/123456789"
   */
  joinUrl?: string;
  /**
   * When the call was created
   * @format date-time
   */
  createdAt: string;
  /** Author information */
  author: VideoCallAuthorDto;
  /** Passes that grant access to this call */
  passes: VideoCallPassDto[];
  /**
   * Total number of distinct subscribers across all passes assigned to this call (potential attendees)
   * @example 150
   */
  totalMembers: number;
  /**
   * Total number of distinct users who actually attended the call (attended=true)
   * @example 42
   */
  totalAttended: number;
  /**
   * Array of up to 5 profile image URLs from subscribers (for promotional display)
   * @example ["https://example.com/avatar1.jpg","https://example.com/avatar2.jpg"]
   */
  promoSubscribersImages: string[];
}

export interface CreateVideoCallDto {
  /**
   * Title of the video call
   * @maxLength 200
   * @example "Weekly Q&A Session"
   */
  title: string;
  /**
   * Description of the video call
   * @maxLength 2000
   * @example "Join us for our weekly Q&A session where we answer your questions!"
   */
  description?: string;
  /**
   * ISO 8601 date string for when the video call starts. Must be in the future.
   * @example "2024-12-25T10:00:00.000Z"
   */
  scheduledStartAt: string;
  /**
   * ISO 8601 date string for when the video call ends. Must be after scheduledStartAt.
   * @example "2024-12-25T11:00:00.000Z"
   */
  scheduledEndAt: string;
  /**
   * Pass IDs that grant access to this video call. If empty, defaults to the ground pass (free pass).
   * @example ["pass_123","pass_456"]
   */
  passIds?: string[];
}

export interface VideoCallStatsResponseDto {
  /**
   * Total number of video calls in the date range
   * @example 42
   */
  totalCalls: number;
  /**
   * Total number of unique users who attended any call in the date range
   * @example 150
   */
  totalUniqueAttendees: number;
}

export interface ListVideoCallsResponseDto {
  /** List of video calls */
  videoCalls: VideoCallResponseDto[];
  /**
   * Cursor for next page (null if no more pages)
   * @example "eyJpZCI6InZjXzEyMyIsInNjaGVkdWxlZFN0YXJ0QXQiOiIyMDI0LTEyLTI1VDEwOjAwOjAwLjAwMFoifQ=="
   */
  nextCursor?: object;
  /**
   * Whether there are more results after this page
   * @example true
   */
  hasMore: boolean;
}

export interface JoinVideoCallResponseDto {
  /**
   * The Zoom join URL for this user
   * @example "https://zoom.us/j/1234567890?pwd=abc123"
   */
  joinUrl: string;
  /**
   * Whether the user is joining as a host (owner/admin/moderator)
   * @example false
   */
  isHost: boolean;
}

export interface MemberPassDto {
  /**
   * Pass ID
   * @example "pass_123"
   */
  id: string;
  /**
   * Pass name
   * @example "Premium Pass"
   */
  name: string;
}

export interface VideoCallMemberDto {
  /**
   * User ID
   * @example "user_123"
   */
  id: string;
  /**
   * User name
   * @example "John Doe"
   */
  name: string;
  /**
   * User email
   * @example "john@example.com"
   */
  email: string;
  /**
   * User profile image URL
   * @example "https://example.com/avatar.jpg"
   */
  image?: object;
  /**
   * Whether the user account is deleted
   * @example false
   */
  isDeleted: boolean;
  /**
   * Whether the user actually attended the call
   * @example true
   */
  attended: boolean;
  /**
   * When the user clicked join to register for the call (if registered)
   * @example "2024-12-25T10:05:00.000Z"
   */
  joinedAt?: object;
  /** Passes this member is subscribed to on this stage */
  passes: MemberPassDto[];
}

export interface ListVideoCallMembersResponseDto {
  /** List of members */
  members: VideoCallMemberDto[];
  /**
   * Total number of members matching the query
   * @example 42
   */
  total: number;
  /**
   * Cursor for next page (null if no more pages)
   * @example "eyJ1c2VySWQiOiJ1c2VyXzEyMyJ9"
   */
  nextCursor?: object;
  /**
   * Whether there are more results after this page
   * @example true
   */
  hasMore: boolean;
}

export interface UpdateVideoCallDto {
  /**
   * Title of the video call
   * @maxLength 200
   * @example "Updated Q&A Session"
   */
  title?: string;
  /**
   * Description of the video call
   * @maxLength 2000
   * @example "Updated description for the session"
   */
  description?: string;
  /**
   * ISO 8601 date string for when the video call starts. Must be in the future.
   * @example "2024-12-25T10:00:00.000Z"
   */
  scheduledStartAt?: string;
  /**
   * ISO 8601 date string for when the video call ends. Must be after scheduledStartAt.
   * @example "2024-12-25T11:00:00.000Z"
   */
  scheduledEndAt?: string;
  /**
   * Pass IDs that grant access to this video call. If provided, replaces existing passes.
   * @example ["pass_123","pass_456"]
   */
  passIds?: string[];
}

export interface AssetResponseDto {
  /** @example "asset_abc123" */
  id: string;
  type: "image" | "video" | "audio";
  /** @example "testing.assets.bpasses.com" */
  domain: string;
  /** @example "stages/stage123/user456/image/1234567890_photo.jpg" */
  path: string;
  /** @example "https://testing.assets.bpasses.com/stages/stage123/user456/image/1234567890_photo.jpg" */
  url: string;
  /**
   * Compressed version path (only for compressible images)
   * @example "stages/stage123/user456/image/1234567890_photo_compressed.webp"
   */
  compressedPath?: object;
  /**
   * Compressed version URL (only for compressible images)
   * @example "https://testing.assets.bpasses.com/stages/stage123/user456/image/1234567890_photo_compressed.webp"
   */
  compressedUrl?: object;
  /** @example "image/jpeg" */
  mimeType: string;
  /** @example 1048576 */
  sizeInBytes: number;
  /** @example 120 */
  durationInSeconds?: object | null;
  /**
   * Transcoder configuration for video assets (Mux)
   * @example {"mux":{"assetId":"mux_123","status":"preparing"}}
   */
  transcoderConfig?: object;
  /**
   * @format date-time
   * @example "2024-01-01T00:00:00.000Z"
   */
  createdAt: string;
}

export interface OrderAmountDto {
  /**
   * Amount in USD cents
   * @example 999
   */
  usdCents?: number | null;
  /**
   * Amount in INR paise
   * @example 79900
   */
  inrPaise?: number | null;
}

export interface OrderSubscriberDto {
  /**
   * Subscriber user ID
   * @example "user_123"
   */
  id: string;
  /**
   * Subscriber display name
   * @example "John Doe"
   */
  name: string;
  /**
   * Subscriber email address
   * @example "john@example.com"
   */
  email: string;
  /**
   * Subscriber profile image URL
   * @example "https://example.com/avatar.jpg"
   */
  image: object | null;
  /**
   * Whether the subscriber account is deleted
   * @example false
   */
  isDeleted: boolean;
}

export interface OrderPassDto {
  /**
   * Pass ID
   * @example "pass_123"
   */
  id: string;
  /**
   * Pass name
   * @example "VIP Pass"
   */
  name: string;
  /**
   * Pass type
   * @example "paid"
   */
  passType: "free" | "paid";
}

export interface OrderResponseDto {
  /**
   * Order ID
   * @example "order_123"
   */
  id: string;
  /** Order amount in multiple currencies */
  amount: OrderAmountDto;
  /**
   * Order status
   * @example "completed"
   */
  status: "pending" | "completed" | "failed" | "refunded";
  /**
   * When the order was created
   * @format date-time
   * @example "2024-01-15T10:30:00.000Z"
   */
  createdAt: string;
  /**
   * When the order was completed
   * @example "2024-01-15T10:31:00.000Z"
   */
  completedAt: object | null;
  /** Subscriber information */
  subscriber: OrderSubscriberDto;
  /** Pass information */
  pass: OrderPassDto;
}

export interface ListOrdersResponseDto {
  /** List of orders */
  orders: OrderResponseDto[];
  /**
   * Cursor for next page. Pass this as `cursor` query param to get the next page. Null if no more orders.
   * @example "order_abc123:2024-01-15T10:30:00.000Z"
   */
  nextCursor?: object | null;
  /**
   * Total count of orders matching the filter criteria
   * @example 150
   */
  total: number;
}

export interface OrderStatsResponseDto {
  /**
   * Total count of completed orders
   * @example 150
   */
  completedOrderCount: number;
  /**
   * Total collected amount in USD cents from completed orders
   * @example 149850
   */
  totalCollectedUsdCents: number;
}

export interface CaptureEventResponseDto {
  /**
   * Whether the event was recorded (false if deduplicated)
   * @example true
   */
  recorded: boolean;
  /**
   * Message explaining the result
   * @example "Event recorded successfully"
   */
  message?: string;
}

export interface CaptureEventDto {
  /**
   * The ID of the stage for page_view events
   * @example "stage_abc123"
   */
  stageId: string;
  /**
   * The referring URL that led to this page
   * @example "https://google.com/search?q=backstage"
   */
  referrer?: string;
  /**
   * Additional metadata for the event
   * @example {"source":"mobile_app","campaign":"summer_promo"}
   */
  metadata?: object;
}

export interface PageViewCountResponseDto {
  /**
   * The stage ID
   * @example "stage_abc123"
   */
  stageId: string;
  /**
   * Start date of the queried range
   * @example "2024-01-01"
   */
  startDate: string;
  /**
   * End date of the queried range
   * @example "2024-01-31"
   */
  endDate: string;
  /**
   * Total number of page views in the date range
   * @example 1234
   */
  totalViews: number;
}

export interface ChallengeCoverImageDto {
  /** Asset ID */
  id: string;
  /** Image URL */
  url: string;
  /** Compressed image URL */
  compressedUrl?: object;
}

export interface ChallengeAuthorDto {
  /** Author user ID */
  id: string;
  /** Author name */
  name: string;
  /** Author profile image URL */
  image?: object;
}

export interface ChallengePassDto {
  /** Pass ID */
  id: string;
  /** Pass name */
  name: string;
}

export interface ChallengeResponseDto {
  /** Challenge ID */
  id: string;
  /** Stage ID */
  stageId: string;
  /** Challenge name */
  name: string;
  /** Challenge description */
  description?: object;
  /** Theme string for frontend styling */
  theme?: object;
  /** Cover image details */
  coverImage?: ChallengeCoverImageDto;
  /** Visibility of the challenge */
  visibility: "public" | "hidden";
  /** Challenge type */
  challengeType: "always_on" | "fixed_dates";
  /**
   * Start date
   * @format date-time
   */
  startDate: string;
  /** End date (null for always_on challenges) */
  endDate?: object;
  /** Length in days for always_on challenges (duration or check-in count) */
  lengthInDays?: object;
  /** Days of week for check-ins */
  daysOfWeek: string[];
  /** Check-in type */
  checkinType: "image_required" | "image_optional" | "no_image";
  /** IANA timezone of the creator (used to interpret start/end dates as calendar days) */
  creatorTimezone: string;
  /** Whether checkin must include a post */
  requiresPost: boolean;
  /**
   * When the challenge was created
   * @format date-time
   */
  createdAt: string;
  /** Author information */
  author: ChallengeAuthorDto;
  /** Passes that grant access */
  passes: ChallengePassDto[];
}

export interface CreateChallengeDto {
  /**
   * Name of the challenge
   * @maxLength 200
   * @example "30-Day Fitness Challenge"
   */
  name: string;
  /**
   * Description of the challenge
   * @maxLength 2000
   * @example "Join us for a 30-day fitness journey!"
   */
  description?: string;
  /**
   * Theme string for frontend styling
   * @maxLength 100
   * @example "fitness"
   */
  theme?: string;
  /**
   * Asset ID for cover image
   * @example "asset_123"
   */
  coverImageId?: string;
  /**
   * Visibility of the challenge
   * @default "public"
   */
  visibility?: "public" | "hidden";
  /**
   * Type of challenge: always_on (no end date, has length) or fixed_dates (has end date)
   * @example "fixed_dates"
   */
  challengeType: "always_on" | "fixed_dates";
  /**
   * ISO 8601 date string for when the challenge starts
   * @example "2025-01-01T00:00:00.000Z"
   */
  startDate: string;
  /**
   * ISO 8601 date string for when the challenge ends. Required for fixed_dates type.
   * @example "2025-01-31T23:59:59.999Z"
   */
  endDate?: string;
  /**
   * Length in days for always_on challenges. If all 7 days selected, represents duration. Otherwise, represents number of check-ins required.
   * @min 1
   * @example 30
   */
  lengthInDays?: number;
  /**
   * Array of days when check-ins are expected
   * @example ["monday","wednesday","friday"]
   */
  daysOfWeek: string[];
  /**
   * Type of check-in required
   * @example "image_optional"
   */
  checkinType: "image_required" | "image_optional" | "no_image";
  /**
   * IANA timezone of the creator (e.g., America/New_York, America/Argentina/Buenos_Aires). Used to interpret the challenge start/end dates as calendar days.
   * @example "America/New_York"
   */
  creatorTimezone: string;
  /**
   * Whether checkin must include a post
   * @default false
   * @example false
   */
  requiresPost?: boolean;
  /**
   * Pass IDs that grant access to this challenge. If empty, defaults to ground pass.
   * @example ["pass_123","pass_456"]
   */
  passIds?: string[];
}

export interface ListChallengesResponseDto {
  /** List of challenges */
  challenges: ChallengeResponseDto[];
  /** Cursor for next page */
  nextCursor?: object;
  /** Whether there are more results */
  hasMore: boolean;
}

export interface UpdateChallengeDto {
  /**
   * Name of the challenge
   * @maxLength 200
   */
  name?: string;
  /**
   * Description of the challenge
   * @maxLength 2000
   */
  description?: object;
  /**
   * Theme string for frontend styling
   * @maxLength 100
   */
  theme?: object;
  /** Asset ID for cover image (set to null to remove) */
  coverImageId?: object;
  /** Visibility of the challenge */
  visibility?: "public" | "hidden";
  /** Start date (ISO 8601) */
  startDate?: string;
  /** End date (ISO 8601). Only valid for fixed_dates challenges. */
  endDate?: object;
  /**
   * Length in days for always_on challenges. Only valid for always_on challenges.
   * @min 1
   */
  lengthInDays?: number;
  /** Array of days when check-ins are expected */
  daysOfWeek?: string[];
  /** Type of check-in required */
  checkinType?: "image_required" | "image_optional" | "no_image";
  /** IANA timezone of the creator (e.g., America/New_York) */
  creatorTimezone?: string;
  /** Whether checkin must include a post */
  requiresPost?: boolean;
  /** Pass IDs to replace current passes. Empty array removes all passes. */
  passIds?: string[];
}

export interface ChallengeParticipantResponseDto {
  /** Participant ID */
  id: string;
  /** Challenge ID */
  challengeId: string;
  /** User ID */
  userId: string;
  /** IANA timezone name */
  ianaTimezone: string;
  /**
   * When the user joined the challenge
   * @format date-time
   */
  joinedAt: string;
  /** Total number of checkins scheduled */
  totalCheckins: number;
  /** List of scheduled checkins */
  checkins: object[];
}

export interface JoinChallengeDto {
  /**
   * IANA timezone name (e.g., America/New_York, Asia/Kolkata, America/Argentina/Buenos_Aires)
   * @example "America/New_York"
   */
  ianaTimezone: string;
}

export interface CheckinResponseDto {
  /** Checkin ID */
  id: string;
  /** Challenge ID */
  challengeId: string;
  /** Participant ID */
  participantId: string;
  /** User ID */
  userId: string;
  /** Checkin number (1, 2, 3, ...) */
  checkinNumber: number;
  /**
   * Expected date for this checkin
   * @format date-time
   */
  expectedDate: string;
  /** Checkin status: pending, completed, skipped, or missed */
  status: "pending" | "completed" | "skipped" | "missed";
  /** When the checkin was completed (null if not completed) */
  completedAt: object | null;
  /** Linked post ID (if any) */
  postId: object | null;
  /**
   * When the checkin record was created
   * @format date-time
   */
  createdAt: string;
}

export interface CheckinDto {
  /**
   * Post text content (required if challenge.requiresPost is true)
   * @maxLength 3000
   * @example "My progress update for today!"
   */
  text?: string;
  /**
   * Asset IDs to attach to the post (required based on challenge.checkinType)
   * @maxItems 20
   * @example ["asset_abc123"]
   */
  assets?: string[];
}

export interface CheckinStatsDto {
  /** Checkin number */
  checkinNumber: number;
  /** Total participants who have this checkin scheduled */
  totalScheduled: number;
  /** Number of participants who completed this checkin */
  totalCompleted: number;
  /** Completion rate as a percentage (0-100) */
  completionRate: number;
}

export interface ChallengeStatsResponseDto {
  /** Challenge ID */
  challengeId: string;
  /** Total number of participants */
  totalParticipants: number;
  /** Total checkins completed across all participants */
  totalCheckinsCompleted: number;
  /** Total checkins scheduled across all participants */
  totalCheckinsScheduled: number;
  /** Overall completion rate as a percentage (0-100) */
  overallCompletionRate: number;
  /** Stats grouped by checkin number */
  checkinStats: CheckinStatsDto[];
}

export interface NextCheckinDto {
  /** Checkin ID */
  id: string;
  /** Checkin number */
  checkinNumber: number;
  /**
   * Expected date for this checkin
   * @format date-time
   */
  expectedDate: string;
  /** Whether the checkin window is currently active (it is "today" in the participant's timezone) */
  isWindowActive: boolean;
  /**
   * Start of the check-in window in UTC (midnight in participant's timezone)
   * @format date-time
   */
  windowStartUtc: string;
  /**
   * End of the check-in window in UTC (23:59:59 in participant's timezone)
   * @format date-time
   */
  windowEndUtc: string;
}

export interface CheckinStatusDto {
  /** Checkin ID */
  id: string;
  /** Checkin number (1, 2, 3, ...) */
  checkinNumber: number;
  /**
   * Expected date for this checkin
   * @format date-time
   */
  expectedDate: string;
  /** Checkin status: pending (not yet due), completed (checked in), skipped (past when joined), missed (window passed) */
  status: "pending" | "completed" | "skipped" | "missed";
  /** When the checkin was completed (null if not completed) */
  completedAt: object | null;
  /** Whether this checkin is completed (status === completed) */
  isCompleted: boolean;
  /** Linked post ID (if any) */
  postId: object | null;
}

export interface ChallengeStatusResponseDto {
  /** Challenge ID */
  challengeId: string;
  /** Participant ID */
  participantId: string;
  /** User ID */
  userId: string;
  /** IANA timezone name */
  ianaTimezone: string;
  /**
   * When the user joined the challenge
   * @format date-time
   */
  joinedAt: string;
  /** Total checkins scheduled for this participant */
  totalCheckins: number;
  /** Number of checkins completed */
  completedCheckins: number;
  /** Completion progress as a percentage (0-100) */
  progressPercentage: number;
  /** Next pending checkin (if any) */
  nextCheckin?: NextCheckinDto | null;
  /** All checkins with their status */
  checkins: CheckinStatusDto[];
}

export interface CreateInstructionalPostDto {
  /**
   * Which check-in day this instruction is for (1, 2, 3...)
   * @min 1
   * @example 1
   */
  checkinNumber: number;
  /**
   * Instruction text content
   * @maxLength 3000
   * @example "Today we will focus on stretching exercises..."
   */
  text: string;
  /**
   * Asset IDs to attach to the instructional post
   * @maxItems 20
   * @example ["asset_abc123"]
   */
  assets?: string[];
}

export interface UserResponseDto {
  /**
   * User ID
   * @example "user_123"
   */
  id: string;
  /**
   * User display name
   * @example "John Doe"
   */
  name: string;
  /**
   * User email
   * @example "john@example.com"
   */
  email: string;
  /**
   * Email verification status
   * @example true
   */
  emailVerified: boolean;
  /**
   * Profile image URL
   * @example "https://example.com/avatar.jpg"
   */
  image?: object | null;
  /**
   * Whether user account is deleted
   * @example false
   */
  isDeleted: boolean;
  /**
   * Account creation date
   * @format date-time
   */
  createdAt: string;
  /**
   * Last update date
   * @format date-time
   */
  updatedAt: string;
}

export interface UpdateUserDto {
  /**
   * User display name
   * @maxLength 100
   * @example "John Doe"
   */
  name?: string;
  /**
   * Profile image URL (set to null to remove)
   * @example "https://example.com/avatar.jpg"
   */
  image?: object | null;
}

export interface DeleteUserResponseDto {
  /**
   * Deletion confirmation message
   * @example "Account deleted successfully"
   */
  message: string;
}

export type AppControllerPingData = {
  /**
   * Human-readable message based on HTTP status code
   * @example "Successful"
   */
  message: string;
  result: PingResponseDto;
};

export interface StagesControllerFindBySlugV1Params {
  /**
   * Stage URL slug (lowercase letters, numbers, and hyphens)
   * @example "my-awesome-stage"
   */
  slug: string;
}

export type StagesControllerFindBySlugV1Data = {
  /**
   * Human-readable message based on HTTP status code
   * @example "Successful"
   */
  message: string;
  result: StageResponseDto;
};

export type StagesControllerFindBySlugV1Error = ApiErrorResponseDto;

export interface StagesControllerUpdateStageV1Params {
  stageId: string;
}

export type StagesControllerUpdateStageV1Data = {
  /**
   * Human-readable message based on HTTP status code
   * @example "Successful"
   */
  message: string;
  result: StageResponseDto;
};

export type StagesControllerUpdateStageV1Error = ApiErrorResponseDto;

export interface PassesControllerGetPassV1Params {
  stageId: string;
  passId: string;
}

export type PassesControllerGetPassV1Data = {
  /**
   * Human-readable message based on HTTP status code
   * @example "Successful"
   */
  message: string;
  result: PassResponseDto;
};

export type PassesControllerGetPassV1Error = ApiErrorResponseDto;

export interface PassesControllerUpdatePassV1Params {
  passId: string;
  stageId: string;
}

export type PassesControllerUpdatePassV1Data = {
  /**
   * Human-readable message based on HTTP status code
   * @example "Successful"
   */
  message: string;
  result: PassResponseDto;
};

export type PassesControllerUpdatePassV1Error = ApiErrorResponseDto;

export interface PassesControllerDeletePassV1Params {
  passId: string;
  stageId: string;
}

export type PassesControllerDeletePassV1Data = any;

export type PassesControllerDeletePassV1Error = ApiErrorResponseDto;

export interface PassesControllerListPassesV1Params {
  /**
   * Filter by pass type
   * @example "free"
   */
  passType?: "free" | "paid";
  /**
   * Filter by visibility. Only "public" is allowed for non-owners. Owners can use "hidden" or "all".
   * @example "public"
   */
  visibility?: "public" | "hidden" | "all";
  /**
   * Filter by ground pass status
   * @example true
   */
  isGroundPass?: boolean;
  /**
   * Filter by recurring type
   * @example "onetime"
   */
  recurringType?: "onetime" | "recurring";
  /**
   * Filter by allowSubscriberPosting flag
   * @example true
   */
  allowSubscriberPosting?: boolean;
  /**
   * Return only passes where the authenticated user has an active subscription. Cannot be used by stage members (owner, admin, moderator).
   * @example true
   */
  onlySubscribed?: boolean;
  /**
   * Whether to include the ground pass in the results. Defaults to true.
   * @example false
   */
  includeGroundPass?: boolean;
  stageId: string;
}

export type PassesControllerListPassesV1Data = {
  /**
   * Human-readable message based on HTTP status code
   * @example "Successful"
   */
  message: string;
  result: PassResponseDto[];
};

export type PassesControllerListPassesV1Error = ApiErrorResponseDto;

export interface PassesControllerCreatePassV1Params {
  stageId: string;
}

export type PassesControllerCreatePassV1Data = {
  /**
   * Human-readable message based on HTTP status code
   * @example "Successful"
   */
  message: string;
  result: PassResponseDto;
};

export type PassesControllerCreatePassV1Error = ApiErrorResponseDto;

export interface PassesControllerReorderPassesV1Params {
  stageId: string;
}

export type PassesControllerReorderPassesV1Data = any;

export type PassesControllerReorderPassesV1Error = ApiErrorResponseDto;

export type PostsControllerCreatePostV1Data = {
  /**
   * Human-readable message based on HTTP status code
   * @example "Successful"
   */
  message: string;
  result: PostResponseDto;
};

export type PostsControllerCreatePostV1Error = ApiErrorResponseDto;

export interface PostsControllerListPostsV1Params {
  /**
   * Cursor for pagination. Use the `nextCursor` from previous response.
   * @example "post_abc123:2024-01-15T10:30:00.000Z"
   */
  cursor?: string;
  /**
   * Number of posts to return per page
   * @min 1
   * @max 50
   * @default 20
   * @example 20
   */
  limit?: number;
  /**
   * Filter by pass IDs. If not provided, returns posts from all passes the user has access to.
   * @example ["pass_123","pass_456"]
   */
  passIds?: string[];
  /**
   * Filter by who posted
   * @default "everyone"
   */
  postedBy?: "everyone" | "owner" | "me";
  /**
   * Include challenge posts in results. By default, challenge posts are excluded from regular feed.
   * @default false
   */
  includeChallengePosts?: boolean;
  /**
   * Filter by challenge ID. Only returns posts for this specific challenge.
   * @example "challenge_abc123"
   */
  challengeId?: string;
  /**
   * Filter by check-in number. Use with challengeId to get posts for a specific day.
   * @min 1
   * @example 1
   */
  checkinNumber?: number;
  /**
   * Stage ID to list posts from
   * @example "stage_123"
   */
  stageId: string;
}

export type PostsControllerListPostsV1Data = {
  /**
   * Human-readable message based on HTTP status code
   * @example "Successful"
   */
  message: string;
  result: ListPostsResponseDto;
};

export type PostsControllerListPostsV1Error = ApiErrorResponseDto;

export interface PostsControllerGetPostV1Params {
  /**
   * Post ID to retrieve details for
   * @example "post_123"
   */
  postId: string;
}

export type PostsControllerGetPostV1Data = {
  /**
   * Human-readable message based on HTTP status code
   * @example "Successful"
   */
  message: string;
  result: ListPostsResponseDto;
};

export type PostsControllerGetPostV1Error = ApiErrorResponseDto;

export interface PostsControllerUpdatePostV1Params {
  /**
   * Post ID to update
   * @example "post_123"
   */
  postId: string;
}

export type PostsControllerUpdatePostV1Data = {
  /**
   * Human-readable message based on HTTP status code
   * @example "Successful"
   */
  message: string;
  result: PostResponseDto;
};

export type PostsControllerUpdatePostV1Error = ApiErrorResponseDto;

export interface PostsControllerDeletePostV1Params {
  /**
   * Post ID to delete
   * @example "post_123"
   */
  postId: string;
}

export type PostsControllerDeletePostV1Data = any;

export type PostsControllerDeletePostV1Error = ApiErrorResponseDto;

export interface PostsControllerTogglePinPostV1Params {
  /**
   * Post ID to pin/unpin
   * @example "post_123"
   */
  postId: string;
}

export type PostsControllerTogglePinPostV1Data = {
  /**
   * Human-readable message based on HTTP status code
   * @example "Successful"
   */
  message: string;
  result: PinPostResponseDto;
};

export type PostsControllerTogglePinPostV1Error = ApiErrorResponseDto;

export interface CommentsControllerCreateCommentV1Params {
  /**
   * Post ID to get/create comments for
   * @example "post_123"
   */
  postId: string;
}

export type CommentsControllerCreateCommentV1Data = {
  /**
   * Human-readable message based on HTTP status code
   * @example "Successful"
   */
  message: string;
  result: CommentResponseDto;
};

export type CommentsControllerCreateCommentV1Error = ApiErrorResponseDto;

export interface CommentsControllerListCommentsV1Params {
  /**
   * Cursor for pagination. Use the `nextCursor` from previous response.
   * @example "comment_abc123:2024-01-15T10:30:00.000Z"
   */
  cursor?: string;
  /**
   * Number of comments to return per page
   * @min 1
   * @max 50
   * @default 20
   * @example 20
   */
  limit?: number;
  /**
   * Post ID to get/create comments for
   * @example "post_123"
   */
  postId: string;
}

export type CommentsControllerListCommentsV1Data = {
  /**
   * Human-readable message based on HTTP status code
   * @example "Successful"
   */
  message: string;
  result: ListCommentsResponseDto;
};

export type CommentsControllerListCommentsV1Error = ApiErrorResponseDto;

export interface CommentsControllerDeleteCommentV1Params {
  /**
   * Post ID to get/create comments for
   * @example "post_123"
   */
  postId: string;
  /**
   * Comment ID
   * @example "comment_123"
   */
  commentId: string;
}

export type CommentsControllerDeleteCommentV1Data = any;

export type CommentsControllerDeleteCommentV1Error = ApiErrorResponseDto;

export interface CommentsControllerToggleLikeV1Params {
  /**
   * Post ID to get/create comments for
   * @example "post_123"
   */
  postId: string;
  /**
   * Comment ID
   * @example "comment_123"
   */
  commentId: string;
}

export type CommentsControllerToggleLikeV1Data = {
  /**
   * Human-readable message based on HTTP status code
   * @example "Successful"
   */
  message: string;
  result: ToggleLikeResponseDto;
};

export type CommentsControllerToggleLikeV1Error = ApiErrorResponseDto;

export interface CommentsControllerListLikesV1Params {
  /**
   * Cursor for pagination.
   * @example "like_abc123:2024-01-15T10:30:00.000Z"
   */
  cursor?: string;
  /**
   * Number of likes to return per page
   * @min 1
   * @max 50
   * @default 20
   * @example 20
   */
  limit?: number;
  /**
   * Post ID to get/create comments for
   * @example "post_123"
   */
  postId: string;
  /**
   * Comment ID
   * @example "comment_123"
   */
  commentId: string;
}

export type CommentsControllerListLikesV1Data = {
  /**
   * Human-readable message based on HTTP status code
   * @example "Successful"
   */
  message: string;
  result: ListCommentLikesResponseDto;
};

export type CommentsControllerListLikesV1Error = ApiErrorResponseDto;

export interface CommentsControllerListRepliesV1Params {
  /**
   * Cursor for pagination. Use the `nextCursor` from previous response.
   * @example "comment_abc123:2024-01-15T10:30:00.000Z"
   */
  cursor?: string;
  /**
   * Number of comments to return per page
   * @min 1
   * @max 50
   * @default 20
   * @example 20
   */
  limit?: number;
  /**
   * Post ID to get/create comments for
   * @example "post_123"
   */
  postId: string;
  /**
   * Comment ID
   * @example "comment_123"
   */
  commentId: string;
}

export type CommentsControllerListRepliesV1Data = {
  /**
   * Human-readable message based on HTTP status code
   * @example "Successful"
   */
  message: string;
  result: ListCommentsResponseDto;
};

export type CommentsControllerListRepliesV1Error = ApiErrorResponseDto;

export interface ReactionsControllerCreateReactionV1Params {
  /**
   * Post ID
   * @example "post_abc123"
   */
  postId: string;
}

export type ReactionsControllerCreateReactionV1Data = {
  /**
   * Human-readable message based on HTTP status code
   * @example "Successful"
   */
  message: string;
  result: CreateReactionResponseDto;
};

export type ReactionsControllerCreateReactionV1Error = ApiErrorResponseDto;

export interface ReactionsControllerDeleteReactionV1Params {
  /**
   * Post ID
   * @example "post_abc123"
   */
  postId: string;
}

export type ReactionsControllerDeleteReactionV1Data = {
  /**
   * Human-readable message based on HTTP status code
   * @example "Successful"
   */
  message: string;
  result: DeleteReactionResponseDto;
};

export type ReactionsControllerDeleteReactionV1Error = ApiErrorResponseDto;

export interface ReactionsControllerListReactionsV1Params {
  /**
   * Cursor for pagination. Use the `nextCursor` from previous response.
   * @example "reaction_abc123:2024-01-15T10:30:00.000Z"
   */
  cursor?: string;
  /**
   * Number of reactions to return per page
   * @min 1
   * @max 50
   * @default 20
   * @example 20
   */
  limit?: number;
  /**
   * Filter by emoji reaction
   * @example "👍"
   */
  emoji?: "👍" | "❤️" | "😂" | "😮" | "😢" | "😡";
  /**
   * Post ID
   * @example "post_abc123"
   */
  postId: string;
}

export type ReactionsControllerListReactionsV1Data = {
  /**
   * Human-readable message based on HTTP status code
   * @example "Successful"
   */
  message: string;
  result: ListReactionsResponseDto;
};

export type ReactionsControllerListReactionsV1Error = ApiErrorResponseDto;

export interface SubscriptionsControllerJoinPassV1Params {
  passId: string;
}

export type SubscriptionsControllerJoinPassV1Data = {
  /**
   * Human-readable message based on HTTP status code
   * @example "Successful"
   */
  message: string;
  result: JoinPassResponseDto;
};

export type SubscriptionsControllerJoinPassV1Error = ApiErrorResponseDto;

export interface SubscriptionsControllerListPassMembersV1Params {
  /**
   * Cursor for pagination. Use the `nextCursor` from previous response.
   * @example "user_abc123:2024-01-15T10:30:00.000Z"
   */
  cursor?: string;
  /**
   * Number of members to return per page
   * @min 1
   * @max 50
   * @default 20
   * @example 20
   */
  limit?: number;
  /**
   * Search by member name or email
   * @example "john"
   */
  search?: string;
  /**
   * Pass ID to list members from
   * @example "pass_123"
   */
  passId: string;
}

export type SubscriptionsControllerListPassMembersV1Data = {
  /**
   * Human-readable message based on HTTP status code
   * @example "Successful"
   */
  message: string;
  result: ListPassMembersResponseDto;
};

export type SubscriptionsControllerListPassMembersV1Error = ApiErrorResponseDto;

export interface SubscriptionsControllerExportPassMembersCsvV1Params {
  /**
   * Search by member name or email
   * @example "john"
   */
  search?: string;
  /**
   * Pass ID to export members from
   * @example "pass_123"
   */
  passId: string;
}

export type SubscriptionsControllerExportPassMembersCsvV1Data = any;

export type SubscriptionsControllerExportPassMembersCsvV1Error =
  ApiErrorResponseDto;

export interface OtaControllerUploadZipV1Params {
  channel: string;
  runtimeVersion: string;
  updateType: string;
}

export type OtaControllerUploadZipV1Data = any;

export interface OtaControllerGetManifestV1Params {
  platform?: "ios" | "android";
  "runtime-version"?: string;
}

export type OtaControllerGetManifestV1Data = any;

export interface OtaControllerGetAssetV1Params {
  assetId?: string;
  runtimeVersion: string;
  platform: "ios" | "android";
  channel: string;
  isLaunchAsset?: string;
}

export type OtaControllerGetAssetV1Data = any;

export type OtaControllerListUpdatesV1Data = any;

export interface OtaControllerUpdateTypeV1Params {
  updateId: string;
  runtimeVersion: string;
  channel: string;
}

export type OtaControllerUpdateTypeV1Data = any;

export interface OtaControllerGetUpdateV1Params {
  id: string;
}

export type OtaControllerGetUpdateV1Data = any;

export interface OtaControllerDeleteUpdateV1Params {
  id: string;
}

export type OtaControllerDeleteUpdateV1Data = any;

export interface VideoCallsControllerCreateVideoCallV1Params {
  stageId: string;
}

export type VideoCallsControllerCreateVideoCallV1Data = {
  /**
   * Human-readable message based on HTTP status code
   * @example "Successful"
   */
  message: string;
  result: VideoCallResponseDto;
};

export type VideoCallsControllerCreateVideoCallV1Error = ApiErrorResponseDto;

export interface VideoCallsControllerListVideoCallsV1Params {
  /**
   * Filter by status
   * @example "scheduled"
   */
  status?: "scheduled" | "live" | "ended" | "cancelled";
  /**
   * Filter by time: upcoming (scheduled + live) or past (ended + cancelled)
   * @example "upcoming"
   */
  filter?: "upcoming" | "past";
  /**
   * Filter upcoming calls to only include those scheduled before this time (ISO 8601 format). Only applies when filter=upcoming.
   * @example "2025-01-01T00:00:00.000Z"
   */
  scheduledTimeLessThan?: string;
  /**
   * Filter by specific pass IDs
   * @example ["pass_123","pass_456"]
   */
  passIds?: string[];
  /**
   * Number of items per page (1-50)
   * @min 1
   * @max 50
   * @default 20
   * @example 20
   */
  limit?: number;
  /**
   * Cursor for pagination (from previous response)
   * @example "eyJpZCI6InZjXzEyMyIsInNjaGVkdWxlZFN0YXJ0QXQiOiIyMDI0LTEyLTI1VDEwOjAwOjAwLjAwMFoifQ=="
   */
  cursor?: string;
  stageId: string;
}

export type VideoCallsControllerListVideoCallsV1Data = {
  /**
   * Human-readable message based on HTTP status code
   * @example "Successful"
   */
  message: string;
  result: ListVideoCallsResponseDto;
};

export type VideoCallsControllerListVideoCallsV1Error = ApiErrorResponseDto;

export interface VideoCallsControllerGetVideoCallStatsV1Params {
  /**
   * Start date for the stats query (ISO 8601 format)
   * @example "2024-01-01T00:00:00.000Z"
   */
  startDate: string;
  /**
   * End date for the stats query (ISO 8601 format)
   * @example "2024-12-31T23:59:59.999Z"
   */
  endDate: string;
  stageId: string;
}

export type VideoCallsControllerGetVideoCallStatsV1Data = {
  /**
   * Human-readable message based on HTTP status code
   * @example "Successful"
   */
  message: string;
  result: VideoCallStatsResponseDto;
};

export type VideoCallsControllerGetVideoCallStatsV1Error = ApiErrorResponseDto;

export interface VideoCallsControllerJoinVideoCallV1Params {
  stageId: string;
  callId: string;
}

export type VideoCallsControllerJoinVideoCallV1Data = {
  /**
   * Human-readable message based on HTTP status code
   * @example "Successful"
   */
  message: string;
  result: JoinVideoCallResponseDto;
};

export type VideoCallsControllerJoinVideoCallV1Error = ApiErrorResponseDto;

export interface VideoCallsControllerGetVideoCallMembersV1Params {
  /**
   * Filter mode: all (subscribers), attended (attended=true), missed (not attended)
   * @default "all"
   */
  mode?: "all" | "attended" | "missed";
  /**
   * Search query to filter by name or email (case-insensitive, partial match)
   * @example "john"
   */
  search?: string;
  /**
   * Maximum number of results to return (1-100)
   * @min 1
   * @max 100
   * @default 20
   */
  limit?: number;
  /** Cursor for pagination (from previous response) */
  cursor?: string;
  callId: string;
  stageId: string;
}

export type VideoCallsControllerGetVideoCallMembersV1Data = {
  /**
   * Human-readable message based on HTTP status code
   * @example "Successful"
   */
  message: string;
  result: ListVideoCallMembersResponseDto;
};

export type VideoCallsControllerGetVideoCallMembersV1Error =
  ApiErrorResponseDto;

export interface VideoCallsControllerExportVideoCallMembersV1Params {
  /**
   * Filter mode: all (subscribers), attended (attended=true), missed (not attended)
   * @default "all"
   */
  mode?: "all" | "attended" | "missed";
  /**
   * Search query to filter by name or email (case-insensitive, partial match)
   * @example "john"
   */
  search?: string;
  callId: string;
  stageId: string;
}

export type VideoCallsControllerExportVideoCallMembersV1Data = any;

export type VideoCallsControllerExportVideoCallMembersV1Error =
  ApiErrorResponseDto;

export interface VideoCallsControllerGetVideoCallV1Params {
  stageId: string;
  callId: string;
}

export type VideoCallsControllerGetVideoCallV1Data = {
  /**
   * Human-readable message based on HTTP status code
   * @example "Successful"
   */
  message: string;
  result: VideoCallResponseDto;
};

export type VideoCallsControllerGetVideoCallV1Error = ApiErrorResponseDto;

export interface VideoCallsControllerUpdateVideoCallV1Params {
  stageId: string;
  callId: string;
}

export type VideoCallsControllerUpdateVideoCallV1Data = {
  /**
   * Human-readable message based on HTTP status code
   * @example "Successful"
   */
  message: string;
  result: VideoCallResponseDto;
};

export type VideoCallsControllerUpdateVideoCallV1Error = ApiErrorResponseDto;

export interface VideoCallsControllerDeleteVideoCallV1Params {
  callId: string;
  stageId: string;
}

export type VideoCallsControllerDeleteVideoCallV1Data = any;

export type VideoCallsControllerDeleteVideoCallV1Error = ApiErrorResponseDto;

export interface AssetsControllerUploadV1Params {
  /**
   * Upload purpose (required). dp/cover = user profile assets (images only), post = stage content (requires stageId).
   * @example "post"
   */
  purpose: "dp" | "cover" | "post";
  /**
   * Stage ID (required when purpose=post)
   * @example "stage_abc123"
   */
  stageId?: string;
  /**
   * Pass IDs for targeting the post (optional). Upload permission is auto-detected from subscriptions with allowSubscriberPosting enabled.
   * @example "pass_123,pass_456"
   */
  passIds?: string[];
  /**
   * Image compression quality (1-100). Defaults: dp=60, cover=70, post=85
   * @min 1
   * @max 100
   * @example 80
   */
  quality?: number;
}

export type AssetsControllerUploadV1Data = {
  /**
   * Human-readable message based on HTTP status code
   * @example "Successful"
   */
  message: string;
  result: AssetResponseDto;
};

export type AssetsControllerUploadV1Error = ApiErrorResponseDto;

export interface OrdersControllerListOrdersV1Params {
  /**
   * Cursor for pagination. Use the `nextCursor` from previous response.
   * @example "order_abc123:2024-01-15T10:30:00.000Z"
   */
  cursor?: string;
  /**
   * Number of orders to return per page
   * @min 1
   * @max 50
   * @default 20
   * @example 20
   */
  limit?: number;
  /**
   * Search by subscriber name or email
   * @example "john"
   */
  search?: string;
  /**
   * Filter orders created on or after this date (ISO 8601)
   * @example "2024-01-01T00:00:00.000Z"
   */
  startDate?: string;
  /**
   * Filter orders created on or before this date (ISO 8601)
   * @example "2024-12-31T23:59:59.999Z"
   */
  endDate?: string;
  /**
   * Filter by pass IDs
   * @example ["pass_123","pass_456"]
   */
  passIds?: string[];
  /**
   * Filter by order status (comma-separated or array)
   * @example ["completed"]
   */
  status?: ("pending" | "completed" | "failed" | "refunded")[];
  /**
   * Stage ID to list orders from
   * @example "stage_123"
   */
  stageId: string;
}

export type OrdersControllerListOrdersV1Data = {
  /**
   * Human-readable message based on HTTP status code
   * @example "Successful"
   */
  message: string;
  result: ListOrdersResponseDto;
};

export type OrdersControllerListOrdersV1Error = ApiErrorResponseDto;

export interface OrdersControllerGetOrderStatsV1Params {
  /**
   * Filter orders created on or after this date (ISO 8601)
   * @example "2024-01-01T00:00:00.000Z"
   */
  startDate?: string;
  /**
   * Filter orders created on or before this date (ISO 8601)
   * @example "2024-12-31T23:59:59.999Z"
   */
  endDate?: string;
  /**
   * Filter by specific pass IDs (comma-separated or array)
   * @example ["pass_123","pass_456"]
   */
  passIds?: string[];
  /**
   * Stage ID to get order stats for
   * @example "stage_123"
   */
  stageId: string;
}

export type OrdersControllerGetOrderStatsV1Data = {
  /**
   * Human-readable message based on HTTP status code
   * @example "Successful"
   */
  message: string;
  result: OrderStatsResponseDto;
};

export type OrdersControllerGetOrderStatsV1Error = ApiErrorResponseDto;

export interface OrdersControllerExportOrdersCsvV1Params {
  /**
   * Search by subscriber name or email
   * @example "john"
   */
  search?: string;
  /**
   * Filter orders created on or after this date (ISO 8601)
   * @example "2024-01-01T00:00:00.000Z"
   */
  startDate?: string;
  /**
   * Filter orders created on or before this date (ISO 8601)
   * @example "2024-12-31T23:59:59.999Z"
   */
  endDate?: string;
  /**
   * Filter by pass IDs
   * @example ["pass_123","pass_456"]
   */
  passIds?: string[];
  /**
   * Filter by order status (comma-separated or array)
   * @example ["completed"]
   */
  status?: ("pending" | "completed" | "failed" | "refunded")[];
  /**
   * Stage ID to export orders from
   * @example "stage_123"
   */
  stageId: string;
}

export type OrdersControllerExportOrdersCsvV1Data = any;

export type OrdersControllerExportOrdersCsvV1Error = ApiErrorResponseDto;

export interface AnalyticsControllerCaptureEventV1Params {
  eventType: string;
}

export type AnalyticsControllerCaptureEventV1Data = {
  /**
   * Human-readable message based on HTTP status code
   * @example "Successful"
   */
  message: string;
  result: CaptureEventResponseDto;
};

export type AnalyticsControllerCaptureEventV1Error = ApiErrorResponseDto;

export interface AnalyticsControllerGetPageViewCountV1Params {
  /**
   * Start date for the date range (ISO 8601 format)
   * @example "2024-01-01"
   */
  startDate: string;
  /**
   * End date for the date range (ISO 8601 format)
   * @example "2024-01-31"
   */
  endDate: string;
  stageId: string;
}

export type AnalyticsControllerGetPageViewCountV1Data = {
  /**
   * Human-readable message based on HTTP status code
   * @example "Successful"
   */
  message: string;
  result: PageViewCountResponseDto;
};

export type AnalyticsControllerGetPageViewCountV1Error = ApiErrorResponseDto;

export interface ChallengesControllerCreateChallengeV1Params {
  stageId: string;
}

export type ChallengesControllerCreateChallengeV1Data = {
  /**
   * Human-readable message based on HTTP status code
   * @example "Successful"
   */
  message: string;
  result: ChallengeResponseDto;
};

export type ChallengesControllerCreateChallengeV1Error = ApiErrorResponseDto;

export interface ChallengesControllerListChallengesV1Params {
  /** Filter by challenge type */
  challengeType?: "always_on" | "fixed_dates";
  /** Filter by status: active (running now), upcoming (not started), past (ended) */
  status?: "active" | "upcoming" | "past";
  /**
   * Filter by visibility (owner only). Non-owners always see only public challenges.
   * @default "all"
   */
  visibility?: "public" | "hidden" | "all";
  /**
   * Number of items per page (1-50)
   * @min 1
   * @max 50
   * @default 20
   */
  limit?: number;
  /** Cursor for pagination */
  cursor?: string;
  stageId: string;
}

export type ChallengesControllerListChallengesV1Data = {
  /**
   * Human-readable message based on HTTP status code
   * @example "Successful"
   */
  message: string;
  result: ListChallengesResponseDto;
};

export type ChallengesControllerListChallengesV1Error = ApiErrorResponseDto;

export interface ChallengesControllerGetChallengeV1Params {
  stageId: string;
  challengeId: string;
}

export type ChallengesControllerGetChallengeV1Data = {
  /**
   * Human-readable message based on HTTP status code
   * @example "Successful"
   */
  message: string;
  result: ChallengeResponseDto;
};

export type ChallengesControllerGetChallengeV1Error = ApiErrorResponseDto;

export interface ChallengesControllerUpdateChallengeV1Params {
  stageId: string;
  challengeId: string;
}

export type ChallengesControllerUpdateChallengeV1Data = {
  /**
   * Human-readable message based on HTTP status code
   * @example "Successful"
   */
  message: string;
  result: ChallengeResponseDto;
};

export type ChallengesControllerUpdateChallengeV1Error = ApiErrorResponseDto;

export interface ChallengesControllerDeleteChallengeV1Params {
  stageId: string;
  challengeId: string;
}

export type ChallengesControllerDeleteChallengeV1Data = any;

export type ChallengesControllerDeleteChallengeV1Error = ApiErrorResponseDto;

export interface ChallengesControllerJoinChallengeV1Params {
  stageId: string;
  challengeId: string;
}

export type ChallengesControllerJoinChallengeV1Data = {
  /**
   * Human-readable message based on HTTP status code
   * @example "Successful"
   */
  message: string;
  result: ChallengeParticipantResponseDto;
};

export type ChallengesControllerJoinChallengeV1Error = ApiErrorResponseDto;

export interface ChallengesControllerCheckinV1Params {
  stageId: string;
  challengeId: string;
}

export type ChallengesControllerCheckinV1Data = {
  /**
   * Human-readable message based on HTTP status code
   * @example "Successful"
   */
  message: string;
  result: CheckinResponseDto;
};

export type ChallengesControllerCheckinV1Error = ApiErrorResponseDto;

export interface ChallengesControllerGetChallengeStatsV1Params {
  stageId: string;
  challengeId: string;
}

export type ChallengesControllerGetChallengeStatsV1Data = {
  /**
   * Human-readable message based on HTTP status code
   * @example "Successful"
   */
  message: string;
  result: ChallengeStatsResponseDto;
};

export type ChallengesControllerGetChallengeStatsV1Error = ApiErrorResponseDto;

export interface ChallengesControllerGetMyStatusV1Params {
  stageId: string;
  challengeId: string;
}

export type ChallengesControllerGetMyStatusV1Data = {
  /**
   * Human-readable message based on HTTP status code
   * @example "Successful"
   */
  message: string;
  result: ChallengeStatusResponseDto;
};

export type ChallengesControllerGetMyStatusV1Error = ApiErrorResponseDto;

export interface ChallengesControllerCreateInstructionalPostV1Params {
  stageId: string;
  challengeId: string;
}

export type ChallengesControllerCreateInstructionalPostV1Data = {
  /**
   * Human-readable message based on HTTP status code
   * @example "Successful"
   */
  message: string;
  result: PostResponseDto;
};

export type ChallengesControllerCreateInstructionalPostV1Error =
  ApiErrorResponseDto;

export type UsersControllerGetMeV1Data = {
  /**
   * Human-readable message based on HTTP status code
   * @example "Successful"
   */
  message: string;
  result: UserResponseDto;
};

export type UsersControllerGetMeV1Error = ApiErrorResponseDto;

export type UsersControllerUpdateMeV1Data = {
  /**
   * Human-readable message based on HTTP status code
   * @example "Successful"
   */
  message: string;
  result: UserResponseDto;
};

export type UsersControllerUpdateMeV1Error = ApiErrorResponseDto;

export type UsersControllerDeleteMeV1Data = {
  /**
   * Human-readable message based on HTTP status code
   * @example "Successful"
   */
  message: string;
  result: DeleteUserResponseDto;
};

export type UsersControllerDeleteMeV1Error = ApiErrorResponseDto;

export namespace Ping {
  /**
   * @description Check if the API is running
   * @tags health
   * @name AppControllerPing
   * @summary Health check
   * @request GET:/ping
   * @response `200` `AppControllerPingData` API is healthy
   */
  export namespace AppControllerPing {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = AppControllerPingData;
  }
}

export namespace Api {
  /**
   * @description Retrieve a stage and its owner information by URL slug
   * @tags stages
   * @name StagesControllerFindBySlugV1
   * @summary Get stage by slug
   * @request GET:/api/v1/stages/{slug}
   * @response `200` `StagesControllerFindBySlugV1Data` Stage found
   * @response `404` `ApiErrorResponseDto` Stage not found
   */
  export namespace StagesControllerFindBySlugV1 {
    export type RequestParams = {
      /**
       * Stage URL slug (lowercase letters, numbers, and hyphens)
       * @example "my-awesome-stage"
       */
      slug: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = StagesControllerFindBySlugV1Data;
  }

  /**
   * @description Update a stage's name and/or description. Only stage owners can update stages.
   * @tags stages
   * @name StagesControllerUpdateStageV1
   * @summary Update a stage
   * @request PATCH:/api/v1/stages/{stageId}
   * @secure
   * @response `200` `StagesControllerUpdateStageV1Data` Stage updated
   * @response `401` `ApiErrorResponseDto` Unauthorized - not authenticated
   * @response `403` `ApiErrorResponseDto` Forbidden - not stage owner
   * @response `404` `ApiErrorResponseDto` Stage not found
   */
  export namespace StagesControllerUpdateStageV1 {
    export type RequestParams = {
      stageId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = UpdateStageDto;
    export type RequestHeaders = {};
    export type ResponseBody = StagesControllerUpdateStageV1Data;
  }

  /**
   * @description Retrieve details of a specific pass. Hidden passes are only accessible to stage owners.
   * @tags passes
   * @name PassesControllerGetPassV1
   * @summary Get a pass by ID
   * @request GET:/api/v1/stages/{stageId}/passes/{passId}
   * @response `200` `PassesControllerGetPassV1Data` Pass found
   * @response `404` `ApiErrorResponseDto` Pass or stage not found
   */
  export namespace PassesControllerGetPassV1 {
    export type RequestParams = {
      stageId: string;
      passId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = PassesControllerGetPassV1Data;
  }

  /**
   * @description Update an existing pass. Only stage owners can update passes.
   * @tags passes
   * @name PassesControllerUpdatePassV1
   * @summary Update a pass
   * @request PATCH:/api/v1/stages/{stageId}/passes/{passId}
   * @secure
   * @response `200` `PassesControllerUpdatePassV1Data` Pass updated
   * @response `400` `ApiErrorResponseDto` Invalid request or ground pass already exists
   * @response `401` `ApiErrorResponseDto` Unauthorized - not authenticated
   * @response `403` `ApiErrorResponseDto` Forbidden - not stage owner
   * @response `404` `ApiErrorResponseDto` Pass not found
   */
  export namespace PassesControllerUpdatePassV1 {
    export type RequestParams = {
      passId: string;
      stageId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = UpdatePassDto;
    export type RequestHeaders = {};
    export type ResponseBody = PassesControllerUpdatePassV1Data;
  }

  /**
   * @description Delete a pass from the stage. Only stage owners can delete passes. Ground passes cannot be deleted.
   * @tags passes
   * @name PassesControllerDeletePassV1
   * @summary Delete a pass
   * @request DELETE:/api/v1/stages/{stageId}/passes/{passId}
   * @secure
   * @response `204` `PassesControllerDeletePassV1Data` Pass deleted
   * @response `400` `ApiErrorResponseDto` Bad request - cannot delete ground pass
   * @response `401` `ApiErrorResponseDto` Unauthorized - not authenticated
   * @response `403` `ApiErrorResponseDto` Forbidden - not stage owner
   * @response `404` `ApiErrorResponseDto` Pass not found
   */
  export namespace PassesControllerDeletePassV1 {
    export type RequestParams = {
      passId: string;
      stageId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = PassesControllerDeletePassV1Data;
  }

  /**
   * @description Get passes available for a specific stage. Stage owners automatically see all passes (including hidden). Owners can use visibility filter to narrow results. Passes are ordered by rank (ascending).
   * @tags passes
   * @name PassesControllerListPassesV1
   * @summary List passes for a stage
   * @request GET:/api/v1/stages/{stageId}/passes
   * @response `200` `PassesControllerListPassesV1Data` List of passes
   * @response `404` `ApiErrorResponseDto` Stage not found
   */
  export namespace PassesControllerListPassesV1 {
    export type RequestParams = {
      stageId: string;
    };
    export type RequestQuery = {
      /**
       * Filter by pass type
       * @example "free"
       */
      passType?: "free" | "paid";
      /**
       * Filter by visibility. Only "public" is allowed for non-owners. Owners can use "hidden" or "all".
       * @example "public"
       */
      visibility?: "public" | "hidden" | "all";
      /**
       * Filter by ground pass status
       * @example true
       */
      isGroundPass?: boolean;
      /**
       * Filter by recurring type
       * @example "onetime"
       */
      recurringType?: "onetime" | "recurring";
      /**
       * Filter by allowSubscriberPosting flag
       * @example true
       */
      allowSubscriberPosting?: boolean;
      /**
       * Return only passes where the authenticated user has an active subscription. Cannot be used by stage members (owner, admin, moderator).
       * @example true
       */
      onlySubscribed?: boolean;
      /**
       * Whether to include the ground pass in the results. Defaults to true.
       * @example false
       */
      includeGroundPass?: boolean;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = PassesControllerListPassesV1Data;
  }

  /**
   * @description Create a new free pass for the stage. Only stage owners can create passes.
   * @tags passes
   * @name PassesControllerCreatePassV1
   * @summary Create a pass
   * @request POST:/api/v1/stages/{stageId}/passes
   * @secure
   * @response `201` `PassesControllerCreatePassV1Data` Pass created
   * @response `400` `ApiErrorResponseDto` Invalid request or ground pass already exists
   * @response `401` `ApiErrorResponseDto` Unauthorized - not authenticated
   * @response `403` `ApiErrorResponseDto` Forbidden - not stage owner
   * @response `404` `ApiErrorResponseDto` Stage not found
   */
  export namespace PassesControllerCreatePassV1 {
    export type RequestParams = {
      stageId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = CreatePassDto;
    export type RequestHeaders = {};
    export type ResponseBody = PassesControllerCreatePassV1Data;
  }

  /**
   * @description Reorder passes within a stage. The rank of each pass will be set to its position in the passIds array. Only stage owners can reorder passes.
   * @tags passes
   * @name PassesControllerReorderPassesV1
   * @summary Reorder passes
   * @request POST:/api/v1/stages/{stageId}/passes/reorder
   * @secure
   * @response `204` `PassesControllerReorderPassesV1Data` Passes reordered successfully
   * @response `400` `ApiErrorResponseDto` Invalid request - pass IDs do not belong to this stage
   * @response `401` `ApiErrorResponseDto` Unauthorized - not authenticated
   * @response `403` `ApiErrorResponseDto` Forbidden - not stage owner
   * @response `404` `ApiErrorResponseDto` Stage not found
   */
  export namespace PassesControllerReorderPassesV1 {
    export type RequestParams = {
      stageId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = ReorderPassesDto;
    export type RequestHeaders = {};
    export type ResponseBody = PassesControllerReorderPassesV1Data;
  }

  /**
   * @description Creates a new post on a stage. **Authorization:** - **Staff members** (owner, admin, moderator): Can post to any pass. - **Subscribers**: Can post to passes that have `allowSubscriberPosting` enabled, provided they have an active subscription to those passes. **Pass Assignment:** - **Staff members**: If `passIds` is not provided, the post is assigned to the ground pass. - **Subscribers**: Must provide `passIds`. All specified passes must have subscriber posting enabled and the user must be subscribed to them. **Assets:** - Maximum 20 assets per post. - Assets must be owned by the authenticated user. - Supported asset types: image, video, audio. **Scheduling:** - If `scheduledFor` is provided, it must be a future date. - Only staff members can schedule posts. - Immediate posts are published right away. **Text Limits:** - Maximum 3000 characters (similar to LinkedIn).
   * @tags Posts
   * @name PostsControllerCreatePostV1
   * @summary Create a new post
   * @request POST:/api/v1/posts
   * @secure
   * @response `201` `PostsControllerCreatePostV1Data` Post created successfully
   * @response `400` `ApiErrorResponseDto` Invalid request (invalid passes, assets, or scheduledFor)
   * @response `401` `ApiErrorResponseDto` Unauthorized - authentication required
   * @response `403` `ApiErrorResponseDto` Forbidden - insufficient permissions or pass does not allow subscriber posting
   * @response `404` `ApiErrorResponseDto` Stage not found
   */
  export namespace PostsControllerCreatePostV1 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CreatePostDto;
    export type RequestHeaders = {};
    export type ResponseBody = PostsControllerCreatePostV1Data;
  }

  /**
   * @description Returns a paginated list of posts for a stage. **Public Access:** Non-authenticated users can view posts from free passes only. Authenticated users see posts from their subscribed passes. **Pagination:** Uses cursor-based pagination for infinite scrolling. Pass the `nextCursor` from the response as the `cursor` query parameter to get the next page. **Sorting:** Pinned posts always appear first (sorted by pin date), followed by regular posts sorted by publish date (newest first). **Filtering:** - `passIds`: Filter by specific passes (must be passes the user has access to) - `postedBy`: Filter by author - 'everyone', 'owner', or 'me' (requires auth) **Access Control:** Returns posts based on user's subscribed passes, or free passes for anonymous users.
   * @tags Posts
   * @name PostsControllerListPostsV1
   * @summary List posts for a stage
   * @request GET:/api/v1/posts/{stageId}/posts
   * @response `200` `PostsControllerListPostsV1Data` Posts retrieved successfully
   * @response `404` `ApiErrorResponseDto` Stage not found
   */
  export namespace PostsControllerListPostsV1 {
    export type RequestParams = {
      /**
       * Stage ID to list posts from
       * @example "stage_123"
       */
      stageId: string;
    };
    export type RequestQuery = {
      /**
       * Cursor for pagination. Use the `nextCursor` from previous response.
       * @example "post_abc123:2024-01-15T10:30:00.000Z"
       */
      cursor?: string;
      /**
       * Number of posts to return per page
       * @min 1
       * @max 50
       * @default 20
       * @example 20
       */
      limit?: number;
      /**
       * Filter by pass IDs. If not provided, returns posts from all passes the user has access to.
       * @example ["pass_123","pass_456"]
       */
      passIds?: string[];
      /**
       * Filter by who posted
       * @default "everyone"
       */
      postedBy?: "everyone" | "owner" | "me";
      /**
       * Include challenge posts in results. By default, challenge posts are excluded from regular feed.
       * @default false
       */
      includeChallengePosts?: boolean;
      /**
       * Filter by challenge ID. Only returns posts for this specific challenge.
       * @example "challenge_abc123"
       */
      challengeId?: string;
      /**
       * Filter by check-in number. Use with challengeId to get posts for a specific day.
       * @min 1
       * @example 1
       */
      checkinNumber?: number;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = PostsControllerListPostsV1Data;
  }

  /**
   * @description Returns a post. **Public Access:** Non-authenticated users can view post from free passes only. Authenticated users see post from their subscribed passes.
   * @tags Posts
   * @name PostsControllerGetPostV1
   * @summary Get details of a post
   * @request GET:/api/v1/posts/{postId}
   * @response `200` `PostsControllerGetPostV1Data` Post retrieved successfully
   * @response `404` `ApiErrorResponseDto` Post not found
   */
  export namespace PostsControllerGetPostV1 {
    export type RequestParams = {
      /**
       * Post ID to retrieve details for
       * @example "post_123"
       */
      postId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = PostsControllerGetPostV1Data;
  }

  /**
   * @description Updates the text content and/or pass assignments of a post. **Authorization:** Only the post author can update the post. **Pass Assignment:** - If `passIds` is provided, the post's passes will be updated. - Same validation rules as post creation apply: - **Staff members** (owner, admin, moderator): Can assign any pass on the stage. - **Subscribers**: Can only use passes with `allowSubscriberPosting` enabled that they are subscribed to. - If `passIds` is an empty array, defaults to the ground pass (free pass).
   * @tags Posts
   * @name PostsControllerUpdatePostV1
   * @summary Update a post
   * @request PATCH:/api/v1/posts/{postId}
   * @secure
   * @response `200` `PostsControllerUpdatePostV1Data` Post updated successfully
   * @response `401` `ApiErrorResponseDto` Unauthorized - authentication required
   * @response `403` `ApiErrorResponseDto` Forbidden - only the post author can update, or invalid pass permissions
   * @response `404` `ApiErrorResponseDto` Post not found
   */
  export namespace PostsControllerUpdatePostV1 {
    export type RequestParams = {
      /**
       * Post ID to update
       * @example "post_123"
       */
      postId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = UpdatePostDto;
    export type RequestHeaders = {};
    export type ResponseBody = PostsControllerUpdatePostV1Data;
  }

  /**
   * @description Soft deletes a post. **Authorization:** The post author or the stage owner can delete the post.
   * @tags Posts
   * @name PostsControllerDeletePostV1
   * @summary Delete a post
   * @request DELETE:/api/v1/posts/{postId}
   * @secure
   * @response `204` `PostsControllerDeletePostV1Data` Post deleted successfully
   * @response `401` `ApiErrorResponseDto` Unauthorized - authentication required
   * @response `403` `ApiErrorResponseDto` Forbidden - only author or stage owner can delete
   * @response `404` `ApiErrorResponseDto` Post not found
   */
  export namespace PostsControllerDeletePostV1 {
    export type RequestParams = {
      /**
       * Post ID to delete
       * @example "post_123"
       */
      postId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = PostsControllerDeletePostV1Data;
  }

  /**
   * @description Pins or unpins a post. If the post is currently pinned, it will be unpinned. If not pinned, it will be pinned. **Authorization:** Only stage staff (owner, admin, moderator) can pin/unpin posts.
   * @tags Posts
   * @name PostsControllerTogglePinPostV1
   * @summary Toggle pin status of a post
   * @request POST:/api/v1/posts/{postId}/pin
   * @secure
   * @response `200` `PostsControllerTogglePinPostV1Data` Post pin status toggled successfully
   * @response `401` `ApiErrorResponseDto` Unauthorized - authentication required
   * @response `403` `ApiErrorResponseDto` Forbidden - only staff can pin/unpin posts
   * @response `404` `ApiErrorResponseDto` Post not found
   */
  export namespace PostsControllerTogglePinPostV1 {
    export type RequestParams = {
      /**
       * Post ID to pin/unpin
       * @example "post_123"
       */
      postId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = PostsControllerTogglePinPostV1Data;
  }

  /**
   * @description Creates a new comment on a post. **Authorization:** - Post must have `commentsEnabled = true` - User must be either: - Stage owner/admin/moderator of the post's stage, OR - Subscriber to at least one pass linked to the post **Replies:** - If `parentId` is provided, this is a reply to another comment. - Only one level of replies is allowed (no reply to reply). **Text Limits:** - Maximum 1000 characters.
   * @tags Comments
   * @name CommentsControllerCreateCommentV1
   * @summary Create a comment on a post
   * @request POST:/api/v1/posts/{postId}/comments
   * @secure
   * @response `201` `CommentsControllerCreateCommentV1Data` Comment created successfully
   * @response `400` `ApiErrorResponseDto` Invalid request (reply to reply, parent not found)
   * @response `401` `ApiErrorResponseDto` Unauthorized - authentication required
   * @response `403` `ApiErrorResponseDto` Forbidden - comments disabled or no access to post
   * @response `404` `ApiErrorResponseDto` Post not found
   */
  export namespace CommentsControllerCreateCommentV1 {
    export type RequestParams = {
      /**
       * Post ID to get/create comments for
       * @example "post_123"
       */
      postId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = CreateCommentDto;
    export type RequestHeaders = {};
    export type ResponseBody = CommentsControllerCreateCommentV1Data;
  }

  /**
   * @description Returns a paginated list of top-level comments on a post. Replies are not included; use the replies endpoint to fetch them. **Access Control:** - Anonymous users: Can view comments on posts with free passes - Authenticated users: Can view comments on posts they have access to **Pagination:** Uses cursor-based pagination. Pass the `nextCursor` from the response as the `cursor` query parameter to get the next page. **Ordering:** Comments are sorted by creation date (newest first).
   * @tags Comments
   * @name CommentsControllerListCommentsV1
   * @summary List comments on a post
   * @request GET:/api/v1/posts/{postId}/comments
   * @response `200` `CommentsControllerListCommentsV1Data` Comments retrieved successfully
   * @response `403` `ApiErrorResponseDto` Forbidden - no access to post
   * @response `404` `ApiErrorResponseDto` Post not found
   */
  export namespace CommentsControllerListCommentsV1 {
    export type RequestParams = {
      /**
       * Post ID to get/create comments for
       * @example "post_123"
       */
      postId: string;
    };
    export type RequestQuery = {
      /**
       * Cursor for pagination. Use the `nextCursor` from previous response.
       * @example "comment_abc123:2024-01-15T10:30:00.000Z"
       */
      cursor?: string;
      /**
       * Number of comments to return per page
       * @min 1
       * @max 50
       * @default 20
       * @example 20
       */
      limit?: number;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = CommentsControllerListCommentsV1Data;
  }

  /**
   * @description Deletes a comment (soft delete). **Authorization:** - Users can delete their own comments - Stage owner/admin/moderator can delete any comment on their stage **Note:** Replies to a deleted comment will still be visible but show "[deleted]" as the parent.
   * @tags Comments
   * @name CommentsControllerDeleteCommentV1
   * @summary Delete a comment
   * @request DELETE:/api/v1/posts/{postId}/comments/{commentId}
   * @secure
   * @response `204` `CommentsControllerDeleteCommentV1Data` Comment deleted successfully
   * @response `401` `ApiErrorResponseDto` Unauthorized - authentication required
   * @response `403` `ApiErrorResponseDto` Forbidden - not authorized to delete this comment
   * @response `404` `ApiErrorResponseDto` Comment not found
   */
  export namespace CommentsControllerDeleteCommentV1 {
    export type RequestParams = {
      /**
       * Post ID to get/create comments for
       * @example "post_123"
       */
      postId: string;
      /**
       * Comment ID
       * @example "comment_123"
       */
      commentId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = CommentsControllerDeleteCommentV1Data;
  }

  /**
   * @description Toggles the like status on a comment. - If not liked, adds a like. - If already liked, removes the like. **Authorization:** User must have access to the post to like comments.
   * @tags Comments
   * @name CommentsControllerToggleLikeV1
   * @summary Toggle like on a comment
   * @request POST:/api/v1/posts/{postId}/comments/{commentId}/like
   * @secure
   * @response `200` `CommentsControllerToggleLikeV1Data` Like toggled successfully
   * @response `401` `ApiErrorResponseDto` Unauthorized - authentication required
   * @response `403` `ApiErrorResponseDto` Forbidden - no access to post
   * @response `404` `ApiErrorResponseDto` Comment not found
   */
  export namespace CommentsControllerToggleLikeV1 {
    export type RequestParams = {
      /**
       * Post ID to get/create comments for
       * @example "post_123"
       */
      postId: string;
      /**
       * Comment ID
       * @example "comment_123"
       */
      commentId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = CommentsControllerToggleLikeV1Data;
  }

  /**
   * @description Returns a paginated list of users who liked a comment. **Access Control:** Same as viewing the post. **Pagination:** Uses cursor-based pagination.
   * @tags Comments
   * @name CommentsControllerListLikesV1
   * @summary List users who liked a comment
   * @request GET:/api/v1/posts/{postId}/comments/{commentId}/likes
   * @response `200` `CommentsControllerListLikesV1Data` Likes retrieved successfully
   * @response `403` `ApiErrorResponseDto` Forbidden - no access to post
   * @response `404` `ApiErrorResponseDto` Comment not found
   */
  export namespace CommentsControllerListLikesV1 {
    export type RequestParams = {
      /**
       * Post ID to get/create comments for
       * @example "post_123"
       */
      postId: string;
      /**
       * Comment ID
       * @example "comment_123"
       */
      commentId: string;
    };
    export type RequestQuery = {
      /**
       * Cursor for pagination.
       * @example "like_abc123:2024-01-15T10:30:00.000Z"
       */
      cursor?: string;
      /**
       * Number of likes to return per page
       * @min 1
       * @max 50
       * @default 20
       * @example 20
       */
      limit?: number;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = CommentsControllerListLikesV1Data;
  }

  /**
   * @description Returns a paginated list of replies to a specific comment. **Access Control:** Same as viewing the post. **Pagination:** Uses cursor-based pagination.
   * @tags Comments
   * @name CommentsControllerListRepliesV1
   * @summary List replies to a comment
   * @request GET:/api/v1/posts/{postId}/comments/{commentId}/replies
   * @response `200` `CommentsControllerListRepliesV1Data` Replies retrieved successfully
   * @response `403` `ApiErrorResponseDto` Forbidden - no access to post
   * @response `404` `ApiErrorResponseDto` Comment not found
   */
  export namespace CommentsControllerListRepliesV1 {
    export type RequestParams = {
      /**
       * Post ID to get/create comments for
       * @example "post_123"
       */
      postId: string;
      /**
       * Comment ID
       * @example "comment_123"
       */
      commentId: string;
    };
    export type RequestQuery = {
      /**
       * Cursor for pagination. Use the `nextCursor` from previous response.
       * @example "comment_abc123:2024-01-15T10:30:00.000Z"
       */
      cursor?: string;
      /**
       * Number of comments to return per page
       * @min 1
       * @max 50
       * @default 20
       * @example 20
       */
      limit?: number;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = CommentsControllerListRepliesV1Data;
  }

  /**
   * @description Creates or updates a reaction on a post. **Authorization:** - User must be either: - Stage owner/admin/moderator of the post's stage, OR - Subscriber to at least one pass linked to the post **Allowed Emojis:** - 👍, ❤️, 😂, 😮, 😢, 😡 **Behavior:** - If user has no existing reaction, creates a new one. - If user already reacted, updates to the new emoji. - Only one reaction per user per post is allowed.
   * @tags Reactions
   * @name ReactionsControllerCreateReactionV1
   * @summary React to a post
   * @request POST:/api/v1/posts/{postId}/reactions
   * @secure
   * @response `201` `ReactionsControllerCreateReactionV1Data` Reaction created/updated successfully
   * @response `400` `ApiErrorResponseDto` Invalid reaction type
   * @response `401` `ApiErrorResponseDto` Unauthorized - authentication required
   * @response `403` `ApiErrorResponseDto` Forbidden - no access to react to this post
   * @response `404` `ApiErrorResponseDto` Post not found
   */
  export namespace ReactionsControllerCreateReactionV1 {
    export type RequestParams = {
      /**
       * Post ID
       * @example "post_abc123"
       */
      postId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = CreateReactionDto;
    export type RequestHeaders = {};
    export type ResponseBody = ReactionsControllerCreateReactionV1Data;
  }

  /**
   * @description Removes the user's reaction from a post. **Authorization:** User must own the reaction.
   * @tags Reactions
   * @name ReactionsControllerDeleteReactionV1
   * @summary Remove reaction from a post
   * @request DELETE:/api/v1/posts/{postId}/reactions
   * @secure
   * @response `200` `ReactionsControllerDeleteReactionV1Data` Reaction removed successfully
   * @response `401` `ApiErrorResponseDto` Unauthorized - authentication required
   * @response `404` `ApiErrorResponseDto` Reaction not found or post not found
   */
  export namespace ReactionsControllerDeleteReactionV1 {
    export type RequestParams = {
      /**
       * Post ID
       * @example "post_abc123"
       */
      postId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = ReactionsControllerDeleteReactionV1Data;
  }

  /**
   * @description Returns a paginated list of reactions on a post. **Access:** Public - anyone can view reactions. **Pagination:** Uses cursor-based pagination. Pass the `nextCursor` from the response as the `cursor` query parameter to get the next page. **Filtering:** Optionally filter by emoji. **Ordering:** Reactions are sorted by creation date (newest first).
   * @tags Reactions
   * @name ReactionsControllerListReactionsV1
   * @summary List reactions on a post
   * @request GET:/api/v1/posts/{postId}/reactions
   * @response `200` `ReactionsControllerListReactionsV1Data` Reactions retrieved successfully
   * @response `404` `ApiErrorResponseDto` Post not found
   */
  export namespace ReactionsControllerListReactionsV1 {
    export type RequestParams = {
      /**
       * Post ID
       * @example "post_abc123"
       */
      postId: string;
    };
    export type RequestQuery = {
      /**
       * Cursor for pagination. Use the `nextCursor` from previous response.
       * @example "reaction_abc123:2024-01-15T10:30:00.000Z"
       */
      cursor?: string;
      /**
       * Number of reactions to return per page
       * @min 1
       * @max 50
       * @default 20
       * @example 20
       */
      limit?: number;
      /**
       * Filter by emoji reaction
       * @example "👍"
       */
      emoji?: "👍" | "❤️" | "😂" | "😮" | "😢" | "😡";
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = ReactionsControllerListReactionsV1Data;
  }

  /**
   * @description Subscribe to a pass. Free passes create subscription immediately. Paid passes return redirect URL for Stripe payment.
   * @tags subscriptions
   * @name SubscriptionsControllerJoinPassV1
   * @summary Join a pass
   * @request POST:/api/v1/passes/{passId}/join
   * @secure
   * @response `200` `SubscriptionsControllerJoinPassV1Data` Join result - subscription created (type: subscription) or redirect URL for payment (type: redirect)
   * @response `400` `ApiErrorResponseDto` Paid pass without payment link configured
   * @response `401` `ApiErrorResponseDto` Unauthorized - not authenticated
   * @response `404` `ApiErrorResponseDto` Pass not found
   * @response `409` `ApiErrorResponseDto` Already subscribed to this pass
   */
  export namespace SubscriptionsControllerJoinPassV1 {
    export type RequestParams = {
      passId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = SubscriptionsControllerJoinPassV1Data;
  }

  /**
   * @description Returns a paginated list of distinct members with active subscriptions to this pass. **Authorization:** - Only the stage owner can access this endpoint. **Features:** - Search by member name or email using the `search` query parameter. - Cursor-based pagination for efficient large data sets. - Returns earliest subscription date as `joinedAt`. **Response:** - Includes member info (id, name, email, image, joinedAt). - Sorted by join date (newest first).
   * @tags subscriptions
   * @name SubscriptionsControllerListPassMembersV1
   * @summary List pass members
   * @request GET:/api/v1/passes/{passId}/members
   * @secure
   * @response `200` `SubscriptionsControllerListPassMembersV1Data` Members retrieved successfully
   * @response `401` `ApiErrorResponseDto` Unauthorized - authentication required
   * @response `403` `ApiErrorResponseDto` Forbidden - not stage owner
   * @response `404` `ApiErrorResponseDto` Pass not found
   */
  export namespace SubscriptionsControllerListPassMembersV1 {
    export type RequestParams = {
      /**
       * Pass ID to list members from
       * @example "pass_123"
       */
      passId: string;
    };
    export type RequestQuery = {
      /**
       * Cursor for pagination. Use the `nextCursor` from previous response.
       * @example "user_abc123:2024-01-15T10:30:00.000Z"
       */
      cursor?: string;
      /**
       * Number of members to return per page
       * @min 1
       * @max 50
       * @default 20
       * @example 20
       */
      limit?: number;
      /**
       * Search by member name or email
       * @example "john"
       */
      search?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = SubscriptionsControllerListPassMembersV1Data;
  }

  /**
   * @description Exports all members with active subscriptions to this pass as a CSV file. **Authorization:** - Only the stage owner can access this endpoint. **Features:** - Streams data in batches for memory efficiency. - Supports search filter (name or email). - Returns a downloadable CSV file. **CSV Columns:** - Member ID, Name, Email, Joined At
   * @tags subscriptions
   * @name SubscriptionsControllerExportPassMembersCsvV1
   * @summary Export pass members as CSV
   * @request GET:/api/v1/passes/{passId}/members/csv
   * @secure
   * @response `200` `SubscriptionsControllerExportPassMembersCsvV1Data` CSV file download
   * @response `401` `ApiErrorResponseDto` Unauthorized - authentication required
   * @response `403` `ApiErrorResponseDto` Forbidden - not stage owner
   * @response `404` `ApiErrorResponseDto` Pass not found
   */
  export namespace SubscriptionsControllerExportPassMembersCsvV1 {
    export type RequestParams = {
      /**
       * Pass ID to export members from
       * @example "pass_123"
       */
      passId: string;
    };
    export type RequestQuery = {
      /**
       * Search by member name or email
       * @example "john"
       */
      search?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody =
      SubscriptionsControllerExportPassMembersCsvV1Data;
  }

  /**
   * No description
   * @tags OTA
   * @name OtaControllerUploadZipV1
   * @summary Upload OTA update bundle
   * @request POST:/api/v1/ota/upload
   * @response `201` `OtaControllerUploadZipV1Data`
   */
  export namespace OtaControllerUploadZipV1 {
    export type RequestParams = {};
    export type RequestQuery = {
      channel: string;
      runtimeVersion: string;
      updateType: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      "x-ota-upload-secret": string;
    };
    export type ResponseBody = OtaControllerUploadZipV1Data;
  }

  /**
   * No description
   * @tags OTA
   * @name OtaControllerGetManifestV1
   * @summary Get OTA manifest for Expo client
   * @request GET:/api/v1/ota/manifest
   * @response `200` `OtaControllerGetManifestV1Data`
   */
  export namespace OtaControllerGetManifestV1 {
    export type RequestParams = {};
    export type RequestQuery = {
      platform?: "ios" | "android";
      "runtime-version"?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      "expo-channel-name"?: string;
      "expo-runtime-version"?: string;
      "expo-platform"?: string;
    };
    export type ResponseBody = OtaControllerGetManifestV1Data;
  }

  /**
   * No description
   * @tags OTA
   * @name OtaControllerGetAssetV1
   * @summary Get OTA asset file
   * @request GET:/api/v1/ota/assets
   * @response `200` `OtaControllerGetAssetV1Data`
   */
  export namespace OtaControllerGetAssetV1 {
    export type RequestParams = {};
    export type RequestQuery = {
      assetId?: string;
      runtimeVersion: string;
      platform: "ios" | "android";
      channel: string;
      isLaunchAsset?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = OtaControllerGetAssetV1Data;
  }

  /**
   * No description
   * @tags OTA
   * @name OtaControllerListUpdatesV1
   * @summary List all OTA updates
   * @request GET:/api/v1/ota
   * @response `200` `OtaControllerListUpdatesV1Data`
   */
  export namespace OtaControllerListUpdatesV1 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      "x-ota-upload-secret": string;
    };
    export type ResponseBody = OtaControllerListUpdatesV1Data;
  }

  /**
   * No description
   * @tags OTA
   * @name OtaControllerUpdateTypeV1
   * @summary Get update type by updateId
   * @request GET:/api/v1/ota/update-type
   * @response `200` `OtaControllerUpdateTypeV1Data`
   */
  export namespace OtaControllerUpdateTypeV1 {
    export type RequestParams = {};
    export type RequestQuery = {
      updateId: string;
      runtimeVersion: string;
      channel: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      "x-ota-upload-secret": string;
    };
    export type ResponseBody = OtaControllerUpdateTypeV1Data;
  }

  /**
   * No description
   * @tags OTA
   * @name OtaControllerGetUpdateV1
   * @summary Get specific OTA update
   * @request GET:/api/v1/ota/{id}
   * @response `200` `OtaControllerGetUpdateV1Data`
   */
  export namespace OtaControllerGetUpdateV1 {
    export type RequestParams = {
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      "x-ota-upload-secret": string;
    };
    export type ResponseBody = OtaControllerGetUpdateV1Data;
  }

  /**
   * No description
   * @tags OTA
   * @name OtaControllerDeleteUpdateV1
   * @summary Delete OTA update
   * @request DELETE:/api/v1/ota/{id}
   * @response `200` `OtaControllerDeleteUpdateV1Data`
   */
  export namespace OtaControllerDeleteUpdateV1 {
    export type RequestParams = {
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      "x-ota-upload-secret": string;
    };
    export type ResponseBody = OtaControllerDeleteUpdateV1Data;
  }

  /**
   * @description Creates a new scheduled video call for a stage. **Authorization:** User must be the stage owner. **Pass Assignment:** - If `passIds` is not provided or empty, the call is assigned to the stage's ground pass (free pass). - If `passIds` is provided, all passes must belong to the specified stage. **Scheduling:** - `scheduledStartAt` must be in the future. - `scheduledEndAt` must be after `scheduledStartAt`. - A Zoom meeting will be created 15 minutes before the scheduled start time. **Zoom Integration:** - License is allocated 15 minutes before start. - License is released 15 minutes after end. - Join URL becomes available when call is live or 5 minutes before start.
   * @tags Video Calls
   * @name VideoCallsControllerCreateVideoCallV1
   * @summary Create a new video call
   * @request POST:/api/v1/stages/{stageId}/video-calls
   * @secure
   * @response `201` `VideoCallsControllerCreateVideoCallV1Data` Video call created successfully
   * @response `400` `ApiErrorResponseDto` Invalid request (invalid passes or schedule times)
   * @response `401` `ApiErrorResponseDto` Unauthorized - authentication required
   * @response `403` `ApiErrorResponseDto` Forbidden - not the stage owner
   * @response `404` `ApiErrorResponseDto` Stage not found
   */
  export namespace VideoCallsControllerCreateVideoCallV1 {
    export type RequestParams = {
      stageId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = CreateVideoCallDto;
    export type RequestHeaders = {};
    export type ResponseBody = VideoCallsControllerCreateVideoCallV1Data;
  }

  /**
   * @description Returns a paginated list of video calls for a stage. **Access Control:** Authentication is required. Stage owners see all calls. Other users only see calls from their subscribed passes. **Pagination:** Uses cursor-based pagination. Pass the `nextCursor` from the response as the `cursor` query parameter to get the next page. **Sorting:** Calls are sorted by scheduled start time (newest first). **Filtering:** - `status`: Filter by call status (scheduled, live, ended, cancelled) - `filter`: Filter by time - 'upcoming' (scheduled + live) or 'past' (ended + cancelled) - `passIds`: Filter by specific passes
   * @tags Video Calls
   * @name VideoCallsControllerListVideoCallsV1
   * @summary List video calls for a stage
   * @request GET:/api/v1/stages/{stageId}/video-calls
   * @secure
   * @response `200` `VideoCallsControllerListVideoCallsV1Data` Video calls retrieved successfully
   * @response `404` `ApiErrorResponseDto` Stage not found
   */
  export namespace VideoCallsControllerListVideoCallsV1 {
    export type RequestParams = {
      stageId: string;
    };
    export type RequestQuery = {
      /**
       * Filter by status
       * @example "scheduled"
       */
      status?: "scheduled" | "live" | "ended" | "cancelled";
      /**
       * Filter by time: upcoming (scheduled + live) or past (ended + cancelled)
       * @example "upcoming"
       */
      filter?: "upcoming" | "past";
      /**
       * Filter upcoming calls to only include those scheduled before this time (ISO 8601 format). Only applies when filter=upcoming.
       * @example "2025-01-01T00:00:00.000Z"
       */
      scheduledTimeLessThan?: string;
      /**
       * Filter by specific pass IDs
       * @example ["pass_123","pass_456"]
       */
      passIds?: string[];
      /**
       * Number of items per page (1-50)
       * @min 1
       * @max 50
       * @default 20
       * @example 20
       */
      limit?: number;
      /**
       * Cursor for pagination (from previous response)
       * @example "eyJpZCI6InZjXzEyMyIsInNjaGVkdWxlZFN0YXJ0QXQiOiIyMDI0LTEyLTI1VDEwOjAwOjAwLjAwMFoifQ=="
       */
      cursor?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = VideoCallsControllerListVideoCallsV1Data;
  }

  /**
   * @description Returns aggregated statistics for video calls within a date range. **Authorization:** User must be the stage owner. **Query Parameters:** - `startDate`: Start of the date range (ISO 8601 format) - `endDate`: End of the date range (ISO 8601 format) **Response:** - `totalCalls`: Count of ended/live video calls in the range - `totalUniqueAttendees`: Distinct count of users who attended any call
   * @tags Video Calls
   * @name VideoCallsControllerGetVideoCallStatsV1
   * @summary Get video call statistics for a stage
   * @request GET:/api/v1/stages/{stageId}/video-calls/stats
   * @secure
   * @response `200` `VideoCallsControllerGetVideoCallStatsV1Data` Statistics retrieved successfully
   * @response `400` `ApiErrorResponseDto` Invalid date range
   * @response `401` `ApiErrorResponseDto` Unauthorized - authentication required
   * @response `403` `ApiErrorResponseDto` Forbidden - not the stage owner
   * @response `404` `ApiErrorResponseDto` Stage not found
   */
  export namespace VideoCallsControllerGetVideoCallStatsV1 {
    export type RequestParams = {
      stageId: string;
    };
    export type RequestQuery = {
      /**
       * Start date for the stats query (ISO 8601 format)
       * @example "2024-01-01T00:00:00.000Z"
       */
      startDate: string;
      /**
       * End date for the stats query (ISO 8601 format)
       * @example "2024-12-31T23:59:59.999Z"
       */
      endDate: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = VideoCallsControllerGetVideoCallStatsV1Data;
  }

  /**
   * @description Get a unique join URL for a video call. **Authorization:** User must have access to the video call through: - Being a stage owner/admin/moderator (joins as host) - Having a subscription to one of the call's passes (joins as participant) - The call having a free pass (joins as participant) **Join Window:** - Call must be 'live' OR 'scheduled' and within 5 minutes of start time. - Call must have a Zoom meeting configured. **Response:** - `isHost: true` - User receives the Zoom start URL (can host/manage meeting) - `isHost: false` - User receives a unique registrant join URL **Note:** Each participant gets a unique join URL that is persisted for future use.
   * @tags Video Calls
   * @name VideoCallsControllerJoinVideoCallV1
   * @summary Join a video call
   * @request POST:/api/v1/stages/{stageId}/video-calls/{callId}/join
   * @secure
   * @response `200` `VideoCallsControllerJoinVideoCallV1Data` Join URL retrieved successfully
   * @response `400` `ApiErrorResponseDto` Video call not ready or registration failed
   * @response `401` `ApiErrorResponseDto` Unauthorized - authentication required
   * @response `403` `ApiErrorResponseDto` Forbidden - no access to this call or not yet joinable
   * @response `404` `ApiErrorResponseDto` Video call not found
   */
  export namespace VideoCallsControllerJoinVideoCallV1 {
    export type RequestParams = {
      stageId: string;
      callId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = VideoCallsControllerJoinVideoCallV1Data;
  }

  /**
   * @description Returns a paginated list of members for a video call with filtering options. **Authorization:** User must be the stage owner. **Query Parameters:** - `mode`: Filter mode - `all`: All subscribers of the call's passes (potential attendees) - `attended`: Only users who actually attended (attended=true) - `missed`: Subscribers who did not attend - `search`: Search by name or email (case-insensitive, partial match) - `limit`: Number of results per page (1-100, default 20) - `cursor`: Pagination cursor from previous response **Response:** Returns members with their attendance status and pagination info.
   * @tags Video Calls
   * @name VideoCallsControllerGetVideoCallMembersV1
   * @summary Get members for a video call
   * @request GET:/api/v1/stages/{stageId}/video-calls/{callId}/members
   * @secure
   * @response `200` `VideoCallsControllerGetVideoCallMembersV1Data` Members retrieved successfully
   * @response `401` `ApiErrorResponseDto` Unauthorized - authentication required
   * @response `403` `ApiErrorResponseDto` Forbidden - not the stage owner
   * @response `404` `ApiErrorResponseDto` Video call not found
   */
  export namespace VideoCallsControllerGetVideoCallMembersV1 {
    export type RequestParams = {
      callId: string;
      stageId: string;
    };
    export type RequestQuery = {
      /**
       * Filter mode: all (subscribers), attended (attended=true), missed (not attended)
       * @default "all"
       */
      mode?: "all" | "attended" | "missed";
      /**
       * Search query to filter by name or email (case-insensitive, partial match)
       * @example "john"
       */
      search?: string;
      /**
       * Maximum number of results to return (1-100)
       * @min 1
       * @max 100
       * @default 20
       */
      limit?: number;
      /** Cursor for pagination (from previous response) */
      cursor?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = VideoCallsControllerGetVideoCallMembersV1Data;
  }

  /**
   * @description Downloads a CSV file containing all members for a video call. **Authorization:** User must be the stage owner. **Query Parameters:** - `mode`: Filter mode - `all`: All subscribers of the call's passes (potential attendees) - `attended`: Only users who actually attended (attended=true) - `missed`: Subscribers who did not attend - `search`: Search by name or email (case-insensitive, partial match) **CSV Columns:** - Name - Email - Attended (Yes/No) - Joined At (ISO timestamp)
   * @tags Video Calls
   * @name VideoCallsControllerExportVideoCallMembersV1
   * @summary Export members as CSV
   * @request GET:/api/v1/stages/{stageId}/video-calls/{callId}/members/export
   * @secure
   * @response `200` `VideoCallsControllerExportVideoCallMembersV1Data` CSV file download
   * @response `401` `ApiErrorResponseDto` Unauthorized - authentication required
   * @response `403` `ApiErrorResponseDto` Forbidden - not the stage owner
   * @response `404` `ApiErrorResponseDto` Video call not found
   */
  export namespace VideoCallsControllerExportVideoCallMembersV1 {
    export type RequestParams = {
      callId: string;
      stageId: string;
    };
    export type RequestQuery = {
      /**
       * Filter mode: all (subscribers), attended (attended=true), missed (not attended)
       * @default "all"
       */
      mode?: "all" | "attended" | "missed";
      /**
       * Search query to filter by name or email (case-insensitive, partial match)
       * @example "john"
       */
      search?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = VideoCallsControllerExportVideoCallMembersV1Data;
  }

  /**
   * @description Returns details of a specific video call. **Access Control:** Authentication is required. Only stage owners and users subscribed to the call's passes can view the call. **Join URL:** The Zoom join URL is only included when: - The call status is 'live', OR - The call is 'scheduled' and within 5 minutes of the start time
   * @tags Video Calls
   * @name VideoCallsControllerGetVideoCallV1
   * @summary Get details of a video call
   * @request GET:/api/v1/stages/{stageId}/video-calls/{callId}
   * @secure
   * @response `200` `VideoCallsControllerGetVideoCallV1Data` Video call retrieved successfully
   * @response `403` `ApiErrorResponseDto` Forbidden - no access to this call
   * @response `404` `ApiErrorResponseDto` Video call not found
   */
  export namespace VideoCallsControllerGetVideoCallV1 {
    export type RequestParams = {
      stageId: string;
      callId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = VideoCallsControllerGetVideoCallV1Data;
  }

  /**
   * @description Updates an existing video call. **Authorization:** User must be the stage owner. **Restrictions:** - Cannot update calls that have ended or been cancelled. - If schedule times are changed, jobs are rescheduled accordingly. - If `passIds` is provided, it replaces the existing passes. **Note:** Updating schedule times will reschedule the Zoom license allocation.
   * @tags Video Calls
   * @name VideoCallsControllerUpdateVideoCallV1
   * @summary Update a video call
   * @request PATCH:/api/v1/stages/{stageId}/video-calls/{callId}
   * @secure
   * @response `200` `VideoCallsControllerUpdateVideoCallV1Data` Video call updated successfully
   * @response `400` `ApiErrorResponseDto` Invalid request (invalid passes, schedule times, or call already ended)
   * @response `401` `ApiErrorResponseDto` Unauthorized - authentication required
   * @response `403` `ApiErrorResponseDto` Forbidden - not the stage owner
   * @response `404` `ApiErrorResponseDto` Video call not found
   */
  export namespace VideoCallsControllerUpdateVideoCallV1 {
    export type RequestParams = {
      stageId: string;
      callId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = UpdateVideoCallDto;
    export type RequestHeaders = {};
    export type ResponseBody = VideoCallsControllerUpdateVideoCallV1Data;
  }

  /**
   * @description Cancels (soft deletes) a video call. **Authorization:** User must be the stage owner. **Side Effects:** - Call status is set to 'cancelled'. - All scheduled jobs are removed. - If a Zoom license was allocated, it is released. - The Zoom meeting is ended/deleted if it was created.
   * @tags Video Calls
   * @name VideoCallsControllerDeleteVideoCallV1
   * @summary Cancel a video call
   * @request DELETE:/api/v1/stages/{stageId}/video-calls/{callId}
   * @secure
   * @response `204` `VideoCallsControllerDeleteVideoCallV1Data` Video call cancelled successfully
   * @response `401` `ApiErrorResponseDto` Unauthorized - authentication required
   * @response `403` `ApiErrorResponseDto` Forbidden - not the stage owner
   * @response `404` `ApiErrorResponseDto` Video call not found
   */
  export namespace VideoCallsControllerDeleteVideoCallV1 {
    export type RequestParams = {
      callId: string;
      stageId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = VideoCallsControllerDeleteVideoCallV1Data;
  }

  /**
   * @description Unified endpoint for uploading assets. Purpose is required. **Purpose:** - `dp`: User profile picture (images only) - `cover`: User cover/banner image (images only) - `post`: Stage post asset (requires `stageId`) **Video uploads are only allowed for purpose=post.** **Authorization for post uploads:** - **Staff members** (owner, admin, moderator): Can always upload - **Subscribers**: Auto-checked for any active subscription with subscriber posting enabled **Storage Paths:** - dp/cover: users/{userId}/{purpose}/{assetType}/{timestamp}_{filename} - post: stages/{stageId}/{userId}/{assetType}/{timestamp}_{filename} **Image Processing:** - Allowed image formats: JPEG, PNG, HEIC/HEIF only - HEIC/HEIF images are automatically converted to JPEG for browser compatibility - Other images (JPEG, PNG) are compressed to WebP format - Default quality: dp=60, cover=70, post=85 **Video Transcoding:** - Videos uploaded with purpose=post are automatically transcoded via Mux - The `transcoderConfig` field tracks transcoding status **Supported MIME Types:** - Image: JPEG, PNG, HEIC/HEIF (HEIC converted to JPEG, others compressed to WebP) - Video: MP4, QuickTime, WebM (only for purpose=post) - Audio: MP3, WAV, OGG, AAC (only for purpose=post)
   * @tags Assets
   * @name AssetsControllerUploadV1
   * @summary Upload asset
   * @request POST:/api/v1/assets/upload
   * @secure
   * @response `201` `AssetsControllerUploadV1Data` Asset uploaded successfully
   * @response `400` `ApiErrorResponseDto` Invalid file type, size, purpose, or missing required parameters
   * @response `401` `ApiErrorResponseDto` Unauthorized
   * @response `403` `ApiErrorResponseDto` Forbidden - insufficient permissions for stage upload or subscriber posting not allowed
   * @response `404` `ApiErrorResponseDto` Stage not found (for post purpose)
   */
  export namespace AssetsControllerUploadV1 {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * Upload purpose (required). dp/cover = user profile assets (images only), post = stage content (requires stageId).
       * @example "post"
       */
      purpose: "dp" | "cover" | "post";
      /**
       * Stage ID (required when purpose=post)
       * @example "stage_abc123"
       */
      stageId?: string;
      /**
       * Pass IDs for targeting the post (optional). Upload permission is auto-detected from subscriptions with allowSubscriberPosting enabled.
       * @example "pass_123,pass_456"
       */
      passIds?: string[];
      /**
       * Image compression quality (1-100). Defaults: dp=60, cover=70, post=85
       * @min 1
       * @max 100
       * @example 80
       */
      quality?: number;
    };
    export type RequestBody = {
      /**
       * The file to upload
       * @format binary
       */
      file: File;
      /** Duration in seconds (for video/audio) */
      durationInSeconds?: number;
    };
    export type RequestHeaders = {};
    export type ResponseBody = AssetsControllerUploadV1Data;
  }

  /**
   * @description Returns a paginated list of orders for a stage. **Authorization:** - Only the stage owner can access this endpoint. **Features:** - Search by subscriber name or email using the `search` query parameter. - Filter by date range using `startDate` and `endDate` (ISO 8601 format). - Cursor-based pagination for efficient large data sets. **Response:** - Includes joined subscriber (user) and pass information. - Sorted by creation date (newest first).
   * @tags Orders
   * @name OrdersControllerListOrdersV1
   * @summary List orders for a stage
   * @request GET:/api/v1/stages/{stageId}/orders
   * @secure
   * @response `200` `OrdersControllerListOrdersV1Data` Orders retrieved successfully
   * @response `401` `ApiErrorResponseDto` Unauthorized - authentication required
   * @response `403` `ApiErrorResponseDto` Forbidden - not stage owner
   * @response `404` `ApiErrorResponseDto` Stage not found
   */
  export namespace OrdersControllerListOrdersV1 {
    export type RequestParams = {
      /**
       * Stage ID to list orders from
       * @example "stage_123"
       */
      stageId: string;
    };
    export type RequestQuery = {
      /**
       * Cursor for pagination. Use the `nextCursor` from previous response.
       * @example "order_abc123:2024-01-15T10:30:00.000Z"
       */
      cursor?: string;
      /**
       * Number of orders to return per page
       * @min 1
       * @max 50
       * @default 20
       * @example 20
       */
      limit?: number;
      /**
       * Search by subscriber name or email
       * @example "john"
       */
      search?: string;
      /**
       * Filter orders created on or after this date (ISO 8601)
       * @example "2024-01-01T00:00:00.000Z"
       */
      startDate?: string;
      /**
       * Filter orders created on or before this date (ISO 8601)
       * @example "2024-12-31T23:59:59.999Z"
       */
      endDate?: string;
      /**
       * Filter by pass IDs
       * @example ["pass_123","pass_456"]
       */
      passIds?: string[];
      /**
       * Filter by order status (comma-separated or array)
       * @example ["completed"]
       */
      status?: ("pending" | "completed" | "failed" | "refunded")[];
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = OrdersControllerListOrdersV1Data;
  }

  /**
   * @description Returns consolidated order statistics for a stage. **Authorization:** - Only the stage owner can access this endpoint. **Statistics:** - Count of completed orders. - Total collected amount in USD cents. **Filtering:** - Filter by date range using `startDate` and `endDate` (ISO 8601 format). - Only completed orders are included in the statistics.
   * @tags Orders
   * @name OrdersControllerGetOrderStatsV1
   * @summary Get order statistics for a stage
   * @request GET:/api/v1/stages/{stageId}/orders/stats
   * @secure
   * @response `200` `OrdersControllerGetOrderStatsV1Data` Order statistics retrieved successfully
   * @response `401` `ApiErrorResponseDto` Unauthorized - authentication required
   * @response `403` `ApiErrorResponseDto` Forbidden - not stage owner
   * @response `404` `ApiErrorResponseDto` Stage not found
   */
  export namespace OrdersControllerGetOrderStatsV1 {
    export type RequestParams = {
      /**
       * Stage ID to get order stats for
       * @example "stage_123"
       */
      stageId: string;
    };
    export type RequestQuery = {
      /**
       * Filter orders created on or after this date (ISO 8601)
       * @example "2024-01-01T00:00:00.000Z"
       */
      startDate?: string;
      /**
       * Filter orders created on or before this date (ISO 8601)
       * @example "2024-12-31T23:59:59.999Z"
       */
      endDate?: string;
      /**
       * Filter by specific pass IDs (comma-separated or array)
       * @example ["pass_123","pass_456"]
       */
      passIds?: string[];
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = OrdersControllerGetOrderStatsV1Data;
  }

  /**
   * @description Exports all orders for a stage as a CSV file. **Authorization:** - Only the stage owner can access this endpoint. **Features:** - Streams data in batches for memory efficiency. - Supports all the same filters as the list endpoint (search, date range, passIds, status). - Returns a downloadable CSV file. **CSV Columns:** - Order ID, Subscriber ID, Subscriber Name, Subscriber Email - Pass ID, Pass Name, Pass Type - Amount (USD), Amount (INR), Status - Created At, Completed At
   * @tags Orders
   * @name OrdersControllerExportOrdersCsvV1
   * @summary Export orders as CSV
   * @request GET:/api/v1/stages/{stageId}/orders/csv
   * @secure
   * @response `200` `OrdersControllerExportOrdersCsvV1Data` CSV file download
   * @response `401` `ApiErrorResponseDto` Unauthorized - authentication required
   * @response `403` `ApiErrorResponseDto` Forbidden - not stage owner
   * @response `404` `ApiErrorResponseDto` Stage not found
   */
  export namespace OrdersControllerExportOrdersCsvV1 {
    export type RequestParams = {
      /**
       * Stage ID to export orders from
       * @example "stage_123"
       */
      stageId: string;
    };
    export type RequestQuery = {
      /**
       * Search by subscriber name or email
       * @example "john"
       */
      search?: string;
      /**
       * Filter orders created on or after this date (ISO 8601)
       * @example "2024-01-01T00:00:00.000Z"
       */
      startDate?: string;
      /**
       * Filter orders created on or before this date (ISO 8601)
       * @example "2024-12-31T23:59:59.999Z"
       */
      endDate?: string;
      /**
       * Filter by pass IDs
       * @example ["pass_123","pass_456"]
       */
      passIds?: string[];
      /**
       * Filter by order status (comma-separated or array)
       * @example ["completed"]
       */
      status?: ("pending" | "completed" | "failed" | "refunded")[];
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = OrdersControllerExportOrdersCsvV1Data;
  }

  /**
 * @description Records an analytics event with rate limiting and deduplication. **Supported Event Types:** - `page_view`: Backstage page view - `post_view`: Post view (future) - `video_start`: Video playback started (future) **Rate Limits:** - Anonymous: 10 requests per minute per IP per stageId - Authenticated: 30 requests per minute per user per stageId **Deduplication:** - Same IP/user can only register one view per 5-minute window
 * @tags analytics
 * @name AnalyticsControllerCaptureEventV1
 * @summary Capture an analytics event
 * @request POST:/api/v1/analytics/capture/{eventType}
 * @response `200` `AnalyticsControllerCaptureEventV1Data` Event already recorded (deduplicated)
 * @response `201` `({
  \**
   * Human-readable message based on HTTP status code
   * @example "Successful"
   *\
    message: string,
    result: CaptureEventResponseDto,

})` Event recorded successfully
 * @response `400` `ApiErrorResponseDto` Invalid event type or missing required fields
 * @response `404` `ApiErrorResponseDto` Stage not found
 * @response `429` `ApiErrorResponseDto` Rate limit exceeded
*/
  export namespace AnalyticsControllerCaptureEventV1 {
    export type RequestParams = {
      eventType: string;
    };
    export type RequestQuery = {};
    export type RequestBody = CaptureEventDto;
    export type RequestHeaders = {
      "user-agent": string;
    };
    export type ResponseBody = AnalyticsControllerCaptureEventV1Data;
  }

  /**
   * @description Returns the total count of page views for a stage within a date range. Results are cached for 5 minutes to reduce database pressure.
   * @tags analytics
   * @name AnalyticsControllerGetPageViewCountV1
   * @summary Get page view count for a stage
   * @request GET:/api/v1/analytics/stages/{stageId}/page-views
   * @secure
   * @response `200` `AnalyticsControllerGetPageViewCountV1Data` Page view count retrieved successfully
   * @response `401` `ApiErrorResponseDto` Unauthorized - not logged in
   * @response `403` `ApiErrorResponseDto` Forbidden - not owner or admin of the stage
   * @response `404` `ApiErrorResponseDto` Stage not found
   */
  export namespace AnalyticsControllerGetPageViewCountV1 {
    export type RequestParams = {
      stageId: string;
    };
    export type RequestQuery = {
      /**
       * Start date for the date range (ISO 8601 format)
       * @example "2024-01-01"
       */
      startDate: string;
      /**
       * End date for the date range (ISO 8601 format)
       * @example "2024-01-31"
       */
      endDate: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = AnalyticsControllerGetPageViewCountV1Data;
  }

  /**
   * @description Creates a new challenge for a stage. **Authorization:** User must be the stage owner. **Challenge Types:** - `always_on`: Challenge runs indefinitely from startDate. Requires `lengthInDays`. - If all 7 days selected: lengthInDays = duration in calendar days - If fewer days selected: lengthInDays = number of check-ins required - `fixed_dates`: Challenge runs from startDate to endDate. Requires `endDate`. **Pass Assignment:** - If `passIds` is not provided or empty, the challenge is assigned to the ground pass. - If `passIds` is provided, all passes must belong to the specified stage. **Cover Image:** - `coverImageId` must reference a valid image asset owned by the user.
   * @tags Challenges
   * @name ChallengesControllerCreateChallengeV1
   * @summary Create a new challenge
   * @request POST:/api/v1/stages/{stageId}/challenges
   * @secure
   * @response `201` `ChallengesControllerCreateChallengeV1Data` Challenge created successfully
   * @response `400` `ApiErrorResponseDto` Invalid request (validation errors, invalid passes/assets)
   * @response `401` `ApiErrorResponseDto` Unauthorized - authentication required
   * @response `403` `ApiErrorResponseDto` Forbidden - not the stage owner
   * @response `404` `ApiErrorResponseDto` Stage not found
   */
  export namespace ChallengesControllerCreateChallengeV1 {
    export type RequestParams = {
      stageId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = CreateChallengeDto;
    export type RequestHeaders = {};
    export type ResponseBody = ChallengesControllerCreateChallengeV1Data;
  }

  /**
   * @description Returns a paginated list of challenges for a stage. **Access Control:** Authentication is required. - Stage owners see all challenges (including hidden) - Subscribers see only public challenges linked to their subscribed passes **Filtering:** - `challengeType`: Filter by always_on or fixed_dates - `status`: Filter by active (running), upcoming (not started), or past (ended) - `visibility`: Owner only - filter by public, hidden, or all **Pagination:** Uses cursor-based pagination.
   * @tags Challenges
   * @name ChallengesControllerListChallengesV1
   * @summary List challenges for a stage
   * @request GET:/api/v1/stages/{stageId}/challenges
   * @secure
   * @response `200` `ChallengesControllerListChallengesV1Data` Challenges retrieved successfully
   * @response `401` `ApiErrorResponseDto` Unauthorized - authentication required
   * @response `404` `ApiErrorResponseDto` Stage not found
   */
  export namespace ChallengesControllerListChallengesV1 {
    export type RequestParams = {
      stageId: string;
    };
    export type RequestQuery = {
      /** Filter by challenge type */
      challengeType?: "always_on" | "fixed_dates";
      /** Filter by status: active (running now), upcoming (not started), past (ended) */
      status?: "active" | "upcoming" | "past";
      /**
       * Filter by visibility (owner only). Non-owners always see only public challenges.
       * @default "all"
       */
      visibility?: "public" | "hidden" | "all";
      /**
       * Number of items per page (1-50)
       * @min 1
       * @max 50
       * @default 20
       */
      limit?: number;
      /** Cursor for pagination */
      cursor?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = ChallengesControllerListChallengesV1Data;
  }

  /**
   * @description Returns details of a specific challenge. **Access Control:** Authentication is required. - Stage owners can view any challenge (including hidden) - Subscribers can only view public challenges linked to their subscribed passes - Hidden challenges return 404 for non-owners
   * @tags Challenges
   * @name ChallengesControllerGetChallengeV1
   * @summary Get details of a challenge
   * @request GET:/api/v1/stages/{stageId}/challenges/{challengeId}
   * @secure
   * @response `200` `ChallengesControllerGetChallengeV1Data` Challenge retrieved successfully
   * @response `401` `ApiErrorResponseDto` Unauthorized - authentication required
   * @response `403` `ApiErrorResponseDto` Forbidden - no access to this challenge
   * @response `404` `ApiErrorResponseDto` Challenge not found
   */
  export namespace ChallengesControllerGetChallengeV1 {
    export type RequestParams = {
      stageId: string;
      challengeId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = ChallengesControllerGetChallengeV1Data;
  }

  /**
   * @description Updates an existing challenge. **Authorization:** User must be the stage owner. **Restrictions:** - Cannot change challengeType after creation - Cannot set endDate on always_on challenges - Cannot set lengthInDays on fixed_dates challenges - Pass IDs, if provided, replace existing passes
   * @tags Challenges
   * @name ChallengesControllerUpdateChallengeV1
   * @summary Update a challenge
   * @request PATCH:/api/v1/stages/{stageId}/challenges/{challengeId}
   * @secure
   * @response `200` `ChallengesControllerUpdateChallengeV1Data` Challenge updated successfully
   * @response `400` `ApiErrorResponseDto` Invalid request
   * @response `401` `ApiErrorResponseDto` Unauthorized - authentication required
   * @response `403` `ApiErrorResponseDto` Forbidden - not the stage owner
   * @response `404` `ApiErrorResponseDto` Challenge not found
   */
  export namespace ChallengesControllerUpdateChallengeV1 {
    export type RequestParams = {
      stageId: string;
      challengeId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = UpdateChallengeDto;
    export type RequestHeaders = {};
    export type ResponseBody = ChallengesControllerUpdateChallengeV1Data;
  }

  /**
   * @description Soft deletes a challenge by setting deletedAt timestamp. **Authorization:** User must be the stage owner.
   * @tags Challenges
   * @name ChallengesControllerDeleteChallengeV1
   * @summary Delete a challenge (soft delete)
   * @request DELETE:/api/v1/stages/{stageId}/challenges/{challengeId}
   * @secure
   * @response `204` `ChallengesControllerDeleteChallengeV1Data` Challenge deleted successfully
   * @response `401` `ApiErrorResponseDto` Unauthorized - authentication required
   * @response `403` `ApiErrorResponseDto` Forbidden - not the stage owner
   * @response `404` `ApiErrorResponseDto` Challenge not found
   */
  export namespace ChallengesControllerDeleteChallengeV1 {
    export type RequestParams = {
      stageId: string;
      challengeId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = ChallengesControllerDeleteChallengeV1Data;
  }

  /**
   * @description Joins a challenge and creates the check-in schedule based on the user's timezone. **Authorization:** User must have an active subscription to a pass linked to this challenge. **Timezone Handling:** - The `ianaTimezone` must be a valid IANA timezone name (e.g., 'America/New_York', 'Asia/Kolkata') - All check-in dates are calculated based on the user's local timezone - The challenge start date is interpreted in the user's local timezone **Check-in Generation:** - Check-ins are pre-generated for all expected dates when the user joins - Check-in numbers are assigned sequentially (1, 2, 3, ...) - Only days matching the challenge's `daysOfWeek` will have check-ins
   * @tags Challenges
   * @name ChallengesControllerJoinChallengeV1
   * @summary Join a challenge
   * @request POST:/api/v1/stages/{stageId}/challenges/{challengeId}/join
   * @secure
   * @response `201` `ChallengesControllerJoinChallengeV1Data` Successfully joined the challenge
   * @response `400` `ApiErrorResponseDto` Invalid request (already joined, invalid timezone)
   * @response `401` `ApiErrorResponseDto` Unauthorized - authentication required
   * @response `403` `ApiErrorResponseDto` Forbidden - no access to this challenge
   * @response `404` `ApiErrorResponseDto` Challenge not found
   */
  export namespace ChallengesControllerJoinChallengeV1 {
    export type RequestParams = {
      stageId: string;
      challengeId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = JoinChallengeDto;
    export type RequestHeaders = {};
    export type ResponseBody = ChallengesControllerJoinChallengeV1Data;
  }

  /**
   * @description Records a check-in for the current pending check-in. **Authorization:** User must be a participant of the challenge. **Check-in Window:** - Users can check in anytime within 24 hours of the expected check-in date - Only one pending check-in can be completed at a time - Check-ins are processed in order (check-in #1 must be done before #2) **Post Requirement:** - If `challenge.requiresPost` is true, a `postId` must be provided - The post must exist and be created by the user
   * @tags Challenges
   * @name ChallengesControllerCheckinV1
   * @summary Check in to a challenge
   * @request POST:/api/v1/stages/{stageId}/challenges/{challengeId}/checkin
   * @secure
   * @response `201` `ChallengesControllerCheckinV1Data` Check-in recorded successfully
   * @response `400` `ApiErrorResponseDto` Invalid request (not joined, no pending checkin, post required)
   * @response `401` `ApiErrorResponseDto` Unauthorized - authentication required
   * @response `404` `ApiErrorResponseDto` Challenge not found
   */
  export namespace ChallengesControllerCheckinV1 {
    export type RequestParams = {
      stageId: string;
      challengeId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = CheckinDto;
    export type RequestHeaders = {};
    export type ResponseBody = ChallengesControllerCheckinV1Data;
  }

  /**
   * @description Returns aggregated statistics for a challenge. **Authorization:** User must be the stage owner. **Statistics Include:** - Total number of participants - Total check-ins scheduled and completed - Completion rate by check-in number - Overall completion rate
   * @tags Challenges
   * @name ChallengesControllerGetChallengeStatsV1
   * @summary Get challenge statistics
   * @request GET:/api/v1/stages/{stageId}/challenges/{challengeId}/stats
   * @secure
   * @response `200` `ChallengesControllerGetChallengeStatsV1Data` Challenge stats retrieved successfully
   * @response `401` `ApiErrorResponseDto` Unauthorized - authentication required
   * @response `403` `ApiErrorResponseDto` Forbidden - not the stage owner
   * @response `404` `ApiErrorResponseDto` Challenge not found
   */
  export namespace ChallengesControllerGetChallengeStatsV1 {
    export type RequestParams = {
      stageId: string;
      challengeId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = ChallengesControllerGetChallengeStatsV1Data;
  }

  /**
   * @description Returns the current user's progress in a challenge. **Authorization:** User must be a participant of the challenge. **Status Include:** - Join date and timezone - All check-ins with their status (pending/completed) - Next expected check-in and whether the window is active - Overall progress percentage
   * @tags Challenges
   * @name ChallengesControllerGetMyStatusV1
   * @summary Get my challenge status
   * @request GET:/api/v1/stages/{stageId}/challenges/{challengeId}/my-status
   * @secure
   * @response `200` `ChallengesControllerGetMyStatusV1Data` Challenge status retrieved successfully
   * @response `400` `ApiErrorResponseDto` Not joined this challenge
   * @response `401` `ApiErrorResponseDto` Unauthorized - authentication required
   * @response `404` `ApiErrorResponseDto` Challenge not found
   */
  export namespace ChallengesControllerGetMyStatusV1 {
    export type RequestParams = {
      stageId: string;
      challengeId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = ChallengesControllerGetMyStatusV1Data;
  }

  /**
   * @description Creates an instructional post for a specific check-in day of a challenge. **Authorization:** User must be the stage owner. **Instructional Posts:** - Used by creators to provide instructions for specific check-in days - Multiple instructional posts can be created for the same check-in day - Posts are automatically pinned - Posts are only visible to users with access to the challenge's passes **Check-in Number:** - Must be between 1 and the total number of check-in days in the challenge - For always_on: max is `lengthInDays` - For fixed_dates: max is calculated based on selected days between start and end date
   * @tags Challenges
   * @name ChallengesControllerCreateInstructionalPostV1
   * @summary Create an instructional post for a challenge
   * @request POST:/api/v1/stages/{stageId}/challenges/{challengeId}/instructional-post
   * @secure
   * @response `201` `ChallengesControllerCreateInstructionalPostV1Data` Instructional post created successfully
   * @response `400` `ApiErrorResponseDto` Invalid request (invalid checkinNumber)
   * @response `401` `ApiErrorResponseDto` Unauthorized - authentication required
   * @response `403` `ApiErrorResponseDto` Forbidden - not the stage owner
   * @response `404` `ApiErrorResponseDto` Challenge not found
   */
  export namespace ChallengesControllerCreateInstructionalPostV1 {
    export type RequestParams = {
      stageId: string;
      challengeId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = CreateInstructionalPostDto;
    export type RequestHeaders = {};
    export type ResponseBody =
      ChallengesControllerCreateInstructionalPostV1Data;
  }

  /**
   * @description Retrieve the authenticated user profile information
   * @tags users
   * @name UsersControllerGetMeV1
   * @summary Get current user profile
   * @request GET:/api/v1/users/me
   * @secure
   * @response `200` `UsersControllerGetMeV1Data` User profile
   * @response `401` `ApiErrorResponseDto` Unauthorized
   */
  export namespace UsersControllerGetMeV1 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = UsersControllerGetMeV1Data;
  }

  /**
   * @description Update the authenticated user name and/or profile image
   * @tags users
   * @name UsersControllerUpdateMeV1
   * @summary Update current user profile
   * @request PATCH:/api/v1/users/me
   * @secure
   * @response `200` `UsersControllerUpdateMeV1Data` User updated
   * @response `400` `ApiErrorResponseDto` Validation error
   * @response `401` `ApiErrorResponseDto` Unauthorized
   */
  export namespace UsersControllerUpdateMeV1 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = UpdateUserDto;
    export type RequestHeaders = {};
    export type ResponseBody = UsersControllerUpdateMeV1Data;
  }

  /**
   * @description Soft delete the authenticated user account. This will anonymize user data and log out all sessions.
   * @tags users
   * @name UsersControllerDeleteMeV1
   * @summary Delete current user account
   * @request DELETE:/api/v1/users/me
   * @secure
   * @response `200` `UsersControllerDeleteMeV1Data` User deleted
   * @response `401` `ApiErrorResponseDto` Unauthorized
   */
  export namespace UsersControllerDeleteMeV1 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = UsersControllerDeleteMeV1Data;
  }
}

import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  HeadersDefaults,
  ResponseType,
} from "axios";
import axios from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams
  extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<
  FullRequestParams,
  "body" | "method" | "query" | "path"
>;

export interface ApiConfig<SecurityDataType = unknown>
  extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  JsonApi = "application/vnd.api+json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({
    securityWorker,
    secure,
    format,
    ...axiosConfig
  }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({
      ...axiosConfig,
      baseURL: axiosConfig.baseURL || "",
    });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(
    params1: AxiosRequestConfig,
    params2?: AxiosRequestConfig,
  ): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method &&
          this.instance.defaults.headers[
            method.toLowerCase() as keyof HeadersDefaults
          ]) ||
          {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === "object" && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    if (input instanceof FormData) {
      return input;
    }
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] =
        property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(
          key,
          isFileType ? formItem : this.stringifyFormItem(formItem),
        );
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (
      type === ContentType.FormData &&
      body &&
      body !== null &&
      typeof body === "object"
    ) {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (
      type === ContentType.Text &&
      body &&
      body !== null &&
      typeof body !== "string"
    ) {
      body = JSON.stringify(body);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type ? { "Content-Type": type } : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title Backstage Pass API
 * @version 1.0
 * @contact
 *
 * Creator stage platform API
 */
export class Api<SecurityDataType extends unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  ping = {
    /**
     * @description Check if the API is running
     *
     * @tags health
     * @name AppControllerPing
     * @summary Health check
     * @request GET:/ping
     * @response `200` `AppControllerPingData` API is healthy
     */
    appControllerPing: (params: RequestParams = {}) =>
      this.http.request<AppControllerPingData, any>({
        path: `/ping`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
  api = {
    /**
     * @description Retrieve a stage and its owner information by URL slug
     *
     * @tags stages
     * @name StagesControllerFindBySlugV1
     * @summary Get stage by slug
     * @request GET:/api/v1/stages/{slug}
     * @response `200` `StagesControllerFindBySlugV1Data` Stage found
     * @response `404` `ApiErrorResponseDto` Stage not found
     */
    stagesControllerFindBySlugV1: (
      { slug, ...query }: StagesControllerFindBySlugV1Params,
      params: RequestParams = {},
    ) =>
      this.http.request<
        StagesControllerFindBySlugV1Data,
        StagesControllerFindBySlugV1Error
      >({
        path: `/api/v1/stages/${slug}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Update a stage's name and/or description. Only stage owners can update stages.
     *
     * @tags stages
     * @name StagesControllerUpdateStageV1
     * @summary Update a stage
     * @request PATCH:/api/v1/stages/{stageId}
     * @secure
     * @response `200` `StagesControllerUpdateStageV1Data` Stage updated
     * @response `401` `ApiErrorResponseDto` Unauthorized - not authenticated
     * @response `403` `ApiErrorResponseDto` Forbidden - not stage owner
     * @response `404` `ApiErrorResponseDto` Stage not found
     */
    stagesControllerUpdateStageV1: (
      { stageId, ...query }: StagesControllerUpdateStageV1Params,
      data: UpdateStageDto,
      params: RequestParams = {},
    ) =>
      this.http.request<
        StagesControllerUpdateStageV1Data,
        StagesControllerUpdateStageV1Error
      >({
        path: `/api/v1/stages/${stageId}`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Retrieve details of a specific pass. Hidden passes are only accessible to stage owners.
     *
     * @tags passes
     * @name PassesControllerGetPassV1
     * @summary Get a pass by ID
     * @request GET:/api/v1/stages/{stageId}/passes/{passId}
     * @response `200` `PassesControllerGetPassV1Data` Pass found
     * @response `404` `ApiErrorResponseDto` Pass or stage not found
     */
    passesControllerGetPassV1: (
      { stageId, passId, ...query }: PassesControllerGetPassV1Params,
      params: RequestParams = {},
    ) =>
      this.http.request<
        PassesControllerGetPassV1Data,
        PassesControllerGetPassV1Error
      >({
        path: `/api/v1/stages/${stageId}/passes/${passId}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Update an existing pass. Only stage owners can update passes.
     *
     * @tags passes
     * @name PassesControllerUpdatePassV1
     * @summary Update a pass
     * @request PATCH:/api/v1/stages/{stageId}/passes/{passId}
     * @secure
     * @response `200` `PassesControllerUpdatePassV1Data` Pass updated
     * @response `400` `ApiErrorResponseDto` Invalid request or ground pass already exists
     * @response `401` `ApiErrorResponseDto` Unauthorized - not authenticated
     * @response `403` `ApiErrorResponseDto` Forbidden - not stage owner
     * @response `404` `ApiErrorResponseDto` Pass not found
     */
    passesControllerUpdatePassV1: (
      { passId, stageId, ...query }: PassesControllerUpdatePassV1Params,
      data: UpdatePassDto,
      params: RequestParams = {},
    ) =>
      this.http.request<
        PassesControllerUpdatePassV1Data,
        PassesControllerUpdatePassV1Error
      >({
        path: `/api/v1/stages/${stageId}/passes/${passId}`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Delete a pass from the stage. Only stage owners can delete passes. Ground passes cannot be deleted.
     *
     * @tags passes
     * @name PassesControllerDeletePassV1
     * @summary Delete a pass
     * @request DELETE:/api/v1/stages/{stageId}/passes/{passId}
     * @secure
     * @response `204` `PassesControllerDeletePassV1Data` Pass deleted
     * @response `400` `ApiErrorResponseDto` Bad request - cannot delete ground pass
     * @response `401` `ApiErrorResponseDto` Unauthorized - not authenticated
     * @response `403` `ApiErrorResponseDto` Forbidden - not stage owner
     * @response `404` `ApiErrorResponseDto` Pass not found
     */
    passesControllerDeletePassV1: (
      { passId, stageId, ...query }: PassesControllerDeletePassV1Params,
      params: RequestParams = {},
    ) =>
      this.http.request<
        PassesControllerDeletePassV1Data,
        PassesControllerDeletePassV1Error
      >({
        path: `/api/v1/stages/${stageId}/passes/${passId}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * @description Get passes available for a specific stage. Stage owners automatically see all passes (including hidden). Owners can use visibility filter to narrow results. Passes are ordered by rank (ascending).
     *
     * @tags passes
     * @name PassesControllerListPassesV1
     * @summary List passes for a stage
     * @request GET:/api/v1/stages/{stageId}/passes
     * @response `200` `PassesControllerListPassesV1Data` List of passes
     * @response `404` `ApiErrorResponseDto` Stage not found
     */
    passesControllerListPassesV1: (
      { stageId, ...query }: PassesControllerListPassesV1Params,
      params: RequestParams = {},
    ) =>
      this.http.request<
        PassesControllerListPassesV1Data,
        PassesControllerListPassesV1Error
      >({
        path: `/api/v1/stages/${stageId}/passes`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Create a new free pass for the stage. Only stage owners can create passes.
     *
     * @tags passes
     * @name PassesControllerCreatePassV1
     * @summary Create a pass
     * @request POST:/api/v1/stages/{stageId}/passes
     * @secure
     * @response `201` `PassesControllerCreatePassV1Data` Pass created
     * @response `400` `ApiErrorResponseDto` Invalid request or ground pass already exists
     * @response `401` `ApiErrorResponseDto` Unauthorized - not authenticated
     * @response `403` `ApiErrorResponseDto` Forbidden - not stage owner
     * @response `404` `ApiErrorResponseDto` Stage not found
     */
    passesControllerCreatePassV1: (
      { stageId, ...query }: PassesControllerCreatePassV1Params,
      data: CreatePassDto,
      params: RequestParams = {},
    ) =>
      this.http.request<
        PassesControllerCreatePassV1Data,
        PassesControllerCreatePassV1Error
      >({
        path: `/api/v1/stages/${stageId}/passes`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Reorder passes within a stage. The rank of each pass will be set to its position in the passIds array. Only stage owners can reorder passes.
     *
     * @tags passes
     * @name PassesControllerReorderPassesV1
     * @summary Reorder passes
     * @request POST:/api/v1/stages/{stageId}/passes/reorder
     * @secure
     * @response `204` `PassesControllerReorderPassesV1Data` Passes reordered successfully
     * @response `400` `ApiErrorResponseDto` Invalid request - pass IDs do not belong to this stage
     * @response `401` `ApiErrorResponseDto` Unauthorized - not authenticated
     * @response `403` `ApiErrorResponseDto` Forbidden - not stage owner
     * @response `404` `ApiErrorResponseDto` Stage not found
     */
    passesControllerReorderPassesV1: (
      { stageId, ...query }: PassesControllerReorderPassesV1Params,
      data: ReorderPassesDto,
      params: RequestParams = {},
    ) =>
      this.http.request<
        PassesControllerReorderPassesV1Data,
        PassesControllerReorderPassesV1Error
      >({
        path: `/api/v1/stages/${stageId}/passes/reorder`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Creates a new post on a stage. **Authorization:** - **Staff members** (owner, admin, moderator): Can post to any pass. - **Subscribers**: Can post to passes that have `allowSubscriberPosting` enabled, provided they have an active subscription to those passes. **Pass Assignment:** - **Staff members**: If `passIds` is not provided, the post is assigned to the ground pass. - **Subscribers**: Must provide `passIds`. All specified passes must have subscriber posting enabled and the user must be subscribed to them. **Assets:** - Maximum 20 assets per post. - Assets must be owned by the authenticated user. - Supported asset types: image, video, audio. **Scheduling:** - If `scheduledFor` is provided, it must be a future date. - Only staff members can schedule posts. - Immediate posts are published right away. **Text Limits:** - Maximum 3000 characters (similar to LinkedIn).
     *
     * @tags Posts
     * @name PostsControllerCreatePostV1
     * @summary Create a new post
     * @request POST:/api/v1/posts
     * @secure
     * @response `201` `PostsControllerCreatePostV1Data` Post created successfully
     * @response `400` `ApiErrorResponseDto` Invalid request (invalid passes, assets, or scheduledFor)
     * @response `401` `ApiErrorResponseDto` Unauthorized - authentication required
     * @response `403` `ApiErrorResponseDto` Forbidden - insufficient permissions or pass does not allow subscriber posting
     * @response `404` `ApiErrorResponseDto` Stage not found
     */
    postsControllerCreatePostV1: (
      data: CreatePostDto,
      params: RequestParams = {},
    ) =>
      this.http.request<
        PostsControllerCreatePostV1Data,
        PostsControllerCreatePostV1Error
      >({
        path: `/api/v1/posts`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Returns a paginated list of posts for a stage. **Public Access:** Non-authenticated users can view posts from free passes only. Authenticated users see posts from their subscribed passes. **Pagination:** Uses cursor-based pagination for infinite scrolling. Pass the `nextCursor` from the response as the `cursor` query parameter to get the next page. **Sorting:** Pinned posts always appear first (sorted by pin date), followed by regular posts sorted by publish date (newest first). **Filtering:** - `passIds`: Filter by specific passes (must be passes the user has access to) - `postedBy`: Filter by author - 'everyone', 'owner', or 'me' (requires auth) **Access Control:** Returns posts based on user's subscribed passes, or free passes for anonymous users.
     *
     * @tags Posts
     * @name PostsControllerListPostsV1
     * @summary List posts for a stage
     * @request GET:/api/v1/posts/{stageId}/posts
     * @response `200` `PostsControllerListPostsV1Data` Posts retrieved successfully
     * @response `404` `ApiErrorResponseDto` Stage not found
     */
    postsControllerListPostsV1: (
      { stageId, ...query }: PostsControllerListPostsV1Params,
      params: RequestParams = {},
    ) =>
      this.http.request<
        PostsControllerListPostsV1Data,
        PostsControllerListPostsV1Error
      >({
        path: `/api/v1/posts/${stageId}/posts`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Returns a post. **Public Access:** Non-authenticated users can view post from free passes only. Authenticated users see post from their subscribed passes.
     *
     * @tags Posts
     * @name PostsControllerGetPostV1
     * @summary Get details of a post
     * @request GET:/api/v1/posts/{postId}
     * @response `200` `PostsControllerGetPostV1Data` Post retrieved successfully
     * @response `404` `ApiErrorResponseDto` Post not found
     */
    postsControllerGetPostV1: (
      { postId, ...query }: PostsControllerGetPostV1Params,
      params: RequestParams = {},
    ) =>
      this.http.request<
        PostsControllerGetPostV1Data,
        PostsControllerGetPostV1Error
      >({
        path: `/api/v1/posts/${postId}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Updates the text content and/or pass assignments of a post. **Authorization:** Only the post author can update the post. **Pass Assignment:** - If `passIds` is provided, the post's passes will be updated. - Same validation rules as post creation apply: - **Staff members** (owner, admin, moderator): Can assign any pass on the stage. - **Subscribers**: Can only use passes with `allowSubscriberPosting` enabled that they are subscribed to. - If `passIds` is an empty array, defaults to the ground pass (free pass).
     *
     * @tags Posts
     * @name PostsControllerUpdatePostV1
     * @summary Update a post
     * @request PATCH:/api/v1/posts/{postId}
     * @secure
     * @response `200` `PostsControllerUpdatePostV1Data` Post updated successfully
     * @response `401` `ApiErrorResponseDto` Unauthorized - authentication required
     * @response `403` `ApiErrorResponseDto` Forbidden - only the post author can update, or invalid pass permissions
     * @response `404` `ApiErrorResponseDto` Post not found
     */
    postsControllerUpdatePostV1: (
      { postId, ...query }: PostsControllerUpdatePostV1Params,
      data: UpdatePostDto,
      params: RequestParams = {},
    ) =>
      this.http.request<
        PostsControllerUpdatePostV1Data,
        PostsControllerUpdatePostV1Error
      >({
        path: `/api/v1/posts/${postId}`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Soft deletes a post. **Authorization:** The post author or the stage owner can delete the post.
     *
     * @tags Posts
     * @name PostsControllerDeletePostV1
     * @summary Delete a post
     * @request DELETE:/api/v1/posts/{postId}
     * @secure
     * @response `204` `PostsControllerDeletePostV1Data` Post deleted successfully
     * @response `401` `ApiErrorResponseDto` Unauthorized - authentication required
     * @response `403` `ApiErrorResponseDto` Forbidden - only author or stage owner can delete
     * @response `404` `ApiErrorResponseDto` Post not found
     */
    postsControllerDeletePostV1: (
      { postId, ...query }: PostsControllerDeletePostV1Params,
      params: RequestParams = {},
    ) =>
      this.http.request<
        PostsControllerDeletePostV1Data,
        PostsControllerDeletePostV1Error
      >({
        path: `/api/v1/posts/${postId}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * @description Pins or unpins a post. If the post is currently pinned, it will be unpinned. If not pinned, it will be pinned. **Authorization:** Only stage staff (owner, admin, moderator) can pin/unpin posts.
     *
     * @tags Posts
     * @name PostsControllerTogglePinPostV1
     * @summary Toggle pin status of a post
     * @request POST:/api/v1/posts/{postId}/pin
     * @secure
     * @response `200` `PostsControllerTogglePinPostV1Data` Post pin status toggled successfully
     * @response `401` `ApiErrorResponseDto` Unauthorized - authentication required
     * @response `403` `ApiErrorResponseDto` Forbidden - only staff can pin/unpin posts
     * @response `404` `ApiErrorResponseDto` Post not found
     */
    postsControllerTogglePinPostV1: (
      { postId, ...query }: PostsControllerTogglePinPostV1Params,
      params: RequestParams = {},
    ) =>
      this.http.request<
        PostsControllerTogglePinPostV1Data,
        PostsControllerTogglePinPostV1Error
      >({
        path: `/api/v1/posts/${postId}/pin`,
        method: "POST",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Creates a new comment on a post. **Authorization:** - Post must have `commentsEnabled = true` - User must be either: - Stage owner/admin/moderator of the post's stage, OR - Subscriber to at least one pass linked to the post **Replies:** - If `parentId` is provided, this is a reply to another comment. - Only one level of replies is allowed (no reply to reply). **Text Limits:** - Maximum 1000 characters.
     *
     * @tags Comments
     * @name CommentsControllerCreateCommentV1
     * @summary Create a comment on a post
     * @request POST:/api/v1/posts/{postId}/comments
     * @secure
     * @response `201` `CommentsControllerCreateCommentV1Data` Comment created successfully
     * @response `400` `ApiErrorResponseDto` Invalid request (reply to reply, parent not found)
     * @response `401` `ApiErrorResponseDto` Unauthorized - authentication required
     * @response `403` `ApiErrorResponseDto` Forbidden - comments disabled or no access to post
     * @response `404` `ApiErrorResponseDto` Post not found
     */
    commentsControllerCreateCommentV1: (
      { postId, ...query }: CommentsControllerCreateCommentV1Params,
      data: CreateCommentDto,
      params: RequestParams = {},
    ) =>
      this.http.request<
        CommentsControllerCreateCommentV1Data,
        CommentsControllerCreateCommentV1Error
      >({
        path: `/api/v1/posts/${postId}/comments`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Returns a paginated list of top-level comments on a post. Replies are not included; use the replies endpoint to fetch them. **Access Control:** - Anonymous users: Can view comments on posts with free passes - Authenticated users: Can view comments on posts they have access to **Pagination:** Uses cursor-based pagination. Pass the `nextCursor` from the response as the `cursor` query parameter to get the next page. **Ordering:** Comments are sorted by creation date (newest first).
     *
     * @tags Comments
     * @name CommentsControllerListCommentsV1
     * @summary List comments on a post
     * @request GET:/api/v1/posts/{postId}/comments
     * @response `200` `CommentsControllerListCommentsV1Data` Comments retrieved successfully
     * @response `403` `ApiErrorResponseDto` Forbidden - no access to post
     * @response `404` `ApiErrorResponseDto` Post not found
     */
    commentsControllerListCommentsV1: (
      { postId, ...query }: CommentsControllerListCommentsV1Params,
      params: RequestParams = {},
    ) =>
      this.http.request<
        CommentsControllerListCommentsV1Data,
        CommentsControllerListCommentsV1Error
      >({
        path: `/api/v1/posts/${postId}/comments`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Deletes a comment (soft delete). **Authorization:** - Users can delete their own comments - Stage owner/admin/moderator can delete any comment on their stage **Note:** Replies to a deleted comment will still be visible but show "[deleted]" as the parent.
     *
     * @tags Comments
     * @name CommentsControllerDeleteCommentV1
     * @summary Delete a comment
     * @request DELETE:/api/v1/posts/{postId}/comments/{commentId}
     * @secure
     * @response `204` `CommentsControllerDeleteCommentV1Data` Comment deleted successfully
     * @response `401` `ApiErrorResponseDto` Unauthorized - authentication required
     * @response `403` `ApiErrorResponseDto` Forbidden - not authorized to delete this comment
     * @response `404` `ApiErrorResponseDto` Comment not found
     */
    commentsControllerDeleteCommentV1: (
      { postId, commentId, ...query }: CommentsControllerDeleteCommentV1Params,
      params: RequestParams = {},
    ) =>
      this.http.request<
        CommentsControllerDeleteCommentV1Data,
        CommentsControllerDeleteCommentV1Error
      >({
        path: `/api/v1/posts/${postId}/comments/${commentId}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * @description Toggles the like status on a comment. - If not liked, adds a like. - If already liked, removes the like. **Authorization:** User must have access to the post to like comments.
     *
     * @tags Comments
     * @name CommentsControllerToggleLikeV1
     * @summary Toggle like on a comment
     * @request POST:/api/v1/posts/{postId}/comments/{commentId}/like
     * @secure
     * @response `200` `CommentsControllerToggleLikeV1Data` Like toggled successfully
     * @response `401` `ApiErrorResponseDto` Unauthorized - authentication required
     * @response `403` `ApiErrorResponseDto` Forbidden - no access to post
     * @response `404` `ApiErrorResponseDto` Comment not found
     */
    commentsControllerToggleLikeV1: (
      { postId, commentId, ...query }: CommentsControllerToggleLikeV1Params,
      params: RequestParams = {},
    ) =>
      this.http.request<
        CommentsControllerToggleLikeV1Data,
        CommentsControllerToggleLikeV1Error
      >({
        path: `/api/v1/posts/${postId}/comments/${commentId}/like`,
        method: "POST",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Returns a paginated list of users who liked a comment. **Access Control:** Same as viewing the post. **Pagination:** Uses cursor-based pagination.
     *
     * @tags Comments
     * @name CommentsControllerListLikesV1
     * @summary List users who liked a comment
     * @request GET:/api/v1/posts/{postId}/comments/{commentId}/likes
     * @response `200` `CommentsControllerListLikesV1Data` Likes retrieved successfully
     * @response `403` `ApiErrorResponseDto` Forbidden - no access to post
     * @response `404` `ApiErrorResponseDto` Comment not found
     */
    commentsControllerListLikesV1: (
      { postId, commentId, ...query }: CommentsControllerListLikesV1Params,
      params: RequestParams = {},
    ) =>
      this.http.request<
        CommentsControllerListLikesV1Data,
        CommentsControllerListLikesV1Error
      >({
        path: `/api/v1/posts/${postId}/comments/${commentId}/likes`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Returns a paginated list of replies to a specific comment. **Access Control:** Same as viewing the post. **Pagination:** Uses cursor-based pagination.
     *
     * @tags Comments
     * @name CommentsControllerListRepliesV1
     * @summary List replies to a comment
     * @request GET:/api/v1/posts/{postId}/comments/{commentId}/replies
     * @response `200` `CommentsControllerListRepliesV1Data` Replies retrieved successfully
     * @response `403` `ApiErrorResponseDto` Forbidden - no access to post
     * @response `404` `ApiErrorResponseDto` Comment not found
     */
    commentsControllerListRepliesV1: (
      { postId, commentId, ...query }: CommentsControllerListRepliesV1Params,
      params: RequestParams = {},
    ) =>
      this.http.request<
        CommentsControllerListRepliesV1Data,
        CommentsControllerListRepliesV1Error
      >({
        path: `/api/v1/posts/${postId}/comments/${commentId}/replies`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Creates or updates a reaction on a post. **Authorization:** - User must be either: - Stage owner/admin/moderator of the post's stage, OR - Subscriber to at least one pass linked to the post **Allowed Emojis:** - 👍, ❤️, 😂, 😮, 😢, 😡 **Behavior:** - If user has no existing reaction, creates a new one. - If user already reacted, updates to the new emoji. - Only one reaction per user per post is allowed.
     *
     * @tags Reactions
     * @name ReactionsControllerCreateReactionV1
     * @summary React to a post
     * @request POST:/api/v1/posts/{postId}/reactions
     * @secure
     * @response `201` `ReactionsControllerCreateReactionV1Data` Reaction created/updated successfully
     * @response `400` `ApiErrorResponseDto` Invalid reaction type
     * @response `401` `ApiErrorResponseDto` Unauthorized - authentication required
     * @response `403` `ApiErrorResponseDto` Forbidden - no access to react to this post
     * @response `404` `ApiErrorResponseDto` Post not found
     */
    reactionsControllerCreateReactionV1: (
      { postId, ...query }: ReactionsControllerCreateReactionV1Params,
      data: CreateReactionDto,
      params: RequestParams = {},
    ) =>
      this.http.request<
        ReactionsControllerCreateReactionV1Data,
        ReactionsControllerCreateReactionV1Error
      >({
        path: `/api/v1/posts/${postId}/reactions`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Removes the user's reaction from a post. **Authorization:** User must own the reaction.
     *
     * @tags Reactions
     * @name ReactionsControllerDeleteReactionV1
     * @summary Remove reaction from a post
     * @request DELETE:/api/v1/posts/{postId}/reactions
     * @secure
     * @response `200` `ReactionsControllerDeleteReactionV1Data` Reaction removed successfully
     * @response `401` `ApiErrorResponseDto` Unauthorized - authentication required
     * @response `404` `ApiErrorResponseDto` Reaction not found or post not found
     */
    reactionsControllerDeleteReactionV1: (
      { postId, ...query }: ReactionsControllerDeleteReactionV1Params,
      params: RequestParams = {},
    ) =>
      this.http.request<
        ReactionsControllerDeleteReactionV1Data,
        ReactionsControllerDeleteReactionV1Error
      >({
        path: `/api/v1/posts/${postId}/reactions`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Returns a paginated list of reactions on a post. **Access:** Public - anyone can view reactions. **Pagination:** Uses cursor-based pagination. Pass the `nextCursor` from the response as the `cursor` query parameter to get the next page. **Filtering:** Optionally filter by emoji. **Ordering:** Reactions are sorted by creation date (newest first).
     *
     * @tags Reactions
     * @name ReactionsControllerListReactionsV1
     * @summary List reactions on a post
     * @request GET:/api/v1/posts/{postId}/reactions
     * @response `200` `ReactionsControllerListReactionsV1Data` Reactions retrieved successfully
     * @response `404` `ApiErrorResponseDto` Post not found
     */
    reactionsControllerListReactionsV1: (
      { postId, ...query }: ReactionsControllerListReactionsV1Params,
      params: RequestParams = {},
    ) =>
      this.http.request<
        ReactionsControllerListReactionsV1Data,
        ReactionsControllerListReactionsV1Error
      >({
        path: `/api/v1/posts/${postId}/reactions`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Subscribe to a pass. Free passes create subscription immediately. Paid passes return redirect URL for Stripe payment.
     *
     * @tags subscriptions
     * @name SubscriptionsControllerJoinPassV1
     * @summary Join a pass
     * @request POST:/api/v1/passes/{passId}/join
     * @secure
     * @response `200` `SubscriptionsControllerJoinPassV1Data` Join result - subscription created (type: subscription) or redirect URL for payment (type: redirect)
     * @response `400` `ApiErrorResponseDto` Paid pass without payment link configured
     * @response `401` `ApiErrorResponseDto` Unauthorized - not authenticated
     * @response `404` `ApiErrorResponseDto` Pass not found
     * @response `409` `ApiErrorResponseDto` Already subscribed to this pass
     */
    subscriptionsControllerJoinPassV1: (
      { passId, ...query }: SubscriptionsControllerJoinPassV1Params,
      params: RequestParams = {},
    ) =>
      this.http.request<
        SubscriptionsControllerJoinPassV1Data,
        SubscriptionsControllerJoinPassV1Error
      >({
        path: `/api/v1/passes/${passId}/join`,
        method: "POST",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Returns a paginated list of distinct members with active subscriptions to this pass. **Authorization:** - Only the stage owner can access this endpoint. **Features:** - Search by member name or email using the `search` query parameter. - Cursor-based pagination for efficient large data sets. - Returns earliest subscription date as `joinedAt`. **Response:** - Includes member info (id, name, email, image, joinedAt). - Sorted by join date (newest first).
     *
     * @tags subscriptions
     * @name SubscriptionsControllerListPassMembersV1
     * @summary List pass members
     * @request GET:/api/v1/passes/{passId}/members
     * @secure
     * @response `200` `SubscriptionsControllerListPassMembersV1Data` Members retrieved successfully
     * @response `401` `ApiErrorResponseDto` Unauthorized - authentication required
     * @response `403` `ApiErrorResponseDto` Forbidden - not stage owner
     * @response `404` `ApiErrorResponseDto` Pass not found
     */
    subscriptionsControllerListPassMembersV1: (
      { passId, ...query }: SubscriptionsControllerListPassMembersV1Params,
      params: RequestParams = {},
    ) =>
      this.http.request<
        SubscriptionsControllerListPassMembersV1Data,
        SubscriptionsControllerListPassMembersV1Error
      >({
        path: `/api/v1/passes/${passId}/members`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Exports all members with active subscriptions to this pass as a CSV file. **Authorization:** - Only the stage owner can access this endpoint. **Features:** - Streams data in batches for memory efficiency. - Supports search filter (name or email). - Returns a downloadable CSV file. **CSV Columns:** - Member ID, Name, Email, Joined At
     *
     * @tags subscriptions
     * @name SubscriptionsControllerExportPassMembersCsvV1
     * @summary Export pass members as CSV
     * @request GET:/api/v1/passes/{passId}/members/csv
     * @secure
     * @response `200` `SubscriptionsControllerExportPassMembersCsvV1Data` CSV file download
     * @response `401` `ApiErrorResponseDto` Unauthorized - authentication required
     * @response `403` `ApiErrorResponseDto` Forbidden - not stage owner
     * @response `404` `ApiErrorResponseDto` Pass not found
     */
    subscriptionsControllerExportPassMembersCsvV1: (
      { passId, ...query }: SubscriptionsControllerExportPassMembersCsvV1Params,
      params: RequestParams = {},
    ) =>
      this.http.request<
        SubscriptionsControllerExportPassMembersCsvV1Data,
        SubscriptionsControllerExportPassMembersCsvV1Error
      >({
        path: `/api/v1/passes/${passId}/members/csv`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags OTA
     * @name OtaControllerUploadZipV1
     * @summary Upload OTA update bundle
     * @request POST:/api/v1/ota/upload
     * @response `201` `OtaControllerUploadZipV1Data`
     */
    otaControllerUploadZipV1: (
      query: OtaControllerUploadZipV1Params,
      params: RequestParams = {},
    ) =>
      this.http.request<OtaControllerUploadZipV1Data, any>({
        path: `/api/v1/ota/upload`,
        method: "POST",
        query: query,
        ...params,
      }),

    /**
     * No description
     *
     * @tags OTA
     * @name OtaControllerGetManifestV1
     * @summary Get OTA manifest for Expo client
     * @request GET:/api/v1/ota/manifest
     * @response `200` `OtaControllerGetManifestV1Data`
     */
    otaControllerGetManifestV1: (
      query: OtaControllerGetManifestV1Params,
      params: RequestParams = {},
    ) =>
      this.http.request<OtaControllerGetManifestV1Data, any>({
        path: `/api/v1/ota/manifest`,
        method: "GET",
        query: query,
        ...params,
      }),

    /**
     * No description
     *
     * @tags OTA
     * @name OtaControllerGetAssetV1
     * @summary Get OTA asset file
     * @request GET:/api/v1/ota/assets
     * @response `200` `OtaControllerGetAssetV1Data`
     */
    otaControllerGetAssetV1: (
      query: OtaControllerGetAssetV1Params,
      params: RequestParams = {},
    ) =>
      this.http.request<OtaControllerGetAssetV1Data, any>({
        path: `/api/v1/ota/assets`,
        method: "GET",
        query: query,
        ...params,
      }),

    /**
     * No description
     *
     * @tags OTA
     * @name OtaControllerListUpdatesV1
     * @summary List all OTA updates
     * @request GET:/api/v1/ota
     * @response `200` `OtaControllerListUpdatesV1Data`
     */
    otaControllerListUpdatesV1: (params: RequestParams = {}) =>
      this.http.request<OtaControllerListUpdatesV1Data, any>({
        path: `/api/v1/ota`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags OTA
     * @name OtaControllerUpdateTypeV1
     * @summary Get update type by updateId
     * @request GET:/api/v1/ota/update-type
     * @response `200` `OtaControllerUpdateTypeV1Data`
     */
    otaControllerUpdateTypeV1: (
      query: OtaControllerUpdateTypeV1Params,
      params: RequestParams = {},
    ) =>
      this.http.request<OtaControllerUpdateTypeV1Data, any>({
        path: `/api/v1/ota/update-type`,
        method: "GET",
        query: query,
        ...params,
      }),

    /**
     * No description
     *
     * @tags OTA
     * @name OtaControllerGetUpdateV1
     * @summary Get specific OTA update
     * @request GET:/api/v1/ota/{id}
     * @response `200` `OtaControllerGetUpdateV1Data`
     */
    otaControllerGetUpdateV1: (
      { id, ...query }: OtaControllerGetUpdateV1Params,
      params: RequestParams = {},
    ) =>
      this.http.request<OtaControllerGetUpdateV1Data, any>({
        path: `/api/v1/ota/${id}`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags OTA
     * @name OtaControllerDeleteUpdateV1
     * @summary Delete OTA update
     * @request DELETE:/api/v1/ota/{id}
     * @response `200` `OtaControllerDeleteUpdateV1Data`
     */
    otaControllerDeleteUpdateV1: (
      { id, ...query }: OtaControllerDeleteUpdateV1Params,
      params: RequestParams = {},
    ) =>
      this.http.request<OtaControllerDeleteUpdateV1Data, any>({
        path: `/api/v1/ota/${id}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * @description Creates a new scheduled video call for a stage. **Authorization:** User must be the stage owner. **Pass Assignment:** - If `passIds` is not provided or empty, the call is assigned to the stage's ground pass (free pass). - If `passIds` is provided, all passes must belong to the specified stage. **Scheduling:** - `scheduledStartAt` must be in the future. - `scheduledEndAt` must be after `scheduledStartAt`. - A Zoom meeting will be created 15 minutes before the scheduled start time. **Zoom Integration:** - License is allocated 15 minutes before start. - License is released 15 minutes after end. - Join URL becomes available when call is live or 5 minutes before start.
     *
     * @tags Video Calls
     * @name VideoCallsControllerCreateVideoCallV1
     * @summary Create a new video call
     * @request POST:/api/v1/stages/{stageId}/video-calls
     * @secure
     * @response `201` `VideoCallsControllerCreateVideoCallV1Data` Video call created successfully
     * @response `400` `ApiErrorResponseDto` Invalid request (invalid passes or schedule times)
     * @response `401` `ApiErrorResponseDto` Unauthorized - authentication required
     * @response `403` `ApiErrorResponseDto` Forbidden - not the stage owner
     * @response `404` `ApiErrorResponseDto` Stage not found
     */
    videoCallsControllerCreateVideoCallV1: (
      { stageId, ...query }: VideoCallsControllerCreateVideoCallV1Params,
      data: CreateVideoCallDto,
      params: RequestParams = {},
    ) =>
      this.http.request<
        VideoCallsControllerCreateVideoCallV1Data,
        VideoCallsControllerCreateVideoCallV1Error
      >({
        path: `/api/v1/stages/${stageId}/video-calls`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Returns a paginated list of video calls for a stage. **Access Control:** Authentication is required. Stage owners see all calls. Other users only see calls from their subscribed passes. **Pagination:** Uses cursor-based pagination. Pass the `nextCursor` from the response as the `cursor` query parameter to get the next page. **Sorting:** Calls are sorted by scheduled start time (newest first). **Filtering:** - `status`: Filter by call status (scheduled, live, ended, cancelled) - `filter`: Filter by time - 'upcoming' (scheduled + live) or 'past' (ended + cancelled) - `passIds`: Filter by specific passes
     *
     * @tags Video Calls
     * @name VideoCallsControllerListVideoCallsV1
     * @summary List video calls for a stage
     * @request GET:/api/v1/stages/{stageId}/video-calls
     * @secure
     * @response `200` `VideoCallsControllerListVideoCallsV1Data` Video calls retrieved successfully
     * @response `404` `ApiErrorResponseDto` Stage not found
     */
    videoCallsControllerListVideoCallsV1: (
      { stageId, ...query }: VideoCallsControllerListVideoCallsV1Params,
      params: RequestParams = {},
    ) =>
      this.http.request<
        VideoCallsControllerListVideoCallsV1Data,
        VideoCallsControllerListVideoCallsV1Error
      >({
        path: `/api/v1/stages/${stageId}/video-calls`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Returns aggregated statistics for video calls within a date range. **Authorization:** User must be the stage owner. **Query Parameters:** - `startDate`: Start of the date range (ISO 8601 format) - `endDate`: End of the date range (ISO 8601 format) **Response:** - `totalCalls`: Count of ended/live video calls in the range - `totalUniqueAttendees`: Distinct count of users who attended any call
     *
     * @tags Video Calls
     * @name VideoCallsControllerGetVideoCallStatsV1
     * @summary Get video call statistics for a stage
     * @request GET:/api/v1/stages/{stageId}/video-calls/stats
     * @secure
     * @response `200` `VideoCallsControllerGetVideoCallStatsV1Data` Statistics retrieved successfully
     * @response `400` `ApiErrorResponseDto` Invalid date range
     * @response `401` `ApiErrorResponseDto` Unauthorized - authentication required
     * @response `403` `ApiErrorResponseDto` Forbidden - not the stage owner
     * @response `404` `ApiErrorResponseDto` Stage not found
     */
    videoCallsControllerGetVideoCallStatsV1: (
      { stageId, ...query }: VideoCallsControllerGetVideoCallStatsV1Params,
      params: RequestParams = {},
    ) =>
      this.http.request<
        VideoCallsControllerGetVideoCallStatsV1Data,
        VideoCallsControllerGetVideoCallStatsV1Error
      >({
        path: `/api/v1/stages/${stageId}/video-calls/stats`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Get a unique join URL for a video call. **Authorization:** User must have access to the video call through: - Being a stage owner/admin/moderator (joins as host) - Having a subscription to one of the call's passes (joins as participant) - The call having a free pass (joins as participant) **Join Window:** - Call must be 'live' OR 'scheduled' and within 5 minutes of start time. - Call must have a Zoom meeting configured. **Response:** - `isHost: true` - User receives the Zoom start URL (can host/manage meeting) - `isHost: false` - User receives a unique registrant join URL **Note:** Each participant gets a unique join URL that is persisted for future use.
     *
     * @tags Video Calls
     * @name VideoCallsControllerJoinVideoCallV1
     * @summary Join a video call
     * @request POST:/api/v1/stages/{stageId}/video-calls/{callId}/join
     * @secure
     * @response `200` `VideoCallsControllerJoinVideoCallV1Data` Join URL retrieved successfully
     * @response `400` `ApiErrorResponseDto` Video call not ready or registration failed
     * @response `401` `ApiErrorResponseDto` Unauthorized - authentication required
     * @response `403` `ApiErrorResponseDto` Forbidden - no access to this call or not yet joinable
     * @response `404` `ApiErrorResponseDto` Video call not found
     */
    videoCallsControllerJoinVideoCallV1: (
      { stageId, callId, ...query }: VideoCallsControllerJoinVideoCallV1Params,
      params: RequestParams = {},
    ) =>
      this.http.request<
        VideoCallsControllerJoinVideoCallV1Data,
        VideoCallsControllerJoinVideoCallV1Error
      >({
        path: `/api/v1/stages/${stageId}/video-calls/${callId}/join`,
        method: "POST",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Returns a paginated list of members for a video call with filtering options. **Authorization:** User must be the stage owner. **Query Parameters:** - `mode`: Filter mode - `all`: All subscribers of the call's passes (potential attendees) - `attended`: Only users who actually attended (attended=true) - `missed`: Subscribers who did not attend - `search`: Search by name or email (case-insensitive, partial match) - `limit`: Number of results per page (1-100, default 20) - `cursor`: Pagination cursor from previous response **Response:** Returns members with their attendance status and pagination info.
     *
     * @tags Video Calls
     * @name VideoCallsControllerGetVideoCallMembersV1
     * @summary Get members for a video call
     * @request GET:/api/v1/stages/{stageId}/video-calls/{callId}/members
     * @secure
     * @response `200` `VideoCallsControllerGetVideoCallMembersV1Data` Members retrieved successfully
     * @response `401` `ApiErrorResponseDto` Unauthorized - authentication required
     * @response `403` `ApiErrorResponseDto` Forbidden - not the stage owner
     * @response `404` `ApiErrorResponseDto` Video call not found
     */
    videoCallsControllerGetVideoCallMembersV1: (
      {
        callId,
        stageId,
        ...query
      }: VideoCallsControllerGetVideoCallMembersV1Params,
      params: RequestParams = {},
    ) =>
      this.http.request<
        VideoCallsControllerGetVideoCallMembersV1Data,
        VideoCallsControllerGetVideoCallMembersV1Error
      >({
        path: `/api/v1/stages/${stageId}/video-calls/${callId}/members`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Downloads a CSV file containing all members for a video call. **Authorization:** User must be the stage owner. **Query Parameters:** - `mode`: Filter mode - `all`: All subscribers of the call's passes (potential attendees) - `attended`: Only users who actually attended (attended=true) - `missed`: Subscribers who did not attend - `search`: Search by name or email (case-insensitive, partial match) **CSV Columns:** - Name - Email - Attended (Yes/No) - Joined At (ISO timestamp)
     *
     * @tags Video Calls
     * @name VideoCallsControllerExportVideoCallMembersV1
     * @summary Export members as CSV
     * @request GET:/api/v1/stages/{stageId}/video-calls/{callId}/members/export
     * @secure
     * @response `200` `VideoCallsControllerExportVideoCallMembersV1Data` CSV file download
     * @response `401` `ApiErrorResponseDto` Unauthorized - authentication required
     * @response `403` `ApiErrorResponseDto` Forbidden - not the stage owner
     * @response `404` `ApiErrorResponseDto` Video call not found
     */
    videoCallsControllerExportVideoCallMembersV1: (
      {
        callId,
        stageId,
        ...query
      }: VideoCallsControllerExportVideoCallMembersV1Params,
      params: RequestParams = {},
    ) =>
      this.http.request<
        VideoCallsControllerExportVideoCallMembersV1Data,
        VideoCallsControllerExportVideoCallMembersV1Error
      >({
        path: `/api/v1/stages/${stageId}/video-calls/${callId}/members/export`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * @description Returns details of a specific video call. **Access Control:** Authentication is required. Only stage owners and users subscribed to the call's passes can view the call. **Join URL:** The Zoom join URL is only included when: - The call status is 'live', OR - The call is 'scheduled' and within 5 minutes of the start time
     *
     * @tags Video Calls
     * @name VideoCallsControllerGetVideoCallV1
     * @summary Get details of a video call
     * @request GET:/api/v1/stages/{stageId}/video-calls/{callId}
     * @secure
     * @response `200` `VideoCallsControllerGetVideoCallV1Data` Video call retrieved successfully
     * @response `403` `ApiErrorResponseDto` Forbidden - no access to this call
     * @response `404` `ApiErrorResponseDto` Video call not found
     */
    videoCallsControllerGetVideoCallV1: (
      { stageId, callId, ...query }: VideoCallsControllerGetVideoCallV1Params,
      params: RequestParams = {},
    ) =>
      this.http.request<
        VideoCallsControllerGetVideoCallV1Data,
        VideoCallsControllerGetVideoCallV1Error
      >({
        path: `/api/v1/stages/${stageId}/video-calls/${callId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Updates an existing video call. **Authorization:** User must be the stage owner. **Restrictions:** - Cannot update calls that have ended or been cancelled. - If schedule times are changed, jobs are rescheduled accordingly. - If `passIds` is provided, it replaces the existing passes. **Note:** Updating schedule times will reschedule the Zoom license allocation.
     *
     * @tags Video Calls
     * @name VideoCallsControllerUpdateVideoCallV1
     * @summary Update a video call
     * @request PATCH:/api/v1/stages/{stageId}/video-calls/{callId}
     * @secure
     * @response `200` `VideoCallsControllerUpdateVideoCallV1Data` Video call updated successfully
     * @response `400` `ApiErrorResponseDto` Invalid request (invalid passes, schedule times, or call already ended)
     * @response `401` `ApiErrorResponseDto` Unauthorized - authentication required
     * @response `403` `ApiErrorResponseDto` Forbidden - not the stage owner
     * @response `404` `ApiErrorResponseDto` Video call not found
     */
    videoCallsControllerUpdateVideoCallV1: (
      {
        stageId,
        callId,
        ...query
      }: VideoCallsControllerUpdateVideoCallV1Params,
      data: UpdateVideoCallDto,
      params: RequestParams = {},
    ) =>
      this.http.request<
        VideoCallsControllerUpdateVideoCallV1Data,
        VideoCallsControllerUpdateVideoCallV1Error
      >({
        path: `/api/v1/stages/${stageId}/video-calls/${callId}`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Cancels (soft deletes) a video call. **Authorization:** User must be the stage owner. **Side Effects:** - Call status is set to 'cancelled'. - All scheduled jobs are removed. - If a Zoom license was allocated, it is released. - The Zoom meeting is ended/deleted if it was created.
     *
     * @tags Video Calls
     * @name VideoCallsControllerDeleteVideoCallV1
     * @summary Cancel a video call
     * @request DELETE:/api/v1/stages/{stageId}/video-calls/{callId}
     * @secure
     * @response `204` `VideoCallsControllerDeleteVideoCallV1Data` Video call cancelled successfully
     * @response `401` `ApiErrorResponseDto` Unauthorized - authentication required
     * @response `403` `ApiErrorResponseDto` Forbidden - not the stage owner
     * @response `404` `ApiErrorResponseDto` Video call not found
     */
    videoCallsControllerDeleteVideoCallV1: (
      {
        callId,
        stageId,
        ...query
      }: VideoCallsControllerDeleteVideoCallV1Params,
      params: RequestParams = {},
    ) =>
      this.http.request<
        VideoCallsControllerDeleteVideoCallV1Data,
        VideoCallsControllerDeleteVideoCallV1Error
      >({
        path: `/api/v1/stages/${stageId}/video-calls/${callId}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * @description Unified endpoint for uploading assets. Purpose is required. **Purpose:** - `dp`: User profile picture (images only) - `cover`: User cover/banner image (images only) - `post`: Stage post asset (requires `stageId`) **Video uploads are only allowed for purpose=post.** **Authorization for post uploads:** - **Staff members** (owner, admin, moderator): Can always upload - **Subscribers**: Auto-checked for any active subscription with subscriber posting enabled **Storage Paths:** - dp/cover: users/{userId}/{purpose}/{assetType}/{timestamp}_{filename} - post: stages/{stageId}/{userId}/{assetType}/{timestamp}_{filename} **Image Processing:** - Allowed image formats: JPEG, PNG, HEIC/HEIF only - HEIC/HEIF images are automatically converted to JPEG for browser compatibility - Other images (JPEG, PNG) are compressed to WebP format - Default quality: dp=60, cover=70, post=85 **Video Transcoding:** - Videos uploaded with purpose=post are automatically transcoded via Mux - The `transcoderConfig` field tracks transcoding status **Supported MIME Types:** - Image: JPEG, PNG, HEIC/HEIF (HEIC converted to JPEG, others compressed to WebP) - Video: MP4, QuickTime, WebM (only for purpose=post) - Audio: MP3, WAV, OGG, AAC (only for purpose=post)
     *
     * @tags Assets
     * @name AssetsControllerUploadV1
     * @summary Upload asset
     * @request POST:/api/v1/assets/upload
     * @secure
     * @response `201` `AssetsControllerUploadV1Data` Asset uploaded successfully
     * @response `400` `ApiErrorResponseDto` Invalid file type, size, purpose, or missing required parameters
     * @response `401` `ApiErrorResponseDto` Unauthorized
     * @response `403` `ApiErrorResponseDto` Forbidden - insufficient permissions for stage upload or subscriber posting not allowed
     * @response `404` `ApiErrorResponseDto` Stage not found (for post purpose)
     */
    assetsControllerUploadV1: (
      query: AssetsControllerUploadV1Params,
      data: {
        /**
         * The file to upload
         * @format binary
         */
        file: File;
        /** Duration in seconds (for video/audio) */
        durationInSeconds?: number;
      },
      params: RequestParams = {},
    ) =>
      this.http.request<
        AssetsControllerUploadV1Data,
        AssetsControllerUploadV1Error
      >({
        path: `/api/v1/assets/upload`,
        method: "POST",
        query: query,
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: "json",
        ...params,
      }),

    /**
     * @description Returns a paginated list of orders for a stage. **Authorization:** - Only the stage owner can access this endpoint. **Features:** - Search by subscriber name or email using the `search` query parameter. - Filter by date range using `startDate` and `endDate` (ISO 8601 format). - Cursor-based pagination for efficient large data sets. **Response:** - Includes joined subscriber (user) and pass information. - Sorted by creation date (newest first).
     *
     * @tags Orders
     * @name OrdersControllerListOrdersV1
     * @summary List orders for a stage
     * @request GET:/api/v1/stages/{stageId}/orders
     * @secure
     * @response `200` `OrdersControllerListOrdersV1Data` Orders retrieved successfully
     * @response `401` `ApiErrorResponseDto` Unauthorized - authentication required
     * @response `403` `ApiErrorResponseDto` Forbidden - not stage owner
     * @response `404` `ApiErrorResponseDto` Stage not found
     */
    ordersControllerListOrdersV1: (
      { stageId, ...query }: OrdersControllerListOrdersV1Params,
      params: RequestParams = {},
    ) =>
      this.http.request<
        OrdersControllerListOrdersV1Data,
        OrdersControllerListOrdersV1Error
      >({
        path: `/api/v1/stages/${stageId}/orders`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Returns consolidated order statistics for a stage. **Authorization:** - Only the stage owner can access this endpoint. **Statistics:** - Count of completed orders. - Total collected amount in USD cents. **Filtering:** - Filter by date range using `startDate` and `endDate` (ISO 8601 format). - Only completed orders are included in the statistics.
     *
     * @tags Orders
     * @name OrdersControllerGetOrderStatsV1
     * @summary Get order statistics for a stage
     * @request GET:/api/v1/stages/{stageId}/orders/stats
     * @secure
     * @response `200` `OrdersControllerGetOrderStatsV1Data` Order statistics retrieved successfully
     * @response `401` `ApiErrorResponseDto` Unauthorized - authentication required
     * @response `403` `ApiErrorResponseDto` Forbidden - not stage owner
     * @response `404` `ApiErrorResponseDto` Stage not found
     */
    ordersControllerGetOrderStatsV1: (
      { stageId, ...query }: OrdersControllerGetOrderStatsV1Params,
      params: RequestParams = {},
    ) =>
      this.http.request<
        OrdersControllerGetOrderStatsV1Data,
        OrdersControllerGetOrderStatsV1Error
      >({
        path: `/api/v1/stages/${stageId}/orders/stats`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Exports all orders for a stage as a CSV file. **Authorization:** - Only the stage owner can access this endpoint. **Features:** - Streams data in batches for memory efficiency. - Supports all the same filters as the list endpoint (search, date range, passIds, status). - Returns a downloadable CSV file. **CSV Columns:** - Order ID, Subscriber ID, Subscriber Name, Subscriber Email - Pass ID, Pass Name, Pass Type - Amount (USD), Amount (INR), Status - Created At, Completed At
     *
     * @tags Orders
     * @name OrdersControllerExportOrdersCsvV1
     * @summary Export orders as CSV
     * @request GET:/api/v1/stages/{stageId}/orders/csv
     * @secure
     * @response `200` `OrdersControllerExportOrdersCsvV1Data` CSV file download
     * @response `401` `ApiErrorResponseDto` Unauthorized - authentication required
     * @response `403` `ApiErrorResponseDto` Forbidden - not stage owner
     * @response `404` `ApiErrorResponseDto` Stage not found
     */
    ordersControllerExportOrdersCsvV1: (
      { stageId, ...query }: OrdersControllerExportOrdersCsvV1Params,
      params: RequestParams = {},
    ) =>
      this.http.request<
        OrdersControllerExportOrdersCsvV1Data,
        OrdersControllerExportOrdersCsvV1Error
      >({
        path: `/api/v1/stages/${stageId}/orders/csv`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
 * @description Records an analytics event with rate limiting and deduplication. **Supported Event Types:** - `page_view`: Backstage page view - `post_view`: Post view (future) - `video_start`: Video playback started (future) **Rate Limits:** - Anonymous: 10 requests per minute per IP per stageId - Authenticated: 30 requests per minute per user per stageId **Deduplication:** - Same IP/user can only register one view per 5-minute window
 *
 * @tags analytics
 * @name AnalyticsControllerCaptureEventV1
 * @summary Capture an analytics event
 * @request POST:/api/v1/analytics/capture/{eventType}
 * @response `200` `AnalyticsControllerCaptureEventV1Data` Event already recorded (deduplicated)
 * @response `201` `({
  \**
   * Human-readable message based on HTTP status code
   * @example "Successful"
   *\
    message: string,
    result: CaptureEventResponseDto,

})` Event recorded successfully
 * @response `400` `ApiErrorResponseDto` Invalid event type or missing required fields
 * @response `404` `ApiErrorResponseDto` Stage not found
 * @response `429` `ApiErrorResponseDto` Rate limit exceeded
 */
    analyticsControllerCaptureEventV1: (
      { eventType, ...query }: AnalyticsControllerCaptureEventV1Params,
      data: CaptureEventDto,
      params: RequestParams = {},
    ) =>
      this.http.request<
        AnalyticsControllerCaptureEventV1Data,
        AnalyticsControllerCaptureEventV1Error
      >({
        path: `/api/v1/analytics/capture/${eventType}`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Returns the total count of page views for a stage within a date range. Results are cached for 5 minutes to reduce database pressure.
     *
     * @tags analytics
     * @name AnalyticsControllerGetPageViewCountV1
     * @summary Get page view count for a stage
     * @request GET:/api/v1/analytics/stages/{stageId}/page-views
     * @secure
     * @response `200` `AnalyticsControllerGetPageViewCountV1Data` Page view count retrieved successfully
     * @response `401` `ApiErrorResponseDto` Unauthorized - not logged in
     * @response `403` `ApiErrorResponseDto` Forbidden - not owner or admin of the stage
     * @response `404` `ApiErrorResponseDto` Stage not found
     */
    analyticsControllerGetPageViewCountV1: (
      { stageId, ...query }: AnalyticsControllerGetPageViewCountV1Params,
      params: RequestParams = {},
    ) =>
      this.http.request<
        AnalyticsControllerGetPageViewCountV1Data,
        AnalyticsControllerGetPageViewCountV1Error
      >({
        path: `/api/v1/analytics/stages/${stageId}/page-views`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Creates a new challenge for a stage. **Authorization:** User must be the stage owner. **Challenge Types:** - `always_on`: Challenge runs indefinitely from startDate. Requires `lengthInDays`. - If all 7 days selected: lengthInDays = duration in calendar days - If fewer days selected: lengthInDays = number of check-ins required - `fixed_dates`: Challenge runs from startDate to endDate. Requires `endDate`. **Pass Assignment:** - If `passIds` is not provided or empty, the challenge is assigned to the ground pass. - If `passIds` is provided, all passes must belong to the specified stage. **Cover Image:** - `coverImageId` must reference a valid image asset owned by the user.
     *
     * @tags Challenges
     * @name ChallengesControllerCreateChallengeV1
     * @summary Create a new challenge
     * @request POST:/api/v1/stages/{stageId}/challenges
     * @secure
     * @response `201` `ChallengesControllerCreateChallengeV1Data` Challenge created successfully
     * @response `400` `ApiErrorResponseDto` Invalid request (validation errors, invalid passes/assets)
     * @response `401` `ApiErrorResponseDto` Unauthorized - authentication required
     * @response `403` `ApiErrorResponseDto` Forbidden - not the stage owner
     * @response `404` `ApiErrorResponseDto` Stage not found
     */
    challengesControllerCreateChallengeV1: (
      { stageId, ...query }: ChallengesControllerCreateChallengeV1Params,
      data: CreateChallengeDto,
      params: RequestParams = {},
    ) =>
      this.http.request<
        ChallengesControllerCreateChallengeV1Data,
        ChallengesControllerCreateChallengeV1Error
      >({
        path: `/api/v1/stages/${stageId}/challenges`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Returns a paginated list of challenges for a stage. **Access Control:** Authentication is required. - Stage owners see all challenges (including hidden) - Subscribers see only public challenges linked to their subscribed passes **Filtering:** - `challengeType`: Filter by always_on or fixed_dates - `status`: Filter by active (running), upcoming (not started), or past (ended) - `visibility`: Owner only - filter by public, hidden, or all **Pagination:** Uses cursor-based pagination.
     *
     * @tags Challenges
     * @name ChallengesControllerListChallengesV1
     * @summary List challenges for a stage
     * @request GET:/api/v1/stages/{stageId}/challenges
     * @secure
     * @response `200` `ChallengesControllerListChallengesV1Data` Challenges retrieved successfully
     * @response `401` `ApiErrorResponseDto` Unauthorized - authentication required
     * @response `404` `ApiErrorResponseDto` Stage not found
     */
    challengesControllerListChallengesV1: (
      { stageId, ...query }: ChallengesControllerListChallengesV1Params,
      params: RequestParams = {},
    ) =>
      this.http.request<
        ChallengesControllerListChallengesV1Data,
        ChallengesControllerListChallengesV1Error
      >({
        path: `/api/v1/stages/${stageId}/challenges`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Returns details of a specific challenge. **Access Control:** Authentication is required. - Stage owners can view any challenge (including hidden) - Subscribers can only view public challenges linked to their subscribed passes - Hidden challenges return 404 for non-owners
     *
     * @tags Challenges
     * @name ChallengesControllerGetChallengeV1
     * @summary Get details of a challenge
     * @request GET:/api/v1/stages/{stageId}/challenges/{challengeId}
     * @secure
     * @response `200` `ChallengesControllerGetChallengeV1Data` Challenge retrieved successfully
     * @response `401` `ApiErrorResponseDto` Unauthorized - authentication required
     * @response `403` `ApiErrorResponseDto` Forbidden - no access to this challenge
     * @response `404` `ApiErrorResponseDto` Challenge not found
     */
    challengesControllerGetChallengeV1: (
      {
        stageId,
        challengeId,
        ...query
      }: ChallengesControllerGetChallengeV1Params,
      params: RequestParams = {},
    ) =>
      this.http.request<
        ChallengesControllerGetChallengeV1Data,
        ChallengesControllerGetChallengeV1Error
      >({
        path: `/api/v1/stages/${stageId}/challenges/${challengeId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Updates an existing challenge. **Authorization:** User must be the stage owner. **Restrictions:** - Cannot change challengeType after creation - Cannot set endDate on always_on challenges - Cannot set lengthInDays on fixed_dates challenges - Pass IDs, if provided, replace existing passes
     *
     * @tags Challenges
     * @name ChallengesControllerUpdateChallengeV1
     * @summary Update a challenge
     * @request PATCH:/api/v1/stages/{stageId}/challenges/{challengeId}
     * @secure
     * @response `200` `ChallengesControllerUpdateChallengeV1Data` Challenge updated successfully
     * @response `400` `ApiErrorResponseDto` Invalid request
     * @response `401` `ApiErrorResponseDto` Unauthorized - authentication required
     * @response `403` `ApiErrorResponseDto` Forbidden - not the stage owner
     * @response `404` `ApiErrorResponseDto` Challenge not found
     */
    challengesControllerUpdateChallengeV1: (
      {
        stageId,
        challengeId,
        ...query
      }: ChallengesControllerUpdateChallengeV1Params,
      data: UpdateChallengeDto,
      params: RequestParams = {},
    ) =>
      this.http.request<
        ChallengesControllerUpdateChallengeV1Data,
        ChallengesControllerUpdateChallengeV1Error
      >({
        path: `/api/v1/stages/${stageId}/challenges/${challengeId}`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Soft deletes a challenge by setting deletedAt timestamp. **Authorization:** User must be the stage owner.
     *
     * @tags Challenges
     * @name ChallengesControllerDeleteChallengeV1
     * @summary Delete a challenge (soft delete)
     * @request DELETE:/api/v1/stages/{stageId}/challenges/{challengeId}
     * @secure
     * @response `204` `ChallengesControllerDeleteChallengeV1Data` Challenge deleted successfully
     * @response `401` `ApiErrorResponseDto` Unauthorized - authentication required
     * @response `403` `ApiErrorResponseDto` Forbidden - not the stage owner
     * @response `404` `ApiErrorResponseDto` Challenge not found
     */
    challengesControllerDeleteChallengeV1: (
      {
        stageId,
        challengeId,
        ...query
      }: ChallengesControllerDeleteChallengeV1Params,
      params: RequestParams = {},
    ) =>
      this.http.request<
        ChallengesControllerDeleteChallengeV1Data,
        ChallengesControllerDeleteChallengeV1Error
      >({
        path: `/api/v1/stages/${stageId}/challenges/${challengeId}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * @description Joins a challenge and creates the check-in schedule based on the user's timezone. **Authorization:** User must have an active subscription to a pass linked to this challenge. **Timezone Handling:** - The `ianaTimezone` must be a valid IANA timezone name (e.g., 'America/New_York', 'Asia/Kolkata') - All check-in dates are calculated based on the user's local timezone - The challenge start date is interpreted in the user's local timezone **Check-in Generation:** - Check-ins are pre-generated for all expected dates when the user joins - Check-in numbers are assigned sequentially (1, 2, 3, ...) - Only days matching the challenge's `daysOfWeek` will have check-ins
     *
     * @tags Challenges
     * @name ChallengesControllerJoinChallengeV1
     * @summary Join a challenge
     * @request POST:/api/v1/stages/{stageId}/challenges/{challengeId}/join
     * @secure
     * @response `201` `ChallengesControllerJoinChallengeV1Data` Successfully joined the challenge
     * @response `400` `ApiErrorResponseDto` Invalid request (already joined, invalid timezone)
     * @response `401` `ApiErrorResponseDto` Unauthorized - authentication required
     * @response `403` `ApiErrorResponseDto` Forbidden - no access to this challenge
     * @response `404` `ApiErrorResponseDto` Challenge not found
     */
    challengesControllerJoinChallengeV1: (
      {
        stageId,
        challengeId,
        ...query
      }: ChallengesControllerJoinChallengeV1Params,
      data: JoinChallengeDto,
      params: RequestParams = {},
    ) =>
      this.http.request<
        ChallengesControllerJoinChallengeV1Data,
        ChallengesControllerJoinChallengeV1Error
      >({
        path: `/api/v1/stages/${stageId}/challenges/${challengeId}/join`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Records a check-in for the current pending check-in. **Authorization:** User must be a participant of the challenge. **Check-in Window:** - Users can check in anytime within 24 hours of the expected check-in date - Only one pending check-in can be completed at a time - Check-ins are processed in order (check-in #1 must be done before #2) **Post Requirement:** - If `challenge.requiresPost` is true, a `postId` must be provided - The post must exist and be created by the user
     *
     * @tags Challenges
     * @name ChallengesControllerCheckinV1
     * @summary Check in to a challenge
     * @request POST:/api/v1/stages/{stageId}/challenges/{challengeId}/checkin
     * @secure
     * @response `201` `ChallengesControllerCheckinV1Data` Check-in recorded successfully
     * @response `400` `ApiErrorResponseDto` Invalid request (not joined, no pending checkin, post required)
     * @response `401` `ApiErrorResponseDto` Unauthorized - authentication required
     * @response `404` `ApiErrorResponseDto` Challenge not found
     */
    challengesControllerCheckinV1: (
      { stageId, challengeId, ...query }: ChallengesControllerCheckinV1Params,
      data: CheckinDto,
      params: RequestParams = {},
    ) =>
      this.http.request<
        ChallengesControllerCheckinV1Data,
        ChallengesControllerCheckinV1Error
      >({
        path: `/api/v1/stages/${stageId}/challenges/${challengeId}/checkin`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Returns aggregated statistics for a challenge. **Authorization:** User must be the stage owner. **Statistics Include:** - Total number of participants - Total check-ins scheduled and completed - Completion rate by check-in number - Overall completion rate
     *
     * @tags Challenges
     * @name ChallengesControllerGetChallengeStatsV1
     * @summary Get challenge statistics
     * @request GET:/api/v1/stages/{stageId}/challenges/{challengeId}/stats
     * @secure
     * @response `200` `ChallengesControllerGetChallengeStatsV1Data` Challenge stats retrieved successfully
     * @response `401` `ApiErrorResponseDto` Unauthorized - authentication required
     * @response `403` `ApiErrorResponseDto` Forbidden - not the stage owner
     * @response `404` `ApiErrorResponseDto` Challenge not found
     */
    challengesControllerGetChallengeStatsV1: (
      {
        stageId,
        challengeId,
        ...query
      }: ChallengesControllerGetChallengeStatsV1Params,
      params: RequestParams = {},
    ) =>
      this.http.request<
        ChallengesControllerGetChallengeStatsV1Data,
        ChallengesControllerGetChallengeStatsV1Error
      >({
        path: `/api/v1/stages/${stageId}/challenges/${challengeId}/stats`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Returns the current user's progress in a challenge. **Authorization:** User must be a participant of the challenge. **Status Include:** - Join date and timezone - All check-ins with their status (pending/completed) - Next expected check-in and whether the window is active - Overall progress percentage
     *
     * @tags Challenges
     * @name ChallengesControllerGetMyStatusV1
     * @summary Get my challenge status
     * @request GET:/api/v1/stages/{stageId}/challenges/{challengeId}/my-status
     * @secure
     * @response `200` `ChallengesControllerGetMyStatusV1Data` Challenge status retrieved successfully
     * @response `400` `ApiErrorResponseDto` Not joined this challenge
     * @response `401` `ApiErrorResponseDto` Unauthorized - authentication required
     * @response `404` `ApiErrorResponseDto` Challenge not found
     */
    challengesControllerGetMyStatusV1: (
      {
        stageId,
        challengeId,
        ...query
      }: ChallengesControllerGetMyStatusV1Params,
      params: RequestParams = {},
    ) =>
      this.http.request<
        ChallengesControllerGetMyStatusV1Data,
        ChallengesControllerGetMyStatusV1Error
      >({
        path: `/api/v1/stages/${stageId}/challenges/${challengeId}/my-status`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Creates an instructional post for a specific check-in day of a challenge. **Authorization:** User must be the stage owner. **Instructional Posts:** - Used by creators to provide instructions for specific check-in days - Multiple instructional posts can be created for the same check-in day - Posts are automatically pinned - Posts are only visible to users with access to the challenge's passes **Check-in Number:** - Must be between 1 and the total number of check-in days in the challenge - For always_on: max is `lengthInDays` - For fixed_dates: max is calculated based on selected days between start and end date
     *
     * @tags Challenges
     * @name ChallengesControllerCreateInstructionalPostV1
     * @summary Create an instructional post for a challenge
     * @request POST:/api/v1/stages/{stageId}/challenges/{challengeId}/instructional-post
     * @secure
     * @response `201` `ChallengesControllerCreateInstructionalPostV1Data` Instructional post created successfully
     * @response `400` `ApiErrorResponseDto` Invalid request (invalid checkinNumber)
     * @response `401` `ApiErrorResponseDto` Unauthorized - authentication required
     * @response `403` `ApiErrorResponseDto` Forbidden - not the stage owner
     * @response `404` `ApiErrorResponseDto` Challenge not found
     */
    challengesControllerCreateInstructionalPostV1: (
      {
        stageId,
        challengeId,
        ...query
      }: ChallengesControllerCreateInstructionalPostV1Params,
      data: CreateInstructionalPostDto,
      params: RequestParams = {},
    ) =>
      this.http.request<
        ChallengesControllerCreateInstructionalPostV1Data,
        ChallengesControllerCreateInstructionalPostV1Error
      >({
        path: `/api/v1/stages/${stageId}/challenges/${challengeId}/instructional-post`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Retrieve the authenticated user profile information
     *
     * @tags users
     * @name UsersControllerGetMeV1
     * @summary Get current user profile
     * @request GET:/api/v1/users/me
     * @secure
     * @response `200` `UsersControllerGetMeV1Data` User profile
     * @response `401` `ApiErrorResponseDto` Unauthorized
     */
    usersControllerGetMeV1: (params: RequestParams = {}) =>
      this.http.request<
        UsersControllerGetMeV1Data,
        UsersControllerGetMeV1Error
      >({
        path: `/api/v1/users/me`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Update the authenticated user name and/or profile image
     *
     * @tags users
     * @name UsersControllerUpdateMeV1
     * @summary Update current user profile
     * @request PATCH:/api/v1/users/me
     * @secure
     * @response `200` `UsersControllerUpdateMeV1Data` User updated
     * @response `400` `ApiErrorResponseDto` Validation error
     * @response `401` `ApiErrorResponseDto` Unauthorized
     */
    usersControllerUpdateMeV1: (
      data: UpdateUserDto,
      params: RequestParams = {},
    ) =>
      this.http.request<
        UsersControllerUpdateMeV1Data,
        UsersControllerUpdateMeV1Error
      >({
        path: `/api/v1/users/me`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Soft delete the authenticated user account. This will anonymize user data and log out all sessions.
     *
     * @tags users
     * @name UsersControllerDeleteMeV1
     * @summary Delete current user account
     * @request DELETE:/api/v1/users/me
     * @secure
     * @response `200` `UsersControllerDeleteMeV1Data` User deleted
     * @response `401` `ApiErrorResponseDto` Unauthorized
     */
    usersControllerDeleteMeV1: (params: RequestParams = {}) =>
      this.http.request<
        UsersControllerDeleteMeV1Data,
        UsersControllerDeleteMeV1Error
      >({
        path: `/api/v1/users/me`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),
  };
}
