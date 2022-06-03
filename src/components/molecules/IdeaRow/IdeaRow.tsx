import Stars from 'components/atoms/Stars/Stars';
import React from 'react';
import { Idea } from 'sharedInterfaces';
import './IdeaRow.scss';

interface IdeaProps {
  idea: Idea;
}

const IdeaRow = ({ idea }: IdeaProps) => (
  <div className="IdeaRow__Container">
    <div>{idea.title}</div>
    <Stars priority={idea.priority} />
  </div>
);

export default React.memo(IdeaRow);
