import { View, Text, ScrollView,StyleSheet } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { lightTheme } from "./Theme";
const theme = lightTheme;

const InfoScreen = ({Navigation})=> {
    return(
        <SafeAreaView style={[styles.container, { backgroundColor: theme.background}]}>
            <ScrollView>
            <Text style={[styles.title, { color: theme.text }]}>Information</Text>
            <View style={[styles.infoContainer, { backgroundColor:theme.secondary }]}>
            <Text style={[styles.text, { color: theme.text }]}>...</Text>

            </View>
            </ScrollView>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
      },
    title: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: 'center',
      },
    infoContainer: {
        width: '100%',
    }, 
    text: {
        fontSize: 15,
    },

})


export default InfoScreen;