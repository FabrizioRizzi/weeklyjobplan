import Button from '../../atoms/Button/Button';
import { ChevronRight, ChevronLeft, Plus, Target } from 'react-feather';
import './Header.css';

export interface HeaderProps {
  week: number;
  previousWeek: () => void;
  nextWeek: () => void;
  resetWeek: () => void;
  addTask: () => void;
}

const Header: React.FC<HeaderProps> = (props) => {
  return (
    <div className="Header">

      <div className="Buttons Left">
        <Button primary={true} onClick={props.previousWeek}>
          <ChevronLeft />
        </Button>
        <Button primary={true} onClick={props.nextWeek}>
          <ChevronRight />
        </Button>
        <Button primary={true} onClick={props.resetWeek}>
          <Target />
        </Button>
      </div>

      <div className="Title">
        <h3>Settimana {props.week || ''}</h3>
      </div>

      <div className="Buttons Right">
        <Button primary={true} onClick={props.addTask}>
          <Plus />
        </Button>
      </div>
    </div>
  )
};

export default Header;
