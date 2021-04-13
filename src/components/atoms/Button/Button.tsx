import './Button.scss';

export interface ButtonProps {
  primary: boolean;
  onClick: () => void;
};

const Button: React.FC<ButtonProps> = (props) => {
  return (
    <div className={props.primary ? "Button__Button--primary" : "Button__Button--secondary"} onClick={props.onClick}>{props.children}</div>
  )
};

export default Button;
