function html5_audio(){
    var a = document.createElement('audio');
    return !!(a.canPlayType && a.canPlayType('audio/mpeg;').replace(/no/, ''));
}

var play_html5_audio = false;
if(html5_audio()) play_html5_audio = true;

function play_sound(url){
    if(play_html5_audio){
        var snd = new Audio(url);
        snd.load();
        snd.play();
    }else{
        $("#sound").remove();
        var sound = $("<embed id='sound' type='audio/mpeg' />");
        sound.attr('src', url);
        sound.attr('loop', false);
        sound.attr('hidden', true);
        sound.attr('autostart', true);
        sound.attr('rel', 'noreferrer');
        $('body').append(sound);
    }
}
function readme(txt){
    play_sound("http://localhost:9000/api/tts?text="+encodeURIComponent(txt));
    // play_sound("http://www.voicerss.org/controls/speech.ashx?hl=en-us&c=mp3&src="+encodeURIComponent(txt));
}

window.readme = readme;