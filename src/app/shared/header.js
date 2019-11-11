export function Header(title,isShowSearch , data, podcast) {
  // debugger;
  if (data && data!=null && data.length>0) {
    (document.querySelector("#BtnLiveHeader")).style.display = 'block';
    (document.querySelector("#BtnLiveHeader")).href = data;
  } else {
    (document.querySelector("#BtnLiveHeader")).style.display = 'none';
    if (isShowSearch == true) {
      (document.querySelector("#BtnSearchHeader")).style.display = 'block';
    } else {
      (document.querySelector("#BtnSearchHeader")).style.display = 'none';
    }
  }
  if (podcast && podcast!=null && podcast.length>0) {
    (document.querySelector("#BtnPodcastHeader")).style.display = 'block';
    (document.querySelector("#BtnPodcastHeader")).href = podcast;
  } else {
    (document.querySelector("#BtnPodcastHeader")).style.display = 'none';
  }

  document.querySelector("#title_msg").textContent = title;
  return true;
};


