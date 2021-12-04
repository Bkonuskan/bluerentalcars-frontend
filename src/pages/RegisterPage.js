import React from 'react'
import RegisterForm from '../components/auth/RegisterForm'
import PageHeader from '../components/common/PageHeader'
import Spacer from '../components/common/Spacer'

const RegisterPage = () => {
    return (
        <>
            <PageHeader title="Register"/>
            <Spacer/>
            <RegisterForm/>
            <Spacer/>
        </>
    )
}

export default RegisterPage
