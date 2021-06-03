import './Checkbox.scss';

export interface CheckboxProps {
  checked?: boolean;
  onChange: (checked: boolean) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ checked, onChange }: CheckboxProps) => {
  const check = () => {
    onChange(!checked);
  };

  return (
    <div className="Checkbox__Checkbox" role="checkbox" tabIndex={0} aria-checked={checked} onClick={check}>
      {checked && <div className="Checkbox__Checked" />}
    </div>
  );
};

export default Checkbox;
