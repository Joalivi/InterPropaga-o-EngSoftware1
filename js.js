const topografia= [500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500,500, 500, 500,500, 500, 500, 500, 500, 500,
    500, 500, 500, 500, 500, 500, 500, 500, 500, 520, 500,500, 500, 500,500, 500, 500, 500, 500, 500,
    500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500,500, 500, 500,500, 500, 500, 500, 500, 500,
    500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500,500, 500, 500,500, 500, 500, 500, 500, 500,
    500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500,500, 500, 500,500, 500, 500, 500, 500, 500]

function createDataSet (torre1, torre2, frequencia, distancia){


    var x, y, d1, d2 = 0;
    var altura = 0;
    var P1x = []
    var P1y = []
    var P2x = []
    var P2y = []
    var P3x = []
    var P3y = []
    var P4y = []
    var linhaAltura = []
    var lambda = 3* Math.pow(10,8)/ (frequencia * Math.pow(10,6))
    var diferencaObstaculoLinhaAltura = 0
    var linhaDeVisada = true
    var mi = 0
    var maiorPontoRelevo = 0

    if(torre1 == torre2)
    {
        
        for(let i = 0; i <= 100; i++)
        {
            x = (distancia / 100) * (i+1);
            x = x.toFixed(2)
            d1 = x;
            d2 = distancia - x;

            y = parseFloat(550) * Math.sqrt((d1 * d2)/(distancia * frequencia)) + parseFloat(torre1); 
            y = y.toFixed(2)
            P1x[i] = x
            P1y[i] = y

            linhaAltura[i] = torre1
            
            y = (y * -1) + (torre1 * 2);

            P2x[i] = x
            P2y[i] = y

        }
    }
    else
    {
        for(let i = 0; i <= 100; i++)
        {
            x = (distancia / 100) * (i+1);
            x = x.toFixed(2)
            d1 = x;
            d2 = distancia - x;

            altura = ((((torre1-torre2) * d2) / parseFloat(distancia)) + parseFloat(torre2));
            

            y = parseFloat(550) * Math.sqrt((d1 * d2)/(distancia * frequencia)) + parseFloat(altura); 
            y = y.toFixed(2)
           
            linhaAltura[i] = altura

            P1x[i] = x
            P1y[i] = y

            y = (y * -1) + (altura * 2);

            P2x[i] = x
            P2y[i] = y

            
        }
}

for(let i = 0; i <= 100; i++){
    x = (distancia / 100) * (i+1);
    y = topografia[parseInt(i)];

    d1 = x;
    d2 = distancia - x;

    P3x[i] = x
    P3y[i] = y

    if( y >= linhaAltura[i] && y> maiorPontoRelevo){
        maiorPontoRelevo = y;
       // linhaDeVisada = false
        diferencaObstaculoLinhaAltura = parseFloat(y) - parseFloat(linhaAltura[i])
        
        mi = parseFloat(diferencaObstaculoLinhaAltura) * Math.sqrt(2*(d1+d2)/lambda*d1*d2)
       alert("mi: " + Math.sqrt(2*(d1+d2)/lambda*d1*d2))
    }
}



pontos = [P1x,P1y,P2x,P2y,P3x,P3y,linhaAltura, mi, diferencaObstaculoLinhaAltura]

return pontos
}

function calculaAtenuacaoObstaculo(mi){
    var linhaDeVisada = true
    var atenuacaoObstaculo = 0
    if (mi> -0.8 && mi<0){
        atenuacaoObstaculo = -parseFloat(20)* Math.log10(0.5 + 0.62 * mi)
       alert('1')
    }
    else if (mi> 0 && mi<1){
        atenuacaoObstaculo = -parseFloat(20) * Math.log10(0.5 + Math.exp(-0.95*mi))
        alert('2')
    }
    else if (mi> 1 && mi< 2.4){
        atenuacaoObstaculo = -parseFloat(20) * Math.log10(0.4 - Math.sqrt(0.1184 - Math.pow(0.38-0.1*mi,2)))
        alert('3')
    }
    else if (mi > 2.4){
        atenuacaoObstaculo = -parseFloat(20) * Math.log10(0.225/mi)
        alert('4')
    }
    else{
        alert('Há Linha de Visada!')
    }

    return atenuacaoObstaculo

}

function calculaRaio( distancia, frequencia) {
     raio = 0;

    raio = (550 * Math.sqrt(((distancia / 2) * (distancia / 2)) / (distancia * frequencia)));

    return raio;
}

function calculaAe( distancia, frequencia) {
    var calculaAe =  (32.44 + 20 * Math.log10(distancia) + 20 * Math.log10(frequencia))
    return calculaAe;
}

