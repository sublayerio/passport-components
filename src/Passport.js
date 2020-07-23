import React from 'react'
import getQueryParam from './utils/getQueryParam'
import api from './api'
import setSession from './setSession'
import getSession from './getSession'
import refreshSession from './refreshSession'
import verifySession from './verifySession'
export default class Passport extends React.Component {

    interval = null

    state = {
        loading: true,
        error: false
    }

    async componentDidMount() {

        try {
            await refreshSession()
        } catch (e) {
            // do nothing, could not refresh session based on refresh token
        }

        this.interval = setInterval(verifySession, 1000)

        await this.fetch()

        this.setState({
            loading: false
        })
    }

    componentWillUnmount() {
        if (this.interval) {
            clearInterval(verifySession)
        }
    }

    fetch = async () => {

        const code = getQueryParam('code')

        if (!code) {
            this.setState({
                loading: false
            })
            return
        }

        try {

            const response = await api.request({
                method: 'post',
                url: '/session/create',
                withCredentials: true,
                data: {
                    refresh_token: code
                }
            })

            if (response.data.status !== "success") {
                this.setState({
                    error: response.data.message
                })
                return
            }

            setSession(response.data.data.access_token)

            const url = new URL(window.location.href)
            url.searchParams.delete('code')
            window.location.href = url.toString()

        } catch (e) {

            console.log(e)

            this.setState({
                error: 'unexpected error connecting with auth service'
            })
        }
    }

    render() {

        if (this.state.error) {
            return (
                <div>
                    error: {this.state.error}
                </div>
            )
        }

        if (this.state.loading) {
            return null
        }

        const session = getSession()

        if (!session) {
            window.location.href = `${process.env.REACT_APP_SUBLAYER_PASSPORT_CLIENT_URL}?clientId=${process.env.REACT_APP_SUBLAYER_PASSPORT_CLIENT_ID}&redirectUrl=${process.env.REACT_APP_CLIENT_URL}`
        }

        return this.props.children
    }
}