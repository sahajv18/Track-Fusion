const socket = io();
if (navigator.geolocation) {//inbuid navigator object
    navigator.geolocation.watchPosition((position) => {
        const { latitude, longitude } = position.coords;//banda move kr raha h
        socket.emit("send-location", { latitude, longitude });

    }, (error) => {//error receive
        console.error(error);
    },
        {
            enableHighAccuracy: true,
            timeout: 5000,//sec check after
            maximumAge: 0, //no cache banda

        }
    );

}

const map = L.map("map").setView([0, 0], 16);//for the location of the user
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "OpenStreetMap"//company name brig
}).addTo(map)

const markers = {};

socket.on("received-location", (data) => {
    const { id, latitude, longitude } = data;//jaipur center m
    map.setView([latitude, longitude],);//map m pass
    if (markers[id]) {
        markers[id].setLatLng([latitude, longitude]);
    }
    else {
        markers[id] = L.marker([latitude, longitude]).addTo(map);
    }

})
socket.on("user-disconnected", (id) => {
    if (markers[id]) {
        map.removeLayer(markers[id]);
        delete markers[id];
    }
})