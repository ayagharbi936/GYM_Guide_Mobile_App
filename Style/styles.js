import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
  },

  mainImage: {
    flex: 9,
    justifyContent: 'center',
    alignItems: 'center',
  },

  mainTxt: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },

  imgSplashScreen: {
    height: 90,
    width: 90,
  },

  txtSplashScreen: {
    textAlign: 'center',
    fontSize: 15,
  },

  overlayContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0, 0.2)',
  },

  backgroundIMG: {
    width: '100%',
    height: '100%',
  },

  nextBTN: {
    backgroundColor: 'rgba(255,255,255,0)',
    marginLeft: '80%',
    borderColor: 'rgba(255,255,255,0)',
  },

  textBTN: {
    color: '#ffffff',
    fontSize: 17,
  },

  loginBtn: {
    backgroundColor: 'rgba(255,255,255,0.3)',
    marginRight: 60,
    marginLeft: 60,
    borderColor: 'rgba(255,255,255,0.1)',
  },

  loginTxtBtn: {
    fontSize: 20,
    color: 'white',
    fontWeight: '600',
  },

  signBtn: {
    backgroundColor: 'rgba(255,255,255,0.8)',
    marginRight: 60,
    marginLeft: 60,
    borderColor: 'rgba(255,255,255,0.2)',
  },

  signTxtBtn: {
    fontSize: 20,
    color: '#333333',
    fontWeight: '600',
  },

  title: {
    fontSize: 28,
    color: '#373737',
    marginBottom: 20,
  },

  txtInput: {
    height: 50,
    width: 300,
    borderRadius: 30,
    borderColor: '#cccccc',
    borderWidth: 1,
    paddingLeft: 20,
  },

  orangeBtn: {
    width: 300,
    backgroundColor: '#F4511E',
    borderColor: '#F4511E',
    height: 50,
    alignSelf: 'center',
    marginBottom: 20,
    marginTop: 20,
  },

  orangeTxtBtn: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
  },
  highlight: {
    fontWeight: 'bold',
    color: '#F4511E',
    fontSize: 17,
  },
});

export default styles;
