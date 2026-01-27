const scenes = document.querySelectorAll('.scene');
let index = 0;
let paused = false;

document.addEventListener('keydown', e => {
  const scene = scenes[index];
  const video = scene.querySelector('.video');

  if (e.code === 'Space') {
    e.preventDefault();
    paused = !paused;
    paused ? video.pause() : video.play();
  }
});

function playScene(i) {
  scenes.forEach(s => s.classList.remove('active'));

  const scene = scenes[i];
  const video = scene.querySelector('.video');

  scene.classList.add('active');
  video.onended = null;
  video.currentTime = 0;
  video.play();

  video.onended = () => {
    index = (index + 1) % scenes.length;
    playScene(index);
  };
}

playScene(0);