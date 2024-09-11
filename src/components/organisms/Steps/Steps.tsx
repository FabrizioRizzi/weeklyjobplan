import Button from '@components/atoms/Button/Button';
import Checkbox from '@components/atoms/Checkbox/Checkbox';
import Loading from '@components/atoms/Loading/Loading';
import TextArea from '@components/atoms/TextArea/TextArea';
import StepRow from '@components/molecules/StepRow/StepRow';
import { onSnapshot } from 'firebase/firestore';
import { addStep, getTodoSteps, updateLastUpdateTodo } from '@firebaseUtils/firebase';
import { TodosContext } from '@pages/Sorint';
import React, {
  useCallback, useContext, useEffect, useState,
} from 'react';
import { Check, Plus } from 'react-feather';
import { Step } from '@/sharedInterfaces';
import './Steps.scss';

export interface StepsProps {
  todoId: string;
}

const Steps = ({ todoId }: StepsProps) => {
  const [steps, setSteps] = useState<Step[]>([]);
  const [showNewStep, setShowNewStep] = useState<boolean>(false);
  const [description, setDescription] = useState<string>('');
  const [done, setDone] = useState<boolean>(false);
  const [loadingSteps, setLoadingSteps] = useState<boolean>(false);
  const coll = useContext(TodosContext);

  const onShowNewStep = () => setShowNewStep(true);

  const onAddStep = () => {
    addStep(coll, todoId, { description, done });
    updateLastUpdateTodo(coll, todoId, new Date());
    setShowNewStep(false);
  };

  const changeDescription = useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value);
  }, []);

  const changeDone = useCallback((checked: boolean) => {
    setDone(checked);
  }, []);

  useEffect(() => {
    setLoadingSteps(true);
    const getStepsSubscription = onSnapshot(getTodoSteps(coll, todoId), (querySnapshot) => {
      const parsedSteps = querySnapshot.docs.map((rawSteps) => (
        { id: rawSteps.id, ...rawSteps.data() }
      )) as Step[];
      setSteps(parsedSteps);
      setLoadingSteps(false);
    });
    return () => getStepsSubscription();
  }, []);

  return loadingSteps ? <Loading /> : (
    <div className="UpdateTodoModal__Steps">
      <h2 className="Steps__Title">Steps</h2>
      {steps.length ? (
        <>
          {steps.map((step) => (
            <StepRow key={step.id} todoId={todoId} step={step} />
          ))}
        </>
      ) : null}
      {showNewStep ? (
        <div className="Steps__NewStep">
          <TextArea onChange={changeDescription} rows={3} value={description} />
          <Checkbox checked={done} onChange={changeDone} />
          <Check className="Steps__NewStep--add" onClick={onAddStep} />
        </div>
      ) : <Button primary onClick={onShowNewStep}><Plus /></Button>}
    </div>
  );
};

export default React.memo(Steps);
