import firebase from 'firebase/app';
import 'firebase/firestore';
import Header from '../components/Header';

const Home: React.FC = () => {

  firebase.firestore().collection('year').get().then(a => {
    console.log(a)
  });
  
  return (
    <>
      <div>Ciao sono la home</div>
      <Header />
    </>
  )
};

export default Home;
