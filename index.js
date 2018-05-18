$( document ).ready(function() {
    displayMap(16.267359 , -61.513259, 15);
});


function displayMap(lat , lng, zoom){

    var mymap = L.map('mapid').setView([lat, lng], zoom);
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 30,
        id: 'mapbox.streets',
        accessToken: 'pk.eyJ1IjoieXlyaWluYSIsImEiOiJjamhjMG1mMjIwNnd6MzZ0bmVmbXQyNGFlIn0.BhvUruqgQl5mmyrKWUQg1g'
    }).addTo(mymap);

    var MarkerIcon = L.icon({
        iconUrl: 'ico.jpeg',
    
        iconSize:     [38, 45], // size of the icon
        shadowSize:   [50, 64], // size of the shadow
        iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
        shadowAnchor: [4, 62],  // the same for the shadow
        popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
    });

    var marker = L.marker([16.258498966, -61.522164578],{
        icon: MarkerIcon,
    }).addTo(mymap);

    var jqxhr = $.getJSON( "positions.json", function() {
        console.log( "success" );
      })
        .done(function() {

            console.log( jqxhr.responseJSON.fields );
            jqxhr.responseJSON.forEach(function(element){
                console.log(element.fields);
                marker = new L.marker([element.fields.stop_lat,element.fields.stop_lon])
                .bindPopup(element.fields.stop_desc)
                .addTo(mymap);
            });

        })
        .fail(function() {
            console.log( "error" );
        })
        .always(function() {
            console.log( "complete" );
        });

    getGeoMarker("positions.json")

/*      */

    /* for (var i = 0; i < dataGeo.length; i++) {
        console.log(dataGeo)
        marker = new L.marker([dataGeo[i].lat,dataGeo[i].lng])
         .bindPopup(dataGeo[i].name)
         .addTo(mymap);
    } */
}

function getGeoMarker(Files){
    
    /* var Data = []
    $.getJSON( Files , function( data ) {
        $.each( data, function( key, val ) {
          var marquer = {
              lng: val.fields.coord[1],
              lat: val.fields.coord[0],
              name : val.fields.stop_name,
              desc : val.fields.stop_desc
          }
          Data.push(marquer);
        });
    });
    return Data */
}

function setMarker(map , dataGeo){
    for (var i = 0; i < arr.length; i++) {
        console.log(arr[i])
        marker = new L.marker([arr[i]["lat"],planes[i]["lng"]])
         .bindPopup(planes[i][0])
         .addTo(map);
    }
}





