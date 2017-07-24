import $ from 'jquery';

export default (mapa, marker) => {
	const controlDiv = document.createElement('div');
	const firstChild = document.createElement('button');
	const secondChild = document.createElement('div');

	firstChild.style.backgroundColor = '#fff';
	firstChild.style.border = 'none';
	firstChild.style.outline = 'none';
	firstChild.style.width = '28px';
	firstChild.style.height = '28px';
	firstChild.style.borderRadius = '2px';
	firstChild.style.boxShadow = '0 1px 4px rgba(0,0,0,0.3)';
	firstChild.style.cursor = 'pointer';
	firstChild.style.marginRight = '10px';
	firstChild.style.padding = '0px';
	firstChild.title = 'Your Location';
	controlDiv.appendChild(firstChild);

	secondChild.style.margin = '5px';
	secondChild.style.width = '18px';
	secondChild.style.height = '18px';
	secondChild.style.backgroundImage = 'url(https://maps.gstatic.com/tactile/mylocation/mylocation-sprite-1x.png)';
	secondChild.style.backgroundSize = '180px 18px';
	secondChild.style.backgroundPosition = '0px 0px';
	secondChild.style.backgroundRepeat = 'no-repeat';
	secondChild.id = 'you_location_img';
	firstChild.appendChild(secondChild);

	google.maps.event.addListener(mapa, 'dragend', function() {
		$('#you_location_img').css('background-position', '0px 0px');
	});

	firstChild.addEventListener('click', function() {
		let imgX = '0';
		const animationInterval = setInterval(function() {
			if (imgX == '-18') imgX = '0';
			else imgX = '-18';
			$('#you_location_img').css('background-position', imgX + 'px 0px');
		}, 500);
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(function(pos) {
				const latlng = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
				marker.setPosition(latlng);
				mapa.setCenter(latlng);
				clearInterval(animationInterval);
				$('#you_location_img').css('background-position', '-144px 0px');
			});
		} else {
			clearInterval(animationInterval);
			$('#you_location_img').css('background-position', '0px 0px');
		}
	});

	controlDiv.index = 1;
	mapa.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(controlDiv);
};
