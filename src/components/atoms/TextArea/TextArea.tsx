import './TextArea.scss';

export interface TextAreaProps {
  value?: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

const TextInput: React.FC<TextAreaProps> = (props) => {
  return (
    <textarea className="TextArea" rows={5} onChange={props.onChange} value={props.value} />
  )
};

export default TextInput;
