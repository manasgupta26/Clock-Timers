console.log("Javascript");

let timerobj = {
    minutes: 0,
    seconds: 0,
    timerid: 0
}

function soundalarm() {
    let amount = 3;
    let audio = new Audio("Background_Music.mp3");

    function playsound() {
        audio.pause();
        audio.currentTime = 0;
        audio.play();
    }

    for (i = 0; i < amount; i++) {
        setTimeout(playsound, 1200 * 1);
    }

}

function updatevalue(key, value) {
    if (value < 0) {
        value = 0;
        console.log("Positive Number Only");
    }

    if (key == "seconds") {
        if (value < 10) {
            value = "0" + value;
        }
    }
    $("#" + key).html(value || 0);
    timerobj[key] = value;
    /* 
        console.log("Min", timerobj.minutes);
        console.log("Sec", timerobj.seconds); */
}

(function detectchanges(key) {
    let input = "#" + key + "-input";

    $(input).change(function () {
        updatevalue(key, $(input).val());
    });

    $(input).keyup(function () {
        updatevalue(key, $(input).val());
    });
    return arguments.callee;
})("minutes")("seconds");



function starttimer() {
    buttonmanager(["start", false], ["stop", true], ["pause", true]);
    freezeinputs();

    timerobj.timerid = setInterval(function () {
        timerobj.seconds--;
        if (timerobj.seconds < 0) {
            if (timerobj.minutes == 0) {
                soundalarm();
                return stoptimer();
            }
            timerobj.seconds = 59;
            timerobj.minutes--;
        }
        updatevalue("minutes", timerobj.minutes);
        updatevalue("seconds", timerobj.seconds);
    }, 1000);
}


function stoptimer() {
    clearInterval(timerobj.timerid);
    buttonmanager(["start", true], ["stop", false], ["pause", false]);
    unfreezeinputs();
    updatevalue("minutes", $("#minutes-input").val());
    let seconds = $("#seconds-input").val() || "00";
    updatevalue("seconds", seconds);
}


function pausetimer() {
    buttonmanager(["start", true], ["stop", true], ["pause", false]);
    clearInterval(timerobj.timerid);
}


function buttonmanager(...buttonarray) {
    for (i = 0; i < buttonarray.length; i++) {
        let button = "#" + buttonarray[i][0] + "-button";
        if (buttonarray[i][1]) {
            $(button).removeAttr("disabled");
        } else {
            $(button).attr("disabled", "disabled");
        }
    }
}

function freezeinputs() {
    $("#minutes-input").attr("disabled", "disabled");
    $("#seconds-input").attr("disabled", "disabled");
}

function unfreezeinputs() {
    $("#minutes-input").removeAttr("disabled");
    $("#seconds-input").removeAttr("disabled");
}

function myFunction() {
    var element = document.body;
    element.classList.toggle("dark-mode");
} 