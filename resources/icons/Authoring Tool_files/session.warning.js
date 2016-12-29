//Load jQuery First
//How frequently to check for session expiration in milliseconds
var sess_pollInterval = 60000;
//How many minutes the session is valid for
var sess_expirationMinutes = 15;
//How many minutes before the warning prompt
var sess_warningMinutes = 10;

var sess_intervalID;
var sess_lastActivity;

function initSessionMonitor() {
    sess_lastActivity = new Date();
    sessSetInterval();
    $(document).bind('mousedown.session', function (ed, e) { sessKeyPressed(ed, e); });
}
function sessSetInterval() {
    sess_intervalID = setInterval('sessInterval()', sess_pollInterval);
}
function sessClearInterval() {
    clearInterval(sess_intervalID);
}
function sessKeyPressed(ed, e) {
    sess_lastActivity = new Date();
}
function sessPingServer() {
    //Call an AJAX function to keep-alive your session.
    // someAJAXFunction();
}
function sessLogOut() {
    window.open('', '_self', ''); 
    window.close();
    Ext.util.Cookies.set('userInfo', null);
}

function sessInterval() {
    var now = new Date();
    var diff = now - sess_lastActivity;
    var diffMins = (diff / 1000 / 60);

    if (diffMins >= sess_warningMinutes) {
        //wran before expiring
        //stop the timer
            sessClearInterval();
        //promt for attention
        if (confirm('Your session will expire in ' + (sess_expirationMinutes - sess_warningMinutes) +
            ' minutes (as of ' + now.toTimeString() + '), press OK to stay on this page ' +
            'or press Cancel to close the application. \nIf you close the application any changes will be lost.')) {
            now = new Date();
            diff = now - sess_lastActivity;
            diffMins = (diff / 1000 / 60);

            if (diffMins > sess_expirationMinutes) {
                //timed out
                sessLogOut();
                return true;
                
            }
            else {
                //reset inactivity timer
                sessPingServer();
                sessSetInterval();
                sess_lastActivity = new Date();
            }
        } else {
            sessLogOut();
        }
    } else {
        sessPingServer();
    }
}

function remove(){
    var state = "edit";
    for(i=0;i<file_name.length;i++){
        var fileName = file_name[i];
        var version = file_version[i];
        $.post(serverLocation + 'StateChange?fileName=' + fileName + '&version=' + version + '&state=' + state).success(function(data) {
            console.log('State Changed');
            Ext.util.Cookies.set('userInfo', null);
        });
    }
}



/***************** REFRESH AND CLOSE BROWSER ************************/ 

window_beforeUnload = function(e) {
    var message = 'Note: You will loose all unsaved changes!!!';

    if(e){
        remove();
    }
    return message;
};

if (window.addEventListener) {
    window.addEventListener('beforeunload', window_beforeUnload, false);
} else if (window.attachEvent) {
    window.attachEvent('onbeforeunload', window_beforeUnload);
} else {
    throw "Cannot attach event handler";
}

