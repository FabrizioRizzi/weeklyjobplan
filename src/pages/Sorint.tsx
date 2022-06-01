import Button from 'components/atoms/Button/Button';
import { ArrowLeft } from 'react-feather';
import { useNavigate } from 'react-router-dom';
import SorintNavigation from 'navigation/SorintNavigation';

const Sorint: React.FC = () => {
  const navigate = useNavigate();

  const goToSircleLeader = () => {
    navigate('sircleleader');
  };

  const backHome = () => {
    navigate('/');
  };

  return (
    <>
      <Button primary onClick={backHome}>
        <ArrowLeft />
      </Button>
      <Button primary={false} onClick={goToSircleLeader}>Sircle Leader</Button>
      <SorintNavigation />
    </>
  );
};

export default Sorint;
