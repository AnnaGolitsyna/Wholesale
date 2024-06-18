import { collection } from 'firebase/firestore';
import {firebasePath} from './firebasePath';


export const getRef = (type) => {
  return collection(...firebasePath, type);
};