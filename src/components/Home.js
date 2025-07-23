import { Container } from "react-bootstrap";
import { withTheme } from "styled-components";

const Home = props => {
    return (
        <Container fluid={true}>
            <div>
                <h1>My Themed Application</h1>
                <p style={{ color: props.theme.colors.text, fontFamily: props.theme.fonts.body }}>
                    This text also uses the theme's text color and font.
                </p>
            </div>
        </Container>

    );
}

export default withTheme(Home);