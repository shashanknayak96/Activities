import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import { Header, Icon } from 'semantic-ui-react'


function App() {

  const [activities, setActivities] = useState([1, 2, 3]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/activities')
      .then((response: any) => {
        console.log(response.data);
        setActivities(response.data);
      })
  }, [])

  return (
    <div>
      <Header as='h2'>
        <Icon name='plug' />
        <Header.Content>Activities</Header.Content>
      </Header>
      <ul>
        {activities.map((activity: any) => {
          return (<li>{activity.description}</li>)
        })}
      </ul>
    </div>
  );
}

export default App;
