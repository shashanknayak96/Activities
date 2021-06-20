import { observer } from 'mobx-react-lite';
import react from 'react';
import { Grid } from 'semantic-ui-react';
import { Activity } from '../../models/activity';
import { useStore } from '../../store/store';
import ActivityDetail from '../details/ActivityDetail';
import ActivityForm from '../form/ActivityForm';
import ActivityList from './ActivityList';

interface Prop {
    activities: Activity[],
}

export default observer(function ActivityDashboard({ activities,
}: Prop) {

    const { activityStore } = useStore();
    const { selectedActivity, editMode } = activityStore;

    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityList
                    activities={activities}
                />
            </Grid.Column>
            <Grid.Column width='6'>
                {
                    selectedActivity && !editMode &&
                    <ActivityDetail />
                }
                {
                    editMode &&
                    <ActivityForm />
                }
            </Grid.Column>
        </Grid>
    )
});