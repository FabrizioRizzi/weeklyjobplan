import './TextInput.scss';

export interface TextInputProps {
  type?: 'email' | 'number' | 'password' | 'text';
  value?: string | number;
  minValue?: number;
  maxValue?: number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextInput: React.FC<TextInputProps> = ({
  type, value, onChange, minValue, maxValue,
}: TextInputProps) => (
  <input
    className="TextInput"
    type={type || 'text'}
    value={value}
    onChange={onChange}
    min={minValue}
    max={maxValue}
    autoComplete="off"
  />
);

export default TextInput;
