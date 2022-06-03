import Loading from 'components/atoms/Loading/Loading';
import Ideas from 'components/organisms/Ideas/Ideas';
import { onSnapshot } from 'firebase/firestore';
import { getTalentHandlerIdeas } from 'firebaseUtils/firebase';
import { useEffect, useState } from 'react';
import { Idea } from 'sharedInterfaces';
import './TalentHandler.scss';

const TalentHandler = () => {
  const [talentHandlerIdeas, setTalentHandlerIdeas] = useState<Idea[]>([]);
  const [loading, setLoading] = useState<boolean>();

  useEffect(() => {
    setLoading(true);

    const getTalentHandlerIdeasSubs = onSnapshot(getTalentHandlerIdeas(), (querySnapshot) => {
      const parsedTalentIdea = querySnapshot.docs.map((talentHandlerIdea) => (
        { id: talentHandlerIdea.id, ...talentHandlerIdea.data() }
      )) as Idea[];
      const sortedIdeas = parsedTalentIdea.sort((a, b) => (a.priority < b.priority ? 1 : -1));
      setTalentHandlerIdeas(sortedIdeas);
      setLoading(false);
    });
    return () => getTalentHandlerIdeasSubs();
  }, []);

  return loading
    ? <Loading />
    : (
      <div className="TalentHandler__Container">
        <Ideas ideas={talentHandlerIdeas} />
      </div>
    );
};

export default TalentHandler;
