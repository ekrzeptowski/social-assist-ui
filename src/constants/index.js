export const TWITTER_AUTH_LINK =
  process.env.NODE_ENV === "production"
    ? "https://socialassist.ml/auth/twitter"
    : "https://localhost:5000/auth/twitter";

export const WEBSOCKET_PREFIX = "REDUX_WEBSOCKET";
