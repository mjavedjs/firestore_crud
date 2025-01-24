  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
  import { getFirestore,collection, addDoc ,getDocs,deleteDoc,doc,getDoc} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";
//   import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";
  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyDuJqOBsXhyRgoLC8viucZKO-D5oZ9_HzU",
    authDomain: "fir-todo-3baa4.firebaseapp.com",
    projectId: "fir-todo-3baa4",
    storageBucket: "fir-todo-3baa4.firebasestorage.app",
    messagingSenderId: "729439365320",
    appId: "1:729439365320:web:7bbbb0c8e7ec7386abddfd"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);


const form = document.querySelector("#formdata");
  form.addEventListener("submit", async (e)=>{

    let name = document.querySelector("#name");
    let email = document.querySelector("#email");
    let password = document.querySelector("#password");


  function toEmptyinputFiled(){
     name = document.querySelector("#name").value = '';
     email = document.querySelector("#email").value = '';
     password = document.querySelector("#password").value = '';
  }

    e.preventDefault() // toremove the defaul behiabor of function
    alert("don")
    try {
        
        const docRef =  await addDoc(collection(db,"user"),{
            name:name.value,
            email:email.value,
            password:password.value
        }) 
        renderuserData()
        toEmptyinputFiled()
        // console.log(docRef.uid)

    } catch (error) {
        console.log(error)
    }
})


async function  renderuserData(){
    const table = document.querySelector("#table");
    let html = ''
    try {
    const getDocsData = await getDocs(collection(db,'user'));

    getDocsData.forEach(element => {

     const userData = element.data();
     const docId = element.id
     
     html += `
     <tr>
       <td>${userData.name}</td>
       <td>${userData.email}</td>
       <td>${userData.password}</td>
       <td> <button id="delbtn" onclick="deletMethod('${docId}')">Delete</button></td>
       <td> <button id="updatebtn" onclick="UpdateMethod('${docId}')">Update</button></td>


     </tr>
   `;
})

table.innerHTML = html
    } catch (error) {
        console.log(error)
    }


}
renderuserData()


window.deletMethod = async function(docId){
 try {
  // console.log(`Deleting document with password: ${docId}`);

  const docRef =  doc(db,'user',docId);
  await deleteDoc(docRef);
  renderuserData()

  console.log("Document successfully deleted!");

 } catch (error) {
  
 }
  
};

window.UpdateMethod =  async function(docId){
  try {
    alert(`The docId is ${docId}`);
    const updatedSnapshot = await getDoc(doc(db,'user',docId));
    const currentUser = updatedSnapshot.data();
    console.log(currentUser.email);

    document.querySelector("#name").value = currentUser.name;
    document.querySelector("#email").value = currentUser.email;
    document.querySelector("#password").value = currentUser.password;

    const subtn = document.querySelector(".sub-btn");

    const upbtn= document.querySelector(".u-btn");

    upbtn.classList.add("show");

    subtn.classList.add("hide");
  

  } 
  catch(error){
    console.log(error)
  }
   
}