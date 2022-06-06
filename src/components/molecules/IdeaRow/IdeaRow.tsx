import Stars from 'components/atoms/Stars/Stars';
import UpdateIdeaModal from 'components/organisms/UpdateIdeaModal/UpdateIdeaModal';
import React, { useCallback, useState } from 'react';
import { Idea } from 'sharedInterfaces';
import './IdeaRow.scss';

interface IdeaProps {
  idea: Idea;
  coll: string;
}

const IdeaRow = ({ idea, coll }: IdeaProps) => {
  const [showAddUpdateModal, setShowAddUpdateModal] = useState<boolean>(false);

  const openModal = useCallback(() => setShowAddUpdateModal(true), []);
  const closeModal = useCallback(() => setShowAddUpdateModal(false), []);

  return (
    <div className="IdeaRow__Container">
      <div onClick={openModal} className="IdeaRow__Title">{idea.title}</div>
      <Stars priority={idea.priority} />
      <UpdateIdeaModal
        isVisible={showAddUpdateModal}
        closeModal={closeModal}
        coll={coll}
        idea={idea}
      />
    </div>
  );
};
export default React.memo(IdeaRow);
