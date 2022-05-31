import Button from 'components/atoms/Button/Button';
import { ArrowLeft } from 'react-feather';
import { useHistory } from 'react-router';

const Sorint: React.FC = () => {
  const history = useHistory();
  const backHome = () => {
    history.replace('./');
  };
  return (
    <Button primary onClick={backHome}>
      <ArrowLeft />
    </Button>
  );
};

export default Sorint;
