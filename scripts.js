// check element is exist method 1 (normal check)
// let playerButton: HTMLButtonElement
// const tem = document.querySelector('.player__button') as HTMLButtonElement
// if (tem) playerButton = tem
// check element is exist method 2 (non-null Assertion Operator)
var videoPlayer = document.querySelector('.player__video');
var playButton = document.querySelector('.toggle');
var bar = document.querySelector('.progress');
var process = document.querySelector('.progress__filled');
var rangeControl = document.querySelectorAll('.player__slider');
var skipButton = document.querySelectorAll('[data-skip]');
// event listeners
window.addEventListener('keydown', keyboardEvent);
videoPlayer.addEventListener('click', toogolePlayAndPause);
videoPlayer.addEventListener('timeupdate', updateProcessView);
playButton.addEventListener('click', toogolePlayAndPause);
bar.addEventListener('click', changeProcess);
rangeControl.forEach(function (ctrl) { return ctrl.addEventListener('input', changeRange); });
skipButton.forEach(function (btn) { return btn.addEventListener('click', skip); });
/**
 * This function is control video play or pause
 */
function toogolePlayAndPause() {
    videoPlayer.paused ? videoPlayer.play() : videoPlayer.pause();
    videoPlayer.paused ? playButton.textContent = '►' : playButton.textContent = '||';
}
/**
 * This function is update playBar view
 */
function updateProcessView() {
    var current = "".concat(((videoPlayer.currentTime / videoPlayer.duration) * 100).toFixed(0), "%");
    process.style.flexBasis = current;
}
/**
 * This function is change video timeLine when user click playBar
 * @param e MouseEvent
 */
function changeProcess(e) {
    // layerX => non standard(https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/layerX)
    // layerX & offsetX & pageX & clientX => https://blog.csdn.net/gdp12315_gu/article/details/54984216
    var processPosition = (e.offsetX / bar.clientWidth) * videoPlayer.duration;
    videoPlayer.currentTime = processPosition;
}
/**
 * This function is change volume or speed value when user click that button
 * @param e Event
 */
function changeRange(e) {
    var target = e.target;
    videoPlayer[target.name] = target.value;
}
/**
 * This function is change video timeLine when user click skip or back button
 * @param e Event
 */
function skip(e) {
    var target = e.target;
    videoPlayer.currentTime += parseInt(target.dataset.skip);
}
/**
 * This function is change video TimeLine or control video paly/pause when user press specific key
 * @param e KeyboardEvent
 */
function keyboardEvent(e) {
    if (e.key === 'ArrowRight')
        videoPlayer.currentTime += 25;
    if (e.key === 'ArrowLeft')
        videoPlayer.currentTime += -10;
    if (e.key === ' ')
        toogolePlayAndPause();
}
// init videoPlayer
videoPlayer.currentTime = 0;
videoPlayer.volume = 0.5;
videoPlayer.playbackRate = 1;
process.style.flexBasis = '0%';
