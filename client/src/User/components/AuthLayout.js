import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const AuthLayout = ({ title, footer, children }) => {
  return (
    <Container className="auth-page mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card>
            <Card.Header>
                <h2 className="text-center mb-0">
                    {title}
                </h2>
            </Card.Header>
            <Card.Body>
                {children}
            </Card.Body>
            {footer && (
                <Card.Footer className="text-center">
                    {footer}
                </Card.Footer>
            )}
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AuthLayout; 