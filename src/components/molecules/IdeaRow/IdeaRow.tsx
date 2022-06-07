import Stars from 'components/atoms/Stars/Stars';
import React from 'react';
import { Idea } from 'sharedInterfaces';
import './IdeaRow.scss';

interface IdeaProps {
  idea: Idea;
  updateIdea: (idea: Idea) => void;
}

const IdeaRow = ({ idea, updateIdea }: IdeaProps) => {
  const onUpdateIdea = () => updateIdea(idea);
  return (
    <div className="IdeaRow__Container">
      <div onClick={onUpdateIdea} className="IdeaRow__Title">{idea.title}</div>
      <div className="IdeaRow__Stars">
        <Stars priority={idea.priority} />
      </div>
    </div>
  );
};
export default React.memo(IdeaRow);
