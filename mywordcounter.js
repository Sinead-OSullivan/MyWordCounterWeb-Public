var currentUser;

// Your web app's Firebase configuration
var firebaseConfig = {
// removed from public repo for security 
};
// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}else {
    firebase.app(); // if already initialized, use that one
}
     
  var db = firebase.firestore();

class Therapist { // for representing table data
    constructor (fname, sname, uid, admin, email ) {
        this.admin = admin;
        this.sname = sname;
        this.fname = fname;
        this.uid = uid;
        this.email = email;
        
    
    }
    toString() {
        return this.fname + ', ' + this.sname + ', ' + this.admin;
    }

    toTableData (){
        var data = [];
            data.push(this.fname);
            data.push(this.sname);
            data.push(this.email);
            data.push(this.admin);
            var more_btn = '<a href=../therapist/more_info_therapist.html?uid='+
            this.uid+' class="table-btn more-btn" id="more_button">More Information</a>';
            data.push(more_btn);
            return data;
    }
    
    toObj(){
        var tableData = {}
        tableData["fname"] = this.fname;
        tableData["sname"] = this.sname;
        tableData["admin"] = this.admin;
        tableData["uid"] = this.uid
    }
}

class Client { // for representing table data
    constructor (fname, sname, dob, publicID, uid ) {
        this.dob = dob;
        this.sname = sname;
        this.fname = fname;
        this.publicID = publicID;
        this.uid = uid;
    }

    toTableData (){
        var data = [];
            data.push(this.fname);
            data.push(this.sname);
            data.push(this.dob);
            data.push(this.publicID);
            var more_btn = '<a href=../client/details.html?u='+
            this.uid+' class="table-btn more-btn" id="more_button">More Information</a>';
            data.push(more_btn);
            return data
    }

}

class clientSession {
    constructor(name, session_id, words, session_end, time_lim, req_word_count, completed_by, 
        word_count, time_taken, date_recorded, time_recorded, age_of_client, 
        notes_after, notes_before, public_id){
            this.word_count = word_count;
            this.time_taken = time_taken;
            this.date_recorded = date_recorded;
            this.time_recorded = time_recorded;
            this.session_id = session_id;
            this.name = name;
            this.words = words;
            this.session_end = session_end;
            if (this.session_end == "timed"){
                this.limit = time_lim;
            } else {
                this.limit = req_word_count;
            }
            this.completed_by = completed_by;
            this.age_of_client = age_of_client;
            this.completed_by = completed_by;
            this.notes_after = notes_after;
            this.notes_before = notes_before;
            this.public_id = public_id;
        }

    
        toTableDataTherapist (){
            var data = [];
                data.push(this.name);
               var wordsStr = "<ul class='table-list'>";
               for (var i = 0; i < this.words.length; i++){
                   wordsStr = wordsStr.concat("<li>"+this.words[i]+"</li>");
               }
               wordsStr = wordsStr.concat("</ul>");
                data.push(wordsStr);
                var wordsCStr = "<ul class='table-list'>";
               for (var i = 0; i < this.word_count.length; i++){
                   wordsCStr = wordsCStr.concat("<li>"+this.word_count[i]+"</li>");
               }
               wordsCStr = wordsCStr.concat("</ul>");
               data.push(wordsCStr);
               data.push(this.time_taken);
                data.push(this.date_recorded);
                data.push(this.time_recorded);
                data.push(this.age_of_client);
               var more_btn = '<a href=../sessions/details.html?id='+
               this.session_id+' class="table-btn more-btn" id="more_button">More Information</a>';
               data.push(more_btn);
                return data;
        }

