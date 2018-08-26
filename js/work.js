(function () {
  // Carousel
  var initializeCarousel = function () {
    document.addEventListener('DOMContentLoaded', function () {
      var currentPage = 1;
      var previousButton = document.querySelector('.carousel-previous-button');
      var nextButton = document.querySelector('.carousel-next-button');
      var contentContainer = document.querySelector('.carousel-content-container');

      // Event handlers

      function handleLoad(event) {
        update(currentPage);
      }

      function handlePreviousButtonClick(event) {
        update(currentPage - 1);
      }

      function handleNextButtonClick(event) {
        update(currentPage + 1);
      }

      // Updaters

      function update(nextPage) {
        // Calculate
        var containerWidth = contentContainer.clientWidth;
        var contentWidth = contentContainer.scrollWidth;
        var x = calculateTranslateX(containerWidth, contentWidth, nextPage);

        // Update state

        if (x !== null) {
          // Update state
          currentPage = nextPage;
        }

        // Render

        // Content position
        var transformValue = 'translate3d(' + x + 'px, 0, 0)';
        contentContainer.style.transform = transformValue;

        // Previous button and next button states
        updateClass(previousButton, 'disabled', currentPage === getFirstPage());
        updateClass(nextButton, 'disabled', currentPage === getLastPage(containerWidth, contentWidth));
      }

      function updateClass(element, className, shouldBePresent) {
        if (shouldBePresent) {
          element.classList.add(className)
        } else {
          element.classList.remove(className)
        }
      }

      // Helpers

      function calculateTranslateX(containerWidth, contentWidth, page) {
        if (page < getFirstPage() || page > getLastPage(containerWidth, contentWidth)) {
          return null;
        }
        return - (page - 1) * containerWidth;
      }

      function getFirstPage() {
        return 1;
      }

      function getLastPage(containerWidth, contentWidth) {
        return Math.ceil(contentWidth/containerWidth);
      }

      // Add event listeners
      window.addEventListener('load', handleLoad);
      previousButton.addEventListener('click', handlePreviousButtonClick);
      nextButton.addEventListener('click', handleNextButtonClick);
    });
  };

  var initializeVideoLinks = function () {
    document.addEventListener('DOMContentLoaded', function () {
      var closeButtonEl;
      var videoEl;
      var videoLinkEls;
      var videoPlayerEl;

      // Get elements

      videoPlayerEl = document.getElementById('video-player');
      videoLinkEls = document.querySelectorAll('.video-link');
      closeButtonEl = videoPlayerEl.querySelector('.close-button');

      // Event handlers

      function handleVideoLinkClick(event) {
        event.preventDefault();
        playVideo(event.currentTarget.getAttribute('href'));
      }

      function handleCloseButtonClick() {
        closeVideo();
      }

      // Updaters

      function playVideo(videoUrl) {
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

        videoPlayerEl.appendChild(videoEl);

        videoPlayerEl.classList.add('show');
      }

      function closeVideo() {
        videoPlayerEl.classList.remove('show');

        if (videoEl) {
          videoEl.remove();
        }
      }

      // Add event listeners

      closeButtonEl.addEventListener('click', handleCloseButtonClick);

      Array.prototype.forEach.call(videoLinkEls, function (videoLinkEl) {
        videoLinkEl.addEventListener('click', handleVideoLinkClick);
      });
    });
  };

  // Initialize
  initializeCarousel();
  initializeVideoLinks();
})();
