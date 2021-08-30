var resultado;//variable que guarda todos los textos
	
var guardados = [];//array que guarda todos los nombres de los archivos ya guardados
var response = localStorage.getItem("guardados"); //recuperar lo de guardados
if( response != null){
    guardados = JSON.parse(response);
}

var tama;//var que guarda el tamaño de guardados para evitar ciclos infinitos
var fileName;// nombre del archivo a leer

//lovalStore.clear() // quitar lo guardado en local storage

function leerArchivo(e) {
var archivo = e.target.files[0];

if (!archivo) {
  return;
}
fileName = e.target.files[0].name; // leer nombre del archivo a guardar
console.log("el nombre del archivo es: ");
console.log(fileName);
tama = guardados.length;//como el for incrementa guardados.length,lo ponemos en tama
for (var i=0; i<=tama; i++){//mirar si el nombre del archivo está guardado en el array de guardados
    if(guardados[i] == fileName){ return; }
}		
for (var i=0; i<=tama; i++){//sino está ya, guardar el nombre del archivo a leer
    guardados.push(fileName);	
    localStorage.setItem("guardados", JSON.stringify(guardados));
}

var lector = new FileReader();
lector.onload = function (e) {
    var contenido = e.target.result;

    if(resultado == null) {
      resultado = contenido;
    }else {
        resultado = resultado + '|' + contenido;
    }

    
    mostrarContenido(resultado);
    mostrarHome(resultado);

    console.log(contenido);
    //mostrarMedios(resultado);
    mostrarMedios(contenido);
    mostrarSucursales(resultado);
	mostrarEstados(resultado);
};

lector.readAsText(archivo); 
}

function mostrarContenido(resultado) {
    console.log("llegue x1");
    var elemento = document.getElementById('contenido-archivo');
    elemento.innerHTML = resultado;
}
  
document.getElementById('file-input').addEventListener('change', leerArchivo, false);
	
function savefile(){
	var content = document.getElementById('contenido-archivo').value;
	uriContent = "data:application/octet-stream," + encodeURIComponent(content);
	
	var a = document.createElement("a");
	a.href = uriContent;
	a.download = 'NuevoArchivo.txt';
	a.dispatchEvent(new MouseEvent("click"));
}

function mostrarHome(resultado) {
	resultado = resultado.replaceAll('|','')
	var filas = resultado.split("\n");

	var totalSucursal  = 0;
	var totalCodiOtBan = 0;
	var totalBnet	   = 0;
	var totalCat 	   = 0;
	var totalBoteo 	   = 0;
	var totalAlcancias = 0;
	var totalCodiCiti  = 0;

	var totalDonatSucursal  = 1;
	var totalDonatCat 	    = 1;
	var totalDonatBnet 		= 1;
	var totalDonatBoteo 	= 1;
	var totalDonatAlcancias = 1;
	var totalDonatCodiOtBan = 1;
	var totalDonatCodiciti  = 1;

	
	var totalEfectDonatSucursal 	= 1;
	var totalCheqBanDonatSucursal 	= 1;
	var totalCheqOtBanDonatSucursal = 1;
	var totalTarjCitiDonatSucursal  = 1;
	var totalTarjOtBanDonatSucursal = 1;
	var totalAmerExpDonatSucursal 	= 1;

	var totalEfectTotSucursal 	  = 0;
	var totalCheqBanTotSucursal   = 0;
	var totalCheqOtBanTotSucursal = 0;
	var totalTarjCitiTotSucursal  = 0;
	var totalTarjOtBanTotSucursal = 0;
	var totalAmerExpTotSucursal   = 0;

	var totalTarjCitiDonatCat  = 1;
	var totalTarjOtBanDonatCat = 1;
	var totalAmerExpDonatCat   = 1;

	var totalTarjCitiTotCat  = 0;
	var totalTarjOtBanTotCat = 0;
	var totalAmerExpTotCat   = 0;

	var totalEfectDonatBnet  = 1;
	var totalEfectTotBnet  = 0;

	for(var i in filas) {
		var columnas = filas[i].split(",");
		var medio    = columnas[0].substring(12,13);
		var importe  = columnas[0].substring(33,45);
		var impo     = importe.substring(0, 10) + "." + importe.substring(10, importe.length);
		var tipo     = columnas[0].substring(13,14);
		// var zonadatos =document.getElementById("zonadatos");
		var transaccion1 = db.transaction(["patrocinadores"],"readonly");
		console.log(transaccion1);

		switch (medio) {
			case '1':
				totalSucursal += parseFloat(impo);
				document.getElementById("impoSucursal").innerHTML = "$"+totalSucursal.toFixed(2);
				document.getElementById("donatSucursal").innerHTML = totalDonatSucursal;
				totalDonatSucursal++;

				if(tipo == '1') {
					document.getElementById("efectDonatSucu").innerHTML = totalEfectDonatSucursal;
					totalEfectDonatSucursal++;

					totalEfectTotSucursal += parseFloat(impo);
					document.getElementById("efectTotSucu").innerHTML = "$"+totalEfectTotSucursal.toFixed(2);

				}else if(tipo == '2'){
					document.getElementById("cheqBanDonatSucu").innerHTML = totalCheqBanDonatSucursal;
					totalCheqBanDonatSucursal++;

					totalCheqBanTotSucursal += parseFloat(impo);
					document.getElementById("cheqBanTotSucu").innerHTML = "$"+totalCheqBanTotSucursal.toFixed(2);

				}else if(tipo == '3'){
					document.getElementById("cheqOtBanDonatSucu").innerHTML = totalCheqOtBanDonatSucursal;
					totalCheqOtBanDonatSucursal++;

					totalCheqOtBanTotSucursal += parseFloat(impo);
					document.getElementById("cheqOtBanTotSucu").innerHTML = "$"+totalCheqOtBanTotSucursal.toFixed(2);

				}else if(tipo == '4'){
					document.getElementById("tarjCitiDonatSucu").innerHTML = totalTarjCitiDonatSucursal;
					totalTarjCitiDonatSucursal++;

					totalTarjCitiTotSucursal += parseFloat(impo);
					document.getElementById("tarjCitiTotSucu").innerHTML = "$"+totalTarjCitiTotSucursal.toFixed(2);

				}else if(tipo == '5'){
					document.getElementById("tarjOtBanDonatSucu").innerHTML = totalTarjOtBanDonatSucursal;
					totalTarjOtBanDonatSucursal++;

					totalTarjOtBanTotSucursal += parseFloat(impo);
					document.getElementById("tarjOtBanTotSucu").innerHTML = "$"+totalTarjOtBanTotSucursal.toFixed(2);

				}else if(tipo == '6'){
					document.getElementById("AmerExpDonatSucu").innerHTML = totalAmerExpDonatSucursal;
					totalAmerExpDonatSucursal++;

					totalAmerExpTotSucursal += parseFloat(impo);
					document.getElementById("AmerExpTotSucu").innerHTML = "$"+totalAmerExpTotSucursal.toFixed(2);
				}

				break;
			case '2':
				totalCat += parseFloat(impo);
				document.getElementById("impoCat").innerHTML = "$"+totalCat.toFixed(2);
				document.getElementById("donatCat").innerHTML = totalDonatCat;
				totalDonatCat++;

				if(tipo == '1') {
					// document.getElementById("efectDonatSucu").innerHTML = totalEfectDonatSucursal;
					// totalEfectDonatSucursal++;

					// totalEfectTotSucursal += parseFloat(impo);
					// document.getElementById("efectTotSucu").innerHTML = "$"+totalEfectTotSucursal.toFixed(2);

				}else if(tipo == '2'){
					// document.getElementById("cheqBanDonatSucu").innerHTML = totalCheqBanDonatSucursal;
					// totalCheqBanDonatSucursal++;

					// totalCheqBanTotSucursal += parseFloat(impo);
					// document.getElementById("cheqBanTotSucu").innerHTML = "$"+totalCheqBanTotSucursal.toFixed(2);

				}else if(tipo == '3'){
					// document.getElementById("cheqOtBanDonatSucu").innerHTML = totalCheqOtBanDonatSucursal;
					// totalCheqOtBanDonatSucursal++;

					// totalCheqOtBanTotSucursal += parseFloat(impo);
					// document.getElementById("cheqOtBanTotSucu").innerHTML = "$"+totalCheqOtBanTotSucursal.toFixed(2);

				}else if(tipo == '4'){
					document.getElementById("tarjCitiDonatCat").innerHTML = totalTarjCitiDonatCat;
					totalTarjCitiDonatCat++;

					totalTarjCitiTotCat += parseFloat(impo);
					document.getElementById("tarjCitiTotSCat").innerHTML = "$"+totalTarjCitiTotCat.toFixed(2);

				}else if(tipo == '5'){
					document.getElementById("tarjOtBanDonatCat").innerHTML = totalTarjOtBanDonatCat;
					totalTarjOtBanDonatCat++;

					totalTarjOtBanTotCat += parseFloat(impo);
					document.getElementById("tarjOtBanTotCat").innerHTML = "$"+totalTarjOtBanTotCat.toFixed(2);

				}else if(tipo == '6'){
					document.getElementById("AmerExpDonaTCat").innerHTML = totalAmerExpDonatCat;
					totalAmerExpDonatCat++;

					totalAmerExpTotCat += parseFloat(impo);
					document.getElementById("AmerExpTotCat").innerHTML = "$"+totalAmerExpTotCat.toFixed(2);
				}

				break;
			case '3':
				break;
			case '4':
				totalBnet += parseFloat(impo);
				document.getElementById("impoBnet").innerHTML = "$"+totalBnet.toFixed(2);
				document.getElementById("donatBnet").innerHTML = totalDonatBnet;
				totalDonatBnet++;

				if(tipo == '1') {
					document.getElementById("efectDonatBnet").innerHTML = totalEfectDonatBnet;
					totalEfectDonatBnet++;

					totalEfectTotBnet += parseFloat(impo);
					document.getElementById("efectTotBnet").innerHTML = "$"+totalEfectTotBnet.toFixed(2);

				}else if(tipo == '2'){
					// document.getElementById("cheqBanDonatSucu").innerHTML = totalCheqBanDonatSucursal;
					// totalCheqBanDonatSucursal++;

					// totalCheqBanTotSucursal += parseFloat(impo);
					// document.getElementById("cheqBanTotSucu").innerHTML = "$"+totalCheqBanTotSucursal.toFixed(2);

				}else if(tipo == '3'){
					// document.getElementById("cheqOtBanDonatSucu").innerHTML = totalCheqOtBanDonatSucursal;
					// totalCheqOtBanDonatSucursal++;

					// totalCheqOtBanTotSucursal += parseFloat(impo);
					// document.getElementById("cheqOtBanTotSucu").innerHTML = "$"+totalCheqOtBanTotSucursal.toFixed(2);

				}else if(tipo == '4'){
					// document.getElementById("tarjCitiDonatSucu").innerHTML = totalTarjCitiDonatSucursal;
					// totalTarjCitiDonatSucursal++;

					// totalTarjCitiTotSucursal += parseFloat(impo);
					// document.getElementById("tarjCitiTotSucu").innerHTML = "$"+totalTarjCitiTotSucursal.toFixed(2);

				}else if(tipo == '5'){
					// document.getElementById("tarjOtBanDonatSucu").innerHTML = totalTarjOtBanDonatSucursal;
					// totalTarjOtBanDonatSucursal++;

					// totalTarjOtBanTotSucursal += parseFloat(impo);
					// document.getElementById("tarjOtBanTotSucu").innerHTML = "$"+totalTarjOtBanTotSucursal.toFixed(2);

				}else if(tipo == '6'){
					// document.getElementById("AmerExpDonatSucu").innerHTML = totalAmerExpDonatSucursal;
					// totalAmerExpDonatSucursal++;

					// totalAmerExpTotSucursal += parseFloat(impo);
					// document.getElementById("AmerExpTotSucu").innerHTML = "$"+totalAmerExpTotSucursal.toFixed(2);
				}
				break;
			case '5':
				break;
			case '6':
				totalBoteo += parseFloat(impo);
				document.getElementById("impoBoteo").innerHTML = "$"+totalBoteo.toFixed(2);
				document.getElementById("donatBoteo").innerHTML = totalDonatBoteo;
				totalDonatBoteo++;
				break;
			case '7':
				totalAlcancias += parseFloat(impo);
				document.getElementById("impoAlcancias").innerHTML = "$"+totalAlcancias.toFixed(2);
				document.getElementById("donatAlcancias").innerHTML = totalDonatAlcancias;
				totalDonatAlcancias++;
				break;
			case '8':
				totalCodiOtBan += parseFloat(impo);
				document.getElementById("impoCodiOtBan").innerHTML = "$"+totalCodiOtBan.toFixed(2);
				document.getElementById("donatCodiOtBan").innerHTML = totalDonatCodiOtBan;
				totalDonatCodiOtBan++;
				break;
			case '9':
				totalCodiCiti += parseFloat(impo);
				document.getElementById("impoCodiCiti").innerHTML = "$"+totalCodiCiti.toFixed(2);
				document.getElementById("donatCodiCiti").innerHTML = totalDonatCodiciti;
				totalDonatCodiciti++;
				break;
			default:
				break;
		}

	}	

	var sumaImportes = parseFloat(totalSucursal.toFixed(2)) + parseFloat(totalCat.toFixed(2)) + parseFloat(totalBnet.toFixed(2)) + parseFloat(totalBoteo.toFixed(2)) + parseFloat(totalAlcancias.toFixed(2)) + parseFloat(totalCodiOtBan.toFixed(2)) + parseFloat(totalCodiCiti.toFixed(2));
	document.getElementById("totalImportes").innerHTML = "$"+sumaImportes.toFixed(2);

	var sumaDonativos = (totalDonatSucursal-1) + (totalDonatCat-1) + (totalDonatBnet-1) + (totalDonatBoteo-1) + (totalDonatAlcancias-1) + (totalDonatCodiOtBan-1) + (totalDonatCodiciti-1);
	document.getElementById("totalDonativos").innerHTML = sumaDonativos;
}

