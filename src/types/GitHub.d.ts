interface PartialUserStatus extends Record<"message", string> {
  expiresAt: string | null,
  limitedAvailability: boolean;
};