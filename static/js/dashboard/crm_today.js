/**
 * Created by Oliver Queen on 2/13/2016.
 */

function getTodayDate(){
   var today = new Date();
   var dd = today.getDate();
   var mm = today.getMonth()+1; //January is 0!

   var yyyy = today.getFullYear();
   if(dd<10){
        dd='0'+dd
   }
   if(mm<10){
        mm='0'+mm
   }
   var today = yyyy+'-'+mm+'-'+dd;
   return today;
}

function sendDateToZoho(){
   var selectedDate = document.getElementById("selected-date").value;
   alert(selectedDate);
   var todayDate = getTodayDate();
   if (selectedDate!=todayDate)
   {
       alert("Please Select Current Date Only");
   }
   else{
       alert("Input Is ok..!!");
   }
}
