import React from 'react'
import PageHeader from '../components/common/PageHeader'
import Spacer from '../components/common/Spacer'
import CustomerServices from '../components/services/CustomerServices'
import Vehicles from '../components/services/Vehicles'

const ServicesPage = () => {
    return (
        <>
            <PageHeader title="Services"/>
            <Spacer/>
            <Vehicles/>
            <Spacer/>
            <CustomerServices/>
            <Spacer/>
        </>
    )
}

export default ServicesPage
