import React, { useCallback, useEffect, useState } from 'react';
import {
  addTodo, deleteTodo, getTodoSteps, updateTodo,
} from 'firebaseUtils/firebase';
import { CreateTodoRequest, Todo } from 'sharedInterfaces';
import Modal from 'components/atoms/Modal/Modal';
import TextInput from 'components/atoms/TextInput/TextInput';
import TextArea from 'components/atoms/TextArea/TextArea';
import Button from 'components/atoms/Button/Button';
import { getDocs } from 'firebase/firestore';

export interface UpdateTodoModalProps {
  isVisible: boolean;
  coll: string;
  todo: Todo | CreateTodoRequest;
  closeModal: () => void;
}

const UpdateTodoModal: React.FC<UpdateTodoModalProps> = ({
  isVisible, coll, todo, closeModal,
}: UpdateTodoModalProps) => {
  const [title, setTitle] = useState<string>(todo.title);
  const [description, setDescription] = useState<string>(todo.description || '');
  const [priority, setPriority] = useState<0 | 1 | 2>(todo.priority);
  const [loadingAddUpdate, setLoadingAddUpdate] = useState<boolean>(false);
  const [loadingDelete, setLoadingDelete] = useState<boolean>(false);
  const [steps, setSteps] = useState<any>([]);

  useEffect(() => {
    setTitle(todo.title || '');
    setDescription(todo.description || '');
    setPriority(todo.priority || 0);
  }, [todo]);

  useEffect(() => {
    if ('id' in todo) {
      const loadSteps = async () => {
        const querySnapshot = await getDocs(getTodoSteps(coll, todo.id));
        const parsedSteps = querySnapshot.docs.map((rawSteps) => (
          { id: rawSteps.id, ...rawSteps.data() }
        ));
        setSteps(parsedSteps);
      };
      loadSteps();
    }
  }, [todo]);

  const changeTitle = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  }, []);

  const changeDescription = useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value);
  }, []);

  const changePriority = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setPriority(Number(event.target.value) as 0 | 1 | 2);
  }, []);

  const onAddTodo = async () => {
    setLoadingAddUpdate(true);
    const request = {
      title, description, priority,
    };
    await addTodo(coll, request);
    setLoadingAddUpdate(false);
    closeModal();
  };

  const onUpdateTodo = async () => {
    if ('id' in todo) {
      setLoadingAddUpdate(true);
      const request = {
        title, description, priority,
      };
      await updateTodo(coll, todo.id, request);
      setLoadingAddUpdate(false);
      closeModal();
    }
  };

  const deleteSelectedTodo = async () => {
    if ('id' in todo) {
      setLoadingDelete(true);
      await deleteTodo(coll, todo.id);
      setLoadingDelete(false);
      closeModal();
    }
  };

  return (
    <Modal
      isVisible={isVisible}
      closeModal={closeModal}
      title="Aggiungi Todo"
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

          {JSON.stringify(steps)}
        </div>

        {'id' in todo
          ? (
            <div className="Modal__Buttons">
              <Button
                primary={false}
                onClick={deleteSelectedTodo}
                loading={loadingDelete}
              >
                Cancella
              </Button>
              <Button
                primary
                onClick={onUpdateTodo}
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
                onClick={onAddTodo}
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

export default React.memo(UpdateTodoModal);
