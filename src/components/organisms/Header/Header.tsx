import {
  ChevronRight, ChevronLeft, Target, LogOut,
} from 'react-feather';
import { auth } from 'firebaseUtils/firebase';
import Button from 'components/atoms/Button/Button';
import './Header.scss';

export interface HeaderProps {
  week: number;
  previousWeek: () => void;
  nextWeek: () => void;
  resetWeek: () => void;
}

const logout = () => {
  auth().signOut();
};

const Header: React.FC<HeaderProps> = ({
  week, previousWeek, nextWeek, resetWeek,
}: HeaderProps) => (
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
      <Button primary onClick={logout}>
        <LogOut />
      </Button>
    </div>
  </div>
);

export default Header;
