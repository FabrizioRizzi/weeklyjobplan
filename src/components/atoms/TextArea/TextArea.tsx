import './TextArea.scss';

export interface TextAreaProps {
  value?: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextArea: React.FC<TextAreaProps> = ({ value, onChange }: TextAreaProps) => (
  <textarea className="TextArea" rows={5} onChange={onChange} value={value} />
);

export default TextArea;
