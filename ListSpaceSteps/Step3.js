import React, { useState, useEffect, Component} from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { SafeAreaView, StatusBar, Platform } from 'react-native';
import colors from '../utility/colors';
import AppLoading from 'expo-app-loading';
import { useFonts, SourceSansPro_400Regular } from '@expo-google-fonts/source-sans-pro';
import { DMSerifText_400Regular } from '@expo-google-fonts/dm-serif-text';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useWindowDimensions } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';

function Step3() {

  // const email = route.params;
  // const emailobj = route.params.email;

  const [story, setStory] = useState([]);
  const { height, width } = useWindowDimensions();

  const nearby = ["Available within 5 Kms", "Available within 10 Kms", "Available within 20 Kms", "Available within 50 Kms"];

  const metro = ["Available within 5 Kms", "Available within 10 Kms", "Available within 20 Kms", "No metro in our city"];

  useEffect(() =>{
    const getAllStories = async () => {
       try {
        //Saving cookies...
        const tokenData = await AsyncStorage.getItem('cookie')
        const response = await axios(`http://192.168.1.10/hummingbird/allStories.php`);
        setStory(response.data);
        console.log("Step1 screen response data: ")
        console.log(response.data)
       }catch(err){
       console.log("Step1 Err: " + err);
       }
    };
    getAllStories()
    },[]);

    let [fontsLoaded] = useFonts({ SourceSansPro_400Regular, DMSerifText_400Regular });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
  return (
    <SafeAreaView style={styles.container}>
       <StatusBar style={styles.statusBar} backgroundColor="#fff" barStyle="dark-content" />
      <View style={styles.mainContainer}>
      <Text style={styles.screenNameHeader}>
        Select nearby places from your accommodation...
        </Text>
        
        {/* Fourth set of question */}
        <Text style={styles.screenName}>Markets & Hospitals</Text>
        <Text style={styles.screenNameMeta}>
          Select the most nearby location of Market and Hospital
          </Text>
        <View style={styles.SelectDropdownContainer}>
        <SelectDropdown
	         data={nearby}
           defaultButtonText="Select one"
           buttonStyle={styles.selectOption}
           dropdownStyle={styles.dropDownOption}
	         onSelect={(selectedItem, index) => {
		          console.log(selectedItem, index)
	         }}
	         buttonTextAfterSelection={(selectedItem, index) => {
		         return selectedItem
	         }}
	         rowTextForSelection={(item, index) => {
		         return item
	         }}
        />
        </View>

        {/* Fifth set of question */}
        <Text style={styles.screenName}>Metro stations</Text>
        <Text style={styles.screenNameMeta}>
          Select the most nearby location of Metro station
          </Text>
        <View style={styles.SelectDropdownContainer}>
        <SelectDropdown
	         data={metro}
           defaultButtonText="Select one"
           buttonStyle={styles.selectOption}
           dropdownStyle={styles.dropDownOption}
	         onSelect={(selectedItem, index) => {
		          console.log(selectedItem, index)
	         }}
	         buttonTextAfterSelection={(selectedItem, index) => {
		         return selectedItem
	         }}
	         rowTextForSelection={(item, index) => {
		         return item
	         }}
        />
        </View>

        
      </View>
    </SafeAreaView>
  );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    height: Platform.OS === 'ios' ? 20 : StatusBar.currentHeight
  },
  statusBar: {
    height: Platform.OS === 'ios' ? 20 : StatusBar.currentHeight,
  },
  mainContainer: {
    flex: 1,
    maxWidth: '100%',
    maxHeight: '100%',
    minWidth: '100%',
    minHeight: '100%',
  },
  screenNameHeader: {
    marginTop: "3%",
    paddingLeft: 20,
    fontFamily: "SourceSansPro_400Regular", 
    fontSize:15,
    fontWeight: "normal",
    color: colors.transparent,
    maxWidth: "95%",
    marginBottom: "4%",
    textAlign: "left"
  },
  screenName:{
    paddingLeft: 20,
    fontFamily: "SourceSansPro_400Regular", 
    fontSize:16,
    fontWeight: "bold",
    marginTop: "5%"
  },
  screenNameMeta:{
    marginTop: "0%",
    paddingLeft: 20,
    fontFamily: "SourceSansPro_400Regular", 
    fontSize:14,
    fontWeight: "normal",
    color: colors.grayblack,
    maxWidth: "90%"
  },
  radioButtonContainer: {
    padding: 30,
    marginTop: "25%",
  },
  radioGroupStyle: {
    fontSize: 2,
    color: colors.white,
    // flexDirection: 'row',
  },
  SelectDropdownContainer: {
   padding: 20,
   width: "100%",
   borderBottomColor: colors.lightgray,
    borderBottomWidth: 1,
  },
  selectOption: {
    marginTop: "0%",
    textAlign: "center",
    borderRadius: 5,
    width: "95%",
    fontFamily: "SourceSansPro_400Regular",
  },
  dropDownOption: {
    position: "relative",
    backgroundColor: colors.lightgray,
    borderRadius: 5,
    borderColor: colors.transparent,
  }
});

export default Step3;