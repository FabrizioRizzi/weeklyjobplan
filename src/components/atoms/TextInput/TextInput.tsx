import './TextInput.scss';

export interface TextInputProps {
  type?: 'email' | 'number' | 'password' | 'text';
  value?: string | number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextInput: React.FC<TextInputProps> = ({ type, value, onChange }: TextInputProps) => (
  <input className="TextInput" type={type || 'text'} value={value} onChange={onChange} />
);

export default TextInput;
