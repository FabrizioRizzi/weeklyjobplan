import './Checkbox.scss';

export interface CheckboxProps {
  checked?: boolean;
  onChange: (checked: boolean) => void;
};

const Checkbox: React.FC<CheckboxProps> = (props) => {
  const check = () => {
    props.onChange(!props.checked);
  }

  return (
    <div className="Checkbox__Checkbox" onClick={check}>
      {props.checked && <div className="Checkbox__Checked"></div>}
    </div>
  )
};

export default Checkbox;
