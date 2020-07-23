import jwt_decode from 'jwt-decode'
import getSession from './getSession'

export default () => {

    const token = getSession()

    if (!token) {
        return null
    }

    const data = jwt_decode(token)

    const expiresIn = (data.exp * 1000) - new Date().valueOf()
    const expired = expiresIn <= 0

    return {
        token,
        expiresIn,
        expired,
        data
    }
}