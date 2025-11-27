/* Light YouTube Embeds by @labnol */
/* Web: http://labnol.org/?p=27941 */

 
  window.addEventListener("load",
	 function() {
	  console.log("************The youtube function got called.*********"); 
		var div,
			n,
			v = document.getElementsByClassName("youtube-player");
		for (n = 0; n < v.length; n++) {  
			div = document.createElement("div");
			div.setAttribute("data-id", v[n].id);
			div.innerHTML = labnolThumb(v[n].id);
			div.onclick = labnolIframe;
			v[n].appendChild(div);
		}
	}) ;

function labnolThumb(id) {
	var thumb = '<img src="https://i.ytimg.com/vi/ID/hqdefault.jpg">',
		play = '<div class="play"></div>';
	return thumb.replace("ID", id) + play;
}

function labnolIframe() {
	var iframe = document.createElement("iframe");
	var embed = "https://www.youtube.com/embed/ID?autoplay=1";
	iframe.setAttribute("src", embed.replace("ID", this.dataset.id));
	iframe.setAttribute("frameborder", "0");
	iframe.setAttribute("allowfullscreen", "1");
	this.parentNode.replaceChild(iframe, this);
}