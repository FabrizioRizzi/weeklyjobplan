import {
  ChevronRight, ChevronLeft, Target, LogOut, Activity,
} from 'react-feather';
import { useHistory } from 'react-router';
import { auth } from 'firebaseUtils/firebase';
import Button from 'components/atoms/Button/Button';
import './Header.scss';

export interface HeaderProps {
  week: number;
  previousWeek: () => void;
  nextWeek: () => void;
  resetWeek: () => void;
}

const Header: React.FC<HeaderProps> = ({
  week, previousWeek, nextWeek, resetWeek,
}: HeaderProps) => {
  const history = useHistory();

  const logout = () => {
    auth().signOut();
  };

  const openProjects = () => {
    history.push('/projects');
  };

  return (
    <div className="Header__Header">

      <div className="Header__Buttons Header__Buttons--Left">
        <Button primary onClick={previousWeek}>
          <ChevronLeft />
        </Button>
        <Button primary onClick={nextWeek}>
          <ChevronRight />
        </Button>
        <Button primary onClick={resetWeek}>
          <Target />
        </Button>
      </div>

      <div className="Title">
        <h2>
          {`Settimana ${week || ''}`}
        </h2>
      </div>

      <div className="Header__Buttons Header__Buttons--right">
        <Button primary onClick={openProjects}>
          <Activity />
        </Button>
        <Button primary onClick={logout}>
          <LogOut />
        </Button>
      </div>
    </div>
  );
};

export default Header;