        toTableDataResearcher(){
            var data = [];
                data.push(this.name);
               var wordsStr = "<ul class='table-list'>";
               for (var i = 0; i < this.words.length; i++){
                   wordsStr = wordsStr.concat("<li>"+this.words[i]+"</li>");
               }
               wordsStr = wordsStr.concat("</ul>");
                data.push(wordsStr);
                var wordsCStr = "<ul class='table-list'>";
               for (var i = 0; i < this.word_count.length; i++){
                   wordsCStr = wordsCStr.concat("<li>"+this.word_count[i]+"</li>");
               }
               wordsCStr = wordsCStr.concat("</ul>");
               data.push(wordsCStr);
               data.push(this.time_taken);
                data.push(this.date_recorded);
                data.push(this.time_recorded);
                data.push(this.public_id);
                data.push(this.age_of_client);
               var more_btn = '<a href=../sessions/research_details.html?id='+
               this.session_id+' class="table-btn more-btn" id="more_button">More Information</a>';
               data.push(more_btn);
               console.log(data);
                return data;
        }

        toTableDataTherapist2(){
            var data = [];
                data.push(this.name);
               var wordsStr = "<ul class='table-list'>";
               for (var i = 0; i < this.words.length; i++){
                   wordsStr = wordsStr.concat("<li>"+this.words[i]+"</li>");
               }
               wordsStr = wordsStr.concat("</ul>");
                data.push(wordsStr);
                var wordsCStr = "<ul class='table-list'>";
               for (var i = 0; i < this.word_count.length; i++){
                   wordsCStr = wordsCStr.concat("<li>"+this.word_count[i]+"</li>");
               }
               wordsCStr = wordsCStr.concat("</ul>");
               data.push(wordsCStr);
               data.push(this.time_taken);
                data.push(this.date_recorded);
                data.push(this.time_recorded);
                data.push(this.public_id);
                data.push(this.age_of_client);
               var more_btn = '<a href=../sessions/details.html?id='+
               this.session_id+' class="table-btn more-btn" id="more_button">More Information</a>';
               data.push(more_btn);
               console.log(data);
                return data;
        }
}

class CurrentUser { // for representing the data of a logged-in user
    constructor(){
        this.publicID = "none";
        this.sname = "none";
        this.fname = "none";
        this.uid = "none";
        this.user = "none";
        this.email = "none";
    }

    setData(user, uid){ 
        this.user = user;
        this.uid = uid;
        getTherapists(uid);
    }

    getEmail(){ 
        if (this.user != "none"){
            return this.user.email;
        }
        
    }
}

function getTherapists(who){ // for getting therapist data
     // Firestore data converter
     var thConverter = {
        toFirestore: function(therapist) {
            return {
                publicID: therapist.publicID,
                fname: therapist.fname,
                sname: therapist.sname,
                uid: therapist.uid,
                email: therapist.email
                }
        },
        fromFirestore: function(snapshot, options){
            const data = snapshot.data(options);
            return new Therapist(data.fname, data.sname, data.uid, data.admin, data.email)
            }
    }

    db.collection("users").where("uid", "==", who)
    .withConverter(thConverter)
    .get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            if (doc.exists){
            var therapist = doc.data();
            currentUser.admin = therapist.admin;
            currentUser.fname = therapist.fname;
            currentUser.sname = therapist.sname;
            currentUser.email = therapist.email;

            console.log(therapist);
            
            } else {
            console.log("No such document!")
            
        }})
        
    });
}

