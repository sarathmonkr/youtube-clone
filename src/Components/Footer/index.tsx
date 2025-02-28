import { Container, Row, Col, Nav, NavItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Footer = () => {
    const links = [
        { title: "About", url: "#" },
        { title: "Press", url: "#" },
        { title: "Terms", url: "#" },
        { title: "Privacy", url: "#" },
        { title: "Help", url: "#" },
        { title: "FAQ", url: "#" },
        { title: "© 2023 YouTube Clone", url: "#" }
    ];

    return (
        <footer className="footer">
            <Container>
                <Row>
                    {links.map((link, index) => (
                        <Col md="3" key={index}>
                            <Nav vertical>
                                <NavItem>
                                    <Link className='text-decoration-none text-dark' to={link.url}>{link.title}</Link>
                                </NavItem>
                            </Nav>
                        </Col>
                    ))}
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;
