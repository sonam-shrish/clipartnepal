import { db } from "../../firebase";
import TestCardComp from "./TestCardcomp";

const PopularCliparts = () => {

  var docRef = db.collection("data").doc("data1");
  let info = {}

  docRef
    .get()
    .then((doc) => {
      if (doc.exists) {
        console.log("Document data:", doc.data());
        info = doc.data()
        console.log(info)
      } else {
        // doc.data() will be undefined in this case
        console.log("No such image data!");
      }
    })
    .catch((error) => {
      console.log("Error getting imgae data:", error);
    });
  return (
    <>
      <TestCardComp info = {info} />
    </>
  );
};

export default PopularCliparts;
