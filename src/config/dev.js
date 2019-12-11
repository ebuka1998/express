const devConfig = {
    port: process.env.PORT || '3100',
    database: 'mongodb://localhost:27017/developement',
    secrets: {
        JWT_SECRET: process.env.JWT_SECRET
    }
}

export default devConfig