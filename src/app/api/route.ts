import app from "../firebase/config";
import {getDatabase, ref, get, child, set, onValue} from "firebase/database";

const database = getDatabase(app);
// export async function getData() {
//   const dbRef = ref(database);
//   console.log("getData");
//   get(child(dbRef, "pubs/"))
//     .then((snapshot) => {
//       console.log("snapshot", snapshot);
//       if (snapshot.exists()) {
//         console.log("snapshot.val()", snapshot.val());
//       } else {
//         console.log("No data available");
//       }
//     })
//     .catch((error) => {
//       console.error("error", error);
//     });
// }

type writeDataToDB = {
  name: string;
  drink: string;
  price: string;
};
export async function writeData({name, drink, price}: writeDataToDB) {
  console.log("setting data");
  set(ref(database, "/pubs"), {
    name,
    drink,
    price,
  });
}
