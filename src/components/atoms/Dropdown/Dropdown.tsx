import { useState } from 'react';
import './Dropdown.scss';

export interface DropdownProps {
  options: string[];
  onChange: (option: string) => void;
}

const Dropdown: React.FC<DropdownProps> = (props) => {
  const [showOptions, setShowOptions] = useState<boolean>(false);

  const show = () => {
    setShowOptions(true);
  }

  const hide = (event?: any) => {
    console.log(event)
    setShowOptions(false);
  }

  const setValue = (option: string) => {
    props.onChange(option);
    hide();
  }

  return (
    <>
    <input className="Dropdown" onFocus={show} onBlur={hide} />
    {showOptions && <div>{props.options.map(option => <div onClick={() => setValue(option)}>{option}</div>)}</div>}
    </>
  )
};

export default Dropdown;