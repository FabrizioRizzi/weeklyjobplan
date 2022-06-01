import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getFirestore,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import {
  CreateIdeaRequest,
  CreateProjectRequest,
  CreateTaskRequest,
  CreateTaskToPlanRequest,
} from '../sharedInterfaces';

export const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const auth = getAuth();

/** ************ TASKS **************** */

export const getTasksByWeekAndYear = (year: number, week: number) => query(collection(db, 'tasks'), where('year', '==', year), where('week', '==', week));

export const addTask = (task: CreateTaskRequest) => addDoc(collection(db, 'tasks'), task);

export const updateTask = (id: string, task: CreateTaskRequest) => updateDoc(doc(db, 'tasks', id), { ...task });

export const updateDoneTask = (id: string, done: boolean) => updateDoc(doc(db, 'tasks', id), { done });

export const deleteTask = (id: string) => deleteDoc(doc(db, 'tasks', id));

/** ************ TASKS TO PLAN **************** */
export const getTasksToPlan = () => query(collection(db, 'plan'));

export const addTaskToPlan = async (taskToPlan: CreateTaskToPlanRequest) => addDoc(collection(db, 'plan'), taskToPlan);

export const updateTaskToPlan = async (id: string, taskToPlan: CreateTaskToPlanRequest) => updateDoc(doc(db, 'plan', id), { ...taskToPlan });

export const deleteTaskToPlan = async (id: string) => deleteDoc(doc(db, 'plan', id));

/** ************ PROJECTS **************** */
export const getProjects = () => query(collection(db, 'projects'));

export const addProject = async (project: CreateProjectRequest) => addDoc(collection(db, 'projects'), project);

export const updateProject = async (id: string, project: CreateProjectRequest) => updateDoc(doc(db, 'projects', id), { ...project });

export const deleteProject = async (id: string) => deleteDoc(doc(db, 'projects', id));

/** ************ SIRCLE LEADER IDEAS **************** */
export const getSircleLeaderIdeas = () => query(collection(db, 'sircleLeaderIdeas'));

export const addSircleLeaderIdeas = async (sircleLeaderIdea: CreateIdeaRequest) => addDoc(collection(db, 'sircleLeaderIdeas'), sircleLeaderIdea);

export const updateSircleLeaderIdeas = async (id: string, sircleLeaderIdea: CreateIdeaRequest) => updateDoc(doc(db, 'sircleLeaderIdeas', id), { ...sircleLeaderIdea });

export const deleteSircleLeaderIdeas = async (id: string) => deleteDoc(doc(db, 'sircleLeaderIdeas', id));

/** ************ TALENT HANDLER IDEAS **************** */
export const getTalentHandlerIdeas = () => query(collection(db, 'talentHandlerIdeas'));

export const addTalentHandlerIdeas = async (talentHandlerIdea: CreateIdeaRequest) => addDoc(collection(db, 'talentHandlerIdeas'), talentHandlerIdea);

export const updateTalentHandlerIdeas = async (id: string, talentHandlerIdea: CreateIdeaRequest) => updateDoc(doc(db, 'talentHandlerIdeas', id), { ...talentHandlerIdea });

export const deleteTalentHandlerIdeas = async (id: string) => deleteDoc(doc(db, 'talentHandlerIdeas', id));
