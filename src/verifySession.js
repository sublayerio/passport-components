import getSessionData from './getSessionData'
import clearSession from './clearSession'
import refreshSession from './refreshSession'
import debug from './debug'

export default async () => {

    const data = getSessionData()

    debug('verify session', data)

    if (!data) {
        return
    }

    if (data.expired) {
        debug('session expired', data)
        try {
            await refreshSession()
        } catch (e) {
            debug('could not refresh session')
            clearSession()
            window.location.reload()
        }
        return
    }

    if (data.expiresIn < 20 * 1000) {
        try {
            await refreshSession()
        } catch (e) {
            debug('could not refresh session')
        }
    }
}