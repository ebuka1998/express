const prodConfig = {
    port: process.env.PORT || '8080',
    database: 'mongodb://localhost:27017/production',
    secrets: {
        JWT_SECRET: process.env.JWT_SECRET
    }
}

export default prodConfig