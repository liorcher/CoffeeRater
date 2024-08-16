module.exports = {
  apps: [{
    name: "coffeerater",
    script: "./dist/server.js",
    env_production: {
      NODE_ENV: "production"
    }
  }]
}
