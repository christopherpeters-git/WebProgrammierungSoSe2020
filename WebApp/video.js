import * as videoOverview from './modules/video/videooverview.js';
import * as videoPlayer from './modules/video/videoplayer.js';

"use strict";

videoOverview.loadVideos();
videoPlayer.init();
videoPlayer.initVideoPlayer();
videoPlayer.showOverviewHideVideoplayer();
videoPlayer.showVideoPlayerHideOverview(videoStr);
videoPlayer.submitComment();