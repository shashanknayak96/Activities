import { observer } from 'mobx-react-lite';
import react, { useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import { Activity } from '../../models/activity';
import { useStore } from '../../store/store';
import ActivityDetail from '../details/ActivityDetail';
import ActivityForm from '../form/ActivityForm';
import LoadingComponent from '../loader/LoadingComponent';
import ActivityFilters from './ActivityFilters';
import ActivityList from './ActivityList';

export default observer(function ActivityDashboard() {

    const { activityStore } = useStore();
    const { selectedActivity, editMode, getActivitiesByDate } = activityStore;

    useEffect(() => {
        activityStore.loadActivities();
    }, [activityStore])

    if (activityStore.loadingInitial) return <LoadingComponent />

    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityList />
            </Grid.Column>
            <Grid.Column width='6'>
                <ActivityFilters />
            </Grid.Column>
        </Grid>
    )
});