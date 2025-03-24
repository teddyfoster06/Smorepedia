// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";

import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, doc, getDoc, getDocs, addDoc, setDoc} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {

  apiKey: "AIzaSyBUWkrCKERJyPCoYIJjYdqEkXNL0L7WTdY",

  authDomain: "smorepedia-database.firebaseapp.com",

  projectId: "smorepedia-database",

  storageBucket: "smorepedia-database.firebasestorage.app",

  messagingSenderId: "951320104955",

  appId: "1:951320104955:web:4b8f4fac33f841c422055e",

  measurementId: "G-B3N3MV7S6G"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)


async function listPages(){
  const pages = [];
  const snapshot = await getDocs(collection(db, "pages"))
  // console.log(snapshot);
  snapshot.forEach((doc) => {
    // console.log(doc._document.data.value.mapValue.fields.title.stringValue);
    console.log(doc.data());
    console.log(doc.data().title);
    pages.push(doc.data().title);
  })
  return pages
} 
async function getContent(pageTitle){
  let dbTitle = pageTitle.toLowerCase();
  for(let i = 0; i < dbTitle.length; i++){
    if(dbTitle.charAt(i) === " "){
      dbTitle = dbTitle.substring(0, i) + "-" + dbTitle.substring(i+1);
    }
  }
  console.log(dbTitle);
  const docRef = doc(db, "pages", dbTitle);
  const docSnap = await getDoc(docRef)

  if(docSnap.exists()) {
    return {content: docSnap.data().content, infobox: docSnap.data().infobox, title: docSnap.data().title};
  }else{
    return false;
  }
}

async function pageExists(pageTitle){
  let dbTitle = pageTitle.toLowerCase();
  for(let i = 0; i < dbTitle.length; i++){
    if(dbTitle.charAt(i) === " "){
      dbTitle = dbTitle.substring(0, i) + "-" + dbTitle.substring(i+1);
    }
  }
  console.log(dbTitle);
  const docRef = doc(db, "pages", dbTitle);
  const docSnap = await getDoc(docRef)

  if(docSnap.exists()) {
    return true;
  }else{
    return false;
  }
}
async function editPage(pageTitle, newContent, newBox, oldTitle){
  let dbTitle = pageTitle.toLowerCase();
  for(let i = 0; i < dbTitle.length; i++){
    if(dbTitle.charAt(i) === " "){
      dbTitle = dbTitle.substring(0, i) + "-" + dbTitle.substring(i+1);
    }
  }
  const docRef = doc(db, "pages", dbTitle);
  try{
    await setDoc(docRef, {content: newContent, infobox: newBox, title: oldTitle});
    return true;
  }catch(e){
    return false;
  }
  
}
async function addPage(pageTitle){
  let dbTitle = pageTitle.toLowerCase();
  for(let i = 0; i < dbTitle.length; i++){
    if(dbTitle.charAt(i) === " "){
      dbTitle = dbTitle.substring(0, i) + "-" + dbTitle.substring(i+1);
    }
  }
  const exists = await pageExists(dbTitle);
  if(exists){
    return dbTitle;
  }
  const docRef = doc(db, "pages", dbTitle);
  try{
    await setDoc(docRef, {content: "Get Writing!", infobox: "Get Writing!", title: pageTitle});
    return dbTitle;

  }catch(e){
    return false;
  }
}

export {
    getContent,
    pageExists,
    listPages,
    addPage,
    editPage
};




// const axios = require("axios");
// import axios from 'axios';
// import FormData from 'form-data' // Import axios
// const address = 'https://smorepedia-jdtk.vercel.app/api/';

// // Function to make GET requests with axios

// async function query(path, dataToSend) {
//   try {
//     console.log(axios);
//     const response = await axios.get(`${address}${path}`, {
//       headers: {
//         'Content-Type': 'application/json', 
//       },
//       params: dataToSend,
//     });
//     console.log(response.data);
//     return response.data;
//   } catch (error) {
//     console.error("Error:", error.message);
//     // throw error;
//   }
// }

// // Function to make POST requests with axios
// async function add(path, id, title, content, infobox) {
//   const postData = {
//     id: id,
//     title: title,
//     content: content,
//     infobox: infobox,
//   };

//   try {
//     console.log(`${address}${path}`);
//     const response = await axios.post(`${address}${path}`, postData, {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//     console.log(`Success: ${JSON.stringify(response.data.result)}`);
//   } catch (error) {
//     console.error("Error:", error.message);
//     throw error;
//   }
// }
// async function upFile(title, file, pageTitle) {
//   try {
//     const formData = new FormData();
//     formData.append('file', file);
//     formData.append('title', title);
//     formData.append('pageTitle', pageTitle);

//     await axios.post('https://iwefoypdz2.execute-api.us-east-2.amazonaws.com/smorepediaPresignedUrlUpload', formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data'
//       }
//     });

//     alert('File uploaded successfully');
//   } catch (error) {
//     console.error('Error uploading file:', error);
//     alert('Error uploading file');
//   }

// }

// // Function to make DELETE requests with axios
// async function remove(id) {
//   const postData = { id };

//   try {
//     const response = await axios.delete(`${address}delbyid`, {
//       params: postData,
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//     console.log(`Success: ${JSON.stringify(response.data.result)}`);
//   } catch (error) {
//     console.error("Error:", error.message);
//     throw error;
//   }
// }


// // Updated update function using axios
// async function update(id, newData, prop) {
//   try {
//     console.log("Query:" + id);
//     const row = await query("byid", {id: id});
//     let updatedRow = { ...row };
//     updatedRow[prop] = newData; // Update the specified property
    
//     console.log("Remove:");
//     await remove(id); // Delete the existing entry
//     console.log("Add:");
//     console.log(updatedRow);
//     await add("add", updatedRow.id, updatedRow.title, updatedRow.content, updatedRow.infobox); // Re-add with updated data
//   } catch (error) {
//     console.error("Error updating data:", error.message);
//   }
// }

// // Function to get the highest ID
// async function getHighestID() {
//   try {
//     const result = await query("maxid", {
//       headers: {
//       "Content-Type": "application/json",
//     },
//   });
//     return result.high;
//   } catch (error) {
//     console.error("Error fetching highest ID:", error.message);
//     throw error;
//   }
// }


