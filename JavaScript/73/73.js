/* global $ */
(function () {
    'use strict';

    $(async function () {
        try {
            const response = await fetch('73.json');
            if (!response.ok) throw new Error('Failed to load video list');
            const videos = await response.json();

            const videoList = $('#videoList');
            const videoSelect = $('#videoSelect');
            const mainVideo = $('#mainVideo')[0];

            videos.forEach((video, index) => {
                videoSelect.append(`<option value="${index}">${video.title}</option>`);

                const videoElement = $(`
                    <div class="video-item">
                        <video src="${video.url}" muted></video>
                        <p>${video.title}</p>
                    </div>
                `);

                videoElement.on('click', () => {
                    mainVideo.src = video.url;
                    mainVideo.style.display = 'block'; 
                    mainVideo.play();
                    videoSelect.val(index);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                });

                videoList.append(videoElement);
            });

            videoSelect.on('change', function () {
                const selected = videos[this.value];
                if (selected) {
                    mainVideo.src = selected.url;
                    mainVideo.style.display = 'block'; 
                    mainVideo.play();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
            });

        } catch (err) {
            console.error(err);
            $('#videoList').text('Error loading videos.');
        }
    });
})();