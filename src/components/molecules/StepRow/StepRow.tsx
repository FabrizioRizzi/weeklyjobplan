import Checkbox from 'components/atoms/Checkbox/Checkbox';
import TextInput from 'components/atoms/TextInput/TextInput';
import { SircleLeaderTodosContext } from 'pages/sorint/SircleLeader';
import React, { useContext } from 'react';
import { Check, Trash2 } from 'react-feather';
import { CreateStepRequest, Step } from 'sharedInterfaces';
import './StepRow.scss';

interface IdeaProps {
  step: Step | CreateStepRequest;
}

const StepRow = ({ step } : IdeaProps) => {
  const coll = useContext(SircleLeaderTodosContext);
  console.log('aaaaa', coll);

  return (
    <div className="StepRow__Container">
      <TextInput onChange={() => console.log('ciao')} value={step.description} />
      <Checkbox checked={step.done} onChange={() => console.log('ciao')} />
      <Trash2 />
      <Check />
    </div>
  );
};

export default React.memo(StepRow);
