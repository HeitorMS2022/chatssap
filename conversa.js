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
var roomName = localStorage.getItem("Room_name");
var username = localStorage.getItem("nome");

function send(){
    var mensagem = document.getElementById("message").value;
    firebase.database().ref(roomName).push({
        name: username,
        message: mensagem,
        like: 0
    });
    document.getElementById("mensagem").value = "";
}

function logout(){
    localStorage.removeItem("nome");
    localStorage.removeItem("nomedasala");
    window.location = "index.html";
}
function getData() { firebase.database().ref("/"+roomName).on('value', function(snapshot) { document.getElementById("mensagem_enviada").innerHTML = "";snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key;
    childData = childSnapshot.val();
    if(childKey != "purpose") {
    firebaseMessageId = childKey;
    messageData = childData;
    console.log(firebaseMessageId);
    console.log(messageData);
    name = messageData['name'];
    message = messageData['message'];
    like = messageData['like'];
    name_with_tag = "<h4> "+ name +" <img class='user_tick' src='tick.png'></h4>";
    message_with_tag = "<h4 class='message_h4'>" + message + "</h4>";
    like_button ="<button class='btn btn-warning' id="+firebaseMessageId+" value="+like+" onclick='updateLike(this.id)'>";
    span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'>Like: "+ like +"</span></button><hr>";
    row = name_with_tag + message_with_tag +like_button + span_with_tag;
    document.getElementById("mensagem_enviada").innerHTML += row;
 } });  }); }
getData();
function updateLike(message_id){
    console.log("clicked in the like button - " + message_id);
    button_id = message_id;
    likes = document.getElementById(button_id).value;
    updated_likes = Number(likes) + 1;
    console.log(updated_likes);
    
    firebase.database().ref(roomName).child(message_id).update({
        like : updated_likes
    });
}

var SpeechRecognition = window.webkitSpeechRecognition;
var recognition = new SpeechRecognition();

function start(){
    document.getElementById("textbox").innerHTML = "";
    recognition.start();
}

recognition.onresult = function run(event){
    console.log(event);
    var Content = event.results[0][0].transcript;
    console.log(Content);
    document.getElementById("textbox").innerHTML = Content;
    if(Content == "tire minha selfie"){
        console.log("tirando selfie ---");
        speak();
    };
}

function speak(){
    var synth = window.speechSynthesis;
    speak_data = "Tirando sua selfie em 5 segundos";
    var utterThis = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);
    Webcam.attach(camera);
    setTimeout(function(){
        take_selfie();
        save();
    }, 5000);
}

camera = document.getElementById("camera");
Webcam.set({
    width: 360,
    height: 250,
    image_format: 'jpeg',
    jpeg_quality: 90
});

function take_selfie(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="selfie_Image" src="'+data_uri+'">';
    });
}

function save(){
    link = document.getElementById("link");
    image = document.getElementById("selfie_Image").src;
    link.href = image;
    link.click();
}

function selfiesend(){
    
}