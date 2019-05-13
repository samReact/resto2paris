import axios from 'axios';
import db from '../db.1.json';

const InitDb = () => {
  axios
    .post(
      'api/record',
      // method: "post",
      db
    )
    .then(res => console.log(res))
    .catch(err => console.log(err));
};

export default InitDb;
