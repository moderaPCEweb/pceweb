$(document).ready(update);

function update() {
  $.get('/receberDados', (response) => {
    updatechart(response);
    }).then(setTimeout(update, 6000));
  }

functionupdatechart(data) {
var eixox = []
var eixoy = []
for (leti = 0; i < data.length / 5; i++) {
eixoy[i] = data[i]['data'];
eixox[i] = i;
}
myChart.data.labels = eixox;
myChart.data.datasets[0].data = eixoy;
myChart.update();
}
