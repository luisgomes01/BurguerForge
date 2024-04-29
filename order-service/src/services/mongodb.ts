import mongoose from "mongoose"

const port = process.env.MONGO_PORT || '27017'
const connectionUrl = `mongodb://localhost:${port}`

export const connectMongoDb = async () => {
    try {
       await mongoose.connect(connectionUrl)
       console.log('✅ Connected to MongoDb')
    }
    catch (error) {
        console.error(`❌ Failed to connect to MongoDb: ${error}`)
    }
}