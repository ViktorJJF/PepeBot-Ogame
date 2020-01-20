module.exports = {
  //user to login with pepeBot
  user: { email: "", password: "" },
  environment: (process.env.NODE_ENV = process.env.NODE_ENV || "dev"),
  port: (process.env.PORT = process.env.PORT || 3000)
};
