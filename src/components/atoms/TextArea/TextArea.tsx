import React from 'react';
import './TextArea.scss';

export interface TextAreaProps {
  value?: string;
  rows?: number;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextArea: React.FC<TextAreaProps> = ({ value, rows = 5, onChange }: TextAreaProps) => (
  <textarea className="TextArea" rows={rows} onChange={onChange} value={value} />
);

export default React.memo(TextArea);
