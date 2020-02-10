function logCreate(_codeStation, _data) {
    console.log("log"+_codeStation);
    if (!_data) {
        var data = new Date();
    var dia = data.getDate();
    var mes = data.getMonth()+1; 
    var ano = data.getFullYear();
    if(dia<10){dia='0'+dia}
if(mes<10){mes='0'+mes}
    _data=window.btoa(dia+"/"+mes+"/"+ano);
    alert(_data);

    }

   // var cd = ""+${codeStation};
    alert(_codeStation);
    
    $.get('/station/log/'+_data+'&'+_codeStation, (sensors) => {
        let tableBody = '';
        console.log(sensors);
        
        sensors.forEach(sensor => {
            if (sensor) {
                tableBody += ``;
            }

            $('#logBody').html(tableBody);
           

        }).catch((error) => {
            res.redirect('error');
            console.log(error);
        });
    });
}