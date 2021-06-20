import { observer } from 'mobx-react-lite';
import react, { useState, ChangeEvent } from 'react';
import { Segment, Form, Button } from 'semantic-ui-react';
import { Activity } from '../../models/activity';
import { useStore } from '../../store/store';

interface Props {
    isSubmitting: boolean
}

export default observer(function ActivityForm() {

    const {activityStore} = useStore();
    const {loading, createActivity, updateActivity} = activityStore;

    const initialState =  activityStore.selectedActivity ?? {
        id: '',
        title: '', 
        date: '',
        description: '',
        category: '',
        city: '',
        venue: ''
    }

    const [activity, setActivity] = useState(initialState);

    function handleOnChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = event.target;
        setActivity({ ...activity, [name]: value });
    }

    function handleSubmit(){
        activity.id ? updateActivity(activity) : createActivity(activity);
    }

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
                    onClick={() => { activityStore.closeForm() }}
                    floated="right" 
                    type="button" 
                    content="Cancel" 
                />
            </Form>
        </Segment>
    )
});