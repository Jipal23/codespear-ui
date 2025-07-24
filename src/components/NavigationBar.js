import {
  Navbar,
  Container,
  Nav,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const NavigationBar = props => {

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
                <img style={{ height: "25px" }}
                  alt="..."
                  src={require("../assets/img/brand/brand-logo.png")}
                />
              </Navbar.Brand>
            </LinkContainer>

            <Nav>
              <LinkContainer to="/second">
                <Nav.Link >
                  Second
                </Nav.Link>
              </LinkContainer>
            </Nav>
            <Nav>
              <LinkContainer to="/form">
                <Nav.Link >
                  form
                </Nav.Link>
              </LinkContainer>
            </Nav>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            </Navbar.Collapse>

          </Container>
        </Navbar>
      </header>
    </>
  );
};

export default NavigationBar;