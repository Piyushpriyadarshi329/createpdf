import React, {useState} from 'react';
import RNFS from 'react-native-fs';
import ImagePicker from 'react-native-image-crop-picker';
import Pdf from 'react-native-pdf';



import {Text, TouchableHighlight, View,Image} from 'react-native';

import RNHTMLtoPDF from 'react-native-html-to-pdf';

function App() {

const [imge1, setimge1] = useState("")
const [imge2, setimge2] = useState("")

const [base64pdf, setbase64pdf] = useState('')
const source = {
  uri: `data:application/pdf;base64,${base64pdf}`,
};

  async function createPDF() {

    console.log("createPDF call")
    let options = {
      html: `<html>
      
      <img src="${imge1.path}" alt="Trulli"
      width="200" height="200">
      <img src="${imge2.path}" alt="Trulli"
      width="200" height="200">
      </html>
      `,
      fileName: 'test',
      directory: 'Documents',
    };

    let file = await RNHTMLtoPDF.convert(options);
    console.log(file.filePath);
    RNFS.readFile(file.filePath, 'base64').then(res => {
      console.log(res);
      setbase64pdf(res)
    });
  }

  async function firstimagefun() {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image);
      setimge1(image)
    });
  }
  async function secondimagefun() {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image);
      setimge2(image)

    });
  }

  return (
    <View>



<View style={{margin:50}}>

<Image
        style={{width:100,height:100}}
        source={{uri: imge1.path}}

      />

<Image
        style={{width:100,height:100}}
        source={{uri: imge2.path}}

      />
</View>
<View style={{flexDirection:"row"}}>

      <TouchableHighlight style={{flex:1,backgroundColor:"dodgerblue",borderRadius:5}} onPress={firstimagefun}>
        <Text> select First image </Text>
      </TouchableHighlight>
      <TouchableHighlight
      style={{flex:1,backgroundColor:"dodgerblue",marginLeft:20,borderRadius:5}}
      onPress={secondimagefun}>
        <Text> selectsecond image </Text>
      </TouchableHighlight>
</View>

<View style={{marginTop:30}}>

      <TouchableHighlight 
      style={{backgroundColor:"dodgerblue",marginHorizontal:30,borderRadius:5}}
      onPress={createPDF}>
        <Text style={{textAlign:"center",fontSize:20}}>Create PDF</Text>
      </TouchableHighlight>
</View>

<View style={{justifyContent:"center",alignItems:'center'}}>

      <Pdf
        source={source}
        onLoadComplete={(numberOfPages, filePath) => {
          console.log(`number of pages: ${numberOfPages}`);
        }}
        onPageChanged={(page, numberOfPages) => {
          console.log(`current page: ${page}`);
        }}
        onError={error => {
          console.log(error);
        }}
        onPressLink={uri => {
          console.log(`Link presse: ${uri}`);
        }}
        style={{width:200,height:300}}
      />
</View>

    </View>
  );
}

export default App;
