import react, { SyntheticEvent, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import { Segment, Item, Button, Label } from 'semantic-ui-react';
import { Activity } from '../../models/activity';
import { useStore } from '../../store/store';

interface Props {
    activities: Activity[],
}

export default observer(function ActivityList({ activities, }: Props) {
    const { activityStore } = useStore();
    const { deleteActivity, loading: isSubmitting } = activityStore;

    const [target, setTarget] = useState(''); //Used to handle loading effect on delete button

    function handleDeleteActivity(e: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(e.currentTarget.name);
        deleteActivity(id);
    }

    // function handleViewButton(id: string) {
    //     activityStore.selectActivity(id);
    //     activityStore.closeForm();
    // }

    return (
        <Segment>
            <Item.Group divided>
                {activities.map(activity => (
                    <Item key={activity.id}>
                        <Item.Content>
                            <Item.Header>{activity.title}</Item.Header>
                            <Item.Meta>{activity.date}</Item.Meta>
                            <Item.Description>
                                <div>
                                    {activity.description}
                                </div>
                                <div>
                                    {activity.city}, {activity.venue}
                                </div>
                            </Item.Description>
                            <Item.Extra>
                                <Button
                                    as={Link} 
                                    to={`/activities/${activity.id}`}
                                    // onClick={() => { handleViewButton(activity.id); }}
                                    floated='right'
                                    content='View'
                                    color='blue' />
                                <Button
                                    name={activity.id}
                                    loading={isSubmitting && target === activity.id}
                                    onClick={(e) => { handleDeleteActivity(e, activity.id) }}
                                    floated='right'
                                    color='red'
                                    content='Delete'
                                />
                                <Label basic content={activity.category} />
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
});