function mostrarMedios(contenido) {
	console.log(contenido);
	var archivos = contenido.split('|');
	console.log("archivos : ",archivos);
	for (let index = 0; index < archivos.length; index++) {
		
		var filas = archivos[index].split("\n");

	console.log(filas);
	var totalDonatSucursal  = 1;
	var totalDonatCat 	    = 1;
	var totalDonatBnet 		= 1;
	var totalDonatBoteo 	= 1;
	var totalDonatAlcancias = 1;
	var totalDonatCodiOtBan = 1;
	var totalDonatCodiciti  = 1;


	var importes = [8];
	var medios = [7];

	importes[0]=0;
	importes[1]=0;
	importes[2]=0;
	importes[3]=0;
	importes[4]=0;
	importes[5]=0;
	importes[6]=0;

	medios[0]=0;
	medios[1]=0;
	medios[2]=0;
	medios[3]=0;
	medios[4]=0;
	medios[5]=0;
	medios[6]=0;

	

	const tableBody = document.getElementById("tableData");
	let dataHtml = '<tr>';
	for(let i in filas) {
		var columnas = filas[i].split(",")
		var hora = columnas[0].substring(8,12);
		var medio    = columnas[0].substring(12,13);
		var importe  = columnas[0].substring(33,45);
		var impo     = importe.substring(0, 10) + "." + importe.substring(10, importe.length);
		
		if (hora!=null && hora.trim()!='') {
			console.log("hora ",hora);

			console.log("importe ",impo);
			console.log("medio ",medio);
			switch (medio) {
				case "1":
					medios[0] = medios[0]+1;
					importes[0]=importes[0]+parseFloat(impo);
					
					break;
				case "2":
					medios[1] = medios[1]+1;
					importes[1]=importes[1]+parseFloat(impo);
				
					break;
				case "4":
					medios[2] = medios[2]+1;
					importes[2]=importes[2]+parseFloat(impo);
				
					break;
				case "6":
					medios[3] = medios[3]+1;
					importes[3]=importes[3]+parseFloat(impo);
				
					break;
				case "7":
					medios[4] = medios[4]+1;
					importes[4]=importes[4]+parseFloat(impo);
				
					break;
				case "8":
					medios[5] = medios[5]+1;
					importes[5]=importes[5]+parseFloat(impo);
				
					break;
			
				default:
					medios[6] = medios[6]+1;
					importes[6]=importes[6]+parseFloat(impo);
					break;
			}
			importes[7]=hora;
			document.getElementById("lastHour").innerHTML = hora;
		}
		
	}
	dataHtml += '<td>'+medios[0]+'</td><td>'+parseFloat(importes[0]).toFixed(2)+'</td>';
	dataHtml += '<td>'+medios[1]+'</td><td>'+parseFloat(importes[1]).toFixed(2)+'</td>';
	dataHtml += '<td>'+medios[2]+'</td><td>'+parseFloat(importes[2]).toFixed(2)+'</td>';
	dataHtml += '<td>'+medios[3]+'</td><td>'+parseFloat(importes[3]).toFixed(2)+'</td>';
	dataHtml += '<td>'+medios[4]+'</td><td>'+parseFloat(importes[4]).toFixed(2)+'</td>';
	dataHtml += '<td>'+medios[5]+'</td><td>'+parseFloat(importes[5]).toFixed(2)+'</td>';
	dataHtml += '<td>'+medios[6]+'</td><td>'+parseFloat(importes[6]).toFixed(2)+'</td>';
	dataHtml += '<td>'+importes[7]+'</td>';

	dataHtml += '</tr>';
	tableBody.innerHTML = tableBody.innerHTML + dataHtml;

	}
}

function obtenerEstado(claveEdo) {
	let estado = "";
	
	switch (claveEdo) {
		case "01": estado = "CDMX"; break;
		case "02": estado = "AGUASCALIENTES"; break;
		case "03": estado = "BC NORTE"; break;
		case "04": estado = "BC SUR"; break;
		case "05": estado = "CAMPECHE"; break;
		case "06": estado = "COAHUILA"; break;
		case "07": estado = "COLIMA"; break;
		case "08": estado = "CHIAPAS"; break;
		case "09": estado = "CHIHUAHUA"; break;
		case "10": estado = "DURANGO"; break;
		case "11": estado = "GUANAJUATO"; break;
		case "12": estado = "GUERRERO"; break;
		case "13": estado = "HIDALGO"; break;
		case "14": estado = "JALISCO"; break;
		case "15": estado = "EDO DE MEXICO"; break;
		case "16": estado = "MICHOACAN"; break;
		case "17": estado = "MORELOS"; break;
		case "18": estado = "NAYARIT"; break;
		case "19": estado = "NUEVO LEON"; break;
		case "20": estado = "OAXACA"; break;
		case "21": estado = "PUEBLA"; break;
		case "22": estado = "QUERETARO"; break;
		case "23": estado = "QUINTANA ROO"; break;
		case "24": estado = "SAN LUIS POTOSI"; break;
		case "25": estado = "SINALOA"; break;
		case "26": estado = "SONORA"; break;
		case "27": estado = "TABASCO"; break;
		case "28": estado = "TAMAULIPAS"; break;
		case "29": estado = "TLAXCALA"; break;
		case "30": estado = "VERACRUZ"; break;
		case "31": estado = "YUCATAN"; break;
		default: estado = "ZACATECAS"; break;
	}

	return estado;
}

function mostrarSucursales(resultado) {
    var archivos = resultado.replaceAll('|', '');
    var filas = archivos.split("\n");
    let medios1 = Array();
    let medios2 = Array();
    let medios3 = Array();
    let medios4 = Array();
    let medios5 = Array();
    let medios6 = Array();
    let medios7 = Array();
    let medios8 = Array();
    let importes1 = Array();
    let importes2 = Array();
    let importes3 = Array();
    let importes4 = Array();
    let importes5 = Array();
    let importes6 = Array();
    let importes7 = Array();
    let importes8 = Array();
    let estados = Array();
    let sucursales = Array();
    const tableBody = document.getElementById("tableDataSuc");
	tableBody.innerHTML = "";
    let dataHtml = '';

    for(let i in filas) {
        var columnas = filas[i].split(",");
        var sucursal = columnas[0].substring(14,18);
        var estado = columnas[0].substring(45,47);
        var medio    = columnas[0].substring(12,13);
        var importe  = columnas[0].substring(33,45);
        var impo     = importe.substring(0, 10) + "." + importe.substring(10, importe.length);

        if (sucursal != null && sucursal.trim() != "") {
            if (!sucursales.includes(sucursal)) {
                sucursales.push(sucursal);
            }

            switch (medio) {
                case "1":
                    if (medios1[sucursal] == null || medios1[sucursal] == "") {
                        medios1[sucursal] = 1;
                        importes1[sucursal] = parseFloat(impo);
                    } else {
                        medios1[sucursal] = medios1[sucursal] + 1;
                        importes1[sucursal] = importes1[sucursal] + parseFloat(impo);
                    }
                    break;
                case "2":
                    if (medios2[sucursal] == null || medios2[sucursal] == "") {
                        medios2[sucursal] = 1;
                        importes2[sucursal] = parseFloat(impo);
                    } else {
                        medios2[sucursal] = medios2[sucursal] + 1;
                        importes2[sucursal] = importes2[sucursal] + parseFloat(impo);
                    }
                    break;
                case "3":
                    if (medios3[sucursal] == null || medios3[sucursal] == "") {
                        medios3[sucursal] = 1;
                        importes3[sucursal] = parseFloat(impo);
                    } else {
                        medios3[sucursal] = medios3[sucursal] + 1;
                        importes3[sucursal] = importes3[sucursal] + parseFloat(impo);
                    }
                    break;
                case "4":
                    if (medios4[sucursal] == null || medios4[sucursal] == "") {
                        medios4[sucursal] = 1;
                        importes4[sucursal] = parseFloat(impo);
                    } else {
                        medios4[sucursal] = medios4[sucursal] + 1;
                        importes4[sucursal] = importes4[sucursal] + parseFloat(impo);
                    }
                    break;
                case "6":
                    if (medios5[sucursal] == null || medios5[sucursal] == "") {
                        medios5[sucursal] = 1;
                        importes5[sucursal] = parseFloat(impo);
                    } else {
                        medios5[sucursal] = medios5[sucursal] + 1;
                        importes5[sucursal] = importes5[sucursal] + parseFloat(impo);
                    }
                    break;
                case "7":
                    if (medios6[sucursal] == null || medios6[sucursal] == "") {
                        medios6[sucursal] = 1;
                        importes6[sucursal] = parseFloat(impo);
                    } else {
                        medios6[sucursal] = medios6[sucursal] + 1;
                        importes6[sucursal] = importes6[sucursal] + parseFloat(impo);
                    }
                    break;
                case "8":
                    if (medios7[sucursal] == null || medios7[sucursal] == "") {
                        medios7[sucursal] = 1;
                        importes7[sucursal] = parseFloat(impo);
                    } else {
                        medios7[sucursal] = medios7[sucursal] + 1;
                        importes7[sucursal] = importes7[sucursal] + parseFloat(impo);
                    }
                    break;
                default:
                    if (medios8[sucursal] == null || medios8[sucursal] == "") {
                        medios8[sucursal] = 1;
                        importes8[sucursal] = parseFloat(impo);
                    } else {
                        medios8[sucursal] = medios8[sucursal] + 1;
                        importes8[sucursal] = importes8[sucursal] + parseFloat(impo);
                    }
                    break;
            }

            estados[sucursal] = estado;
        }
    }

    sucursales.sort();
    sucursales.forEach(function(value, index) {
		// console.log("2staValu",estados[value]);
		let estadoString = obtenerEstado(estados[value]);
        var m1 = 0, m2 = 0, m3 = 0, m4 = 0, m5 = 0, m6 = 0, m7 = 0, m8 = 0;
        var v1 = 0, v2 = 0, v3 = 0, v4 = 0, v5 = 0, v6 = 0, v7 = 0, v8 = 0;

        if (medios1[value] != null && medios1[value] != "") {m1 = medios1[value];}
        if (medios2[value] != null && medios2[value] != "") {m2 = medios2[value];}
        if (medios3[value] != null && medios3[value] != "") {m3 = medios3[value];}
        if (medios4[value] != null && medios4[value] != "") {m4 = medios4[value];}
        if (medios5[value] != null && medios5[value] != "") {m5 = medios5[value];}
        if (medios6[value] != null && medios6[value] != "") {m6 = medios6[value];}
        if (medios7[value] != null && medios7[value] != "") {m7 = medios7[value];}
        if (medios8[value] != null && medios8[value] != "") {m8 = medios8[value];}

        if (importes1[value] != null && importes1[value] != "") {v1 = parseFloat(importes1[value]).toFixed(2);}
        if (importes2[value] != null && importes2[value] != "") {v2 = parseFloat(importes2[value]).toFixed(2);}
        if (importes3[value] != null && importes3[value] != "") {v3 = parseFloat(importes3[value]).toFixed(2);}
        if (importes4[value] != null && importes4[value] != "") {v4 = parseFloat(importes4[value]).toFixed(2);}
        if (importes5[value] != null && importes5[value] != "") {v5 = parseFloat(importes5[value]).toFixed(2);}
        if (importes6[value] != null && importes6[value] != "") {v6 = parseFloat(importes6[value]).toFixed(2);}
        if (importes7[value] != null && importes7[value] != "") {v7 = parseFloat(importes7[value]).toFixed(2);}
        if (importes8[value] != null && importes8[value] != "") {v8 = parseFloat(importes8[value]).toFixed(2);}

        dataHtml += '</tr>';
        dataHtml += '<td>'+value+'</td>';
        dataHtml += '<td>'+m1+'</td><td>'+v1+'</td>';
        dataHtml += '<td>'+m2+'</td><td>'+v2+'</td>';
        dataHtml += '<td>'+m3+'</td><td>'+v3+'</td>';
        dataHtml += '<td>'+m4+'</td><td>'+v4+'</td>';
        dataHtml += '<td>'+m5+'</td><td>'+v5+'</td>';
        // dataHtml += '<td>'+m6+'</td><td>'+v6+'</td>';
        // dataHtml += '<td>'+m7+'</td><td>'+v7+'</td>';
        dataHtml += '<td>'+m8+'</td><td>'+v8+'</td>';
        dataHtml += '<td>'+estadoString+'</td>';
        dataHtml += '</tr>';
    });
    tableBody.innerHTML = tableBody.innerHTML + dataHtml;
	
}

