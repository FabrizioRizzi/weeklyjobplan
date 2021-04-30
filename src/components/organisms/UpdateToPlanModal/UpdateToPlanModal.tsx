import { useEffect, useState } from 'react';
import { addTaskToPlan, deleteTaskToPlan, updateTaskToPlan } from 'firebaseUtils/firebase';
import { CreateTaskToPlanRequest, TaskToPlanInterface } from 'sharedInterfaces';
import Modal from 'components/atoms/Modal/Modal';
import TextInput from 'components/atoms/TextInput/TextInput';
import TextArea from 'components/atoms/TextArea/TextArea';
import Button from 'components/atoms/Button/Button';
import './UpdateToPlanModal.scss';

export interface UpdateToPlanModalProps {
  isVisible: boolean;
  taskToPlan: TaskToPlanInterface | CreateTaskToPlanRequest;
  closeModal: () => void;
}

const UpdateToPlanModal: React.FC<UpdateToPlanModalProps> = ({
  isVisible, taskToPlan, closeModal,
}: UpdateToPlanModalProps) => {
  const [name, setName] = useState<string>(taskToPlan.name);
  const [description, setDescription] = useState<string>(taskToPlan.description);
  const [priority, setPriority] = useState<0 | 1 | 2>(taskToPlan.priority);
  const [loadingAddUpdate, setLoadingAddUpdate] = useState<boolean>(false);
  const [loadingDelete, setLoadingDelete] = useState<boolean>(false);

  useEffect(() => {
    setName(taskToPlan.name);
    setDescription(taskToPlan.description || '');
    setPriority(taskToPlan.priority || 0);
  }, [taskToPlan]);

  const changeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const changeDescription = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value);
  };

  const changePriority = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPriority(Number(event.target.value) as 0 | 1 | 2);
  };

  const onAddTaskToPlan = async () => {
    setLoadingAddUpdate(true);
    const request = {
      name, description, priority,
    };
    await addTaskToPlan(request);
    setLoadingAddUpdate(false);
    closeModal();
  };

  const onUpdateTaskToPlan = async () => {
    if ('id' in taskToPlan) {
      setLoadingAddUpdate(true);
      const request = {
        name, description, priority,
      };
      await updateTaskToPlan(taskToPlan.id, request);
      setLoadingAddUpdate(false);
      closeModal();
    }
  };

  const deleteSelectedTask = async () => {
    if ('id' in taskToPlan) {
      setLoadingDelete(true);
      await deleteTaskToPlan(taskToPlan.id);
      setLoadingDelete(false);
      closeModal();
    }
  };

  return (
    <Modal isVisible={isVisible} closeModal={closeModal} title="Aggiungi Task" width={400}>
      <form>
        <div className="UpdateTaskModal__Fields">

          <div>Name</div>
          <TextInput onChange={changeName} value={name} />

          <div>Description</div>
          <TextArea onChange={changeDescription} value={description} />

          <div>Priority</div>
          <TextInput onChange={changePriority} value={priority} minValue={0} maxValue={2} type="number" />
        </div>

        {'id' in taskToPlan
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
                onClick={onUpdateTaskToPlan}
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
                onClick={onAddTaskToPlan}
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

export default UpdateToPlanModal;
