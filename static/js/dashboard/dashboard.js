var csvData = undefined;
var defaultValues = ["In-Out","sr_number","Caller","Caller Name","Date","duration","coins_deducted","Action","extension","destination/Agent","callid"];
localStorage.setItem("csvDefault",JSON.stringify(defaultValues));
var csvJsonData =
{
        "phoneNums":[]
};

function showFilePath(){
    var filePath = document.getElementById('fileInput').value;
    $('.file-path').text(filePath);
}


function handleFile(files) {
    if (window.FileReader) {
        return true;

    } else {
        alert("file reader is not supported in this browser");
    }
}

function errorHandler(event){
    if (event.target.error){
        alert(event.target.error.message);
    }
}


function processFile(files)
{
    var fileName = $('#fileInput').val();
    if (checkFileType(fileName)==false)
    {
        alert("only .csv is supported.Please check the file type");
    }
    else
    {
        var files;
        files = document.getElementById('fileInput').files;
        if (handleFile(files) == true)
        {
            var reader = new FileReader();
            reader.readAsText(files[0]);
            reader.onload =checkForOriginal;
        }
    }
}


function checkForOriginal(event)
{
    csvData = event.target.result;
    var allTextLines = csvData.split(/\r\n|\n/);
    var csvHeaders = allTextLines[0].split(",");
    var actualHeaders = JSON.parse(localStorage["csvDefault"]);
    if(checkForValidity(csvHeaders,actualHeaders)==false)
    {
        alert("Please check the file");
    }
    for(var line=1;line<allTextLines.length-1;line++){
        var lineData = allTextLines[line].split(",");
        csvJsonData.phoneNums.push(lineData[2]);
    }
    console.log(csvJsonData.phoneNums);
    sendRequestToServer(csvJsonData);

}

function sendRequestToServer(csvData){
    console.log("create post is working!"); // sanity check
    $.ajax({
        url : "/knowlcheck",
        type : "POST",
        headers: {
            "X-CSRFToken": getCookie('csrftoken')
        },
        data : {
            json_data : csvData
        }, // data sent with the post request

        // handle a successful response
        success : function(json) {
            alert("success"); // another sanity check
        },

        // handle a non-successful response
        error : function(xhr,errmsg,err)
        {
            console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
        }
    });
}



function checkForValidity(csvHeaders,actualHeaders)
{
    if(csvHeaders.length!=actualHeaders.length)
    {
        return false;

    }
    for(var col = actualHeaders.length; col--;) {
        if(csvHeaders[col] !== csvHeaders[col])
            return false;
    }

    return true;

}

function checkFileType(fileName)
{
    var ext = fileName.split(".").pop().toLowerCase();
    if(ext!="csv"){
        return false;
    }else{
        return true;
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