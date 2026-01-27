const scenes = document.querySelectorAll('.scene');
let index = 0;

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