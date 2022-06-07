import Button from 'components/atoms/Button/Button';
import TodoRow from 'components/molecules/TodoRow/TodoRow';
import React, { useCallback, useState } from 'react';
import { Edit, Plus } from 'react-feather';
import { CreateTodoRequest, Todo } from 'sharedInterfaces';
import UpdateTodoModal from '../UpdateTodoModal/UpdateTodoModal';
import './Todos.scss';

export interface TodosProps {
  coll: string;
  todos: Todo[];
}

const emptyTodo = {
  title: '',
  description: '',
  priority: 0 as 0 | 1 | 2,
  onHold: false,
  lastUpdate: new Date(),
};

const Todos: React.FC<TodosProps> = ({ coll, todos }: TodosProps) => {
  const [showAddUpdateModal, setShowAddUpdateModal] = useState<boolean>(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | CreateTodoRequest>(emptyTodo);

  const closeModal = useCallback(() => setShowAddUpdateModal(false), []);

  const updateSelectedTodo = useCallback((todo: Todo) => {
    setSelectedTodo(todo);
    setShowAddUpdateModal(true);
  }, []);

  const addTodo = useCallback(() => {
    setSelectedTodo(emptyTodo);
    setShowAddUpdateModal(true);
  }, []);

  return (
    <div className="Todos__Container">
      <div className="Todos__Title">
        <div>
          <Edit />
        </div>
        <div>Todos</div>
        <Button primary onClick={addTodo}><Plus /></Button>
      </div>
      {todos.map((todo) => <TodoRow key={todo.id} todo={todo} updateTodo={updateSelectedTodo} />)}
      <UpdateTodoModal
        isVisible={showAddUpdateModal}
        closeModal={closeModal}
        coll={coll}
        todo={selectedTodo}
      />
    </div>
  );
};

export default React.memo(Todos);
