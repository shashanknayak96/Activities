import React, { useEffect, useState } from 'react';
import './App.css';
import { Container } from 'semantic-ui-react'
import NavBar from './components/navbar/navbar';
import ActivityDashboard from './components/dashboard/ActivityDashboard';
import LoadingComponent from './components/loader/LoadingComponent';
import { useStore } from './store/store';
import { observer } from 'mobx-react-lite';

function App() {
  const {activityStore} = useStore();

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore])
 
  if (activityStore.loadingInitial) return <LoadingComponent />

  return (

    <>
      <NavBar />
      <Container style={{ marginTop: '7em' }}>
        <ActivityDashboard
          activities={activityStore.getActivitiesByDate}
        />
      </Container>
    </>
  );
}

export default observer(App);
