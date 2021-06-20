import react from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, Container, Button, Image } from 'semantic-ui-react';
import { useStore } from '../../store/store';

export default function NavBar() {
    const { activityStore } = useStore();

    return (
        <Menu inverted fixed="top">
            <Container>
                <Menu.Item header exact as={NavLink} to='/'>
                    <img src="/assets/images/logo.png" />
                    Reactivies
                </Menu.Item>
                <Menu.Item exact as={NavLink} to='/activities' name="Activities" />
                <Menu.Item>
                    <Button exact as={NavLink} to='/createActivity' positive content="Create Activity" />
                </Menu.Item>
            </Container>
        </Menu>
    )
}