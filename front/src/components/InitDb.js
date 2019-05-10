import db from "../db.json";
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
