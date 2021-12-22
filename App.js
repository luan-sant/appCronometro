import React, {useState} from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';


let timer = null;
let ss = 0;
let mm = 0;
let hh  = 0;


export default function appCronometro() {

const [numero, setNumero] = useState (0);
const [botao, setBotao] = useState ('INICIAR');
const [ultimo, setUltimo] = useState (null); //state para mostrar o cronometro zerado


  function vai (){
    if (timer !== null) {
      // aqui vai parar o relogio
      clearInterval(timer);
      timer = null;

      setBotao ('INICIAR')
    } else {
      //começar a girar o timer
      timer = setInterval (() =>{
        ss++;

        if (ss == 60){
          ss = 0;
          mm++;
        }

        if (mm == 60){
          mm = 0;
          hh++;
        }

        let formato = 
        (hh < 10 ? '0' + hh : hh) + ':'
        + (mm < 10 ? '0' + mm : mm) + ':'
        + (ss < 10 ? '0' + ss : ss)

        setNumero (formato);


      }, 1);
      setBotao ('PARAR')
    }
}


  function limpar (){
    if (timer !== null){
      // parar o tempo 
      clearInterval (timer);
      timer = null;
    }

    setUltimo (numero);
    setNumero (0);
    ss = 0;
    mm = 0;
    hh = 0;

    setBotao ('INICIAR')
}


 return (
   <View style={styles.container}>


     <Image 
      source={require('./src/crono.png')}
     />
    
    <Text style={styles.timer}> {numero} </Text>

    <View style={styles.btnArea}> 
      <TouchableOpacity style={styles.btn} onPress={vai}> 
        <Text style={styles.btnTexto}>{botao}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btn} onPress={limpar}> 
        <Text style={styles.btnTexto}>LIMPAR</Text>
      </TouchableOpacity>
    </View>

    <View style={styles.areaUltima}> 
      <Text style={styles.textoCorrida}>
        { ultimo ? 'Ultimo tempo: ' + ultimo : ''}
      </Text>
    </View>

   </View>
  );
}

const styles = StyleSheet.create({
  container : {
    flex : 1,
    alignItems : 'center',
    justifyContent : 'center',
    backgroundColor : '#1d3557'
  },

  timer : {
    marginTop : -160,
    fontSize: 45,
    fontWeight: 'bold',
    color: '#fff'
  },

  btnArea : {
    flexDirection: 'row',
    marginTop: 130,
    height: 40,

  },
  
  btn : {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    height: 40,
    margin: 17,
    borderRadius: 9
  },

  btnTexto : {
    color: '#1d3557',
    fontWeight: 'bold',
  },

  areaUltima: {
    marginTop: 40
  },

  textoCorrida : {
    fontSize: 25,
    color: '#fff',
    fontStyle: 'italic',
  }
})