function mostrarEstados(resultado) {
	resultado = resultado.replaceAll('|','')
	var filas = resultado.split("\n");

	var movSucDf 	= 1;
	var movCatDf 	= 1;
	var movBnetDf = 1;
	var movBotDf  = 1;
	var movAlcDf = 1;
	var movAmexDf = 1;

	var impoSucDf	  = 0;
	var impoCatDf   = 0;
	var impoBnetDf = 0;
	var impoBotDf  = 0;
	var impoAlcDf = 0;
	var impoAmexDf = 0;


	var movSucAg 	= 1;
	var movCatAg 	= 1;
	var movBnetAg = 1;
	var movBotAg = 1;
	var movAlcAg = 1;
	var movAmexAg = 1;

	var impoSucAg	  = 0;
	var impoCatAg   = 0;
	var impoBnetAg = 0;
	var impoBotAg  = 0;
	var impoAlcAg = 0;
	var impoAmexAg = 0;


	var movSucBcn 	= 1;
	var movCatBcn 	= 1;
	var movBnetBcn = 1;
	var movBotBcn = 1;
	var movAlcBcn = 1;
	var movAmexBcn = 1;

	var impoSucBcn	  = 0;
	var impoCatBcn   = 0;
	var impoBnetBcn = 0;
	var impoBotBcn  = 0;
	var impoAlcBcn = 0;
	var impoAmexBcn = 0;


	var movSucBcs 	= 1;
	var movCatBcs 	= 1;
	var movBnetBcs = 1;
	var movBotBcs = 1;
	var movAlcBcs = 1;
	var movAmexBcs = 1;

	var impoSucBcs	  = 0;
	var impoCatBcs   = 0;
	var impoBnetBcs = 0;
	var impoBotBcs  = 0;
	var impoAlcBcs = 0;
	var impoAmexBcs = 0;


	var movSucCa 	= 1;
	var movCatCa 	= 1;
	var movBnetCa = 1;
	var movBotCa = 1;
	var movAlcCa = 1;
	var movAmexCa = 1;

	var impoSucCa	  = 0;
	var impoCatCa   = 0;
	var impoBnetCa = 0;
	var impoBotCa  = 0;
	var impoAlcCa = 0;
	var impoAmexCa = 0;


	var movSucCo 	= 1;
	var movCatCo 	= 1;
	var movBnetCo = 1;
	var movBotCo = 1;
	var movAlcCo = 1;
	var movAmexCo = 1;

	var impoSucCo	  = 0;
	var impoCatCo   = 0;
	var impoBnetCo = 0;
	var impoBotCo  = 0;
	var impoAlcCo = 0;
	var impoAmexCo = 0;


	var movSucCol 	= 1;
	var movCatCol 	= 1;
	var movBnetCol = 1;
	var movBotCol = 1;
	var movAlcCol = 1;
	var movAmexCol = 1;

	var impoSucCol	  = 0;
	var impoCatCol   = 0;
	var impoBnetCol = 0;
	var impoBotCol  = 0;
	var impoAlcCol = 0;
	var impoAmexCol = 0;


	var movSucCh 	= 1;
	var movCatCh 	= 1;
	var movBnetCh = 1;
	var movBotCh = 1;
	var movAlcCh = 1;
	var movAmexCh = 1;

	var impoSucCh	  = 0;
	var impoCatCh   = 0;
	var impoBnetCh = 0;
	var impoBotCh  = 0;
	var impoAlcCh = 0;
	var impoAmexCh = 0;


	var movSucChi 	= 1;
	var movCatChi	= 1;
	var movBnetChi = 1;
	var movBotChi = 1;
	var movAlcChi = 1;
	var movAmexChi = 1;

	var impoSucChi	  = 0;
	var impoCatChi   = 0;
	var impoBnetChi = 0;
	var impoBotChi  = 0;
	var impoAlcChi = 0;
	var impoAmexChi = 0;


	var movSucDu 	= 1;
	var movCatDu	= 1;
	var movBnetDu = 1;
	var movBotDu = 1;
	var movAlcDu = 1;
	var movAmexDu = 1;

	var impoSucDu	  = 0;
	var impoCatDu   = 0;
	var impoBnetDu = 0;
	var impoBotDu  = 0;
	var impoAlcDu = 0;
	var impoAmexDu = 0;


	var movSucGu 	= 1;
	var movCatGu	= 1;
	var movBnetGu = 1;
	var movBotGu = 1;
	var movAlcGu = 1;
	var movAmexGu = 1;

	var impoSucGu	  = 0;
	var impoCatGu   = 0;
	var impoBnetGu = 0;
	var impoBotGu  = 0;
	var impoAlcGu = 0;
	var impoAmexGu = 0;


	var movSucGue 	= 1;
	var movCatGue	= 1;
	var movBnetGue = 1;
	var movBotGue = 1;
	var movAlcGue = 1;
	var movAmexGue = 1;

	var impoSucGue	  = 0;
	var impoCatGue   = 0;
	var impoBnetGue = 0;
	var impoBotGue  = 0;
	var impoAlcGue = 0;
	var impoAmexGue = 0;


	var movSucHi 	= 1;
	var movCatHi	= 1;
	var movBnetHi = 1;
	var movBotHi = 1;
	var movAlcHi = 1;
	var movAmexHi = 1;

	var impoSucHi	  = 0;
	var impoCatHi   = 0;
	var impoBnetHi = 0;
	var impoBotHi  = 0;
	var impoAlcHi = 0;
	var impoAmexHi = 0;


	var movSucJa 	= 1;
	var movCatJa	= 1;
	var movBnetJa = 1;
	var movBotJa= 1;
	var movAlcJa = 1;
	var movAmexJa = 1;

	var impoSucJa	  = 0;
	var impoCatJa   = 0;
	var impoBnetJa = 0;
	var impoBotJa  = 0;
	var impoAlcJa = 0;
	var impoAmexJa = 0;


	var movSucEm 	= 1;
	var movCatEm	= 1;
	var movBnetEm = 1;
	var movBotEm= 1;
	var movAlcEm = 1;
	var movAmexEm = 1;

	var impoSucEm	  = 0;
	var impoCatEm   = 0;
	var impoBnetEm = 0;
	var impoBotEm  = 0;
	var impoAlcEm = 0;
	var impoAmexEm = 0;


	var movSucMi 	= 1;
	var movCatMi	= 1;
	var movBnetMi = 1;
	var movBotMi= 1;
	var movAlcMi = 1;
	var movAmexMi = 1;

	var impoSucMi	  = 0;
	var impoCatMi   = 0;
	var impoBnetMi = 0;
	var impoBotMi  = 0;
	var impoAlcMi = 0;
	var impoAmexMi = 0;


	var movSucMo 	= 1;
	var movCatMo	= 1;
	var movBnetMo = 1;
	var movBotMo= 1;
	var movAlcMo = 1;
	var movAmexMo = 1;

	var impoSucMo	  = 0;
	var impoCatMo   = 0;
	var impoBnetMo = 0;
	var impoBotMo = 0;
	var impoAlcMo = 0;
	var impoAmexMo = 0;


	var movSucNa 	= 1;
	var movCatNa	= 1;
	var movBnetNa = 1;
	var movBotNa= 1;
	var movAlcNa = 1;
	var movAmexNa = 1;

	var impoSucNa	  = 0;
	var impoCatNa   = 0;
	var impoBnetNa = 0;
	var impoBotNa = 0;
	var impoAlcNa = 0;
	var impoAmexNa = 0;


	var movSucNl 	= 1;
	var movCatNl	= 1;
	var movBnetNl = 1;
	var movBotNl = 1;
	var movAlcNl = 1;
	var movAmexNl = 1;

	var impoSucNl	  = 0;
	var impoCatNl   = 0;
	var impoBnetNl = 0;
	var impoBotNl = 0;
	var impoAlcNl = 0;
	var impoAmexNl = 0;


	var movSucOa 	= 1;
	var movCatOa	= 1;
	var movBnetOa = 1;
	var movBotOa = 1;
	var movAlcOa = 1;
	var movAmexOa = 1;

	var impoSucOa	  = 0;
	var impoCatOa   = 0;
	var impoBnetOa = 0;
	var impoBotOa = 0;
	var impoAlcOa = 0;
	var impoAmexOa = 0;


	var movSucPu 	= 1;
	var movCatPu	= 1;
	var movBnetPu = 1;
	var movBotPu = 1;
	var movAlcPu = 1;
	var movAmexPu = 1;

	var impoSucPu	  = 0;
	var impoCatPu   = 0;
	var impoBnetPu = 0;
	var impoBotPu = 0;
	var impoAlcPu = 0;
	var impoAmexPu = 0;


	var movSucQu 	= 1;
	var movCatQu	= 1;
	var movBnetQu = 1;
	var movBotQu = 1;
	var movAlcQu = 1;
	var movAmexQu = 1;

	var impoSucQu	  = 0;
	var impoCatQu   = 0;
	var impoBnetQu = 0;
	var impoBotQu = 0;
	var impoAlcQu = 0;
	var impoAmexQu = 0;


	var movSucQr 	= 1;
	var movCatQr	= 1;
	var movBnetQr = 1;
	var movBotQr = 1;
	var movAlcQr = 1;
	var movAmexQr = 1;

	var impoSucQr	  = 0;
	var impoCatQr   = 0;
	var impoBnetQr = 0;
	var impoBotQr = 0;
	var impoAlcQr = 0;
	var impoAmexQr = 0;


	var movSucSlp 	= 1;
	var movCatSlp	= 1;
	var movBnetSlp = 1;
	var movBotSlp = 1;
	var movAlcSlp = 1;
	var movAmexSlp = 1;

	var impoSucSlp	  = 0;
	var impoCatSlp   = 0;
	var impoBnetSlp = 0;
	var impoBotSlp = 0;
	var impoAlcSlp = 0;
	var impoAmexSlp = 0;


	var movSucSi 	= 1;
	var movCatSi	= 1;
	var movBnetSi = 1;
	var movBotSi = 1;
	var movAlcSi = 1;
	var movAmexSi = 1;

	var impoSucSi	  = 0;
	var impoCatSi   = 0;
	var impoBnetSi = 0;
	var impoBotSi = 0;
	var impoAlcSi = 0;
	var impoAmexSi = 0;


	var movSucSo 	= 1;
	var movCatSo	= 1;
	var movBnetSo = 1;
	var movBotSo = 1;
	var movAlcSo = 1;
	var movAmexSo = 1;

	var impoSucSo	  = 0;
	var impoCatSo   = 0;
	var impoBnetSo = 0;
	var impoBotSo = 0;
	var impoAlcSo = 0;
	var impoAmexSo = 0;


	var movSucTa 	= 1;
	var movCatTa	= 1;
	var movBnetTa = 1;
	var movBotTa = 1;
	var movAlcTa = 1;
	var movAmexTa = 1;

	var impoSucTa	  = 0;
	var impoCatTa   = 0;
	var impoBnetTa = 0;
	var impoBotTa = 0;
	var impoAlcTa = 0;
	var impoAmexTa = 0;


	var movSucTam 	= 1;
	var movCatTam	= 1;
	var movBnetTam = 1;
	var movBotTam = 1;
	var movAlcTam = 1;
	var movAmexTam = 1;

	var impoSucTam	  = 0;
	var impoCatTam   = 0;
	var impoBnetTam = 0;
	var impoBotTam = 0;
	var impoAlcTam = 0;
	var impoAmexTam = 0;


	var movSucTl 	= 1;
	var movCatTl	= 1;
	var movBnetTl = 1;
	var movBotTl = 1;
	var movAlcTl = 1;
	var movAmexTl = 1;

	var impoSucTl	  = 0;
	var impoCatTl   = 0;
	var impoBnetTl = 0;
	var impoBotTl = 0;
	var impoAlcTl = 0;
	var impoAmexTl = 0;


	var movSucVe 	= 1;
	var movCatVe	= 1;
	var movBnetVe = 1;
	var movBotVe = 1;
	var movAlcVe = 1;
	var movAmexVe = 1;

	var impoSucVe	  = 0;
	var impoCatVe   = 0;
	var impoBnetVe = 0;
	var impoBotVe = 0;
	var impoAlcVe = 0;
	var impoAmexVe = 0;


	var movSucYu 	= 1;
	var movCatYu	= 1;
	var movBnetYu = 1;
	var movBotYu = 1;
	var movAlcYu = 1;
	var movAmexYu = 1;

	var impoSucYu	  = 0;
	var impoCatYu   = 0;
	var impoBnetYu = 0;
	var impoBotYu = 0;
	var impoAlcYu = 0;
	var impoAmexYu = 0;


	var movSucZa 	= 1;
	var movCatZa	= 1;
	var movBnetZa = 1;
	var movBotZa = 1;
	var movAlcZa = 1;
	var movAmexZa = 1;

	var impoSucZa	  = 0;
	var impoCatZa   = 0;
	var impoBnetZa = 0;
	var impoBotZa = 0;
	var impoAlcZa = 0;
	var impoAmexZa = 0;

	/*var totalTarjCitiDonatCat  = 1;
	var totalTarjOtBanDonatCat = 1;
	var totalAmerExpDonatCat   = 1;

	var totalTarjCitiTotCat  = 0;
	var totalTarjOtBanTotCat = 0;
	var totalAmerExpTotCat   = 0;

	var totalEfectDonatBnet  = 1;
	var totalEfectTotBnet  = 0;*/

	for(var i in filas) {
		var columnas = filas[i].split(",");
		var importe  = columnas[0].substring(33,45);
		var impo     = importe.substring(0, 10) + "." + importe.substring(10, importe.length);
		var estado = columnas[0].substring(45,47);
		var medio    = columnas[0].substring(12,13);
		var tipo     = columnas[0].substring(13,14);

		switch (estado) {
			case "01":
				if(medio == 1) {
					document.getElementById("dFcol1").innerHTML = movSucDf;
					movSucDf++;

					impoSucDf += parseFloat(impo);
					document.getElementById("dFcol2").innerHTML = "$"+impoSucDf.toFixed(2);

				}else if(medio == 2) {
					document.getElementById("dFcol3").innerHTML = movCatDf;
					movCatDf++;

					impoCatDf += parseFloat(impo);
					document.getElementById("dFcol4").innerHTML = "$"+impoCatDf.toFixed(2);

				}else if(medio == 3) {

				}else if(medio == 4) {
					document.getElementById("dFcol5").innerHTML = movBnetDf;
					movBnetDf++;

					impoBnetDf += parseFloat(impo);
					document.getElementById("dFcol6").innerHTML = "$"+impoBnetDf.toFixed(2);

				}else if(medio == 5) {

				}else if(medio == 6) {
					document.getElementById("dFcol7").innerHTML = movBotDf;
					movBotDf++;

					impoBotDf += parseFloat(impo);
					document.getElementById("dFcol8").innerHTML = "$"+impoBotDf.toFixed(2);

				}else if(medio == 7) {
					document.getElementById("dFcol9").innerHTML = movAlcDf;
					movAlcDf++;

					impoAlcDf += parseFloat(impo);
					document.getElementById("dFcol10").innerHTML = "$"+impoAlcDf.toFixed(2);

				}else if(medio == 8) {

				}else if(medio == 9) {

				}

				if(tipo == 6) {
					document.getElementById("dFcol11").innerHTML = movAmexDf;
					movAmexDf++;

					impoAmexDf += parseFloat(impo);
					document.getElementById("dFcol12").innerHTML = "$"+impoAmexDf.toFixed(2);

				}

				break;
			case "02":
				if(medio == 1) {
					document.getElementById("Agcol1").innerHTML = movSucAg;
					movSucAg++;

					impoSucAg += parseFloat(impo);
					document.getElementById("Agcol2").innerHTML = "$"+impoSucAg.toFixed(2);

				}else if(medio == 2) {
					document.getElementById("Agcol3").innerHTML = movCatAg;
					movCatAg++;

					impoCatAg += parseFloat(impo);
					document.getElementById("Agcol4").innerHTML = "$"+impoCatAg.toFixed(2);

				}else if(medio == 3) {

				}else if(medio == 4) {
					document.getElementById("Agcol5").innerHTML = movBnetAg;
					movBnetAg++;

					impoBnetAg += parseFloat(impo);
					document.getElementById("Agcol6").innerHTML = "$"+impoBnetAg.toFixed(2);

				}else if(medio == 5) {

				}else if(medio == 6) {
					document.getElementById("Agcol7").innerHTML = movBotAg;
					movBotAg++;

					impoBotAg += parseFloat(impo);
					document.getElementById("Agcol8").innerHTML = "$"+impoBotAg.toFixed(2);

				}else if(medio == 7) {
					document.getElementById("Agcol9").innerHTML = movAlcAg;
					movAlcAg++;

					impoAlcAg += parseFloat(impo);
					document.getElementById("Agcol10").innerHTML = "$"+impoAlcAg.toFixed(2);

				}else if(medio == 8) {

				}else if(medio == 9) {

				}

				if(tipo == 6) {
					document.getElementById("Agcol11").innerHTML = movAmexAg;
					movAmexAg++;

					impoAmexAg += parseFloat(impo);
					document.getElementById("Agcol12").innerHTML = "$"+impoAmexAg.toFixed(2);

				}

				break;
			case "03":

				if(medio == 1) {
					document.getElementById("bCNcol1").innerHTML = movSucBcn;
					movSucBcn++;

					impoSucBcn += parseFloat(impo);
					document.getElementById("bCNcol2").innerHTML = "$"+impoSucBcn.toFixed(2);

				}else if(medio == 2) {
					document.getElementById("bCNcol3").innerHTML = movCatBcn;
					movCatBcn++;

					impoCatBcn += parseFloat(impo);
					document.getElementById("bCNcol4").innerHTML = "$"+impoCatBcn.toFixed(2);

				}else if(medio == 3) {

				}else if(medio == 4) {
					document.getElementById("bCNcol5").innerHTML = movBnetBcn;
					movBnetBcn++;

					impoBnetBcn += parseFloat(impo);
					document.getElementById("bCNcol6").innerHTML = "$"+impoBnetBcn.toFixed(2);

				}else if(medio == 5) {

				}else if(medio == 6) {
					document.getElementById("bCNcol7").innerHTML = movBotBcn;
					movBotBcn++;

					impoBotBcn += parseFloat(impo);
					document.getElementById("bCNcol8").innerHTML = "$"+impoBotBcn.toFixed(2);

				}else if(medio == 7) {
					document.getElementById("bCNcol9").innerHTML = movAlcBcn;
					movAlcBcn++;

					impoAlcBcn += parseFloat(impo);
					document.getElementById("bCNcol10").innerHTML = "$"+impoAlcBcn.toFixed(2);

				}else if(medio == 8) {

				}else if(medio == 9) {

				}

				if(tipo == 6) {
					document.getElementById("bCNcol11").innerHTML = movAmexBcn;
					movAmexBcn++;

					impoAmexBcn += parseFloat(impo);
					document.getElementById("bCNcol12").innerHTML = "$"+impoAmexBcn.toFixed(2);

				}

				break;
			case "04":
				
				if(medio == 1) {
					document.getElementById("bCScol1").innerHTML = movSucBcs;
					movSucBcs++;

					impoSucBcs += parseFloat(impo);
					document.getElementById("bCScol2").innerHTML = "$"+impoSucBcs.toFixed(2);

				}else if(medio == 2) {
					document.getElementById("bCScol3").innerHTML = movCatBcs;
					movCatBcs++;

					impoCatBcs += parseFloat(impo);
					document.getElementById("bCScol4").innerHTML = "$"+impoCatBcs.toFixed(2);

				}else if(medio == 3) {

				}else if(medio == 4) {
					document.getElementById("bCScol5").innerHTML = movBnetBcs;
					movBnetBcs++;

					impoBnetBcs += parseFloat(impo);
					document.getElementById("bCScol6").innerHTML = "$"+impoBnetBcs.toFixed(2);

				}else if(medio == 5) {

				}else if(medio == 6) {
					document.getElementById("bCScol7").innerHTML = movBotBcs;
					movBotBcs++;

					impoBotBcs += parseFloat(impo);
					document.getElementById("bCScol8").innerHTML = "$"+impoBotBcs.toFixed(2);

				}else if(medio == 7) {
					document.getElementById("bCScol9").innerHTML = movAlcBcs;
					movAlcBcs++;

					impoAlcBcs += parseFloat(impo);
					document.getElementById("bCScol10").innerHTML = "$"+impoAlcBcs.toFixed(2);

				}else if(medio == 8) {

				}else if(medio == 9) {

				}

				if(tipo == 6) {
					document.getElementById("bCScol11").innerHTML = movAmexBcs;
					movAmexBcs++;

					impoAmexBcs += parseFloat(impo);
					document.getElementById("bCScol12").innerHTML = "$"+impoAmexBcs.toFixed(2);

				}

				break;
			case "05":
				
				if(medio == 1) {
					document.getElementById("Cacol1").innerHTML = movSucCa;
					movSucCa++;

					impoSucCa += parseFloat(impo);
					document.getElementById("Cacol2").innerHTML = "$"+impoSucCa.toFixed(2);

				}else if(medio == 2) {
					document.getElementById("Cacol3").innerHTML = movCatCa;
					movCatCa++;

					impoCatCa += parseFloat(impo);
					document.getElementById("Cacol4").innerHTML = "$"+impoCatCa.toFixed(2);

				}else if(medio == 3) {

				}else if(medio == 4) {
					document.getElementById("Cacol5").innerHTML = movBnetCa;
					movBnetCa++;

					impoBnetCa += parseFloat(impo);
					document.getElementById("Cacol6").innerHTML = "$"+impoBnetCa.toFixed(2);

				}else if(medio == 5) {

				}else if(medio == 6) {
					document.getElementById("Cacol7").innerHTML = movBotCa;
					movBotCa++;

					impoBotCa += parseFloat(impo);
					document.getElementById("Cacol8").innerHTML = "$"+impoBotCa.toFixed(2);

				}else if(medio == 7) {
					document.getElementById("Cacol9").innerHTML = movAlcCa;
					movAlcCa++;

					impoAlcCa += parseFloat(impo);
					document.getElementById("Cacol10").innerHTML = "$"+impoAlcCa.toFixed(2);

				}else if(medio == 8) {

				}else if(medio == 9) {

				}

				if(tipo == 6) {
					document.getElementById("Cacol11").innerHTML = movAmexCa;
					movAmexCa++;

					impoAmexCa += parseFloat(impo);
					document.getElementById("Cacol12").innerHTML = "$"+impoAmexCa.toFixed(2);

				}

				break;
			case "06":
				
				if(medio == 1) {
					document.getElementById("Cocol1").innerHTML = movSucCo;
					movSucCo++;

					impoSucCo += parseFloat(impo);
					document.getElementById("Cocol2").innerHTML = "$"+impoSucCo.toFixed(2);

				}else if(medio == 2) {
					document.getElementById("Cocol3").innerHTML = movCatCo;
					movCatCo++;

					impoCatCo += parseFloat(impo);
					document.getElementById("Cocol4").innerHTML = "$"+impoCatCo.toFixed(2);

				}else if(medio == 3) {

				}else if(medio == 4) {
					document.getElementById("Cocol5").innerHTML = movBnetCo;
					movBnetCo++;

					impoBnetCo += parseFloat(impo);
					document.getElementById("Cocol6").innerHTML = "$"+impoBnetCo.toFixed(2);

				}else if(medio == 5) {

				}else if(medio == 6) {
					document.getElementById("Cocol7").innerHTML = movBotCo;
					movBotCo++;

					impoBotCo += parseFloat(impo);
					document.getElementById("Cocol8").innerHTML = "$"+impoBotCo.toFixed(2);

				}else if(medio == 7) {
					document.getElementById("Cocol9").innerHTML = movAlcCo;
					movAlcCo++;

					impoAlcCo += parseFloat(impo);
					document.getElementById("Cocol10").innerHTML = "$"+impoAlcCo.toFixed(2);

				}else if(medio == 8) {

				}else if(medio == 9) {

				}

				if(tipo == 6) {
					document.getElementById("Cocol11").innerHTML = movAmexCo;
					movAmexCo++;

					impoAmexCo += parseFloat(impo);
					document.getElementById("Cocol12").innerHTML = "$"+impoAmexCo.toFixed(2);

				}

				break;
			case "07":
				
				if(medio == 1) {
					document.getElementById("Colcol1").innerHTML = movSucCol;
					movSucCol++;

					impoSucCol += parseFloat(impo);
					document.getElementById("Colcol2").innerHTML = "$"+impoSucCol.toFixed(2);

				}else if(medio == 2) {
					document.getElementById("Colcol3").innerHTML = movCatCol;
					movCatCol++;

					impoCatCol += parseFloat(impo);
					document.getElementById("Colcol4").innerHTML = "$"+impoCatCol.toFixed(2);

				}else if(medio == 3) {

				}else if(medio == 4) {
					document.getElementById("Colcol5").innerHTML = movBnetCol;
					movBnetCol++;

					impoBnetCol += parseFloat(impo);
					document.getElementById("Colcol6").innerHTML = "$"+impoBnetCol.toFixed(2);

				}else if(medio == 5) {

				}else if(medio == 6) {
					document.getElementById("Colcol7").innerHTML = movBotCol;
					movBotCol++;

					impoBotCol += parseFloat(impo);
					document.getElementById("Colcol8").innerHTML = "$"+impoBotCol.toFixed(2);

				}else if(medio == 7) {
					document.getElementById("Colcol9").innerHTML = movAlcCol;
					movAlcCol++;

					impoAlcCol += parseFloat(impo);
					document.getElementById("Colcol10").innerHTML = "$"+impoAlcCol.toFixed(2);

				}else if(medio == 8) {

				}else if(medio == 9) {

				}

				if(tipo == 6) {
					document.getElementById("Colcol11").innerHTML = movAmexCol;
					movAmexCol++;

					impoAmexCol += parseFloat(impo);
					document.getElementById("Colcol12").innerHTML = "$"+impoAmexCol.toFixed(2);

				}

				break;
			case "08":
				
				if(medio == 1) {
					document.getElementById("Chcol1").innerHTML = movSucCh;
					movSucCh++;

					impoSucCh += parseFloat(impo);
					document.getElementById("Chcol2").innerHTML = "$"+impoSucCh.toFixed(2);

				}else if(medio == 2) {
					document.getElementById("Chcol3").innerHTML = movCatCh;
					movCatCh++;

					impoCatCh += parseFloat(impo);
					document.getElementById("Chcol4").innerHTML = "$"+impoCatCh.toFixed(2);

				}else if(medio == 3) {

				}else if(medio == 4) {
					document.getElementById("Chcol5").innerHTML = movBnetCh;
					movBnetCh++;

					impoBnetCh += parseFloat(impo);
					document.getElementById("Chcol6").innerHTML = "$"+impoBnetCh.toFixed(2);

				}else if(medio == 5) {

				}else if(medio == 6) {
					document.getElementById("Chcol7").innerHTML = movBotCh;
					movBotCh++;

					impoBotCh += parseFloat(impo);
					document.getElementById("Chcol8").innerHTML = "$"+impoBotCh.toFixed(2);

				}else if(medio == 7) {
					document.getElementById("Chcol9").innerHTML = movAlcCh;
					movAlcCh++;

					impoAlcCh += parseFloat(impo);
					document.getElementById("Chcol10").innerHTML = "$"+impoAlcCh.toFixed(2);

				}else if(medio == 8) {

				}else if(medio == 9) {

				}

				if(tipo == 6) {
					document.getElementById("Chcol11").innerHTML = movAmexCh;
					movAmexCh++;

					impoAmexCh += parseFloat(impo);
					document.getElementById("Chcol12").innerHTML = "$"+impoAmexCh.toFixed(2);

				}

				break;
			case "09":
				
				if(medio == 1) {
					document.getElementById("Chicol1").innerHTML = movSucChi;
					movSucChi++;

					impoSucChi += parseFloat(impo);
					document.getElementById("Chicol2").innerHTML = "$"+impoSucChi.toFixed(2);

				}else if(medio == 2) {
					document.getElementById("Chicol3").innerHTML = movCatChi;
					movCatChi++;

					impoCatChi += parseFloat(impo);
					document.getElementById("Chicol4").innerHTML = "$"+impoCatChi.toFixed(2);

				}else if(medio == 3) {

				}else if(medio == 4) {
					document.getElementById("Chicol5").innerHTML = movBnetChi;
					movBnetChi++;

					impoBnetChi += parseFloat(impo);
					document.getElementById("Chicol6").innerHTML = "$"+impoBnetChi.toFixed(2);

				}else if(medio == 5) {

				}else if(medio == 6) {
					document.getElementById("Chicol7").innerHTML = movBotChi;
					movBotChi++;

					impoBotChi += parseFloat(impo);
					document.getElementById("Chicol8").innerHTML = "$"+impoBotChi.toFixed(2);

				}else if(medio == 7) {
					document.getElementById("Chicol9").innerHTML = movAlcChi;
					movAlcChi++;

					impoAlcChi += parseFloat(impo);
					document.getElementById("Chicol10").innerHTML = "$"+impoAlcChi.toFixed(2);

				}else if(medio == 8) {

				}else if(medio == 9) {

				}

				if(tipo == 6) {
					document.getElementById("Chicol11").innerHTML = movAmexChi;
					movAmexChi++;

					impoAmexChi += parseFloat(impo);
					document.getElementById("Chicol12").innerHTML = "$"+impoAmexChi.toFixed(2);

				}

				break;
			case "10":
				
				if(medio == 1) {
					document.getElementById("Ducol1").innerHTML = movSucDu;
					movSucDu++;

					impoSucDu += parseFloat(impo);
					document.getElementById("Ducol2").innerHTML = "$"+impoSucDu.toFixed(2);

				}else if(medio == 2) {
					document.getElementById("Ducol3").innerHTML = movCatDu;
					movCatDu++;

					impoCatDu += parseFloat(impo);
					document.getElementById("Ducol4").innerHTML = "$"+impoCatDu.toFixed(2);

				}else if(medio == 3) {

				}else if(medio == 4) {
					document.getElementById("Ducol5").innerHTML = movBnetDu;
					movBnetDu++;

					impoBnetDu += parseFloat(impo);
					document.getElementById("Ducol6").innerHTML = "$"+impoBnetDu.toFixed(2);

				}else if(medio == 5) {

				}else if(medio == 6) {
					document.getElementById("Ducol7").innerHTML = movBotDu;
					movBotDu++;

					impoBotDu += parseFloat(impo);
					document.getElementById("Ducol8").innerHTML = "$"+impoBotDu.toFixed(2);

				}else if(medio == 7) {
					document.getElementById("Ducol9").innerHTML = movAlcDu;
					movAlcDu++;

					impoAlcDu += parseFloat(impo);
					document.getElementById("Ducol10").innerHTML = "$"+impoAlcDu.toFixed(2);

				}else if(medio == 8) {

				}else if(medio == 9) {

				}

				if(tipo == 6) {
					document.getElementById("Ducol11").innerHTML = movAmexDu;
					movAmexDu++;

					impoAmexDu += parseFloat(impo);
					document.getElementById("Ducol12").innerHTML = "$"+impoAmexDu.toFixed(2);

				}

				break;

			case "11":

				if(medio == 1) {
					document.getElementById("Gucol1").innerHTML = movSucGu;
					movSucGu++;

					impoSucGu += parseFloat(impo);
					document.getElementById("Gucol2").innerHTML = "$"+impoSucGu.toFixed(2);

				}else if(medio == 2) {
					document.getElementById("Gucol3").innerHTML = movCatGu;
					movCatGu++;

					impoCatGu += parseFloat(impo);
					document.getElementById("Gucol4").innerHTML = "$"+impoCatGu.toFixed(2);

				}else if(medio == 3) {

				}else if(medio == 4) {
					document.getElementById("Gucol5").innerHTML = movBnetGu;
					movBnetGu++;

					impoBnetGu += parseFloat(impo);
					document.getElementById("Gucol6").innerHTML = "$"+impoBnetGu.toFixed(2);

				}else if(medio == 5) {

				}else if(medio == 6) {
					document.getElementById("Gucol7").innerHTML = movBotGu;
					movBotGu++;

					impoBotGu += parseFloat(impo);
					document.getElementById("Gucol8").innerHTML = "$"+impoBotGu.toFixed(2);

				}else if(medio == 7) {
					document.getElementById("Gucol9").innerHTML = movAlcGu;
					movAlcGu++;

					impoAlcGu += parseFloat(impo);
					document.getElementById("Gucol10").innerHTML = "$"+impoAlcGu.toFixed(2);

				}else if(medio == 8) {

				}else if(medio == 9) {

				}
				
				if(tipo == 6) {
					document.getElementById("Gucol11").innerHTML = movAmexGu;
					movAmexGu++;

					impoAmexGu += parseFloat(impo);
					document.getElementById("Gucol12").innerHTML = "$"+impoAmexGu.toFixed(2);

				}

				break;
			case "12":

				if(medio == 1) {
					document.getElementById("Guecol1").innerHTML = movSucGue;
					movSucGue++;

					impoSucGue += parseFloat(impo);
					document.getElementById("Guecol2").innerHTML = "$"+impoSucGue.toFixed(2);

				}else if(medio == 2) {
					document.getElementById("Guecol3").innerHTML = movCatGue;
					movCatGue++;

					impoCatGue += parseFloat(impo);
					document.getElementById("Guecol4").innerHTML = "$"+impoCatGue.toFixed(2);

				}else if(medio == 3) {

				}else if(medio == 4) {
					document.getElementById("Guecol5").innerHTML = movBnetGue;
					movBnetGue++;

					impoBnetGue += parseFloat(impo);
					document.getElementById("Guecol6").innerHTML = "$"+impoBnetGue.toFixed(2);

				}else if(medio == 5) {

				}else if(medio == 6) {
					document.getElementById("Guecol7").innerHTML = movBotGue;
					movBotGue++;

					impoBotGue += parseFloat(impo);
					document.getElementById("Guecol8").innerHTML = "$"+impoBotGue.toFixed(2);

				}else if(medio == 7) {
					document.getElementById("Guecol9").innerHTML = movAlcGue;
					movAlcGue++;

					impoAlcGue += parseFloat(impo);
					document.getElementById("Guecol10").innerHTML = "$"+impoAlcGue.toFixed(2);

				}else if(medio == 8) {

				}else if(medio == 9) {

				}
				
				if(tipo == 6) {
					document.getElementById("Guecol11").innerHTML = movAmexGue;
					movAmexGue++;

					impoAmexGue += parseFloat(impo);
					document.getElementById("Guecol12").innerHTML = "$"+impoAmexGue.toFixed(2);

				}

				break;
			case "13":
				
				if(medio == 1) {
					document.getElementById("Hicol1").innerHTML = movSucHi;
					movSucHi++;

					impoSucHi += parseFloat(impo);
					document.getElementById("Hicol2").innerHTML = "$"+impoSucHi.toFixed(2);

				}else if(medio == 2) {
					document.getElementById("Hicol3").innerHTML = movCatHi;
					movCatHi++;

					impoCatHi += parseFloat(impo);
					document.getElementById("Hicol4").innerHTML = "$"+impoCatHi.toFixed(2);

				}else if(medio == 3) {

				}else if(medio == 4) {
					document.getElementById("Hicol5").innerHTML = movBnetHi;
					movBnetHi++;

					impoBnetHi += parseFloat(impo);
					document.getElementById("Hicol6").innerHTML = "$"+impoBnetHi.toFixed(2);

				}else if(medio == 5) {

				}else if(medio == 6) {
					document.getElementById("Hicol7").innerHTML = movBotHi;
					movBotHi++;

					impoBotHi += parseFloat(impo);
					document.getElementById("Hicol8").innerHTML = "$"+impoBotHi.toFixed(2);

				}else if(medio == 7) {
					document.getElementById("Hicol9").innerHTML = movAlcHi;
					movAlcHi++;

					impoAlcHi += parseFloat(impo);
					document.getElementById("Hicol10").innerHTML = "$"+impoAlcHi.toFixed(2);

				}else if(medio == 8) {

				}else if(medio == 9) {

				}

				if(tipo == 6) {
					document.getElementById("Hicol11").innerHTML = movAmexHi;
					movAmexHi++;

					impoAmexHi += parseFloat(impo);
					document.getElementById("Hicol12").innerHTML = "$"+impoAmexHi.toFixed(2);

				}

				break;
			case "14":
				
				if(medio == 1) {
					document.getElementById("Jacol1").innerHTML = movSucJa;
					movSucJa++;

					impoSucJa += parseFloat(impo);
					document.getElementById("Jacol2").innerHTML = "$"+impoSucJa.toFixed(2);

				}else if(medio == 2) {
					document.getElementById("Jacol3").innerHTML = movCatJa;
					movCatJa++;

					impoCatJa += parseFloat(impo);
					document.getElementById("Jacol4").innerHTML = "$"+impoCatJa.toFixed(2);

				}else if(medio == 3) {

				}else if(medio == 4) {
					document.getElementById("Jacol5").innerHTML = movBnetJa;
					movBnetJa++;

					impoBnetJa += parseFloat(impo);
					document.getElementById("Jacol6").innerHTML = "$"+impoBnetJa.toFixed(2);

				}else if(medio == 5) {

				}else if(medio == 6) {
					document.getElementById("Jacol7").innerHTML = movBotJa;
					movBotJa++;

					impoBotJa += parseFloat(impo);
					document.getElementById("Jacol8").innerHTML = "$"+impoBotJa.toFixed(2);

				}else if(medio == 7) {
					document.getElementById("Jacol19").innerHTML = movAlcJa;
					movAlcJa++;

					impoAlcJa += parseFloat(impo);
					document.getElementById("Jacol10").innerHTML = "$"+impoAlcJa.toFixed(2);

				}else if(medio == 8) {

				}else if(medio == 9) {

				}

				if(tipo == 6) {
					document.getElementById("Jacol11").innerHTML = movAmexJa;
					movAmexJa++;

					impoAmexJa += parseFloat(impo);
					document.getElementById("Jacol12").innerHTML = "$"+impoAmexJa.toFixed(2);

				}

				break;
			case "15":
				if(medio == 1) {
					document.getElementById("eMcol1").innerHTML = movSucEm;
					movSucEm++;

					impoSucEm += parseFloat(impo);
					document.getElementById("eMcol2").innerHTML = "$"+impoSucEm.toFixed(2);

				}else if(medio == 2) {
					document.getElementById("eMcol3").innerHTML = movCatEm;
					movCatEm++;

					impoCatEm += parseFloat(impo);
					document.getElementById("eMcol4").innerHTML = "$"+impoCatEm.toFixed(2);

				}else if(medio == 3) {

				}else if(medio == 4) {
					document.getElementById("eMcol5").innerHTML = movBnetEm;
					movBnetEm++;

					impoBnetEm += parseFloat(impo);
					document.getElementById("eMcol6").innerHTML = "$"+impoBnetEm.toFixed(2);

				}else if(medio == 5) {

				}else if(medio == 6) {
					document.getElementById("eMcol7").innerHTML = movBotEm;
					movBotEm++;

					impoBotEm += parseFloat(impo);
					document.getElementById("eMcol8").innerHTML = "$"+impoBotEm.toFixed(2);

				}else if(medio == 7) {
					document.getElementById("eMcol9").innerHTML = movAlcEm;
					movAlcEm++;

					impoAlcEm += parseFloat(impo);
					document.getElementById("eMcol10").innerHTML = "$"+impoAlcEm.toFixed(2);

				}else if(medio == 8) {

				}else if(medio == 9) {

				}

				if(tipo == 6) {
					document.getElementById("eMcol11").innerHTML = movAmexEm;
					movAmexEm++;

					impoAmexEm += parseFloat(impo);
					document.getElementById("eMcol12").innerHTML = "$"+impoAmexEm.toFixed(2);

				}

				break;
			case "16":
				
				if(medio == 1) {
					document.getElementById("Micol1").innerHTML = movSucMi;
					movSucMi++;

					impoSucMi += parseFloat(impo);
					document.getElementById("Micol2").innerHTML = "$"+impoSucMi.toFixed(2);

				}else if(medio == 2) {
					document.getElementById("Micol3").innerHTML = movCatMi;
					movCatMi++;

					impoCatMi += parseFloat(impo);
					document.getElementById("Micol4").innerHTML = "$"+impoCatMi.toFixed(2);

				}else if(medio == 3) {

				}else if(medio == 4) {
					document.getElementById("Micol5").innerHTML = movBnetMi;
					movBnetMi++;

					impoBnetMi += parseFloat(impo);
					document.getElementById("Micol6").innerHTML = "$"+impoBnetMi.toFixed(2);

				}else if(medio == 5) {

				}else if(medio == 6) {
					document.getElementById("Micol7").innerHTML = movBotMi;
					movBotMi++;

					impoBotMi += parseFloat(impo);
					document.getElementById("Micol8").innerHTML = "$"+impoBotMi.toFixed(2);

				}else if(medio == 7) {
					document.getElementById("Micol9").innerHTML = movAlcMi;
					movAlcMi++;

					impoAlcMi += parseFloat(impo);
					document.getElementById("Micol10").innerHTML = "$"+impoAlcMi.toFixed(2);

				}else if(medio == 8) {

				}else if(medio == 9) {

				}

				if(tipo == 6) {
					document.getElementById("Micol11").innerHTML = movAmexMi;
					movAmexMi++;

					impoAmexMi += parseFloat(impo);
					document.getElementById("Micol12").innerHTML = "$"+impoAmexMi.toFixed(2);

				}

				break;
			case "17":
				
				if(medio == 1) {
					document.getElementById("Mocol1").innerHTML = movSucMo;
					movSucMo++;

					impoSucMo += parseFloat(impo);
					document.getElementById("Mocol2").innerHTML = "$"+impoSucMo.toFixed(2);

				}else if(medio == 2) {
					document.getElementById("Mocol3").innerHTML = movCatMo;
					movCatMo++;

					impoCatMo += parseFloat(impo);
					document.getElementById("Mocol4").innerHTML = "$"+impoCatMo.toFixed(2);

				}else if(medio == 3) {

				}else if(medio == 4) {
					document.getElementById("Mocol5").innerHTML = movBnetMo;
					movBnetMo++;

					impoBnetMo += parseFloat(impo);
					document.getElementById("Mocol6").innerHTML = "$"+impoBnetMo.toFixed(2);

				}else if(medio == 5) {

				}else if(medio == 6) {
					document.getElementById("Mocol7").innerHTML = movBotMo;
					movBotMo++;

					impoBotMo += parseFloat(impo);
					document.getElementById("Mocol8").innerHTML = "$"+impoBotMo.toFixed(2);

				}else if(medio == 7) {
					document.getElementById("Mocol9").innerHTML = movAlcMo;
					movAlcMo++;

					impoAlcMo += parseFloat(impo);
					document.getElementById("Mocol10").innerHTML = "$"+impoAlcMo.toFixed(2);

				}else if(medio == 8) {

				}else if(medio == 9) {

				}

				if(tipo == 6) {
					document.getElementById("Mocol11").innerHTML = movAmexMo;
					movAmexMo++;

					impoAmexMo += parseFloat(impo);
					document.getElementById("Mocol12").innerHTML = "$"+impoAmexMo.toFixed(2);

				}

				break;
			case "18":
				
				if(medio == 1) {
					document.getElementById("Nacol1").innerHTML = movSucNa;
					movSucNa++;

					impoSucNa += parseFloat(impo);
					document.getElementById("Nacol2").innerHTML = "$"+impoSucNa.toFixed(2);

				}else if(medio == 2) {
					document.getElementById("Nacol3").innerHTML = movCatNa;
					movCatNa++;

					impoCatNa += parseFloat(impo);
					document.getElementById("Nacol4").innerHTML = "$"+impoCatNa.toFixed(2);

				}else if(medio == 3) {

				}else if(medio == 4) {
					document.getElementById("Nacol5").innerHTML = movBnetNa;
					movBnetNa++;

					impoBnetNa += parseFloat(impo);
					document.getElementById("Nacol6").innerHTML = "$"+impoBnetNa.toFixed(2);

				}else if(medio == 5) {

				}else if(medio == 6) {
					document.getElementById("Nacol7").innerHTML = movBotNa;
					movBotNa++;

					impoBotNa += parseFloat(impo);
					document.getElementById("Nacol8").innerHTML = "$"+impoBotNa.toFixed(2);

				}else if(medio == 7) {
					document.getElementById("Nacol9").innerHTML = movAlcNa;
					movAlcNa++;

					impoAlcNa += parseFloat(impo);
					document.getElementById("Nacol10").innerHTML = "$"+impoAlcNa.toFixed(2);

				}else if(medio == 8) {

				}else if(medio == 9) {

				}

				if(tipo == 6) {
					document.getElementById("Nacol11").innerHTML = movAmexNa;
					movAmexNa++;

					impoAmexNa += parseFloat(impo);
					document.getElementById("Nacol12").innerHTML = "$"+impoAmexNa.toFixed(2);

				}

				break;
			case "19":
				
				if(medio == 1) {
					document.getElementById("nLcol1").innerHTML = movSucNl;
					movSucNl++;

					impoSucNl += parseFloat(impo);
					document.getElementById("nLcol2").innerHTML = "$"+impoSucNl.toFixed(2);

				}else if(medio == 2) {
					document.getElementById("nLcol3").innerHTML = movCatNl;
					movCatNl++;

					impoCatNl += parseFloat(impo);
					document.getElementById("nLcol4").innerHTML = "$"+impoCatNl.toFixed(2);

				}else if(medio == 3) {

				}else if(medio == 4) {
					document.getElementById("nLcol5").innerHTML = movBnetNl;
					movBnetNl++;

					impoBnetNl += parseFloat(impo);
					document.getElementById("nLcol6").innerHTML = "$"+impoBnetNl.toFixed(2);

				}else if(medio == 5) {

				}else if(medio == 6) {
					document.getElementById("nLcol7").innerHTML = movBotNl;
					movBotNl++;

					impoBotNl += parseFloat(impo);
					document.getElementById("nLcol8").innerHTML = "$"+impoBotNl.toFixed(2);

				}else if(medio == 7) {
					document.getElementById("nLcol9").innerHTML = movAlcNl;
					movAlcNl++;

					impoAlcNl += parseFloat(impo);
					document.getElementById("nLcol10").innerHTML = "$"+impoAlcNl.toFixed(2);

				}else if(medio == 8) {

				}else if(medio == 9) {

				}

				if(tipo == 6) {
					document.getElementById("nLcol11").innerHTML = movAmexNl;
					movAmexNl++;

					impoAmexNl += parseFloat(impo);
					document.getElementById("nLcol12").innerHTML = "$"+impoAmexNl.toFixed(2);

				}

				break;
			case "20":
				
				if(medio == 1) {
					document.getElementById("Oacol1").innerHTML = movSucOa;
					movSucOa++;

					impoSucOa += parseFloat(impo);
					document.getElementById("Oacol2").innerHTML = "$"+impoSucOa.toFixed(2);

				}else if(medio == 2) {
					document.getElementById("Oacol3").innerHTML = movCatOa;
					movCatOa++;

					impoCatOa += parseFloat(impo);
					document.getElementById("Oacol4").innerHTML = "$"+impoCatOa.toFixed(2);

				}else if(medio == 3) {

				}else if(medio == 4) {
					document.getElementById("Oacol5").innerHTML = movBnetOa;
					movBnetOa++;

					impoBnetOa += parseFloat(impo);
					document.getElementById("Oacol6").innerHTML = "$"+impoBnetOa.toFixed(2);

				}else if(medio == 5) {

				}else if(medio == 6) {
					document.getElementById("Oacol7").innerHTML = movBotOa;
					movBotOa++;

					impoBotOa += parseFloat(impo);
					document.getElementById("Oacol8").innerHTML = "$"+impoBotOa.toFixed(2);

				}else if(medio == 7) {
					document.getElementById("Oacol9").innerHTML = movAlcOa;
					movAlcOa++;

					impoAlcOa += parseFloat(impo);
					document.getElementById("Oacol10").innerHTML = "$"+impoAlcOa.toFixed(2);

				}else if(medio == 8) {

				}else if(medio == 9) {

				}

				if(tipo == 6) {
					document.getElementById("Oacol11").innerHTML = movAmexOa;
					movAmexOa++;

					impoAmexOa += parseFloat(impo);
					document.getElementById("Oacol12").innerHTML = "$"+impoAmexOa.toFixed(2);

				}

				break;
			case "21":
				
				if(medio == 1) {
					document.getElementById("Pucol1").innerHTML = movSucPu;
					movSucPu++;

					impoSucPu += parseFloat(impo);
					document.getElementById("Pucol2").innerHTML = "$"+impoSucPu.toFixed(2);

				}else if(medio == 2) {
					document.getElementById("Pucol3").innerHTML = movCatPu;
					movCatPu++;

					impoCatPu += parseFloat(impo);
					document.getElementById("Pucol4").innerHTML = "$"+impoCatPu.toFixed(2);

				}else if(medio == 3) {

				}else if(medio == 4) {
					document.getElementById("Pucol5").innerHTML = movBnetPu;
					movBnetPu++;

					impoBnetPu += parseFloat(impo);
					document.getElementById("Pucol6").innerHTML = "$"+impoBnetPu.toFixed(2);

				}else if(medio == 5) {

				}else if(medio == 6) {
					document.getElementById("Pucol7").innerHTML = movBotPu;
					movBotPu++;

					impoBotPu += parseFloat(impo);
					document.getElementById("Pucol8").innerHTML = "$"+impoBotPu.toFixed(2);

				}else if(medio == 7) {
					document.getElementById("Pucol9").innerHTML = movAlcPu;
					movAlcPu++;

					impoAlcPu += parseFloat(impo);
					document.getElementById("Pucol10").innerHTML = "$"+impoAlcPu.toFixed(2);

				}else if(medio == 8) {

				}else if(medio == 9) {

				}

				if(tipo == 6) {
					document.getElementById("Pucol11").innerHTML = movAmexPu;
					movAmexPu++;

					impoAmexPu += parseFloat(impo);
					document.getElementById("Pucol12").innerHTML = "$"+impoAmexPu.toFixed(2);

				}

				break;
			case "22":
				
				if(medio == 1) {
					document.getElementById("Qucol1").innerHTML = movSucQu;
					movSucQu++;

					impoSucQu += parseFloat(impo);
					document.getElementById("Qucol2").innerHTML = "$"+impoSucQu.toFixed(2);

				}else if(medio == 2) {
					document.getElementById("Qucol3").innerHTML = movCatQu;
					movCatQu++;

					impoCatQu += parseFloat(impo);
					document.getElementById("Qucol4").innerHTML = "$"+impoCatQu.toFixed(2);

				}else if(medio == 3) {

				}else if(medio == 4) {
					document.getElementById("Qucol5").innerHTML = movBnetQu;
					movBnetQu++;

					impoBnetQu += parseFloat(impo);
					document.getElementById("Qucol6").innerHTML = "$"+impoBnetQu.toFixed(2);

				}else if(medio == 5) {

				}else if(medio == 6) {
					document.getElementById("Qucol7").innerHTML = movBotQu;
					movBotQu++;

					impoBotQu += parseFloat(impo);
					document.getElementById("Qucol8").innerHTML = "$"+impoBotQu.toFixed(2);

				}else if(medio == 7) {
					document.getElementById("Qucol9").innerHTML = movAlcQu;
					movAlcQu++;

					impoAlcQu += parseFloat(impo);
					document.getElementById("Qucol10").innerHTML = "$"+impoAlcQu.toFixed(2);

				}else if(medio == 8) {

				}else if(medio == 9) {

				}

				if(tipo == 6) {
					document.getElementById("Qucol11").innerHTML = movAmexQu;
					movAmexQu++;

					impoAmexQu += parseFloat(impo);
					document.getElementById("Qucol12").innerHTML = "$"+impoAmexQu.toFixed(2);

				}

				break;
			case "23":
				
				if(medio == 1) {
					document.getElementById("qRcol1").innerHTML = movSucQr;
					movSucQr++;

					impoSucQr += parseFloat(impo);
					document.getElementById("qRcol2").innerHTML = "$"+impoSucQr.toFixed(2);

				}else if(medio == 2) {
					document.getElementById("qRcol3").innerHTML = movCatQr;
					movCatQr++;

					impoCatQr += parseFloat(impo);
					document.getElementById("qRcol4").innerHTML = "$"+impoCatQr.toFixed(2);

				}else if(medio == 3) {

				}else if(medio == 4) {
					document.getElementById("qRcol5").innerHTML = movBnetQr;
					movBnetQr++;

					impoBnetQr += parseFloat(impo);
					document.getElementById("qRcol6").innerHTML = "$"+impoBnetQr.toFixed(2);

				}else if(medio == 5) {

				}else if(medio == 6) {
					document.getElementById("qRcol7").innerHTML = movBotQr;
					movBotQr++;

					impoBotQr += parseFloat(impo);
					document.getElementById("qRcol8").innerHTML = "$"+impoBotQr.toFixed(2);

				}else if(medio == 7) {
					document.getElementById("qRcol9").innerHTML = movAlcQr;
					movAlcQr++;

					impoAlcQr += parseFloat(impo);
					document.getElementById("qRcol10").innerHTML = "$"+impoAlcQr.toFixed(2);

				}else if(medio == 8) {

				}else if(medio == 9) {

				}

				if(tipo == 6) {
					document.getElementById("qRcol11").innerHTML = movAmexQr;
					movAmexQr++;

					impoAmexQr += parseFloat(impo);
					document.getElementById("qRcol12").innerHTML = "$"+impoAmexQr.toFixed(2);

				}

				break;
			case "24":
				
				if(medio == 1) {
					document.getElementById("sLPcol1").innerHTML = movSucSlp;
					movSucSlp++;

					impoSucSlp += parseFloat(impo);
					document.getElementById("sLPcol2").innerHTML = "$"+impoSucSlp.toFixed(2);

				}else if(medio == 2) {
					document.getElementById("sLPcol3").innerHTML = movCatSlp;
					movCatSlp++;

					impoCatSlp += parseFloat(impo);
					document.getElementById("sLPcol4").innerHTML = "$"+impoCatSlp.toFixed(2);

				}else if(medio == 3) {

				}else if(medio == 4) {
					document.getElementById("sLPcol5").innerHTML = movBnetSlp;
					movBnetSlp++;

					impoBnetSlp += parseFloat(impo);
					document.getElementById("sLPcol6").innerHTML = "$"+impoBnetSlp.toFixed(2);

				}else if(medio == 5) {

				}else if(medio == 6) {
					document.getElementById("sLPcol7").innerHTML = movBotSlp;
					movBotSlp++;

					impoBotSlp += parseFloat(impo);
					document.getElementById("sLPcol8").innerHTML = "$"+impoBotSlp.toFixed(2);

				}else if(medio == 7) {
					document.getElementById("sLPcol19").innerHTML = movAlcSlp;
					movAlcSlp++;

					impoAlcSlp += parseFloat(impo);
					document.getElementById("sLPcol10").innerHTML = "$"+impoAlcSlp.toFixed(2);

				}else if(medio == 8) {

				}else if(medio == 9) {

				}

				if(tipo == 6) {
					document.getElementById("sLPcol11").innerHTML = movAmexSlp;
					movAmexSlp++;

					impoAmexSlp += parseFloat(impo);
					document.getElementById("sLPcol12").innerHTML = "$"+impoAmexSlp.toFixed(2);

				}

				break;
			case "25":
				
				if(medio == 1) {
					document.getElementById("Sicol1").innerHTML = movSucSi;
					movSucSi++;

					impoSucSi += parseFloat(impo);
					document.getElementById("Sicol2").innerHTML = "$"+impoSucSi.toFixed(2);

				}else if(medio == 2) {
					document.getElementById("Sicol3").innerHTML = movCatSi;
					movCatSi++;

					impoCatSi += parseFloat(impo);
					document.getElementById("Sicol4").innerHTML = "$"+impoCatSi.toFixed(2);

				}else if(medio == 3) {

				}else if(medio == 4) {
					document.getElementById("Sicol5").innerHTML = movBnetSi;
					movBnetSi++;

					impoBnetSi += parseFloat(impo);
					document.getElementById("Sicol6").innerHTML = "$"+impoBnetSi.toFixed(2);

				}else if(medio == 5) {

				}else if(medio == 6) {
					document.getElementById("Sicol7").innerHTML = movBotSi;
					movBotSi++;

					impoBotSi += parseFloat(impo);
					document.getElementById("Sicol8").innerHTML = "$"+impoBotSi.toFixed(2);

				}else if(medio == 7) {
					document.getElementById("Sicol9").innerHTML = movAlcSi;
					movAlcSi++;

					impoAlcSi += parseFloat(impo);
					document.getElementById("Sicol10").innerHTML = "$"+impoAlcSi.toFixed(2);

				}else if(medio == 8) {

				}else if(medio == 9) {

				}

				if(tipo == 6) {
					document.getElementById("Sicol11").innerHTML = movAmexSi;
					movAmexSi++;

					impoAmexSi += parseFloat(impo);
					document.getElementById("Sicol12").innerHTML = "$"+impoAmexSi.toFixed(2);

				}

				break;
			case "26":
				
				if(medio == 1) {
					document.getElementById("Socol1").innerHTML = movSucSo;
					movSucSo++;

					impoSucSo += parseFloat(impo);
					document.getElementById("Socol2").innerHTML = "$"+impoSucSo.toFixed(2);

				}else if(medio == 2) {
					document.getElementById("Socol3").innerHTML = movCatSo;
					movCatSo++;

					impoCatSo += parseFloat(impo);
					document.getElementById("Socol4").innerHTML = "$"+impoCatSo.toFixed(2);

				}else if(medio == 3) {

				}else if(medio == 4) {
					document.getElementById("Socol5").innerHTML = movBnetSo;
					movBnetSo++;

					impoBnetSo += parseFloat(impo);
					document.getElementById("Socol6").innerHTML = "$"+impoBnetSo.toFixed(2);

				}else if(medio == 5) {

				}else if(medio == 6) {
					document.getElementById("Socol7").innerHTML = movBotSo;
					movBotSo++;

					impoBotSo += parseFloat(impo);
					document.getElementById("Socol8").innerHTML = "$"+impoBotSo.toFixed(2);

				}else if(medio == 7) {
					document.getElementById("Socol9").innerHTML = movAlcSo;
					movAlcSo++;

					impoAlcSo += parseFloat(impo);
					document.getElementById("Socol10").innerHTML = "$"+impoAlcSo.toFixed(2);

				}else if(medio == 8) {

				}else if(medio == 9) {

				}

				if(tipo == 6) {
					document.getElementById("Socol11").innerHTML = movAmexSo;
					movAmexSo++;

					impoAmexSo += parseFloat(impo);
					document.getElementById("Socol12").innerHTML = "$"+impoAmexSo.toFixed(2);

				}

				break;
			case "27":
				
				if(medio == 1) {
					document.getElementById("Tacol1").innerHTML = movSucTa;
					movSucTa++;

					impoSucTa += parseFloat(impo);
					document.getElementById("Tacol2").innerHTML = "$"+impoSucTa.toFixed(2);

				}else if(medio == 2) {
					document.getElementById("Tacol3").innerHTML = movCatTa;
					movCatTa++;

					impoCatTa += parseFloat(impo);
					document.getElementById("Tacol4").innerHTML = "$"+impoCatTa.toFixed(2);

				}else if(medio == 3) {

				}else if(medio == 4) {
					document.getElementById("Tacol5").innerHTML = movBnetTa;
					movBnetTa++;

					impoBnetTa += parseFloat(impo);
					document.getElementById("Tacol6").innerHTML = "$"+impoBnetTa.toFixed(2);

				}else if(medio == 5) {

				}else if(medio == 6) {
					document.getElementById("Tacol7").innerHTML = movBotTa;
					movBotTa++;

					impoBotTa += parseFloat(impo);
					document.getElementById("Tacol8").innerHTML = "$"+impoBotTa.toFixed(2);

				}else if(medio == 7) {
					document.getElementById("Tacol9").innerHTML = movAlcTa;
					movAlcTa++;

					impoAlcTa += parseFloat(impo);
					document.getElementById("Tacol10").innerHTML = "$"+impoAlcTa.toFixed(2);

				}else if(medio == 8) {

				}else if(medio == 9) {

				}

				if(tipo == 6) {
					document.getElementById("Tacol11").innerHTML = movAmexTa;
					movAmexTa++;

					impoAmexTa += parseFloat(impo);
					document.getElementById("Tacol12").innerHTML = "$"+impoAmexTa.toFixed(2);

				}

				break;
			case "28":
				
				if(medio == 1) {
					document.getElementById("Tamcol1").innerHTML = movSucTam;
					movSucTam++;

					impoSucTam += parseFloat(impo);
					document.getElementById("Tamcol2").innerHTML = "$"+impoSucTam.toFixed(2);

				}else if(medio == 2) {
					document.getElementById("Tamcol3").innerHTML = movCatTam;
					movCatTam++;

					impoCatTam += parseFloat(impo);
					document.getElementById("Tamcol4").innerHTML = "$"+impoCatTam.toFixed(2);

				}else if(medio == 3) {

				}else if(medio == 4) {
					document.getElementById("Tamcol5").innerHTML = movBnetTam;
					movBnetTam++;

					impoBnetTam += parseFloat(impo);
					document.getElementById("Tamcol6").innerHTML = "$"+impoBnetTam.toFixed(2);

				}else if(medio == 5) {

				}else if(medio == 6) {
					document.getElementById("Tamcol7").innerHTML = movBotTam;
					movBotTam++;

					impoBotTam += parseFloat(impo);
					document.getElementById("Tamcol8").innerHTML = "$"+impoBotTam.toFixed(2);

				}else if(medio == 7) {
					document.getElementById("Tamcol9").innerHTML = movAlcTam;
					movAlcTam++;

					impoAlcTam += parseFloat(impo);
					document.getElementById("Tamcol10").innerHTML = "$"+impoAlcTam.toFixed(2);

				}else if(medio == 8) {

				}else if(medio == 9) {

				}

				if(tipo == 6) {
					document.getElementById("Tamcol11").innerHTML = movAmexTam;
					movAmexTam++;

					impoAmexTam += parseFloat(impo);
					document.getElementById("Tamcol12").innerHTML = "$"+impoAmexTam.toFixed(2);

				}

				break;
			case "29":
				
				if(medio == 1) {
					document.getElementById("Tlcol1").innerHTML = movSucTl;
					movSucTl++;

					impoSucTl += parseFloat(impo);
					document.getElementById("Tlcol2").innerHTML = "$"+impoSucTl.toFixed(2);

				}else if(medio == 2) {
					document.getElementById("Tlcol3").innerHTML = movCatTl;
					movCatTl++;

					impoCatTl += parseFloat(impo);
					document.getElementById("Tlcol4").innerHTML = "$"+impoCatTl.toFixed(2);

				}else if(medio == 3) {

				}else if(medio == 4) {
					document.getElementById("Tlcol5").innerHTML = movBnetTl;
					movBnetTl++;

					impoBnetTl += parseFloat(impo);
					document.getElementById("Tlcol6").innerHTML = "$"+impoBnetTl.toFixed(2);

				}else if(medio == 5) {

				}else if(medio == 6) {
					document.getElementById("Tlcol7").innerHTML = movBotTl;
					movBotTl++;

					impoBotTl += parseFloat(impo);
					document.getElementById("Tlcol8").innerHTML = "$"+impoBotTl.toFixed(2);

				}else if(medio == 7) {
					document.getElementById("Tlcol9").innerHTML = movAlcTl;
					movAlcTl++;

					impoAlcTl += parseFloat(impo);
					document.getElementById("Tlcol10").innerHTML = "$"+impoAlcTl.toFixed(2);

				}else if(medio == 8) {

				}else if(medio == 9) {

				}

				if(tipo == 6) {
					document.getElementById("Tlcol11").innerHTML = movAmexTl;
					movAmexTl++;

					impoAmexTl += parseFloat(impo);
					document.getElementById("Tlcol12").innerHTML = "$"+impoAmexTl.toFixed(2);

				}

				break;
			case "30":
				
				if(medio == 1) {
					document.getElementById("Vecol1").innerHTML = movSucVe;
					movSucVe++;

					impoSucVe += parseFloat(impo);
					document.getElementById("Vecol2").innerHTML = "$"+impoSucVe.toFixed(2);

				}else if(medio == 2) {
					document.getElementById("Vecol3").innerHTML = movCatVe;
					movCatVe++;

					impoCatVe += parseFloat(impo);
					document.getElementById("Vecol4").innerHTML = "$"+impoCatVe.toFixed(2);

				}else if(medio == 3) {

				}else if(medio == 4) {
					document.getElementById("Vecol5").innerHTML = movBnetVe;
					movBnetVe++;

					impoBnetVe += parseFloat(impo);
					document.getElementById("Vecol6").innerHTML = "$"+impoBnetVe.toFixed(2);

				}else if(medio == 5) {

				}else if(medio == 6) {
					document.getElementById("Vecol7").innerHTML = movBotVe;
					movBotVe++;

					impoBotVe += parseFloat(impo);
					document.getElementById("Vecol8").innerHTML = "$"+impoBotVe.toFixed(2);

				}else if(medio == 7) {
					document.getElementById("Vecol9").innerHTML = movAlcVe;
					movAlcVe++;

					impoAlcVe += parseFloat(impo);
					document.getElementById("Vecol10").innerHTML = "$"+impoAlcVe.toFixed(2);

				}else if(medio == 8) {

				}else if(medio == 9) {

				}

				if(tipo == 6) {
					document.getElementById("Vecol11").innerHTML = movAmexVe;
					movAmexVe++;

					impoAmexVe += parseFloat(impo);
					document.getElementById("Vecol12").innerHTML = "$"+impoAmexVe.toFixed(2);

				}

				break;
			case "31":
				
				if(medio == 1) {
					document.getElementById("Yucol1").innerHTML = movSucYu;
					movSucYu++;

					impoSucYu += parseFloat(impo);
					document.getElementById("Yucol2").innerHTML = "$"+impoSucYu.toFixed(2);

				}else if(medio == 2) {
					document.getElementById("Yucol3").innerHTML = movCatYu;
					movCatYu++;

					impoCatYu += parseFloat(impo);
					document.getElementById("Yucol4").innerHTML = "$"+impoCatYu.toFixed(2);

				}else if(medio == 3) {

				}else if(medio == 4) {
					document.getElementById("Yucol5").innerHTML = movBnetYu;
					movBnetYu++;

					impoBnetYu += parseFloat(impo);
					document.getElementById("Yucol6").innerHTML = "$"+impoBnetYu.toFixed(2);

				}else if(medio == 5) {

				}else if(medio == 6) {
					document.getElementById("Yucol7").innerHTML = movBotYu;
					movBotYu++;

					impoBotYu += parseFloat(impo);
					document.getElementById("Yucol8").innerHTML = "$"+impoBotYu.toFixed(2);

				}else if(medio == 7) {
					document.getElementById("Yucol9").innerHTML = movAlcYu;
					movAlcYu++;

					impoAlcYu += parseFloat(impo);
					document.getElementById("Yucol10").innerHTML = "$"+impoAlcYu.toFixed(2);

				}else if(medio == 8) {

				}else if(medio == 9) {

				}

				if(tipo == 6) {
					document.getElementById("Yucol11").innerHTML = movAmexYu;
					movAmexYu++;

					impoAmexYu += parseFloat(impo);
					document.getElementById("Yucol12").innerHTML = "$"+impoAmexYu.toFixed(2);

				}

				break;
			case "32":
				
				if(medio == 1) {
					document.getElementById("Zacol1").innerHTML = movSucZa;
					movSucZa++;

					impoSucZa += parseFloat(impo);
					document.getElementById("Zacol2").innerHTML = "$"+impoSucZa.toFixed(2);

				}else if(medio == 2) {
					document.getElementById("Zacol3").innerHTML = movCatZa;
					movCatZa++;

					impoCatZa += parseFloat(impo);
					document.getElementById("Zacol4").innerHTML = "$"+impoCatZa.toFixed(2);

				}else if(medio == 3) {

				}else if(medio == 4) {
					document.getElementById("Zacol5").innerHTML = movBnetZa;
					movBnetZa++;

					impoBnetZa += parseFloat(impo);
					document.getElementById("Zacol6").innerHTML = "$"+impoBnetZa.toFixed(2);

				}else if(medio == 5) {

				}else if(medio == 6) {
					document.getElementById("Zacol7").innerHTML = movBotZa;
					movBotZa++;

					impoBotZa += parseFloat(impo);
					document.getElementById("Zacol8").innerHTML = "$"+impoBotZa.toFixed(2);

				}else if(medio == 7) {
					document.getElementById("Zacol9").innerHTML = movAlcZa;
					movAlcZa++;

					impoAlcZa += parseFloat(impo);
					document.getElementById("Zacol10").innerHTML = "$"+impoAlcZa.toFixed(2);

				}else if(medio == 8) {

				}else if(medio == 9) {

				}

				if(tipo == 6) {
					document.getElementById("Zacol11").innerHTML = movAmexZa;
					movAmexZa+Za

					impoAmexZa += parseFloat(impo);
					document.getElementById("Zacol12").innerHTML = "$"+impoAmexZa.toFixed(2);

				}

				break;

			default:
				break;
		}

	}	

}

