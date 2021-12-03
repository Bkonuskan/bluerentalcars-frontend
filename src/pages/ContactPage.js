import React from 'react'
import PageHeader from '../components/common/PageHeader'
import Spacer from '../components/common/Spacer'
import Contact from '../components/contact/Contact'
import ContactForm from '../components/contact/ContactForm'
import NewsletterPanel from '../components/contact/NewsletterPanel'

const ContactPage = () => {
    return (
        <>
            <PageHeader title="Contact Us"/>
            <Spacer/>
            <Contact/>
            <Spacer/>
            <NewsletterPanel/>
            <Spacer/>
            <ContactForm/>
            <Spacer/>

        </>
    )
}

export default ContactPage
