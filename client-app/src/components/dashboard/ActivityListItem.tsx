import react, { SyntheticEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon, Item, Label, Segment } from 'semantic-ui-react';
import { Activity } from '../../models/activity';
import { useStore } from '../../store/store';

interface Props {
    activity: Activity
}

export default function ActivityListItem({ activity }: Props) {
    const { activityStore } = useStore();
    const { deleteActivity, loading: isSubmitting } = activityStore;

    const [target, setTarget] = useState(''); //Used to handle loading effect on delete button

    function handleDeleteActivity(e: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(e.currentTarget.name);
        deleteActivity(id);
    }

    return (
        <Segment.Group>
            <Segment>
                <Item.Group>
                    <Item>
                        <Item.Image size='tiny' circular src='/assets/images/user.png' />
                        <Item.Content>
                            <Item.Header as={Link} to={`/activities/${activity.id}`}>
                            </Item.Header>
                            <Item.Description>
                                Hosted By Shashank
                            </Item.Description>
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
            <Segment>
                <span>
                    <Icon name='clock' />{activity.date}
                    <Icon name='marker' />{activity.venue}
                </span>
                <Segment secondary>
                    Attendees
                </Segment>
                <Segment clearing>
                    <span>{activity.description}</span>
                    <Button
                        as={Link}
                        to={`/activities/${activity.id}`}
                        color='green'
                        floated='right'
                        content='View'
                    />
                </Segment>
            </Segment>
        </Segment.Group>
    )
}