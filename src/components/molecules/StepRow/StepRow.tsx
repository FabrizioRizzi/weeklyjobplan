import Checkbox from '@components/atoms/Checkbox/Checkbox';
import Loading from '@components/atoms/Loading/Loading';
import TextArea from '@components/atoms/TextArea/TextArea';
import { deleteStep, updateLastUpdateTodo, updateStep } from '@firebaseUtils/firebase';
import { TodosContext } from '@pages/Sorint';
import React, { useCallback, useContext, useState } from 'react';
import { Check, Trash2 } from 'react-feather';
import { Step } from '@/sharedInterfaces';
import './StepRow.scss';

interface IdeaProps {
  step: Step;
  todoId: string;
}

const StepRow = ({ step, todoId } : IdeaProps) => {
  const [description, setDescription] = useState<string>(step.description);
  const [done, setDone] = useState<boolean>(step.done);
  const [loadingUpdate, setLoadingUpdate] = useState<boolean>(false);
  const coll = useContext(TodosContext);

  const changeDescription = useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value);
  }, []);

  const changeDone = useCallback((checked: boolean) => {
    setDone(checked);
  }, []);

  const onUpdateStep = async () => {
    setLoadingUpdate(true);
    await updateStep(coll, todoId, { id: step.id, description, done });
    await updateLastUpdateTodo(coll, todoId, new Date());
    setLoadingUpdate(false);
  };

  const onDeleteStep = () => {
    deleteStep(coll, todoId, step.id);
    updateLastUpdateTodo(coll, todoId, new Date());
  };

  return (
    <div className="StepRow__Container">
      <TextArea onChange={changeDescription} rows={3} value={description} />
      <Checkbox checked={done} onChange={changeDone} />
      <Trash2 className="Steps__NewStep--delete" onClick={onDeleteStep} />
      {loadingUpdate ? <Loading /> : <Check className="Steps__NewStep--add" onClick={onUpdateStep} />}
    </div>
  );
};

export default React.memo(StepRow);
