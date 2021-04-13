import './TextInput.scss';

export interface TextInputProps {
  type?: "email" | "number" | "password" | "text";
  value?: string | number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const TextInput: React.FC<TextInputProps> = (props) => {
  return (
    <input className="TextInput" type={props.type || 'text'} value={props.value} onChange={props.onChange} />
  )
};

export default TextInput;