function getSessionsForTable(client_id="", therapist="false"){ 
    dataSet = [];
    var sessionConverter = {
        toFirestore: function(client) {
            return {
                name: session.name,
                session_id: session.session_id,
                words: session.words,
                session_end: session.session_end,
                time_lim: session.time_lim,
                req_word_count: session.req_word_count,
                completed_by: session.completed_by,
                word_count: session.word_count,
                time_taken: session.time_taken,
                date_recorded: session.date_recorded,
                time_recorded: session.time_recorded,
                age_of_client: session.age_of_client,
                notes_after: session.notes_after,
                notes_before: session.notes_before,
                public_id: session.public_id,
            }
        },
        fromFirestore: function(snapshot, options){
            const data = snapshot.data(options);
            console.log(data.public_id);
            return new clientSession(data.name, data.session_id, data.words, data.session_end, data.time_lim, 
                data.req_word_count, data.completed_by, data.word_count,
                data.time_taken, data.date_recorded, data.time_recorded, data.age_of_client, 
                data.notes_after, data.notes_before, data.public_id)
            }
        }
        var op = "=="
        var i = client_id
        if (therapist == "false"){
            op = "!="
            i = ""
        }
        console.log(op, i);

        db.collection("completed_sessions").where("completed_by", op, i)
        .withConverter(sessionConverter)
        .get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            var session = doc.data();
            dataSet.push(session.toTableDataTherapist());
        });
        var table = $('#sessionTable').DataTable( {
                data: dataSet,
                columns: [
                    { title: "Name" },
                    { title: "Words" },
                    { title: "Word Count" },
                    { title: "Time taken" },
                    {title: "Date recorded"},
                    {title: "Time Recorded"},
                    { title: "Client Age" },
                    {title: ""}
                ]
            } );

        
    });
}

function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }

function construct_therapist_data(doc) {
    tableData = {}
    tableData["fname"] = doc.data().fname;
    tableData["sname"] = doc.data().sname; 
    tableData["admin"] = doc.data().admin; 
    return tableData;

}

function remove_client(client_id){
    var docRef = db.collection("users").doc(client_id);
        // Set the "capital" field of the city 'DC'
        docRef.update({assigned_therapist: "none"})
        .then(() => {
            console.log("Document successfully updated!");
            window.location.replace('clients.html');
        })
        .catch((error) => {console.error("Error updating document: ", error);});
}

function getRndInteger(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function logOut(){
    firebase.auth().signOut().then(() => {
        location.reload();
    }).catch((error) => {
        console.log(error)
    });
}

function setUpUser(user){
    var uid;
    if (user != null) {
      uid = user.uid;
      currentUser = new CurrentUser();
      currentUser.setData(user, uid);
    }
    
}

// returns true if the input only contains letters
function allLetter(inputtxt){  
    var letters = /^[A-Za-z ]+$/;
    if(inputtxt.match(letters)){
        return true;
    } else {
        return false;
    }
}

// returns true if the input only contains letters and numbers
function alphanumeric(inputtxt){ 
    var letters = /^[0-9a-zA-Z ]+$/;
    if(inputtxt.match(letters)){
        return true;
    } else{
        return false;
    }
}

function validateEditForm(fname, sname, email) { // validates the add/edit forms
    var inputs = [fname, sname, email];
    if (validateRequiredFilled(inputs) == false){
        return false;
    }
    if (validateEmail(email) == false){
        return false;
    }
    if (allLetter(fname) != true || allLetter(sname) != true){
        alert("First Name and Surname fields can only contain letters");
        return false
    }
    return true;
  }

  function validateSignUpForm(fname, sname, email, password) { // validates the add/edit forms
    var inputs = [fname, sname, email, password];
    if (validateRequiredFilled(inputs) == false){
        return false;
    }
    if (validateEmail(email) == false){
        return false;
    }
    if (allLetter(fname) != true || allLetter(sname) != true){
        alert("First Name and Surname fields can only contain letters");
        return false
    }
    return true;
  }

function validateEmail(mail){ // validates if 'mail' is an email  
      if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail)) {
        return (true)
        }
        alert("You have entered an invalid email address!")
        return (false)
    }

function validateRequiredFilled(inputs){
    for (input in inputs){
        x = inputs[input];
        if (x == "") {
            alert("All values must be filled out");
            console.log("missing: "+input)
            return false;
          }
    }
    return true;
}

function getToday(){ // year, month, day
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    return [yyyy, mm, dd]
}

function getNow(){ // hour, minute //24hrs
    var today = new Date();
    var hh = String(today.getHours()).padStart(2, '0');
    var mm = String(today.getMinutes()).padStart(2, '0'); 
    return [hh, mm]
}
