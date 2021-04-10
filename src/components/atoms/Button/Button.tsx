import './Button.css';

export interface ButtonProps {
  primary: boolean;
  onClick: () => void;
};

const Button: React.FC<ButtonProps> = (props) => {
  return (
    <div className="Button" onClick={props.onClick}>{props.children}</div>
  )
};

export default Button;
