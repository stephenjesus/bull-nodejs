const Bull = require('bull')

const connectQueue = (name) => new Bull(name, {
  redis: { port: process.env.REDIS_PORT, host: process.env.REDIS_HOST },
  limiter: {
    max: 5, // Max number of jobs processed
    duration: 1000, // per duration in milliseconds
    bounceBack: false // When jobs get rate limited, they stay in the waiting queue and are not moved to the delayed queue
  }
})

module.exports = { connectQueue }