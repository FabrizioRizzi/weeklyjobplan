import './Checkbox.css';

export interface CheckboxProps {
  checked?: boolean;
  onChange: () => {};
};

const Checkbox: React.FC<CheckboxProps> = (props) => {
  return (
    <input className="Checkbox" type="checkbox" checked={props.checked} onChange={props.onChange}/>
  )
};

export default Checkbox;
