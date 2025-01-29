$(document).ready(function() {
    // Inicialitzem el mapa amb la vista per defecte (coordenades centrals de Catalunya)
    const map = L.map('map').setView([41.3879, 2.16992], 12);

    // Afegir el mapa base (en aquest cas OpenStreetMap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Funció per obtenir i mostrar les dades de l'API
    function obtenirDadesTrens() {
        $.get('https://fgc.opendatasoft.com/api/explore/v2.1/catalog/datasets/posicionament-dels-trens/records?limit=20', function(data) {
            const trens = data.records;
            trens.forEach(function(tren) {
                const lat = tren.fields.geo_point_2d[0]; // latitud
                const lon = tren.fields.geo_point_2d[1]; // longitud
                const unitat = tren.fields.tipus_unitat;
                const linia = tren.fields.linia;
                const puntual = tren.fields.en_hora;
                const desti = tren.fields.desti;
                const id = tren.fields.id;

                // Crear un marcador per cada tren
                const popupContent = `
                    <strong>Unitat: ${unitat}</strong><br>
                    Linia: ${linia}<br>
                    Desti: ${desti}<br>
                    Puntualitat: ${puntual ? 'Sí' : 'No'}<br>
                    ID: ${id}
                `;

                L.marker([lat, lon])
                    .addTo(map)
                    .bindPopup(popupContent);
            });
        });
    }

    // Carregar les dades dels trens quan la pàgina es carrega
    obtenirDadesTrens();
});
