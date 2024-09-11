import Stars from '@components/atoms/Stars/Stars';
import React from 'react';
import { Check, Clock } from 'react-feather';
import { Todo } from '@/sharedInterfaces';
import './TodoRow.scss';

interface IdeaProps {
  todo: Todo;
  updateTodo: (todo: Todo) => void;
}

const TodoRow = ({ todo, updateTodo }: IdeaProps) => {
  const onUpdateIdea = () => updateTodo(todo);
  return (
    <div className="TodoRow__Container">
      <div onClick={onUpdateIdea} className="TodoRow__Title">{todo.title}</div>
      <div>
        {todo.onHold && <Clock />}
        {todo.done && <Check />}
      </div>
      <div className="TodoRow__Stars">
        <Stars priority={todo.priority} />
      </div>
    </div>
  );
};
export default React.memo(TodoRow);
