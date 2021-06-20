import react from 'react';
import { Menu, Container, Button, Image } from 'semantic-ui-react';
import { useStore } from '../../store/store';

export default function NavBar() {
    const {activityStore} = useStore();

    return (
        <Menu inverted fixed="top">
            <Container>
                <Menu.Item header>
                    <img src="/assets/images/logo.png"/>
                    Reactivies
                </Menu.Item>
                <Menu.Item name="Activities" />
                <Menu.Item>
                    <Button onClick={() => activityStore.openForm()} positive content="Create Activity" />
                </Menu.Item>
            </Container>
        </Menu>
    )
}