const counterSection = document.querySelector('.counter')
let channels = ["UCF43gKImCqmuOoiWdYXrV-w", "UCYiGq8XF7YQD00x7wAd62Zg", "UCZJ7m7EnCNodqnu5SAtg8eQ", "UCYbv0jZqHIMW4XjE9vDRLTw"]
//Contador
channels.forEach(el => fetch('https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2C%20statistics&id=' + el + '&key=AIzaSyBv5RKFLB1NU-9xmzAt0rIfswBWBvt4GUc')
    .then(res => res.json())
    .then(data => {
        let numbers = data.items[0].statistics.subscriberCount
        let icon = data.items[0].snippet.thumbnails.default.url
        let figure = document.createElement('figure')
        let figcaption = document.createElement('figcaption')
        let image = document.createElement('img')
        image.src = icon
        figcaption.innerHTML = numbers
        figure.appendChild(image)
        figure.appendChild(figcaption)
        counterSection.appendChild(figure)
    }).catch(err => {
        console.log(err);
        counterSection.innerHTML = '<h3>Algo anda mal, intentalo de nuevo mas tarde</h3>'
    })
)

//Music_Player
let playlist = [{
    'title': 'Ancud - Asi es Normal',
    'audio': "media/music/AsiEsNormal.mp3",
}, {
    'title': 'Ancud - Excepcional',
    'audio': "media/music/Excepcional.mp3",
}, {
    'title': 'Ancud - Jovenes',
    'audio': "media/music/Jovenes.mp3",
}, {
    'title': 'Ancud - Llamarte Hogar',
    'audio': "media/music/LlamarteHogar.mp3",
}, {
    'title': 'Ancud - Otra Vez',
    'audio': "media/music/OtraVez.mp3",
}, {
    'title': 'Ancud - Se Hacen Realidad',
    'audio': "media/music/SeHacenRealidad.mp3",
}, {
    'title': 'Ancud - Signals',
    'audio': "media/music/Signals.mp3",
}, {
    'title': 'Ancud - Vamos a Celebrar',
    'audio': "media/music/VamosACelebrar.mp3",
}];
i = 0;
n = playlist.length;
let player = document.getElementById('player');
let dur = document.getElementById('dur');
playlist.forEach(function (i) {
    console.log(i.audio)
    player.src = i.audio;
    $('.title').html(i.title);
}, );

function calculateTotalValue(length) {
    let minutes = Math.floor(length / 60),
        seconds_int = length - minutes * 60,
        seconds_str = seconds_int.toString(),
        seconds = seconds_str.substr(0, 2),
        time = minutes + ':' + seconds
    return time;
}

function calculateCurrentValue(currentTime) {
    let current_hour = parseInt(currentTime / 3600) % 24,
        current_minute = parseInt(currentTime / 60) % 60,
        current_seconds_long = currentTime % 60,
        current_seconds = current_seconds_long.toFixed(),
        current_time = (current_minute < 10 ? "0" + current_minute : current_minute) + ":" + (current_seconds < 10 ? "0" + current_seconds : current_seconds);
    return current_time;
}

function initProgressBar() {
    let length = player.duration;
    let current_time = player.currentTime;
    let totalLength = calculateTotalValue(length)
    jQuery(".end-time").html(totalLength);
    let currentTime = calculateCurrentValue(current_time);
    jQuery(".start-time").html(currentTime);
    dur.value = player.currentTime;
    if (player.currentTime == player.duration) {
        $("#play-btn").fadeIn("slow", function () {
            $(this).removeClass("fa-pause");
            $(this).addClass("fa-play");
            dur.value = 0;
        });
    }
};

function mSet() {
    player.currentTime = dur.value;
}

function mDur() {
    let length = player.duration;
    dur.max = length;
}

function initPlayers(num) {
    for (let i = 0; i < num; i++) {
        (function () {
            let playerContainer = document.getElementById('player-container'),
                player = document.getElementById('player'),
                isPlaying = false,
                playBtn = document.getElementById('play-btn');
            if (playBtn != null) {
                playBtn.addEventListener('click', function () {
                    togglePlay()
                });
            }

            function togglePlay() {
                if (player.paused === false) {
                    player.pause();
                    isPlaying = false;
                    $("#play-btn").fadeIn("slow", function () {
                        $(this).removeClass("fa-pause");
                        $(this).addClass("fa-play");
                    });
                } else {
                    player.play();
                    $("#play-btn").fadeIn("slow", function () {
                        $(this).removeClass("fa-play");
                        $(this).addClass("fa-pause");
                    });
                    isPlaying = true;
                }
            }
        }());
    }
}
$("#next").data('dir', 1);
$("#prev").data('dir', -1);
$('#next, #prev').on('click', function () {
    i = (i + $(this).data('dir') + n) % n;
    console.log(i);
    player.src = playlist[i].audio;
    $('.title').html(playlist[i].title);
    $('#play-btn').removeClass("fa-play");
    $('#play-btn').addClass("fa-pause");
    player.play();
});
$(".audioPlayer")
    .toArray()
    .forEach(function (player) {
        let audio = $(player).find("audio")[0];
        let volumeControl = $(player).find(".volumeControl .wrapper");
        volumeControl.find(".outer").on("click", function (e) {
            let volumePosition = e.pageX - $(this).offset().left;
            let audioVolume = volumePosition / $(this).width();
            if (audioVolume >= 0 && audioVolume <= 1) {
                audio.volume = audioVolume;
                $(this)
                    .find(".inner")
                    .css("width", audioVolume * 100 + "%");
            }
        });
    });
$(function () {
    // Dropdown toggle
    $('.dropdown-toggle').click(function () {
        $(this).next('.dropdown').slideToggle("fast");
    });
    $(document).click(function (e) {
        var target = e.target;
        if (!$(target).is('.dropdown-toggle') && !$(target).parents().is('.dropdown-toggle')) {
            $('.dropdown').hide();
        }
    });
});
$('#darkButton').click(switchDark);
$('#whiteButton').click(switchWhite);
$('#blueButton').click(switchBlue);

function switchDark() {
    $('#skin').attr('class', 'dark audioPlayer');
    $('.inner').css('background', '#fff');
    $('.title').css('color', '#fff');
    $('.time').css('color', '#fff');
    $('.fa-volume-up').css({
        'color': '#fff'
    });
    $('.audioPlayer #play-btn').css({
        'color': '#fff',
        'border-color': '#fff'
    });
    $('.ctrl_btn').css({
        'color': '#fff',
        'border-color': '#fff'
    });
}

function switchWhite() {
    $('#skin').attr('class', 'white audioPlayer');
    $('.inner').css('background', '#555');
    $('.title').css('color', '#555');
    $('.time').css('color', '#555');
    $('.fa-volume-up').css({
        'color': '#555'
    });
    $('.audioPlayer #play-btn').css({
        'color': '#555',
        'border-color': '#555'
    });
    $('.ctrl_btn').css({
        'color': '#555',
        'border-color': '#555'
    });
}

function switchBlue() {
    $('#skin').attr('class', 'blue audioPlayer');
    $('.inner').css('background', '#fff');
    $('.title').css('color', '#fff');
    $('.time').css('color', '#fff');
    $('.fa-volume-up').css({
        'color': '#fff'
    });
    $('.audioPlayer #play-btn').css({
        'color': '#fff',
        'border-color': '#fff'
    });
    $('.ctrl_btn').css({
        'color': '#fff',
        'border-color': '#fff'
    });
}
initPlayers(jQuery('#player-container').length);

//Funciones para la API de Youtube donde se reproducira las canciones