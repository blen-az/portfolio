import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { lightTheme } from './Theme';
import { saveRequest } from '../services/requestService';
import { AuthContext } from '../context/AuthContext';
import { SafeAreaView } from 'react-native-safe-area-context';

const RequestScreen = ({ navigation }) => {
  const [firstName, setFirstMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [paymentType, setPaymentType] = useState('');
  const [notes, setNotes] = useState('');
  const [socialMediaLink, setSocialMediaLink] = useState('');
  const [screenshot, setScreenshot] = useState(null);
  const [time, setTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);
  const { user } = useContext(AuthContext);

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

  const handleTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || time;
    setShowTimePicker(false);
    setTime(currentTime);
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
      firstMiddleName,
      lastName,
      paymentType,
      notes,
      socialMediaLink,
      screenshot,
      time: time.toISOString(),
      userId: user.uid,
      timestamp: new Date().toISOString(),
    };

    try {
      const response = await saveRequest(user.uid, requestDetails);
      if (response.success) {
        Alert.alert('Success', 'Request Submitted Successfully');
        setFirstMiddleName('');
        setLastName('');
        setPaymentType('');
        setNotes('');
        setSocialMediaLink('');
        setScreenshot(null);
        setTime(new Date());
      } else {
        Alert.alert('Error', 'Failed to submit the request');
      }
    } catch (error) {
      Alert.alert('Error', error.message || 'An error occurred');
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: lightTheme.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>

        <Text style={[styles.title, { color: lightTheme.text }]}>Submit a Payment Request</Text>
        <Text style={[styles.title2, { color: lightTheme.text }]}>Payment Made Within 24 Hours</Text>

        <TextInput
          style={[styles.input, { backgroundColor: lightTheme.secondary, color: lightTheme.text }]}
          placeholder="First & Middle Name"
          placeholderTextColor="#888"
          value={firstName}
          onChangeText={setFirstMiddleName}
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
          placeholder="Your Social Media Link (Telegtam, Linkedin ...)"
          placeholderTextColor="#888"
          value={socialMediaLink}
          onChangeText={setSocialMediaLink}
        />
        <TextInput
          style={[styles.input, { backgroundColor: lightTheme.secondary, color: lightTheme.text }]}
          placeholder="Additional Guide Notes (Optional)"
          placeholderTextColor="#888"
          value={notes}
          onChangeText={setNotes}
        />

        <TouchableOpacity style={[styles.timePickerButton, { backgroundColor: lightTheme.primary }]} onPress={() => setShowTimePicker(true)}>
          <Text style={styles.buttonText}>Pick a Time</Text>
        </TouchableOpacity>
        {showTimePicker && (
          <DateTimePicker
            value={time}
            mode="time"
            display="default"
            onChange={handleTimeChange}
          />
        )}
        <Text style={{ color: lightTheme.text, marginBottom: 20 }}>Selected Time: {time.toLocaleTimeString()}</Text>

        <TouchableOpacity style={[styles.imagePickerButton, { backgroundColor: lightTheme.primary }]} onPress={pickImage}>
          <Text style={styles.buttonText}>Upload Screenshot</Text>
        </TouchableOpacity>
        {screenshot && <Image source={{ uri: screenshot }} style={styles.screenshot} />}

        <TouchableOpacity style={[styles.button, { backgroundColor: lightTheme.primary }]} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit Request</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContainer: { 
    flexGrow: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: 20 },
  title: { 
    fontSize: 24, 
    marginBottom: 20, 
    textAlign: 'center' },
  input: { 
    borderRadius: 15, 
    padding: 15, 
    width: '90%', 
    marginBottom: 20 },
  picker: { 
    width: '90%', marginBottom: 20, borderRadius: 15 },
  timePickerButton: { padding: 15, borderRadius: 25, width: '80%', alignItems: 'center', marginBottom: 20 },
  imagePickerButton: { padding: 15, borderRadius: 25, width: '80%', alignItems: 'center', marginBottom: 20 },
  screenshot: { width: 100, height: 100, marginBottom: 20, borderRadius: 15 },
  button: { padding: 15, borderRadius: 25, width: '80%', alignItems: 'center' },
  buttonText: { color: 'white', fontSize: 18 },
});

export default RequestScreen;
