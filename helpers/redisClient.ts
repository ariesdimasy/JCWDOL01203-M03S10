import { createClient } from "redis"

const redisClient: any = createClient({
    url: 'redis://localhost:8083',
    socket: {
        tls: false
    }
})

redisClient.on('connect', () => {
    console.log('Connected to redis')
})

redisClient.on('error', (err: any) => {
    console.error(`Error connecting to Redis : ${err.message}`)
    process.exit(1)
})

export default redisClient