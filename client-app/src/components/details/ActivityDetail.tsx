import react from 'react';
import { Card, Image, Button } from 'semantic-ui-react';
import { Activity } from '../../models/activity';
import { useStore } from '../../store/store';
import LoadingComponent from '../loader/LoadingComponent';

export default function ActivityDetail() {

    const { activityStore } = useStore();
    const { selectedActivity: activity} = activityStore;

    if(!activity) return <LoadingComponent />;

    return (
        <Card fluid>
            <Image src={`/assets/images/categoryImages/${activity.category}.jpg`} alt='detail'></Image>
            <Card.Content>
                <Card.Header>{activity.title}</Card.Header>
                <Card.Meta>
                    <span>{activity.date}</span>
                </Card.Meta>
                <Card.Description>
                    {activity.description}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button.Group widths='2'>
                    <Button onClick={() => activityStore.openForm(activity.id)} basic color='blue' content='Edit' />
                    <Button onClick={() => activityStore.cancelSelectedActivity()} basic color='grey' content='Cancel' />
                </Button.Group>
            </Card.Content>
        </Card>
    )
}