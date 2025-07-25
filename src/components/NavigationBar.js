import {
    Navbar,
    Container,
    Nav,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import { useAuth } from '../AuthContext'; // ✅ import hook


const NavigationBar = props => {
    const context = useAuth(); // ✅ get loggedIn state
    return (
        <>
            <header className="header-global">
                <Navbar
                    expand="sm"
                    id="navbar-main"
                    className="bg-primary navbar-dark navbar-transparent"
                >
                    <Container>
                        <LinkContainer to="/">
                            <Navbar.Brand className="mr-lg-5">
                                <img style={{ height: "30px" }}
                                    alt="..."
                                    src={require("../assets/img/brand/logo_30.png")}
                                />
                            </Navbar.Brand>
                        </LinkContainer>

                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="ms-auto">
                                {!context.loggedIn && (
                                    <LinkContainer to="/login">
                                        <Nav.Link>Login</Nav.Link>
                                    </LinkContainer>
                                )}
                                {context.loggedIn && (
                                    <>
                                        <Nav.Link>Hi, {context.userName}</Nav.Link>
                                        <LinkContainer to="/logout">
                                            <Nav.Link>Logout</Nav.Link>
                                        </LinkContainer>
                                    </>
                                )}
                            </Nav>
                        </Navbar.Collapse>

                    </Container>
                </Navbar>
            </header>
        </>
    );
};

export default NavigationBar;