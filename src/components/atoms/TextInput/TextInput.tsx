import './TextInput.scss';

export interface TextInputProps {
  value?: string | number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const TextInput: React.FC<TextInputProps> = (props) => {
  return (
    <input className="TextInput" type="text" value={props.value} onChange={props.onChange} />
  )
};

export default TextInput;
