import React, { useEffect, useState } from 'react';
import Loading from '@components/atoms/Loading/Loading';
import Ideas from '@components/organisms/Ideas/Ideas';
import Todos from '@components/organisms/Todos/Todos';
import { onSnapshot } from 'firebase/firestore';
import { getIdeas, getTodos } from '@firebaseUtils/firebase';
import { IdeasContext, TodosContext } from '@pages/Sorint';
import { Idea, Todo } from '@/sharedInterfaces';
import './TalentHandler.scss';

const TalentHandler = () => {
  const [talentHandlerIdeas, setTalentHandlerIdeas] = useState<Idea[]>([]);
  const [talentHandlerTodos, setTalentHandlerTodos] = useState<Todo[]>([]);
  const [loadingIdeas, setLoadingIdeas] = useState<boolean>(true);
  const [loadingTodos, setLoadingTodos] = useState<boolean>(true);

  useEffect(() => {
    const getTalentHandlerIdeasSubs = onSnapshot(getIdeas('talentHandlerIdeas'), (querySnapshot) => {
      const parsedTalentIdea = querySnapshot.docs.map((talentHandlerIdea) => (
        { id: talentHandlerIdea.id, ...talentHandlerIdea.data() }
      )) as Idea[];
      const sortedIdeas = parsedTalentIdea.sort((a, b) => (a.priority < b.priority ? 1 : -1));
      setTalentHandlerIdeas(sortedIdeas);
      setLoadingIdeas(false);
    });
    return () => getTalentHandlerIdeasSubs();
  }, []);

  useEffect(() => {
    const getTalentHandlerTodosSubscription = onSnapshot(getTodos('talentHandlerTodos'), (querySnapshot) => {
      const parsedTodos = querySnapshot.docs.map((TalentHandlerIdea) => (
        { id: TalentHandlerIdea.id, ...TalentHandlerIdea.data() }
      )) as Todo[];
      const sortedTodos = parsedTodos.sort((a, b) => (a.priority < b.priority ? 1 : -1));
      setTalentHandlerTodos(sortedTodos);
      setLoadingTodos(false);
    });
    return () => getTalentHandlerTodosSubscription();
  }, []);
  return loadingIdeas || loadingTodos
    ? <Loading />
    : (
      <div className="TalentHandler__Container">
        <IdeasContext.Provider value="talentHandlerIdeas">
          <Ideas ideas={talentHandlerIdeas} />
        </IdeasContext.Provider>
        <TodosContext.Provider value="talentHandlerTodos">
          <Todos todos={talentHandlerTodos} />
        </TodosContext.Provider>
      </div>
    );
};

export default React.memo(TalentHandler);
