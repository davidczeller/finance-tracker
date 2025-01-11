export interface TokenInput {
  grant_type: string;
  username: string;
  password: string;
  scope?: string;
}

export interface TokenOutput {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  scope?: string;
}
