import react from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Header, Segment, Image } from 'semantic-ui-react';

export default function HomeComponent() {
    return (
        <>
            <Segment inverted textAlign='center' vertical className='masthead'>
                <Container text>
                    <Header as='h1' inverted>
                        <Image size='massive' src='/assets/images/logo.png' style={{ marginBottom: 12 }} />
                        Reactivities
                    </Header>
                    <Header as='h2' inverted content='Welcome' />
                    <Button as={Link} to='/activities' size='huge' inverted> Activities </Button>
                </Container>
            </Segment>
        </>
    )
}