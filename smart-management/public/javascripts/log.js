function teste() {
    console.log("entrou");
    var data = new Date();
    var dia = data.getDay();
    var hour = data.getHours(); //Horário de verão
    var min = data.getMinutes();
    $.get('/onlinetracking/getstation', (stations) => {
        let tableBody = '';
        stations.forEach(station => {
            if (station.status == "Trabalho") {
                tableBody += `<tr><th scope="row" class="font-book text-left">${station.nameEmployed}</th><th scope="row" class="font-book text-center ${station.dataesp}">${station.dataesp}</th></tr>`;
            }

            $('#table-body').html(tableBody);
            if (document.getElementById("myInput").value.toUpperCase() != "") {
                search();
            }
            console.log(stations);

        }).catch((error) => {
            res.redirect('error');
            console.log(error);
        });
    });
}