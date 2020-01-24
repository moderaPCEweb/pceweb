function openNav() {
  document.getElementById("mySidenav").style.width = "300px";
  document.getElementById("main").style.marginLeft = "300px";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("main").style.marginLeft = "0";

}

function teste(){
  console.log("entrou");
  $.get('/onlinetracking/getstation', (stations) =>{
    let tableBody= '';
    stations.forEach(station => {
      tableBody += `<tr><th scope="row" class="font-book text-left">${station.nameEmployed}</th>
      <th scope="row" class="font-book text-center ${station.dataesp}">${station.dataesp}</th></tr>`;
    });
    $('#table-body').html(tableBody);
    console.log(stations);

  }).catch((error) => {
    res.redirect('error');
    console.log(error);
  });
}

function atualizar(){
    //alert("Ta funcionando");

  teste();

  setTimeout('atualizar()',5000);

}
