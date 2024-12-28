require("dotenv").config()

module.exports = {
  APP_NAME: "Uplift API",
  BASE_URL: process.env.BASE_URL,
  FRONTEND_URL: "http://localhost:5173",
  DATABASE_URL: process.env.DATABASE_URL,

  JWT_COOKIE_EXPIRES_IN: "30",
  JWT_SECRET: "secret",
  JWT_EXPIRES_IN: "30d",
  PASSWORD_RESET_TOKEN_EXPIRES_IN: "10",

  STORE_ID: process.env.STORE_ID,
  STORE_PASSWORD: process.env.STORE_PASSWORD,
  IS_LIVE: process.env.IS_LIVE,

  EMAIL_FROM: process.env.EMAIL_FROM,
  EMAIL_HOST: process.env.EMAIL_HOST,
  EMAIL_PORT: process.env.EMAIL_PORT,
  EMAIL_USERNAME: process.env.EMAIL_USERNAME,
  EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
}
