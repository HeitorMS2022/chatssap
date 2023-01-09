const firebaseConfig = {
    apiKey: "AIzaSyC1U-3EHt5hj57JGQfLdxQJ9SDGepLZWwg",
    authDomain: "conversa-bc32d.firebaseapp.com",
    databaseURL: "https://conversa-bc32d-default-rtdb.firebaseio.com",
    projectId: "conversa-bc32d",
    storageBucket: "conversa-bc32d.appspot.com",
    messagingSenderId: "286455190842",
    appId: "1:286455190842:web:3707d0c5f224b84cb22c03"
  };

firebase.initializeApp(firebaseConfig);


var username = localStorage.getItem("nome");
document.getElementById("nomeusuário").innerHTML = "Bem-vindo, " + username + "!";

function addroom(){
    var roomname = document.getElementById("nomesala").value;
    firebase.database().ref("/").child(roomname).update({
        purpose:"adicionar sala"
    });
    localStorage.setItem("nomedasala", roomname);
    window.location = "conversa.html";
}

function getdata(){
    firebase.database().ref("/").on('value', function(snapshot)
 { document.getElementById("salas").innerHTML = ""; snapshot.forEach(function(childSnapshot)
 { childKey  = childSnapshot.key;
       Room_names = childKey;
       console.log(Room_names);
       row = "<div class='roomName' id="+Room_names+" onclick='redirectToRoomName(this.id)' >#"+Room_names+"</div><hr>";
       document.getElementById("salas").innerHTML += row;
           });
  });

}
getdata();

function redirectToRoomName(name){
    console.log(name);
    localStorage.setItem("Room_name", name);
    window.location = "conversa.html";
}

function logout(){
    localStorage.removeItem("nome");
    localStorage.removeItem("nomedasala");
    window.location = "index";
}