const firebaseConfig = {
    apiKey: "AIzaSyDgc_JAf510FVQpl8ihMVAtX8luUFLqcDw",
    authDomain: "jasunkchat.firebaseapp.com",
    databaseURL: "https://jasunkchat-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "jasunkchat",
    storageBucket: "jasunkchat.appspot.com",
    messagingSenderId: "397099804724",
    appId: "1:397099804724:web:5f424ebba4d674b0db8261",
    databaseURL:"https://jasunkchat-default-rtdb.europe-west1.firebasedatabase.app/"
  };

  import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

  
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
const database = firebase.database();

const username = document.querySelector("#username")
const color = document.querySelector("#color")
const message = document.querySelector("#message")
const chatId = document.querySelector("#chatId")



let currentMessages=[]

let startUp = {
    message:"velkommen til jasunkChat baby!",
    user:"Server",
    color:"blue"
}

database.ref("test").set({
    messages:[startUp]
  });

document.querySelector("#submit").addEventListener("click",heisann)

function heisann(){
    const chatRef = database.ref(chatId.value);

  chatRef.once("value", function(snapshot) {
    if (!snapshot.exists()) {
      chatRef.set({
        messages: [startUp]
      });
    }
  });

    const userAlbumsRef = ref(database,chatId.value)

    let hasSent=false
    
    onValue(userAlbumsRef, function(snapshot) {
        let rawr= Object.values(snapshot.val())
        
        currentMessages=rawr[0]
        
        let toSend={
            message:message.value,
            user:username.value,
            color:color.value
        }
        currentMessages.push(toSend)
        
        if (!hasSent){
            hasSent=true
        database.ref(chatId.value).set({
            messages:currentMessages
          });
        }
        document.querySelector("#messages").innerHTML = ""
        for (let i = 0; i < currentMessages.length-1; i++) {
            let message = document.createElement("div")
            message.innerHTML="<strong>"+currentMessages[i].user+":  </strong>"+currentMessages[i].message +"<br>"
            document.querySelector("#messages").append(message)
            message.style.color=currentMessages[i].color
            
        }
        
          
          
    })
   
    
    }

  