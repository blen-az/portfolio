// NPS/screens/RequestScreen.js
import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import { lightTheme } from './Theme';
import { saveRequest } from '../services/requestService'; // Adjust path as needed
import { AuthContext } from '../context/AuthContext';

const RequestScreen = ({ navigation }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [paymentType, setPaymentType] = useState('');
  const [notes, setNotes] = useState('');
  const [screenshot, setScreenshot] = useState(null);
  const { user } = useContext(AuthContext);  // Access the current user

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
    });
    if (!result.canceled) {
      setScreenshot(result.uri);
    }
  };

  const handleSubmit = async () => {
    if (!user) {
      Alert.alert('Error', 'User not logged in');
      return;
    }

    if (!firstName.trim() || !lastName.trim() || !paymentType) {
      Alert.alert('Error', 'Please fill all the required fields (First Name, Last Name, and Payment Type)');
      return;
    }

    const requestDetails = {
      firstName,
      lastName,
      paymentType,
      notes,
      screenshot,
      userId: user.uid,
      timestamp: new Date().toISOString(), // Optional: add a timestamp
    };

    try {
      const response = await saveRequest(user.uid, requestDetails); // Save to Firebase Firestore
      if (response.success) {
        Alert.alert('Success', 'Request Submitted Successfully');
        setFirstName('');
        setLastName('');
        setPaymentType('');
        setNotes('');
        setScreenshot(null);
      } else {
        Alert.alert('Error', 'Failed to submit the request');
      }
    } catch (error) {
      Alert.alert('Error', error.message || 'An error occurred');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: lightTheme.background }]}>
      <Text style={[styles.title, { color: lightTheme.text }]}>Submit a Payment Request</Text>

      <TextInput
        style={[styles.input, { backgroundColor: lightTheme.secondary, color: lightTheme.text }]}
        placeholder="First Name"
        placeholderTextColor="#888"
        value={firstName}
        onChangeText={setFirstName}
      />
      <TextInput
        style={[styles.input, { backgroundColor: lightTheme.secondary, color: lightTheme.text }]}
        placeholder="Last Name"
        placeholderTextColor="#888"
        value={lastName}
        onChangeText={setLastName}
      />
      <Picker
        selectedValue={paymentType}
        style={[styles.picker, { backgroundColor: lightTheme.secondary, color: lightTheme.text }]}
        onValueChange={(itemValue) => setPaymentType(itemValue)}
      >
        <Picker.Item label="Select Payment Type" value="" />
        <Picker.Item label="USMLE" value="USMLE" />
        <Picker.Item label="OET" value="OET" />
        <Picker.Item label="WES" value="WES" />
        <Picker.Item label="SOPHAS" value="SOPHAS" />
        <Picker.Item label="Duolingo English Test" value="Duolingo" />
        <Picker.Item label="SAT" value="SAT" />
        <Picker.Item label="Facebook and Instagram Boost Payments" value="Facebook Boost" />
        <Picker.Item label="DHA Exam" value="DHA" />
        <Picker.Item label="PLAB Exam" value="PLAB" />
        <Picker.Item label="OTHERS" value="OTHERS" />
      </Picker>
      <TextInput
        style={[styles.input, { backgroundColor: lightTheme.secondary, color: lightTheme.text }]}
        placeholder="Notes (Optional)"
        placeholderTextColor="#888"
        value={notes}
        onChangeText={setNotes}
      />
      <TouchableOpacity style={[styles.imagePickerButton, { backgroundColor: lightTheme.primary }]} onPress={pickImage}>
        <Text style={styles.buttonText}>Upload Screenshot</Text>
      </TouchableOpacity>
      {screenshot && <Image source={{ uri: screenshot }} style={styles.screenshot} />}
      <TouchableOpacity style={[styles.button, { backgroundColor: lightTheme.primary }]} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit Request</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderRadius: 15,
    padding: 15,
    width: '90%',
    marginBottom: 20,
  },
  picker: {
    width: '90%',
    marginBottom: 20,
    borderRadius: 15,
  },
  imagePickerButton: {
    padding: 15,
    borderRadius: 25,
    width: '80%',
    alignItems: 'center',
    marginBottom: 20,
  },
  screenshot: {
    width: 100,
    height: 100,
    marginBottom: 20,
    borderRadius: 15,
  },
  button: {
    padding: 15,
    borderRadius: 25,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default RequestScreen;
