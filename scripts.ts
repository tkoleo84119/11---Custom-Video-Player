// check element is exist method 1 (normal check)
// let playerButton: HTMLButtonElement
// const tem = document.querySelector('.player__button') as HTMLButtonElement
// if (tem) playerButton = tem

// check element is exist method 2 (non-null Assertion Operator)
const videoPlayer: HTMLVideoElement = document.querySelector('.player__video')!
const playButton: HTMLButtonElement = document.querySelector('.toggle')!
const bar: HTMLElement = document.querySelector('.progress')!
const process: HTMLElement = document.querySelector('.progress__filled')!
const rangeControl: NodeListOf<HTMLInputElement> = document.querySelectorAll('.player__slider')!
const skipButton: NodeListOf<HTMLElement> = document.querySelectorAll('[data-skip]')

// event listeners
window.addEventListener('keydown', keyboardEvent)
videoPlayer.addEventListener('click', toogolePlayAndPause)
videoPlayer.addEventListener('timeupdate', updateProcessView)
playButton.addEventListener('click', toogolePlayAndPause)
bar.addEventListener('click', changeProcess)
rangeControl.forEach(ctrl => ctrl.addEventListener('input', changeRange))
skipButton.forEach(btn => btn.addEventListener('click', skip))

/**
 * This function is control video play or pause
 */
function toogolePlayAndPause (): void {
  videoPlayer.paused ? videoPlayer.play() : videoPlayer.pause()
  videoPlayer.paused ? playButton.textContent = '►' : playButton.textContent = '||'
}

/**
 * This function is update playBar view
 */
function updateProcessView (): void {
  const current = `${((videoPlayer.currentTime / videoPlayer.duration) * 100).toFixed(0)}%`
  process.style.flexBasis = current
}

/**
 * This function is change video timeLine when user click playBar
 * @param e MouseEvent
 */
function changeProcess (e: MouseEvent): void {
  // layerX => non standard(https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/layerX)
  // layerX & offsetX & pageX & clientX => https://blog.csdn.net/gdp12315_gu/article/details/54984216
  const processPosition = (e.offsetX / bar.clientWidth) * videoPlayer.duration
  videoPlayer.currentTime = processPosition
}

/**
 * This function is change volume or speed value when user click that button
 * @param e Event
 */
function changeRange (e: Event): void {
  const target = e.target as HTMLInputElement
  videoPlayer[target.name] = target.value
}

/**
 * This function is change video timeLine when user click skip or back button
 * @param e Event
 */
function skip (e: Event): void {
  const target = e.target as HTMLElement
  videoPlayer.currentTime += parseInt(target.dataset.skip!)
}

/**
 * This function is change video TimeLine or control video paly/pause when user press specific key
 * @param e KeyboardEvent
 */
function keyboardEvent (e: KeyboardEvent): void { 
  if (e.key === 'ArrowRight') videoPlayer.currentTime += 25
  if (e.key === 'ArrowLeft') videoPlayer.currentTime += -10
  if (e.key === ' ') videoPlayer.paused ? videoPlayer.play() : videoPlayer.pause()
}

// init videoPlayer
videoPlayer.currentTime = 0
videoPlayer.volume = 0.5
videoPlayer.playbackRate = 1
process.style.flexBasis = '0%'
videoPlayer.play()
