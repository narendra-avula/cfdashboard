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
function sendDateToZoho()
{
    document.getElementById('city-graph').innerHTML = "";
    document.getElementById('status-graph').innerHTML = "";
    var selectedDate = document.getElementById("selected-date").value;
    var todayDate = getTodayDate();
    if (selectedDate!=todayDate)
    {
           alert("Please Select Current Date Only");
    }
    else{
        $("#ajax-loader").show();
        $.ajax({
            type:"POST",
            url:"http://127.0.0.1:8005/cf/get-data",
            dataType:"json",
            data:{
                "date":selectedDate
            },
            success:function(response){
                var text = JSON.stringify(response);
                if (text){
                    var cityNames = [];
                    var leadCount = [];
                    var leadStatus = [];
                    var leadsCount = [];
                    for( var names in response.cityReport){
                        cityNames.push(names);
                        leadCount.push(response.cityReport[names]);
                    }
                    for(var status in response.leadStatusReport){
                        leadStatus.push(status);
                        leadsCount.push(response.leadStatusReport[status]);
                    }
                    plotGraph(cityNames,leadCount,"city-graph");
                    plotGraph(leadStatus,leadsCount, "status-graph");
                    $("#ajax-loader").hide();
                }
            },
            error:function(){
                alert("Internal Server Error");
            }

        });
    }

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
   var csrftoken = getCookie('csrftoken');

function csrfSafeMethod(method) {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}
$.ajaxSetup({
    beforeSend: function(xhr, settings) {
        if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
            xhr.setRequestHeader("X-CSRFToken", csrftoken);
        }
    }
});


function plotGraph(cityNames,LeadCount,divName)
{

        $.jqplot.config.enablePlugins = true;
        var s1 = LeadCount;
        var ticks = cityNames;

        plot1 = $.jqplot(divName, [s1], {
            // Only animate if we're not using excanvas (not in IE 7 or IE 8)..
            animate: !$.jqplot.use_excanvas,
            seriesDefaults:{
                renderer:$.jqplot.BarRenderer,
                pointLabels: { show: true }
            },
            axes: {
                xaxis: {
                    renderer: $.jqplot.CategoryAxisRenderer,
                    ticks: ticks
                }
            },
            highlighter: { show: false }
        });

        $('#'+divName).bind('jqplotDataClick',
            function (ev, seriesIndex, pointIndex, data) {
                $('#info1').html('series: '+seriesIndex+', point: '+pointIndex+', data: '+data);
            }
        );
       return true;
}