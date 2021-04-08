import Button from '../../atoms/Button/Button';
import './Header.css';

export interface HeaderProps {
  week: number;
  previousWeek: () => void;
  nextWeek: () => void;
  resetWeek: () => void;
}

const Header: React.FC<HeaderProps> = (props) => {
  return (
    <div className="header">
      <div className="buttons">
        <Button primary={true} title="Prima" onClick={props.previousWeek} />
        <Button primary={true} title="Dopo" onClick={props.nextWeek} />
        <Button primary={true} title="Reset" onClick={props.resetWeek} />
      </div>
      <span>Settimana {props.week || ''}</span>
      <Button primary={true} title="Aggiungi" onClick={() => console.log('ciao')} />
    </div>
  )
};

export default Header;
