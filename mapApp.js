let map;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: {
            lat: 47.8,
            lng: 19.2
        },

    });


    let places = [
        ["Vácrártót", 47.710392, 19.229296, "vacratot.html"],
        ["Szokolya", 47.878911, 18.988489, "szokolya.html"]
    ];

    function setMarkers(map) {
        for (let i = 0; i < places.length; i++) {
            let place = places[i];
            let marker = new google.maps.Marker({
                position: {
                    lat: place[1],
                    lng: place[2]
                },
                map: map,
            });

            marker.addListener('click', function () {
                map.setZoom(10);
                map.setCenter(marker.getPosition());

            });

            marker.addListener("click", function openNewTab(){
                let win = window.open(place[3]);
                win.focus();
            } )
        }
    }
    setMarkers(map);
}
