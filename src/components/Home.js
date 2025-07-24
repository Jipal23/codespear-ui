import { Container } from "react-bootstrap";

const Home = props => {
    return (
        <Container fluid>
            <div>
                <h1>My Themed Application</h1>
                <p>
                    This text also uses the theme's text color and font.
                </p>
            </div>
        </Container>

    );
}

export default Home;