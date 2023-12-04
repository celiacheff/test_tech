import {connect, set} from 'mongoose';
import {DATABASE_URL} from "../../config";

export const dbConnection = async () => {
  set('strictQuery', false);
  return connect(`mongodb://${DATABASE_URL}`)
};
