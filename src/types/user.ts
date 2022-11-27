export type User = {
  ID: number;
  email: string;
  state?: string;
  country?: string;
  isMale?: boolean;
  pushToken?: string;
  sessionID?: string;
  accessToken: string;
  refreshToken: string;
};
