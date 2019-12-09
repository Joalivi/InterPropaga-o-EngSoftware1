function createDataSet (torre1, torre2, raio, frequencia, distancia){


    
    var x, y, d1, d2 = 0.0;
                var altura = 0.0;

                if(torre1 == torre2)
                {
                    for(let i = 1; i < 100; i++)
                    {
                        x = (distancia / 100) * i;

                        d1 = x;
                        d2 = distancia - x;

                        y = 550 * Math.sqrt((d1 * d2)/(distancia * frequencia)) + torre1; 

                        P1.add(x, y);

                        y = (y * -1) + (torre1 * 2);

                        P2.add(x, y);
                    }
                }
                else
                {
                    for(let i = 1; i < 100; i++)
                    {
                        x = (distancia / 100) * i;

                        d1 = x;
                        d2 = distancia - x;

                        altura = ((((torre1-torre2) * d2) / distancia) + torre2);

                        y = 550 * Math.sqrt((d1 * d2)/(distancia * frequencia)) + altura; 

                        P1.add(x, y);

                        y = (y * -1) + (altura * 2);

                        P2.add(x, y);
                    }
}
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

function calculaPotenciaRecebidaPr (pEirp, aE, atenuacaoConector, alturaRx, atenuacaoCabo) {
    var potenciaRecebida = pEirp - aE - (2 * atenuacaoConector) - (alturaRx * atenuacaoCabo / 100)

    return potenciaRecebida;
}

function updateTextInput1(val) {
    
    document.getElementById('valueTorre1').innerText = val + 'm'
  }

function updateTextInput2(val) {

document.getElementById('valueTorre2').innerText = val + 'm'
}  

function printResultados(potenciaRecebida, zonaFresnel, potenciaIrradiada){

    
    document.getElementById("potenciaRecebida").innerText = "Potencia Recebida [dBm]:" + potenciaRecebida
    document.getElementById("zonaFresnel").innerText = "Raio Zona de Fresnel [m]:" + zonaFresnel
    document.getElementById("potenciaIrradiada").innerText = "Potencia Irradiada [dBm]:" + potenciaIrradiada
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

    var pEirp = calculaPotenciaEfetivamenteIrradiadaPeirp(
        potenciaTransmissor,ganhoAntenaTX,atenuacaoConector,torre1, atenuacaoCabo)
    var aE = calculaAe( distanciaRadioEnlace, frequenciaOperacao)    
    var raio = calculaRaio(distanciaRadioEnlace, frequenciaOperacao)
    var potenciaRecebida = calculaPotenciaRecebidaPr (pEirp, aE, atenuacaoConector, torre2, atenuacaoCabo)
    
    
    
    printResultados(potenciaRecebida, raio, pEirp);

    //createDataSet(torre1, torre2, raio, frequencia, distancia);
}