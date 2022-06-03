import React from 'react';
import { Edit } from 'react-feather';
import { Todo } from 'sharedInterfaces';
import './Todos.scss';

export interface TodosProps {
  todos: Todo[];
}

const Todos: React.FC<TodosProps> = ({ todos }: TodosProps) => (
  <div className="Todos__Container">
    <div className="Todos__Title">
      <div>
        <Edit />
      </div>
      <div>Todos</div>
    </div>
    {todos.map((idea) => (
      <div key={idea.id}>{idea.title}</div>
    ))}
  </div>
);

export default React.memo(Todos);
