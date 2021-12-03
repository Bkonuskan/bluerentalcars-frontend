import React from 'react'
import About from '../components/about/About'
import Partners from '../components/about/Partners'
import PageHeader from '../components/common/PageHeader'
import Spacer from '../components/common/Spacer'

const AboutPage = () => {
    return (
        <>
        <PageHeader title="About Us"/>
        <Spacer/>
        <About/>
        <Spacer/>
        <Partners/>
        <Spacer/>
        </>
    )
}

export default AboutPage
