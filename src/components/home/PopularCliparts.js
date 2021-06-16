import { useState } from "react";

import { db } from "../../firebase";
import TestCardComp from "./TestCardcomp";

const PopularCliparts = () => {

  var docRef = db.collection("data").doc("data1");
  const imgData = {}

  docRef
    .get()
    .then((doc) => {
      if (doc.exists) {
        console.log("Document data:", doc.data());
        imgData = doc.data()
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    })
    .catch((error) => {
      console.log("Error getting document:", error);
    });
  return (
    <>
      <TestCardComp />
    </>
  );
};

export default PopularCliparts;
