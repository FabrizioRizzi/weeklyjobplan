import React, {
  useCallback, useContext, useEffect, useState,
} from 'react';
import { addIdea, deleteIdea, updateIdea } from 'firebaseUtils/firebase';
import { CreateIdeaRequest, Idea } from 'sharedInterfaces';
import Modal from 'components/atoms/Modal/Modal';
import TextInput from 'components/atoms/TextInput/TextInput';
import TextArea from 'components/atoms/TextArea/TextArea';
import Button from 'components/atoms/Button/Button';
import { IdeasContext } from 'pages/Sorint';

export interface UpdateIdeaModalProps {
  isVisible: boolean;
  idea: Idea | CreateIdeaRequest;
  closeModal: () => void;
}

const UpdateIdeaModal: React.FC<UpdateIdeaModalProps> = ({
  isVisible, idea, closeModal,
}: UpdateIdeaModalProps) => {
  const [title, setTitle] = useState<string>(idea.title);
  const [description, setDescription] = useState<string>(idea.description || '');
  const [priority, setPriority] = useState<0 | 1 | 2>(idea.priority);
  const [loadingAddUpdate, setLoadingAddUpdate] = useState<boolean>(false);
  const [loadingDelete, setLoadingDelete] = useState<boolean>(false);
  const coll = useContext(IdeasContext);

  useEffect(() => {
    setTitle(idea.title || '');
    setDescription(idea.description || '');
    setPriority(idea.priority || 0);
  }, [idea]);

  const changeTitle = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  }, []);

  const changeDescription = useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value);
  }, []);

  const changePriority = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setPriority(Number(event.target.value) as 0 | 1 | 2);
  }, []);

  const onAddIdea = async () => {
    setLoadingAddUpdate(true);
    const request = {
      title, description, priority,
    };
    await addIdea(coll, request);
    setLoadingAddUpdate(false);
    closeModal();
  };

  const onUpdateIdea = async () => {
    if ('id' in idea) {
      setLoadingAddUpdate(true);
      const request = {
        title, description, priority,
      };
      await updateIdea(coll, idea.id, request);
      setLoadingAddUpdate(false);
      closeModal();
    }
  };

  const deleteSelectedIdea = async () => {
    if ('id' in idea) {
      setLoadingDelete(true);
      await deleteIdea(coll, idea.id);
      setLoadingDelete(false);
      closeModal();
    }
  };

  return (
    <Modal
      isVisible={isVisible}
      closeModal={closeModal}
      title="Aggiungi Idea"
      width={window.innerWidth < 400 ? window.innerWidth : 400}
    >
      <form>
        <div className="Modal__Fields">

          <div>Title</div>
          <TextInput onChange={changeTitle} value={title} />

          <div>Description</div>
          <TextArea onChange={changeDescription} value={description} />

          <div>Priority</div>
          <TextInput type="number" minValue={0} maxValue={2} onChange={changePriority} value={priority} />

        </div>

        {'id' in idea
          ? (
            <div className="Modal__Buttons">
              <Button
                primary={false}
                onClick={deleteSelectedIdea}
                loading={loadingDelete}
              >
                Cancella
              </Button>
              <Button
                primary
                onClick={onUpdateIdea}
                loading={loadingAddUpdate}
              >
                Aggiorna
              </Button>
            </div>
          )
          : (
            <div className="Modal__Add">
              <Button
                primary
                onClick={onAddIdea}
                loading={loadingAddUpdate}
              >
                Aggiungi
              </Button>
            </div>
          )}
      </form>
    </Modal>
  );
};

export default React.memo(UpdateIdeaModal);
