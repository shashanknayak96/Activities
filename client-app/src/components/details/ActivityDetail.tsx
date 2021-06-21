import { observer } from 'mobx-react-lite';
import react from 'react';
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Card, Image, Button, GridColumn, Grid } from 'semantic-ui-react';
import { useStore } from '../../store/store';
import LoadingComponent from '../loader/LoadingComponent';
import ActivityDetailedChat from './ActivityDetailedChat';
import ActivityDetailedHeader from './ActivityDetailedHeader';
import ActivityDetailedInfo from './ActivityDetailedInfo';
import ActivityDetailedSidebar from './ActivityDetailedSidebar';

export default observer(function ActivityDetail() {

    const { activityStore } = useStore();
    const { selectedActivity: activity, loadActivity, loadingInitial } = activityStore;
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        if (id) loadActivity(id);
    }, [id, loadActivity])

    if (loadingInitial || !activity) return <LoadingComponent />;

    return (
        <Grid>
            <Grid.Column width={10}>
                <ActivityDetailedHeader activity={activity}/>
                <ActivityDetailedInfo activity={activity}/>
                <ActivityDetailedChat />
            </Grid.Column>
            <Grid.Column width={6}>
                <ActivityDetailedSidebar />
            </Grid.Column>
        </Grid>
        // <Card fluid>
        //     <Image src={`/assets/images/categoryImages/${activity.category}.jpg`} alt='detail'></Image>
        //     <Card.Content>
        //         <Card.Header>{activity.title}</Card.Header>
        //         <Card.Meta>
        //             <span>{activity.date}</span>
        //         </Card.Meta>
        //         <Card.Description>
        //             {activity.description}
        //         </Card.Description>
        //     </Card.Content>
        //     <Card.Content extra>
        //         <Button.Group widths='2'>
        //             <Button 
        //                 // onClick={() => activityStore.openForm(activity.id)} 
        //                 as={Link}
        //                 to={`/manage/${activity.id}`}
        //                 basic 
        //                 color='blue' 
        //                 content='Edit' />
        //             <Button 
        //                 // onClick={() => activityStore.cancelSelectedActivity()} 
        //                 as={Link}
        //                 to="/activities"
        //                 basic 
        //                 color='grey' 
        //                 content='Cancel' />
        //         </Button.Group>
        //     </Card.Content>
        // </Card>
    )
});