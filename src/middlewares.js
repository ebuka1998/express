import jwt from 'jsonwebtoken'
import config from './config'
import devConfig from './config/dev'

/**validate access token */
export const authorization = (req, res, next) => {
    const token = req.header('auth-token')
    if(!token) {
        return res.status(401).send('you must sign in first')
    }

    try {
        const userInfo = jwt.verify(token, config.secrets.JWT_SECRET)
        req.user = userInfo
        next()
    } catch (error) {
        return res.status(400).send('your token is invalid or has expired')
    }
}

export const authorize = (req, res, next) => {
    const token = req.query.token
    if(!token) {
        return res.status(401).send('you must sign in first')
    }

    try {
        const userInfo = jwt.verify(token, config.secrets.JWT_SECRET)
        req.user = userInfo
        next()
    } catch (error) {
        return res.status(400).send('your token is invalid or has expired')
    }
}