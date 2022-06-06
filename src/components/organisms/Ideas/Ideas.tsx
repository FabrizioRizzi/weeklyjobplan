import Button from 'components/atoms/Button/Button';
import IdeaRow from 'components/molecules/IdeaRow/IdeaRow';
import React, { useCallback, useState } from 'react';
import { PenTool, Plus } from 'react-feather';
import { Idea } from 'sharedInterfaces';
import UpdateIdeaModal from '../UpdateIdeaModal/UpdateIdeaModal';
import './Ideas.scss';

export interface IdeasProps {
  ideas: Idea[];
  coll: string;
}

const Ideas: React.FC<IdeasProps> = ({ ideas, coll }: IdeasProps) => {
  const [showAddUpdateModal, setShowAddUpdateModal] = useState<boolean>(false);

  const openModal = useCallback(() => setShowAddUpdateModal(true), []);
  const closeModal = useCallback(() => setShowAddUpdateModal(false), []);

  return (
    <div className="Ideas__Container">
      <div className="Ideas__Title">
        <div>
          <PenTool />
        </div>
        <div>Ideas</div>
        <Button primary onClick={openModal}><Plus /></Button>
      </div>
      {ideas.map((idea) => <IdeaRow key={idea.id} coll={coll} idea={idea} />)}

      <UpdateIdeaModal
        isVisible={showAddUpdateModal}
        closeModal={closeModal}
        coll={coll}
        idea={{ title: '', description: '', priority: 0 }}
      />
    </div>
  );
};

export default React.memo(Ideas);
