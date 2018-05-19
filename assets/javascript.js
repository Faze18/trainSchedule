// Initialize Firebase
var config = {
  apiKey: "AIzaSyAPyps4CSu4BuPvXqc1jF4UqChSIrVoYgE",
  authDomain: "train-project-24710.firebaseapp.com",
  databaseURL: "https://train-project-24710.firebaseio.com",
  projectId: "train-project-24710",
  storageBucket: "",
  messagingSenderId: "927337347299"
};
firebase.initializeApp( config );
var arrival;
var database = firebase.database();
var currentTime = moment().format( "HH:mm" )

$( "#submit" ).on( "click", function () {
  currentTime = moment().format( "HH:mm" )
  event.preventDefault();

  var name = $( "#name" ).val().trim();
  var destination = $( "#destination" ).val().trim();
  var frequency = $( "#frequency" ).val().trim();
  var first = $( "#firstTime" ).val().trim();

//fill the database
  database.ref().push( {
    name: name,
    destination: destination,
    frequency: frequency,
    firstTrainTime: first,
  } );

} )

// Firebase watcher 
database.ref().on( "value", function ( snapshot ) {

  // Log everything that's coming out of snapshot
  console.log( snapshot.val() );



}, function ( errorObject ) {
  console.log( "Errors handled: " + errorObject.code );
} );

var users = [];

database.ref().on( "child_added", function ( snap ) {
  var startTime = snap.val().firstTrainTime;

  var arrival = moment( startTime, 'HH:mm:ss' ).add( snap.val().frequency, 'minutes' ).format( 'HH:mm' );


  var row = $( "#tableInfo" );
// arrival time generator
  for ( var i = 1; arrival < currentTime; i ) {
    arrival = moment( arrival, 'HH:mm:ss' ).add( snap.val().frequency, 'minutes' ).format( 'HH:mm' );
    console.log( "beginningTime.isBefore(endTime" );
  }
// minutes away generator
var minutesAway=moment(arrival,"hh:mm").diff(moment(currentTime,"hh:mm"));
// minutesAway=format(minutesAway,"HH:mm");
var ms=moment.duration(minutesAway);
var m =  ms.minutes();
var h = ms.hours();
minutesAway = m+(h*60);
// var minutesAway = moment.duration(minutesAway).format("mm");
debugger;


  var rname = "<td>" + snap.val().name + " </td>";
  var rdestination = "<td>" + snap.val().destination + " </td>";
  var rfrequency = "<td>" + snap.val().frequency + " </td>";
  var rfirst = "<td>" + snap.val().firstTrainTime + "</td>";
  var rarrival = "<td>" + arrival + "</td>";
  var rminutesAway = "<td>" +minutesAway +"</td>";


  row.append( "<tr>" );
  row.append( rname );
  row.append( rdestination );
  row.append( rfrequency );
  row.append( rarrival );
  row.append( rminutesAway );

  row.append( "</tr>" );

} )

