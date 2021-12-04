import React from 'react'
import LoginForm from '../components/auth/LoginForm'
import PageHeader from '../components/common/PageHeader'
import Spacer from '../components/common/Spacer'

const LoginPage = () => {
    return (
        <>
            <PageHeader title="Login"/>
            <Spacer/>
            <LoginForm/>
            <Spacer/>
        </>
    )
}

export default LoginPage
