import './Header.css';

export interface HeaderProps {
  week: number;
}

const Header: React.FC<HeaderProps> = (props) => {
  return (
    <div className="header">Settimana {props.week}</div>
  )
};

export default Header;
