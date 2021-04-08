import './Button.css';

export interface ButtonProps {
  primary: boolean;
  title: string;
  onClick: () => void;
};

const Button: React.FC<ButtonProps> = (props) => {
  return (
    <div className="Button" onClick={props.onClick}>{props.title}</div>
  )
};

export default Button;
