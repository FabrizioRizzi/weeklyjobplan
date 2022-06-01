import Button from 'components/atoms/Button/Button';
import { ArrowLeft } from 'react-feather';
import { useLocation, useNavigate } from 'react-router-dom';
import SorintNavigation from 'navigation/SorintNavigation';
import './Sorint.scss';

const Sorint: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const goToSircleLeader = () => {
    navigate('sircleleader');
  };

  const goToTalentHandler = () => {
    navigate('talentHandler');
  };

  const backHome = () => {
    navigate('/');
  };

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

export default Sorint;
