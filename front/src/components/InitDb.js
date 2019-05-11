import db from "../db.1.json";
import axios from "axios";

export const InitDb = () => {
  axios
    .post(
      "api/record",
      // method: "post",
      db
    )
    .then(res => console.log(res))
    .catch(err => console.log(err));
};
