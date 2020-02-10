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
  input = document.getElementById("myInput");//Recebe elemento input de pesquisa
  filter = input.value.toUpperCase();//Muda tudo para maiusculo
  table = document.getElementById("myTable");//Recebe elemento da tabela
  tr = table.getElementsByTagName("tr");//Recebe dados da Tabela 
  for (i = 0; i < tr.length; i++) {//Roda as linhas da tabela
    th = tr[i].getElementsByTagName("th")[0];//seta th como o valor da primeira coluna (nome)
    if (th) {
      txtValue = th.textContent || th.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";//Exibe a coluna
      } else {
        tr[i].style.display = "none";//Não exibe a coluna
      }
    }
  }
}

function searchW() {//varia so a coluna de busca
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
  //recebe data atual
  var data = new Date();
  var dia = data.getDay();
  var hour = data.getHours();
  var min = data.getMinutes();
  $.get('/onlinetracking/getstation', (stations) =>{//Invoca a rota que retorna os funcionarios dos gestores
    let tableBody= '';
    stations.forEach(station => {//roda o objeto com as estaçoes
      if(station.status=="Trabalho"){//verifica a situação do funcionario
        switch (dia) {//dia da semana atual
          //todos os cases são iguais, com excessão do station.weekday 
          case 0://Verifica se hoje é domingo
            if (station.weekday.sunday){//verifica se o funcionario trabalha Domingo
              if (station.inputTime.inputHour<station.outputTime.outputHour) {//Verifica se a hora de entrada é menor que a de saída (Usuario entra e saí no mesmo dia)
                if (station.inputTime.inputHour<hour) {//verifica se a hora atual é maior que a de entrada
                  if (station.outputTime.outputHour>hour) {//verifica se a hora atual é maior que a de entrada
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
