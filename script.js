const scenes = document.querySelectorAll('.scene');
let index = 0;
let paused = false;

const labelInsetSeconds = 2;


/* Keyboard commands */
document.addEventListener('keydown', e => {
	const scene = scenes[index];
	const video = scene.querySelector('.video');
	
	if (e.code === 'Space') {
		e.preventDefault();
		pauseScene(video);
	}
	
	if (e.code === 'ArrowRight') {
		e.preventDefault();
		playNext();
	}
	
	if (e.code === 'ArrowLeft') {
		e.preventDefault();
		playPrevious();
	}
	
});


function pauseScene(video) {
	paused = !paused;
	paused ? video.pause() : video.play();
}


function playNext() {
	index = (index + 1) % scenes.length;
	playScene(index);
}


function playPrevious() {
	index = (index - 1 + scenes.length) % scenes.length;
	playScene(index);
}


function playScene(i) {
	scenes.forEach(s => {
		s.classList.remove('active');
	});
	
	const scene = scenes[i];
	const video = scene.querySelector('.video');
	const label = scene.querySelector('.label');
	
	scene.classList.add('active');
	
	// cleanup
	video.onended = null;
	video.ontimeupdate = null;
	
	video.currentTime = 0;
	if (!paused) video.play();
	
	// logic to display the label after a certain time
	video.ontimeupdate = () => {
		const time = video.currentTime;
		const duration = video.duration;
		
		if (!duration) return;
		
		// display the label after 1sec 
		if (time >= labelInsetSeconds && time < duration - labelInsetSeconds) {
			label.classList.add('active');
		} else {
			label.classList.remove('active');
			
		}
	};

	video.onended = playNext;
}

playScene(0);
