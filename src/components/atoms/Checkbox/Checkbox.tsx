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
    <div className="Checkbox__Checkbox" onClick={check}>
      {checked && <div className="Checkbox__Checked" />}
    </div>
  );
};

export default Checkbox;
