import React from 'react'
import { Card, Row, Col } from 'react-bootstrap'

const CustomerServiceCard = ({title, description, icon}) => {
    return (
        <Card className="customer-service-card">
            <Card.Body>
                <Row className="g-2">
                    <Col lg={2}>{icon}</Col>
                    <Col lg={10}>
                        <h3>{title}</h3>
                        <p>{description}</p>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    )
}

export default CustomerServiceCard
