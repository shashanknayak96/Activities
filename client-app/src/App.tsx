import React from 'react';
import './App.css';
import { Container } from 'semantic-ui-react'
import NavBar from './components/navbar/navbar';
import ActivityDashboard from './components/dashboard/ActivityDashboard';
import { observer } from 'mobx-react-lite';
import { Route, useLocation } from 'react-router-dom';
import HomeComponent from './components/home/HomeComponent';
import ActivityForm from './components/form/ActivityForm';
import ActivityDetail from './components/details/ActivityDetail';

function App() {
  
  const location = useLocation();

  return (
    <>
      <NavBar />
      <Container style={{ marginTop: '7em' }}>
        <Route exact path='/' component={HomeComponent}/>
        <Route exact path='/activities' component={ActivityDashboard}/>
        <Route exact path='/activities/:id' component={ActivityDetail}/>
        <Route key={location.key} exact path={['/createActivity', '/manage/:id']} component={ActivityForm}/>
      </Container>
    </>
  );
}

export default observer(App);