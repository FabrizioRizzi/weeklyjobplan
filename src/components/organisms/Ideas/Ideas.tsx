import Button from '@components/atoms/Button/Button';
import IdeaRow from '@components/molecules/IdeaRow/IdeaRow';
import React, { useCallback, useState } from 'react';
import { PenTool, Plus } from 'react-feather';
import { CreateIdeaRequest, Idea } from '@/sharedInterfaces';
import UpdateIdeaModal from '../UpdateIdeaModal/UpdateIdeaModal';
import './Ideas.scss';

export interface IdeasProps {
  ideas: Idea[];
}

const emptyIdea = { title: '', description: '', priority: 0 as 0 | 1 | 2 };

const Ideas: React.FC<IdeasProps> = ({ ideas }: IdeasProps) => {
  const [showAddUpdateModal, setShowAddUpdateModal] = useState<boolean>(false);
  const [selectedIdea, setSelectedIdea] = useState<Idea | CreateIdeaRequest>(emptyIdea);

  const closeModal = useCallback(() => setShowAddUpdateModal(false), []);

  const updateSelectedIdea = useCallback((idea: Idea) => {
    setSelectedIdea(idea);
    setShowAddUpdateModal(true);
  }, []);

  const addIdea = useCallback(() => {
    setSelectedIdea(emptyIdea);
    setShowAddUpdateModal(true);
  }, []);

  return (
    <div className="Ideas__Container">
      <div className="Ideas__Title">
        <div>
          <PenTool />
        </div>
        <div>Ideas</div>
        <Button primary onClick={addIdea}><Plus /></Button>
      </div>
      {ideas.map((idea) => <IdeaRow key={idea.id} idea={idea} updateIdea={updateSelectedIdea} />)}

      <UpdateIdeaModal
        isVisible={showAddUpdateModal}
        closeModal={closeModal}
        idea={selectedIdea}
      />
    </div>
  );
};

export default React.memo(Ideas);
