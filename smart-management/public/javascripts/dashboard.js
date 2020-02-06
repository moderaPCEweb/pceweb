function openNav() {
  document.getElementById("mySidenav").style.width = "300px";
  document.getElementById("main").style.marginLeft = "300px";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("main").style.marginLeft = "0";

}
function search() {
  var input, filter, table, tr, th, i, txtValue;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("myTable");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    th = tr[i].getElementsByTagName("th")[0];
    if (th) {
      txtValue = th.textContent || th.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}

function searchW() {
  var input, filter, table, tr, th, i, txtValue;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("myTable");
  tr = table.getElementsByTagName("tr");
    for (i = 1; i < tr.length; i++) {
    th = tr[i].getElementsByTagName("th")[2];
    if (th) {
      txtValue = th.textContent || th.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}

function teste(){
  console.log("entrou");
  var data = new Date();
  var dia = data.getDay();
  var hour = data.getHours() - 1; //Horário de verão
  var min = data.getMinutes();
  $.get('/onlinetracking/getstation', (stations) =>{
    let tableBody= '';
    stations.forEach(station => {
      if(station.status=="Trabalho"){
        switch (dia) {
          case 0:
            if (station.weekday.sunday){
              if (station.inputTime.inputHour<station.outputTime.outputHour) {
                if (station.inputTime.inputHour<hour) {
                  if (station.outputTime.outputHour>hour) {
                    tableBody += `<tr><th scope="row" class="font-book text-left">${station.nameEmployed}</th><th scope="row" class="font-book text-center ${station.dataesp}">${station.dataesp}</th></tr>`;
                  } else if (station.outputTime.outputHour==hour) {
                    if (station.outputTime.outputMin>=min) {
                      tableBody += `<tr><th scope="row" class="font-book text-left">${station.nameEmployed}</th><th scope="row" class="font-book text-center ${station.dataesp}">${station.dataesp}</th></tr>`;
                    }
                  }
                }
                else if (station.inputTime.inputHour==hour) {
                  if (station.inputTime.inputHour<=min) {
                    tableBody += `<tr><th scope="row" class="font-book text-left">${station.nameEmployed}</th><th scope="row" class="font-book text-center ${station.dataesp}">${station.dataesp}</th></tr>`;
                  }
                }
              }
              else if (station.outputTime.outputHour<station.inputTime.inputHour) {
                if (((station.inputTime.inputHour>hour)&&(station.outputTime.outputHour>hour))||((station.inputTime.inputHour==hour)&&(station.inputTime.inputMin<=min))||((station.outputTime.outputHour==hour)&&(station.outputTime.outputMin>min))||((station.inputTime.inputHour<hour)&&(station.outputTime.outputHour<hour))) {
                  tableBody += `<tr><th scope="row" class="font-book text-left">${station.nameEmployed}</th><th scope="row" class="font-book text-center ${station.dataesp}">${station.dataesp}</th></tr>`;
                }
              }
            }
            break;
          case 1:
            if (station.weekday.monday){
              if (station.inputTime.inputHour<station.outputTime.outputHour) {
                if (station.inputTime.inputHour<hour) {
                  if (station.outputTime.outputHour>hour) {
                    tableBody += `<tr><th scope="row" class="font-book text-left">${station.nameEmployed}</th><th scope="row" class="font-book text-center ${station.dataesp}">${station.dataesp}</th></tr>`;
                  } else if (station.outputTime.outputHour==hour) {
                    if (station.outputTime.outputMin>=min) {
                      tableBody += `<tr><th scope="row" class="font-book text-left">${station.nameEmployed}</th><th scope="row" class="font-book text-center ${station.dataesp}">${station.dataesp}</th></tr>`;
                    }
                  }
                }
                else if (station.inputTime.inputHour==hour) {
                  if (station.inputTime.inputHour<=min) {
                    tableBody += `<tr><th scope="row" class="font-book text-left">${station.nameEmployed}</th><th scope="row" class="font-book text-center ${station.dataesp}">${station.dataesp}</th></tr>`;
                  }
                }
              }
              else if (station.outputTime.outputHour<station.inputTime.inputHour) {
                if (((station.inputTime.inputHour>hour)&&(station.outputTime.outputHour>hour))||((station.inputTime.inputHour==hour)&&(station.inputTime.inputMin<=min))||((station.outputTime.outputHour==hour)&&(station.outputTime.outputMin>min))||((station.inputTime.inputHour<hour)&&(station.outputTime.outputHour<hour))) {
                  tableBody += `<tr><th scope="row" class="font-book text-left">${station.nameEmployed}</th><th scope="row" class="font-book text-center ${station.dataesp}">${station.dataesp}</th></tr>`;
                }
              }
            }
            break;
          case 2:
            if (station.weekday.tuesday){
              if (station.inputTime.inputHour<station.outputTime.outputHour) {
                if (station.inputTime.inputHour<hour) {
                  if (station.outputTime.outputHour>hour) {
                    tableBody += `<tr><th scope="row" class="font-book text-left">${station.nameEmployed}</th><th scope="row" class="font-book text-center ${station.dataesp}">${station.dataesp}</th></tr>`;
                  } else if (station.outputTime.outputHour==hour) {
                    if (station.outputTime.outputMin>=min) {
                      tableBody += `<tr><th scope="row" class="font-book text-left">${station.nameEmployed}</th><th scope="row" class="font-book text-center ${station.dataesp}">${station.dataesp}</th></tr>`;
                    }
                  }
                }
                else if (station.inputTime.inputHour==hour) {
                  if (station.inputTime.inputHour<=min) {
                    tableBody += `<tr><th scope="row" class="font-book text-left">${station.nameEmployed}</th><th scope="row" class="font-book text-center ${station.dataesp}">${station.dataesp}</th></tr>`;
                  }
                }
              }
              else if (station.outputTime.outputHour<station.inputTime.inputHour) {
                if (((station.inputTime.inputHour>hour)&&(station.outputTime.outputHour>hour))||((station.inputTime.inputHour==hour)&&(station.inputTime.inputMin<=min))||((station.outputTime.outputHour==hour)&&(station.outputTime.outputMin>min))||((station.inputTime.inputHour<hour)&&(station.outputTime.outputHour<hour))) {
                  tableBody += `<tr><th scope="row" class="font-book text-left">${station.nameEmployed}</th><th scope="row" class="font-book text-center ${station.dataesp}">${station.dataesp}</th></tr>`;
                }
              }
            }
            break;
          case 3:
            if (station.weekday.wednesday){
              if (station.inputTime.inputHour<station.outputTime.outputHour) {
                if (station.inputTime.inputHour<hour) {
                  if (station.outputTime.outputHour>hour) {
                    tableBody += `<tr><th scope="row" class="font-book text-left">${station.nameEmployed}</th><th scope="row" class="font-book text-center ${station.dataesp}">${station.dataesp}</th></tr>`;
                  } else if (station.outputTime.outputHour==hour) {
                    if (station.outputTime.outputMin>=min) {
                      tableBody += `<tr><th scope="row" class="font-book text-left">${station.nameEmployed}</th><th scope="row" class="font-book text-center ${station.dataesp}">${station.dataesp}</th></tr>`;
                    }
                  }
                }
                else if (station.inputTime.inputHour==hour) {
                  if (station.inputTime.inputHour<=min) {
                    tableBody += `<tr><th scope="row" class="font-book text-left">${station.nameEmployed}</th><th scope="row" class="font-book text-center ${station.dataesp}">${station.dataesp}</th></tr>`;
                  }
                }
              }
              else if (station.outputTime.outputHour<station.inputTime.inputHour) {
                if (((station.inputTime.inputHour>hour)&&(station.outputTime.outputHour>hour))||((station.inputTime.inputHour==hour)&&(station.inputTime.inputMin<=min))||((station.outputTime.outputHour==hour)&&(station.outputTime.outputMin>min))||((station.inputTime.inputHour<hour)&&(station.outputTime.outputHour<hour))) {
                  tableBody += `<tr><th scope="row" class="font-book text-left">${station.nameEmployed}</th><th scope="row" class="font-book text-center ${station.dataesp}">${station.dataesp}</th></tr>`;
                }
              }
            }
            break;
          case 4:
            if (station.weekday.thursday){
              if (station.inputTime.inputHour<station.outputTime.outputHour) {
                if (station.inputTime.inputHour<hour) {
                  if (station.outputTime.outputHour>hour) {
                    tableBody += `<tr><th scope="row" class="font-book text-left">${station.nameEmployed}</th><th scope="row" class="font-book text-center ${station.dataesp}">${station.dataesp}</th></tr>`;
                  } else if (station.outputTime.outputHour==hour) {
                    if (station.outputTime.outputMin>=min) {
                      tableBody += `<tr><th scope="row" class="font-book text-left">${station.nameEmployed}</th><th scope="row" class="font-book text-center ${station.dataesp}">${station.dataesp}</th></tr>`;
                    }
                  }
                }
                else if (station.inputTime.inputHour==hour) {
                  if (station.inputTime.inputHour<=min) {
                    tableBody += `<tr><th scope="row" class="font-book text-left">${station.nameEmployed}</th><th scope="row" class="font-book text-center ${station.dataesp}">${station.dataesp}</th></tr>`;
                  }
                }
              }
              else if (station.outputTime.outputHour<station.inputTime.inputHour) {
                if (((station.inputTime.inputHour>hour)&&(station.outputTime.outputHour>hour))||((station.inputTime.inputHour==hour)&&(station.inputTime.inputMin<=min))||((station.outputTime.outputHour==hour)&&(station.outputTime.outputMin>min))||((station.inputTime.inputHour<hour)&&(station.outputTime.outputHour<hour))) {
                  tableBody += `<tr><th scope="row" class="font-book text-left">${station.nameEmployed}</th><th scope="row" class="font-book text-center ${station.dataesp}">${station.dataesp}</th></tr>`;
                }
              }
            }
            break;
          case 5:
            if (station.weekday.friday){
              if (station.inputTime.inputHour<station.outputTime.outputHour) {
                if (station.inputTime.inputHour<hour) {
                  if (station.outputTime.outputHour>hour) {
                    tableBody += `<tr><th scope="row" class="font-book text-left">${station.nameEmployed}</th><th scope="row" class="font-book text-center ${station.dataesp}">${station.dataesp}</th></tr>`;
                  } else if (station.outputTime.outputHour==hour) {
                    if (station.outputTime.outputMin>=min) {
                      tableBody += `<tr><th scope="row" class="font-book text-left">${station.nameEmployed}</th><th scope="row" class="font-book text-center ${station.dataesp}">${station.dataesp}</th></tr>`;
                    }
                  }
                }
                else if (station.inputTime.inputHour==hour) {
                  if (station.inputTime.inputHour<=min) {
                    tableBody += `<tr><th scope="row" class="font-book text-left">${station.nameEmployed}</th><th scope="row" class="font-book text-center ${station.dataesp}">${station.dataesp}</th></tr>`;
                  }
                }
              }
              else if (station.outputTime.outputHour<station.inputTime.inputHour) {
                if (((station.inputTime.inputHour>hour)&&(station.outputTime.outputHour>hour))||((station.inputTime.inputHour==hour)&&(station.inputTime.inputMin<=min))||((station.outputTime.outputHour==hour)&&(station.outputTime.outputMin>min))||((station.inputTime.inputHour<hour)&&(station.outputTime.outputHour<hour))) {
                  tableBody += `<tr><th scope="row" class="font-book text-left">${station.nameEmployed}</th><th scope="row" class="font-book text-center ${station.dataesp}">${station.dataesp}</th></tr>`;
                }
              }
            }
            break;
          case 6:
            if (station.weekday.saturday){
              if (station.inputTime.inputHour<station.outputTime.outputHour) {
                if (station.inputTime.inputHour<hour) {
                  if (station.outputTime.outputHour>hour) {
                    tableBody += `<tr><th scope="row" class="font-book text-left">${station.nameEmployed}</th><th scope="row" class="font-book text-center ${station.dataesp}">${station.dataesp}</th></tr>`;
                  } else if (station.outputTime.outputHour==hour) {
                    if (station.outputTime.outputMin>=min) {
                      tableBody += `<tr><th scope="row" class="font-book text-left">${station.nameEmployed}</th><th scope="row" class="font-book text-center ${station.dataesp}">${station.dataesp}</th></tr>`;
                    }
                  }
                }
                else if (station.inputTime.inputHour==hour) {
                  if (station.inputTime.inputHour<=min) {
                    tableBody += `<tr><th scope="row" class="font-book text-left">${station.nameEmployed}</th><th scope="row" class="font-book text-center ${station.dataesp}">${station.dataesp}</th></tr>`;
                  }
                }
              }
              else if (station.outputTime.outputHour<station.inputTime.inputHour) {
                if (((station.inputTime.inputHour>hour)&&(station.outputTime.outputHour>hour))||((station.inputTime.inputHour==hour)&&(station.inputTime.inputMin<=min))||((station.outputTime.outputHour==hour)&&(station.outputTime.outputMin>min))||((station.inputTime.inputHour<hour)&&(station.outputTime.outputHour<hour))) {
                  tableBody += `<tr><th scope="row" class="font-book text-left">${station.nameEmployed}</th><th scope="row" class="font-book text-center ${station.dataesp}">${station.dataesp}</th></tr>`;
                }
              }
            }
        }


      //tableBody += `<tr><th scope="row" class="font-book text-left">${station.nameEmployed}</th><th scope="row" class="font-book text-center ${station.dataesp}">${station.dataesp}</th></tr>`;
      }

    });

    $('#table-body').html(tableBody);
    if (document.getElementById("myInput").value.toUpperCase()!="") {
      search();
    }
    console.log(stations);

  }).catch((error) => {
    res.redirect('error');
    console.log(error);
  });
}

function atualizar(){
    //alert("Ta funcionando");

  teste();

  setTimeout('atualizar()',100);

}
