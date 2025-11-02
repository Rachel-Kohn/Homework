/* global google */
(async function () {
    'use strict';

    const { Map, InfoWindow } = await google.maps.importLibrary('maps');
    const { AdvancedMarkerElement } = await google.maps.importLibrary('marker');

    const mapCenter = { lat: 40.0960447, lng: -74.2219758 };
    const map = new Map(document.getElementById('map'), {
        center: mapCenter,
        zoom: 3,
        mapId: 'DEMO_MAP_ID',
    });

    const infoWindow = new InfoWindow();
    const searchInput = document.querySelector('#search');
    const placesList = document.querySelector('#places');

    const geoUser = 'RachelKohn';

    document.querySelector('#go').addEventListener('click', async () => {
        try {
            const query = searchInput.value.trim();
            if (!query) return alert('Please enter a location.');

            placesList.innerHTML = '<li>Loading your results...</li>';

            const response = await fetch(
                `https://secure.geonames.org/wikipediaSearch?q=${encodeURIComponent(
                    query
                )}&maxRows=10&username=${geoUser}&type=json`
            );

            if (!response.ok) throw new Error(`${response.status} - ${response.statusText}`);

            const data = await response.json();
            if (!data.geonames?.length) {
                placesList.innerHTML = '<li>No results found.</li>';
                return;
            }

            placesList.innerHTML = '';
            const bounds = new google.maps.LatLngBounds();

            data.geonames.forEach((place) => {
                const position = { lat: place.lat, lng: place.lng };

                const imgUrl = place.thumbnailImg || 'icon.png';

                const img = document.createElement('img');
                img.src = imgUrl;
                img.alt = place.title;
                img.className = 'place-picture';

                const marker = new AdvancedMarkerElement({
                    map,
                    position,
                    title: place.title,
                    content: img,
                });

                marker.addListener('click', () => {
                    infoWindow.setContent(
                        `<strong>${place.title}</strong><br>${place.summary}<br><a href="https://${place.wikipediaUrl}" target="_blank">More info...</a>`
                    );
                    infoWindow.open({ anchor: marker });
                });

                const li = document.createElement('li');
                li.innerHTML = `
          <div>
            <span>${place.title}</span>
            <img src="${imgUrl}" alt="${place.title}"/>
          </div>
          <div class="summary">${place.summary}</div>
        `;

                li.addEventListener('click', async () => {
                    const currentSummary = document.querySelector('.active .summary');
                    if (currentSummary) currentSummary.parentElement.classList.remove('active');

                    li.classList.add('active');
                    map.setZoom(5);

                    await delay(() => map.panTo(position), 1000);
                    await delay(() => map.setZoom(10), 1000);
                });

                placesList.appendChild(li);
                bounds.extend(position);
            });

            map.fitBounds(bounds);
        } catch (err) {
            console.error(err);
            placesList.innerHTML = '<li>Error loading your results.</li>';
        }
    });

    function delay(action, ms) {
        return new Promise((resolve) => {
            setTimeout(() => {
                action();
                resolve();
            }, ms);
        });
    }
})();