var db;
    function iniciar(e) {
        e.preventDefault();
        zonadatos=document.getElementById("zonadatos");
        // boton=document.getElementById("save");
        // boton=addEventListener("submit",agregarObjeto,false);

        var solicitud=indexedDB.open("dbteletometro2")
        solicitud.onsuccess=function (e) {
            db=e.target.result;
        }

        solicitud.onupgradeneeded=function(e){
            db=e.target.result;
            db.createObjectStore("patrocinadores",{keyPath: "name"});
        }
    }

    function agregarObjeto() {
        var name=document.getElementById("name").value;
        var number=document.getElementById("number").value;
        var importe=document.getElementById("importe").value;

        var transaccion=db.transaction(["patrocinadores"],"readwrite");

        var almacen=transaccion.objectStore("patrocinadores");

        var agregar = almacen.add({name: name, number:number, importe:importe})
console.log(agregar);

        agregar.addEventListener("success", mostrar, false);
        console.log(agregar);


        document.getElementById("name").value="";

        document.getElementById("number").value="";


        document.getElementById("importe").value="";



    }

    function mostrar() {
        console.log("mostrar");
     zonadatos.innerHTML="";

     var transaccion = db.transaction(["patrocinadores"],"readonly");
console.log("trans: ",transaccion);
     var almacen = transaccion.objectStore("patrocinadores");

     var cursor = almacen.openCursor();

     cursor.addEventListener("success", mostrarDatos, false);

    }

    function mostrarDatos(e){
        var cursor=e.target.result;
        if(cursor){
            zonadatos.innerHTML+="<div>" + cursor.value.name + " - " + cursor.value.number + " - " + cursor.value.importe + "</div>"

            cursor.continue();
        }
    }

    window.addEventListener("load",iniciar,false);