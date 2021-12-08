import React from 'react'
import { Image, Spinner } from 'react-bootstrap'
import logo from "../assets/img/logo.png";


const LoadingPage = () => {
    return (
        <div className="spinner-loading">
            <Spinner animation="border" variant="primary"/>
            <Image src={logo} className="logo"/>
        </div>
    )
}

export default LoadingPage
