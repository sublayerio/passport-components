import clearSession from './clearSession'
import api from './api'

export default async () => {

    await api.request({
        method: 'post',
        url: '/session/logout',
        withCredentials: true
    })
    
    clearSession()
    window.location.reload()
}