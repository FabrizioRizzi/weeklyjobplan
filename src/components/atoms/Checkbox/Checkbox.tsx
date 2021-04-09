import './Checkbox.css';

export interface CheckboxProps {
  checked?: boolean;
  onChange: (checked: boolean) => void;
};

const Checkbox: React.FC<CheckboxProps> = (props) => {
  const check = () => {
    props.onChange(!props.checked);
  }

  return (
    <div className={props.checked ? "CheckboxChecked" : "Checkbox"} onClick={check}>Prova</div>
  )
};

export default Checkbox;
