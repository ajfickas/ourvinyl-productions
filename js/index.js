(function () {

  // Define modules

  var initializeVideoPlayer = function () {
    var closeButtonEl;
    var closeHandlers;
    var openHandlers;
    var videoEl;
    var videoPlayerEl;

    // Initialize handlers
    openHandlers = [];
    closeHandlers = [];

    // Get elements
    videoPlayerEl = document.getElementById('video-player');
    closeButtonEl = videoPlayerEl.querySelector('.close-button');
    videoContainer = videoPlayerEl.querySelector('.video-container');

    // Event handlers

    function handleCloseButtonClick() {
      close();
      notify(closeHandlers);
    }

    // Updaters

    function open(videoUrl) {
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

      notify(openHandlers);
    }

    function close() {
      videoPlayerEl.classList.remove('show');

      if (videoEl) {
        videoEl.remove();
      }
    }

    // Subscribe functions

    function onOpen(handler) {
      openHandlers.push(handler);
    }

    function onClose(handler) {
      closeHandlers.push(handler);
    }

    // Helpers

    function notify(eventHandlers) {
      eventHandlers.forEach(function (eventHandler) {
        eventHandler();
      });
    }

    // Add event listeners
    closeButtonEl.addEventListener('click', handleCloseButtonClick);

    // Return public interface
    return {
      onClose: onClose,
      onOpen: onOpen,
      open: open,
    };
  };

  var initializeVideoLinks = function (videoPlayer) {

    // Get elements
    var videoLinkEls = document.querySelectorAll('.video-link');

    // Event handlers
    function handleVideoLinkClick(event) {
      event.preventDefault();
      videoPlayer.open(event.currentTarget.getAttribute('href'));
    }

    // Add event listeners
    Array.prototype.forEach.call(videoLinkEls, function (videoLinkEl) {
      videoLinkEl.addEventListener('click', handleVideoLinkClick);
    });
  };

  var pauseVideoBackgroundWhenVideoPlayerIsOpen = function (options) {
    var wasVideoBackgroundPlaying = false;

    options.videoPlayer.onOpen(function () {
      if (!options.videoBackgroundEl.paused) {
        wasVideoBackgroundPlaying = true;
        options.videoBackgroundEl.pause();
      } else {
        wasVideoBackgroundPlaying = false;
      }
    });

    options.videoPlayer.onClose(function () {
      if (wasVideoBackgroundPlaying) {
        options.videoBackgroundEl.play();
      }
    });
  };

  // Initialize when DOM has been loaded
  document.addEventListener('DOMContentLoaded', function () {
    var videoPlayer = initializeVideoPlayer();
    initializeVideoLinks(videoPlayer);
    pauseVideoBackgroundWhenVideoPlayerIsOpen({
      videoBackgroundEl: document.getElementById('video-background'),
      videoPlayer: videoPlayer,
    });
  });
})();
