(function () {
  var initializeVideoLinks = function () {
    console.log('DEBUG: initializeVideoLinks');
    document.addEventListener('DOMContentLoaded', function () {
      console.log('DEBUG: initializeVideoLinks: DOMContentLoaded');
      var closeButtonEl;
      var videoEl;
      var videoLinkEls;
      var videoPlayerEl;

      // Get elements

      videoPlayerEl = document.getElementById('video-player');
      videoLinkEls = document.querySelectorAll('.video-link');
      closeButtonEl = videoPlayerEl.querySelector('.close-button');
      videoContainer = videoPlayerEl.querySelector('.video-container');

      // Event handlers

      function handleVideoLinkClick(event) {
        console.log('DEBUG: handleVideoLinkClick: event: ', event);
        event.preventDefault();
        playVideo(event.currentTarget.getAttribute('href'));
      }

      function handleCloseButtonClick() {
        closeVideo();
      }

      // Updaters

      function playVideo(videoUrl) {
        console.log('DEBUG: playVideo: videoUrl: ', videoUrl);
        if (videoEl) {
          videoEl.remove();
        }

        videoEl = document.createElement('iframe');
        videoEl.setAttribute('allow', 'autoplay; encrypted-media');
        videoEl.setAttribute('allowfullscreen', 'true');
        videoEl.setAttribute('frameborder', '0');
        videoEl.setAttribute('height', '315');
        videoEl.setAttribute('src', videoUrl);
        videoEl.setAttribute('width', '560');

        videoContainer.appendChild(videoEl);

        videoPlayerEl.classList.add('show');
      }

      function closeVideo() {
        console.log('DEBUG: closeVideo');
        videoPlayerEl.classList.remove('show');

        if (videoEl) {
          videoEl.remove();
        }
      }

      // Add event listeners

      closeButtonEl.addEventListener('click', handleCloseButtonClick);

      Array.prototype.forEach.call(videoLinkEls, function (videoLinkEl) {
        console.log('DEBUG: add event listener: videoLinkEl: ', videoLinkEl);
        videoLinkEl.addEventListener('click', handleVideoLinkClick);
      });
    });
  };

  // Initialize
  initializeVideoLinks();
})();
