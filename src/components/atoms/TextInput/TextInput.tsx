import './TextInput.scss';

export interface TextInputProps {
  value?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const TextInput: React.FC<TextInputProps> = (props) => {
  return (
    <input className="TextInput" type="text" onChange={props.onChange} />
  )
};

export default TextInput;
