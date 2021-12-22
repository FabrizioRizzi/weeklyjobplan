import React, { useCallback, useEffect, useState } from 'react';
import { addTask, deleteTask, updateTask } from 'firebaseUtils/firebase';
import { CreateTaskRequest, TaskInterface } from 'sharedInterfaces';
import Modal from 'components/atoms/Modal/Modal';
import TextInput from 'components/atoms/TextInput/TextInput';
import TextArea from 'components/atoms/TextArea/TextArea';
import Button from 'components/atoms/Button/Button';
import './UpdateTaskModal.scss';

export interface UpdateTaskModalProps {
  isVisible: boolean;
  task: TaskInterface | CreateTaskRequest;
  closeModal: () => void;
}

const UpdateTaskModal: React.FC<UpdateTaskModalProps> = ({
  isVisible, task, closeModal,
}: UpdateTaskModalProps) => {
  const [name, setName] = useState<string>(task.name);
  const [dayIndex, setDayIndex] = useState<number>(task.dayIndex);
  const [done, setDone] = useState<boolean>(task.done);
  const [week, setWeek] = useState<number>(task.week);
  const [year, setYear] = useState<number>(task.year);
  const [description, setDescription] = useState<string>(task.description || '');
  const [length, setLength] = useState<number>(task.length || 0);
  const [loadingAddUpdate, setLoadingAddUpdate] = useState<boolean>(false);
  const [loadingDelete, setLoadingDelete] = useState<boolean>(false);

  useEffect(() => {
    setName(task.name);
    setDayIndex(task.dayIndex);
    setDone(task.done);
    setWeek(task.week);
    setYear(task.year);
    setDescription(task.description || '');
    setLength(task.length || 0);
  }, [task]);

  const changeName = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  }, []);

  const changeDescription = useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value);
  }, []);

  const changeDay = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setDayIndex(Number(event.target.value));
  }, []);

  const changeWeek = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setWeek(Number(event.target.value));
  }, []);

  const changeYear = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setYear(Number(event.target.value));
  }, []);

  const changeLength = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setLength(Number(event.target.value));
  }, []);

  const onAddTask = async () => {
    setLoadingAddUpdate(true);
    const request = {
      name, dayIndex, done, week, year, description, length,
    };
    await addTask(request);
    setLoadingAddUpdate(false);
    closeModal();
  };

  const onUpdateTask = async () => {
    if ('id' in task) {
      setLoadingAddUpdate(true);
      const request = {
        name, dayIndex, done, week, year, description, length,
      };
      await updateTask(task.id, request);
      setLoadingAddUpdate(false);
      closeModal();
    }
  };

  const deleteSelectedTask = async () => {
    if ('id' in task) {
      setLoadingDelete(true);
      await deleteTask(task.id);
      setLoadingDelete(false);
      closeModal();
    }
  };

  return (
    <Modal
      isVisible={isVisible}
      closeModal={closeModal}
      title="Aggiungi Task"
      width={window.innerWidth < 400 ? window.innerWidth : 400}
    >
      <form>
        <div className="UpdateTaskModal__Fields">

          <div>Name</div>
          <TextInput onChange={changeName} value={name} />

          <div>Description</div>
          <TextArea onChange={changeDescription} value={description} />

          <div>Day</div>
          <TextInput onChange={changeDay} value={dayIndex} type="number" />

          <div>Week</div>
          <TextInput onChange={changeWeek} value={week} type="number" />

          <div>Year</div>
          <TextInput onChange={changeYear} value={year} type="number" />

          <div>Length</div>
          <TextInput onChange={changeLength} value={length} type="number" />
        </div>

        {'id' in task
          ? (
            <div className="UpdateTaskModal__Buttons">
              <Button
                primary={false}
                onClick={deleteSelectedTask}
                loading={loadingDelete}
              >
                Cancella
              </Button>
              <Button
                primary
                onClick={onAddTask}
                loading={loadingAddUpdate}
              >
                Duplica
              </Button>
              <Button
                primary
                onClick={onUpdateTask}
                loading={loadingAddUpdate}
              >
                Aggiorna
              </Button>
            </div>
          )
          : (
            <div className="UpdateTaskModal__Add">
              <Button
                primary
                onClick={onAddTask}
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

export default React.memo(UpdateTaskModal);
