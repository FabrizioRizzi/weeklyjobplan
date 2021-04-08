import './TextInput.css';

export interface TextInputProps {
  value?: string;
};

const TextInput: React.FC<TextInputProps> = (props) => {
  return (
    <input className="TextInput" type="text" placeholder="ciao"/>
  )
};

export default TextInput;
