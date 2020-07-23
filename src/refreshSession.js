import setSession from './setSession'
import api from './api'
import debug from './debug'

export default async () => {

    debug('refreshing session...')

    const response = await api.request({
        method: 'post',
        url: '/session/refresh',
        withCredentials: true
    })

    debug('refreshed token')

    setSession(response.data.data.access_token)
}