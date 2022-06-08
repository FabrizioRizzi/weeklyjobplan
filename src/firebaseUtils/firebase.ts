/* eslint-disable max-len */
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

/** ************ IDEAS **************** */
export const getIdeas = (coll: string) => query(collection(db, coll));

export const addIdea = async (coll: string, idea: CreateIdeaRequest) => addDoc(collection(db, coll), idea);

export const updateIdea = async (coll: string, id: string, idea: CreateIdeaRequest) => updateDoc(doc(db, coll, id), { ...idea });

export const deleteIdea = async (coll: string, id: string) => deleteDoc(doc(db, coll, id));

/** ************ TODOS **************** */
export const getTodos = (coll: string) => query(collection(db, coll));

export const addTodo = async (coll: string, todo: CreateIdeaRequest) => addDoc(collection(db, coll), todo);

export const updateTodo = async (coll: string, id: string, todo: CreateIdeaRequest) => updateDoc(doc(db, coll, id), { ...todo });

export const deleteTodo = async (coll: string, id: string) => deleteDoc(doc(db, coll, id));

/** ************ STEPS **************** */

export const getTodoSteps = (coll: string, id: string) => query(collection(db, coll, id, 'steps'));

export const updateDoneStep = (coll: string, id: string, done: boolean) => updateDoc(doc(db, coll, id, 'steps'), { done });

// export const addTodo = async (coll: string, todo: CreateIdeaRequest) => addDoc(collection(db, coll), todo);

// export const updateTodo = async (coll: string, id: string, todo: CreateIdeaRequest) => updateDoc(doc(db, coll, id), { ...todo });

// export const deleteTodo = async (coll: string, id: string) => deleteDoc(doc(db, coll, id));
