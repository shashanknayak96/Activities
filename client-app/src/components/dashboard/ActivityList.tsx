import react, { Fragment } from 'react';
import { observer } from 'mobx-react-lite';
import { Segment, Item, Header } from 'semantic-ui-react';
import { Activity } from '../../models/activity';
import { useStore } from '../../store/store';
import ActivityListItem from './ActivityListItem';


export default observer(function ActivityList() {
    const { activityStore } = useStore();
    const { getActivitiesByDate, groupedByDate } = activityStore;

    // function handleViewButton(id: string) {
    //     activityStore.selectActivity(id);
    //     activityStore.closeForm();
    // }

    return (
        <>
            {groupedByDate.map(([group, activities]) => (
                <Fragment key={group}>
                    <Header sub color='teal'>
                        {group}
                    </Header>
                    <Segment>
                        <Item.Group divided>
                            {activities.map(activity => (
                                <ActivityListItem key={activity.id} activity={activity} />
                            ))}
                        </Item.Group>
                    </Segment>
                </Fragment>

            )
            )}
        </>

    )
});