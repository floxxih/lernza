// ─── Contract limit constants (single source of truth for the frontend) ──────

export const MAX_QUEST_NAME_LEN = 64
export const MAX_QUEST_DESCRIPTION_LEN = 2000
export const MAX_MILESTONE_TITLE_LEN = 128
export const MAX_MILESTONE_DESCRIPTION_LEN = 1000
export const MAX_MILESTONES = 50
// Contract enforces 10^15 raw token units; the form collects whole tokens,
// which are multiplied by 10^6 (USDC decimals) before submission.
// 10^15 / 10^6 = 10^9 whole tokens max.
export const MAX_REWARD_AMOUNT = 1_000_000_000

// ─── Quest Contract Types ────────────────────────────────────────────────────

export {
  Visibility,
  type Visibility,
  QuestStatus,
  type QuestStatus,
  type QuestInfo,
} from "./contracts/quest"

// ─── Rewards Contract Types ──────────────────────────────────────────────────

/**
 * Error enum matching Rust Rewards contract Error definition.
 * Used for error handling in reward operations.
 */
export const RewardsError = {
  AlreadyInitialized: 1,
  NotInitialized: 2,
  Unauthorized: 3,
  InsufficientPool: 4,
  InvalidAmount: 5,
  QuestNotFunded: 6,
  QuestLookupFailed: 7,
  MilestoneNotCompleted: 8,
  MilestoneContractNotInitialized: 9,
  ArithmeticOverflow: 10,
  AlreadyPaid: 11,
  InvalidToken: 12,
  RewardAmountMismatch: 13,
  QuestNotArchived: 14,
} as const
export type RewardsError = (typeof RewardsError)[keyof typeof RewardsError]

/**
 * Pool balance response type.
 * Returns the token balance allocated to a quest's reward pool.
 * Uses bigint to match i128 from Rust contract.
 */
export type PoolBalance = bigint

/**
 * User earnings response type.
 * Returns total earnings for a user across all quests.
 * Uses bigint to match i128 from Rust contract.
 */
export type UserEarnings = bigint

/**
 * Total distributed response type.
 * Returns global total of all distributed rewards.
 * Uses bigint to match i128 from Rust contract.
 */
export type TotalDistributed = bigint

// ─── Legacy Types (to be migrated) ───────────────────────────────────────────

export interface WorkspaceInfo {
  id: number
  owner: string
  name: string
  description: string
  token_addr: string
  created_at: number
  visibility: Visibility
  max_enrollees?: number
  verified: boolean
}

export interface MilestoneInfo {
  id: number
  quest_id: number
  title: string
  description: string
  reward_amount: number
}
