export enum ReactionTypes {
  LIKE = "like",
  DISLIKE = "dislike",
  LOVE = "love",
  HAHA = "haha",
  WOA = "woa",
  SAD = "sad",
  ANGRY = "angry",
  CRY = "cry",
  JOY = "joy",
  EXPLODING_HEAD = "exploding_head",
  FACE_WITH_SYMBOLS_OVER_MOUTH = "face_with_symbols_over_mouth",
}

export type ReactionType = keyof typeof ReactionTypes
