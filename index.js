'use strict';
const API_KEY = '';


const store = {
  videos: []
};

const BASE_URL = `https://www.googleapis.com/youtube/v3/search?maxResults=25&part=snippet&key=${API_KEY}&q=`

const fetchVideos = function(searchTerm, callback) {
  const url = BASE_URL + searchTerm;
  $.getJSON(url, callback);

};


const decorateResponse = response =>  {
  return response.items.map(item => {
    const id = item.id.videoId;
    const title = item.snippet.title;
    const thumbnail = item.snippet.thumbnails.medium.url;
    return {id, title, thumbnail};
    
  });
};



const generateVideoItemHtml = function(video) {
  return `<li id = '${video.id}'>
        <h3>${video.title}</h3>
        <a href='https://www.youtube.com/watch?v=${video.id}' target='_blank'><img src = '${video.thumbnail}'></a>
        </li>`;
};

const addVideosToStore = function(videos) {
  store.videos = videos;

};

const render = function() {
  const videoItems = store.videos.map(vid => {
    return generateVideoItemHtml(vid);
  });
  $('.results').html(videoItems);
};

const handleFormSubmit = function() {

  $('form').on('submit', function(event) {
    event.preventDefault();
    const searchTerm = $('#search-term').val();


    
    $('#search-term').val('');

    const callback = function (response){
      const videos = decorateResponse(response)
      addVideosToStore(videos);
      render();
    }
    fetchVideos(searchTerm,callback);
  });
};
$(function(){
  handleFormSubmit();
});