// INICIALIZANDO O MAPA

var map = L.map('map', {
    layers: MQ.mapLayer(),
    center: [-8.343335496713697, -55.14051612541135],
    zoom: 5,
});



function runDirections(start, end){

    map = L.map('map', {
        layers: MQ.mapLayer(),
        center: [-8.343335496713697, -55.14051612541135],
        zoom: 5,
    });

    

    var dir = MQ.routing.directions();

    dir.route({
        locations: [
            start,
            end
        ]
    });

    CustomRouteLayer = MQ.Routing.RouteLayer.extend({
        createStartMarker: (location) => {
            var custom_icon;
            var marker;

            custom_icon = L.icon({
                iconUrl: 'https://image.flaticon.com/icons/png/512/10/10517.png',
                iconSize: [20, 29],
                iconAnchor: [10, 29],
                popupAnchor: [0, -29]
            });

            marker = L.marker(location.latLng, {icon: custom_icon}).addTo(map);

            marker.bindPopup('Início: ' + start).openPopup();

            return marker;
        },

        createEndMarker: (location) => {
            var custom_icon;
            var marker;

            custom_icon = L.icon({
                iconUrl: 'https://png.monster/wp-content/uploads/2021/06/png.monster-10-476x700.png',
                iconSize: [20, 29],
                iconAnchor: [10, 29],
                popupAnchor: [0, -29]
            });

            marker = L.marker(location.latLng, {icon: custom_icon}).addTo(map);
            
            marker.bindPopup('Fim: ' + end).openPopup();

            return marker;
        }

    });

    map.addLayer(new CustomRouteLayer({
        directions: dir,
        fitBounds: true
    }));
}




function submitForm(event){
    event.preventDefault();

    map.remove();

    var start = document.getElementById('start').value;
    var end = document.getElementById('end').value;
    
    if(start == '' || end == ''){
        var msg = document.createElement('P');
        msg.innerText = "Erro - Você precisa adicionar a localização para calcular a rota!"
        document.body.appendChild(msg);

        console.log('Valores nulos');
        runDirections(start, end);

    } else {

        runDirections(start, end);
        console.log('Busca Realizada');

    }



}

const form = document.getElementById('form');

form.addEventListener('submit', submitForm);

/*L.control.locate().addTo(map);*/



/*var stView = L.control.locate({
    flyTo: 'true',
}).addTo(map);*/