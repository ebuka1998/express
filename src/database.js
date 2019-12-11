import mongoose from 'mongoose'
import appConfig from './config'

export const databaseConnect = (config = appConfig) => {
    return mongoose.connect(config.database,  { useNewUrlParser: true,  useCreateIndex: true })
        .then(() => console.log('mongodb is ready'))
        .catch((error) => console.log(`something went wrong ${error}`))
}