var config = {
    apiKey: "AIzaSyA_QypGPkcjPtylRDscf7-HQl8ribnFeIs",
    authDomain: "time-sheet-55009.firebaseapp.com",
    databaseURL: "https://time-sheet-55009.firebaseio.com",
    storageBucket: "time-sheet-55009.appspot.com"
  };
  
  firebase.initializeApp(config);
  
  var database = firebase.database();
  
  $("#train-btn").on("click", function(event) {
    event.preventDefault();
  
    // Grabs user input
    var trainName = $("#train-name-input").val().trim();
    var trainDest = $("#destination-input").val().trim();
    var trainStart =$("#start-input").val().trim();
    var trainFrequency = $("#frequency-input").val().trim();
   
    // Creates local "temporary" object for holding train info
    var newTrain = {
      name: trainName,
      destination: trainDest,
      start: trainStart,
      frequency: trainFrequency,
    };
  
    // Uploads train data to the database
    database.ref().push(newTrain);
  
    // Logs everything to console
    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.start);
    console.log(newTrain.frequency);
  
    //alert("Train successfully added");
  
    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#start-input").val("");
    $("#frequency-input").val("");
 // });
  
  // 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
  database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var trainDest = childSnapshot.val().destination;
    var trainStart = childSnapshot.val().start;
    var trainFrequency = childSnapshot.val().frequency;
  
    //setting up variables to find the next arrival train, mins away and use moment to convert start time and time diff.
    let startTimeCoverted = moment(trainStart, "hh:mm").subtract(1, "years");
    let timeDiff = moment().diff( moment(startTimeCoverted),"minutes")
    let timeRemaining = timeDiff % trainFrequency;
    let minUntilTrain = trainFrequency - timeRemaining;

    //this will find the next train 

    let nextTrain = moment().add(minUntilTrain, "minutes")




    // Prettify 
    //var trainStartPretty = moment.unix(trainStart).format("HH:mm");
  
    
    // Create the new row

   
    var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(trainDest),
      //$("<td>").text(startTimeCoverted),
      $("<td>").text(trainFrequency),
      $("<td>").text(moment(nextTrain).format("hh:mm")),
      $("<td>").text(timeRemaining)
    );
  
    // Append the new row to the table
    $("#train-table").append(newRow);
  });
  
})