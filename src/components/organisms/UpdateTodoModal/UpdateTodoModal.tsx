import React, {
  useCallback, useContext, useEffect, useState,
} from 'react';
import {
  addTodo, deleteTodo, getTodoSteps, updateTodo,
} from 'firebaseUtils/firebase';
import {
  CreateStepRequest, CreateTodoRequest, Step, Todo,
} from 'sharedInterfaces';
import Modal from 'components/atoms/Modal/Modal';
import TextInput from 'components/atoms/TextInput/TextInput';
import TextArea from 'components/atoms/TextArea/TextArea';
import Button from 'components/atoms/Button/Button';
import { getDocs } from 'firebase/firestore';
import Checkbox from 'components/atoms/Checkbox/Checkbox';
import dayjs from 'dayjs';
import './UpdateTodoModal.scss';
import StepRow from 'components/molecules/StepRow/StepRow';
import { Plus } from 'react-feather';
import { SircleLeaderTodosContext } from 'pages/sorint/SircleLeader';

export interface UpdateTodoModalProps {
  isVisible: boolean;
  todo: Todo | CreateTodoRequest;
  closeModal: () => void;
}

const UpdateTodoModal: React.FC<UpdateTodoModalProps> = ({
  isVisible, todo, closeModal,
}: UpdateTodoModalProps) => {
  const [title, setTitle] = useState<string>(todo.title);
  const [description, setDescription] = useState<string>(todo.description || '');
  const [priority, setPriority] = useState<0 | 1 | 2>(todo.priority);
  const [onHold, setOnHold] = useState<boolean>(todo.onHold);
  const [loadingAddUpdate, setLoadingAddUpdate] = useState<boolean>(false);
  const [loadingDelete, setLoadingDelete] = useState<boolean>(false);
  const [steps, setSteps] = useState<(Step | CreateStepRequest)[]>([]);
  const coll = useContext(SircleLeaderTodosContext);

  useEffect(() => {
    setTitle(todo.title || '');
    setDescription(todo.description || '');
    setPriority(todo.priority || 0);
    setOnHold(todo.onHold || false);
    setSteps([]);
  }, [todo]);

  useEffect(() => {
    if ('id' in todo) {
      const loadSteps = async () => {
        const querySnapshot = await getDocs(getTodoSteps(coll, todo.id));
        const parsedSteps = querySnapshot.docs.map((rawSteps) => (
          { id: rawSteps.id, ...rawSteps.data() }
        ));
        setSteps(parsedSteps as Step[]);
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

  const changeOnHold = useCallback((checked: boolean) => {
    setOnHold(checked);
  }, []);

  const addStep = () => {
    setSteps((stepsa) => [...stepsa, { description: '', done: false }]);
  };

  const onAddTodo = async () => {
    setLoadingAddUpdate(true);
    const request = {
      title, description, priority, lastUpdate: new Date(),
    };
    await addTodo(coll, request);
    setLoadingAddUpdate(false);
    closeModal();
  };

  const onUpdateTodo = async () => {
    if ('id' in todo) {
      setLoadingAddUpdate(true);
      const request = {
        title, description, priority, onHold, lastUpdate: new Date(),
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

          <div>On Hold</div>
          <Checkbox onChange={changeOnHold} checked={onHold} />

          {'id' in todo && (
          <>
            <div>Last Update</div>
            <div>{dayjs(todo.lastUpdate).format('dddd DD MMMM , HH:mm')}</div>
          </>
          )}
        </div>

        <div className="UpdateTodoModal__Steps">
          {steps.length ? (
            <>
              <h2>Steps</h2>
              {steps.map((step) => <StepRow step={step} />)}
            </>
          ) : null}
          <Button primary onClick={addStep}><Plus /></Button>
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