function calculaPotenciaEfetivamenteIrradiadaPeirp (potenciaTransmissorPx, ganhoAntenaTx, atenuacaoConector, alturaTx, atenuacaoCabo) {
    potenciaTransmissorPxdBm = (10 * Math.log10(potenciaTransmissorPx/0.001));
    var Peirp = (potenciaTransmissorPxdBm + parseFloat(ganhoAntenaTx) - (2 * atenuacaoConector) - (alturaTx * atenuacaoCabo / 100))
    return Peirp;
}

function calculaPotenciaRecebidaPr (pEirp, aE, atenuacaoConector, alturaRx, atenuacaoCabo, ganhoAntenaRX, atenuacaoObstaculo) {
    var potenciaRecebida = (pEirp - aE - (2 * atenuacaoConector) - (alturaRx * atenuacaoCabo / 100) + 
                            parseFloat(ganhoAntenaRX)- parseFloat(atenuacaoObstaculo))

    return potenciaRecebida;
}

function updateTextInput1(val) {
    
    document.getElementById('valueTorre1').innerText = val + 'm'
  }

function updateTextInput2(val) {

document.getElementById('valueTorre2').innerText = val + 'm'
}  

function printResultados(potenciaRecebida, zonaFresnel, potenciaIrradiada, atenuacaoObstaculo, alturaObstaculo){

    
    document.getElementById("potenciaRecebida").innerHTML = "Potencia Recebida [dBm]:" +'\n'+ potenciaRecebida
    document.getElementById("zonaFresnel").innerText = "Raio Zona de Fresnel [m]:"  +'\n'+ zonaFresnel
    document.getElementById("potenciaIrradiada").innerText = "Potencia Irradiada [dBm]:"  +'\n'+ potenciaIrradiada
    document.getElementById("atenuacaoObstaculo").innerText = "Atenuação Obstaculo :"  +'\n' + atenuacaoObstaculo
    document.getElementById("alturaObstaculo").innerText = "Altura Obstaculo :"  +'\n' + alturaObstaculo
}


function gerarGrafico(){

    

    torre1 = document.getElementById("customRange1").value
    torre2 = document.getElementById("customRange2").value
    potenciaTransmissor = document.getElementById("potenciaTransmissor").value
    atenuacaoCabo = document.getElementById("atenuacaoCabo").value
    atenuacaoConector = document.getElementById("atenuacaoConector").value
    ganhoAntenaTX = document.getElementById("ganhoAntenaTX").value
    ganhoAntenaRX = document.getElementById("ganhoAntenaRX").value
    distanciaRadioEnlace = document.getElementById("distanciaRadioEnlace").value
    frequenciaOperacao = document.getElementById("frequenciaOperacao").value
    
    torre1 = (parseInt(torre1) + parseInt(topografia[0]));
    torre2 = (parseInt(torre2) + parseInt(topografia[parseInt(distanciaRadioEnlace)]));
    
    pontos = createDataSet(torre1, torre2, frequenciaOperacao, distanciaRadioEnlace);

    var pEirp = calculaPotenciaEfetivamenteIrradiadaPeirp(
        potenciaTransmissor,ganhoAntenaTX,atenuacaoConector,torre1, atenuacaoCabo)
    var aE = calculaAe( distanciaRadioEnlace, frequenciaOperacao)    
    var raio = calculaRaio(distanciaRadioEnlace, frequenciaOperacao)
    var atenuacaoObstaculo = calculaAtenuacaoObstaculo(pontos[7])
    
    var potenciaRecebida = calculaPotenciaRecebidaPr (pEirp, aE, atenuacaoConector, torre2, atenuacaoCabo, ganhoAntenaRX, atenuacaoObstaculo)
        
    printResultados(potenciaRecebida, raio, pEirp, atenuacaoObstaculo, pontos[8]);    
//Plota Gráfico
    var ctx = document.getElementsByClassName("line-chart")
            let chart = []
            
            chart = new Chart(ctx, {

                type: 'line',
                data: {
                    datasets: [
                        
                    
                    {
                        label: 'Fresnel de Cima',
                        data: pontos[1],
                        borderWidth: 5,
                        borderColor: 'blue',
                        backgroundColor: 'transparent'
                    },
                    {
                        label: 'Fresnel de Baixo',
                        data: pontos[3],
                        borderWidth: 5,
                        borderColor: 'blue',
                        backgroundColor: 'transparent'
                    },
                    {
                        label: 'Relevo',
                        data: pontos[5],
                        borderWidth: 5,
                        borderColor: 'Brown',
                        backgroundColor: 'transparent'
                    },
                    {
                        label: 'Linha Fresnel',
                        data: pontos[6],
                        borderWidth: 5,
                        borderColor: 'green',
                        backgroundColor: 'transparent'
                    }],

                    labels: pontos[0],
                    stepSize: 10
                },
                options: {
                }
                });
}