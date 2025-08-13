window.onload = () => {

    const lat = -32.3710;
    const lon = -54.1948;

    const map = L.map('map').setView([lat, lon], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    L.marker([lat, lon]).addTo(map)
        .bindPopup('Dr. Alberto Boerger 534, Melo, Cerro Largo, Uruguay')
        .openPopup();
};