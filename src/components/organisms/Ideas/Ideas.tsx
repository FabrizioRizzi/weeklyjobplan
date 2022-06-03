import React from 'react';
import { PenTool } from 'react-feather';
import { Idea } from 'sharedInterfaces';
import './Ideas.scss';

export interface IdeasProps {
  ideas: Idea[];
}

const Ideas: React.FC<IdeasProps> = ({ ideas }: IdeasProps) => (
  <div className="Ideas__Container">
    <div className="Ideas__Title">
      <div>
        <PenTool />
      </div>
      <div>Ideas</div>
    </div>
    {ideas.map((idea) => (
      <div key={idea.id}>{idea.title}</div>
    ))}
  </div>
);

export default React.memo(Ideas);
