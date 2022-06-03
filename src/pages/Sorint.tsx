import Button from 'components/atoms/Button/Button';
import { ArrowLeft } from 'react-feather';
import { useLocation, useNavigate } from 'react-router-dom';
import SorintNavigation from 'navigation/SorintNavigation';
import './Sorint.scss';
import React, { useCallback } from 'react';

const Sorint: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const goToSircleLeader = useCallback(() => {
    navigate('sircleleader');
  }, []);

  const goToTalentHandler = useCallback(() => {
    navigate('talentHandler');
  }, []);

  const backHome = useCallback(() => {
    navigate('/');
  }, []);

  return (
    <>
      <div className="Sorint__Buttons">
        <Button primary onClick={backHome}>
          <ArrowLeft />
        </Button>
        <Button primary={location.pathname === '/sorint/sircleleader'} onClick={goToSircleLeader}>Sircle Leader</Button>
        <Button primary={location.pathname === '/sorint/talentHandler'} onClick={goToTalentHandler}>Talent Handler</Button>
      </div>
      <SorintNavigation />
    </>
  );
};

export default React.memo(Sorint);
