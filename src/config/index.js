import merge from 'lodash.merge'
import devConfig from "./dev"
import prodConfig from "./prod"

process.env.NODE_ENV = process.env.NODE_ENV || "developement"

const env = process.env.NODE_ENV

const baseConfig = {
    secret: {}
}

let envConfig = {}

switch(env) {
    case 'developement':
    case 'dev':
        envConfig = devConfig
        break

    case 'production':
    case 'prod':
        envConfig = prodConfig
        break

    default:
        envConfig = devConfig
}

export default merge(baseConfig, envConfig)