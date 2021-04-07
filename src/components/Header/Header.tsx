import Button from '../Button/Button';
import './Header.css';

export interface HeaderProps {
  week: number;
  previousWeek: () => void;
  nextWeek: () => void;
}

const Header: React.FC<HeaderProps> = (props) => {
  return (
    <div className="header">
      <Button primary={true} title="Prima" onClick={props.previousWeek} />
      <span>Settimana {props.week || ''}</span>
      <Button primary={true} title="Dopo" onClick={props.nextWeek} />
    </div>
  )
};

export default Header;
