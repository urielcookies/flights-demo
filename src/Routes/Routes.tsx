/* eslint-disable react-hooks/exhaustive-deps */ /* temp */
import { FC, useEffect, useState } from 'react';
import { Container, Spinner } from 'react-bootstrap';
import { Redirect, Route, Switch } from 'react-router-dom';

import Navbar from '../components/Navbar/Navbar';
import Home from '../components/Home/Home';
import Login from '../components/Login/Login';

import { ActiveUser, useActiveUserUpdate } from '../context/ActiveUserContext';
import { getCookie, fetchActiveUser } from '../endpoints/index';

import withLoginAuthentication from './withLoginAuthentication';

const Routes: FC = () => {
  const setActiveUserUpdate = useActiveUserUpdate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const hasCookie = Boolean(getCookie());

  useEffect(() => {
    const fetchUser = async () => {
      if (hasCookie) {
        setIsLoading(true);
        const response = await fetchActiveUser();
        setActiveUserUpdate(response as ActiveUser);
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  const AppRoutes = (
    isLoading
      ? (
        <div style={{ textAlign: 'center' }}>
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </div>
      )
      : (
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/home" component={withLoginAuthentication(Home)} />
          <Redirect from="/" to={`${hasCookie ? '/home' : '/login'}`} />
        </Switch>
      )
  );

  const Divider = hasCookie && <div style={{ height: '2vh' }} />;
  return (
    <>
      <Navbar />
      {Divider}
      <Container>
        {AppRoutes}
      </Container>
    </>
  );
};

export default Routes;
