import react, { useState, ChangeEvent, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useHistory, useParams } from 'react-router-dom';
import { Segment, Form, Button } from 'semantic-ui-react';
import { useStore } from '../../store/store';
import LoadingComponent from '../loader/LoadingComponent';
import {v4 as uuid} from 'uuid';

interface Props {
    isSubmitting: boolean
}

export default observer(function ActivityForm() {

    const {activityStore} = useStore();
    const {loading, createActivity, updateActivity, loadActivity, loadingInitial} = activityStore;
    const {id} = useParams<{id: string}>();
    const [activity, setActivity] = useState({
        id: '',
        title: '', 
        date: '',
        description: '',
        category: '',
        city: '',
        venue: ''
    });
    const history = useHistory();

    useEffect(()=> {
        if(id) loadActivity(id).then(activity => setActivity(activity!))
    }, [id, loadActivity]);

    function handleOnChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = event.target;
        setActivity({ ...activity, [name]: value });
    }

    function handleSubmit(){
        if(activity.id.length === 0){
            const newActivity = {
                ...activity,
                id: uuid()
            }
            createActivity(newActivity).then(() => history.push(`/activities/${newActivity.id}`));
        }else{
            updateActivity(activity).then(() => history.push(`/activities/${activity.id}`));
        }
        activity.id ? updateActivity(activity) : createActivity(activity);
    }

    if(loadingInitial) return <LoadingComponent content="Loading activity..."/>

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit}>
                <Form.Input placeholder="Title" name="title" value={activity.title} onChange={handleOnChange} />
                <Form.TextArea placeholder="Description" name="description" value={activity.description} onChange={handleOnChange} />
                <Form.Input placeholder="Category" name="category" value={activity.category} onChange={handleOnChange} />
                <Form.Input type="date" placeholder="Date" name="date" value={activity.date} onChange={handleOnChange} />
                <Form.Input placeholder="City" name="city" value={activity.city} onChange={handleOnChange} />
                <Form.Input placeholder="Venue" name="venue" value={activity.venue} onChange={handleOnChange} />
                <Button
                    loading={loading}
                    floated="right"
                    positive
                    type="submit"
                    content="Submit"
                />
                <Button
                    // onClick={() => { activityStore.closeForm() }}
                    floated="right" 
                    type="button" 
                    content="Cancel" 
                />
            </Form>
        </Segment>
    )
});