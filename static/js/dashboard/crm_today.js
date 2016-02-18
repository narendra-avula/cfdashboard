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
       RequestForData(selectedDate);
   }
}

function RequestForData(selectedDate)
{
    alert("ajax is working");
    $.ajax({
        url:"http://localhost:8005/cf/get-data",
        type:"POST",
        data: {
            "selectedDate":selectedDate
        },
        headers: {
            "X-CSRFToken": getCookie('csrftoken')
        },
        datatype: "application/json",
        success: function (response)
        {
            $('#test-success').text("Sucess...!");
        },
        error: function (response)
        {
            $('test-error').show();
        }

    });
}


function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}