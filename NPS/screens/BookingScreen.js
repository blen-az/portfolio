import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { lightTheme } from './Theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

const BookingScreen = ({ navigation }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [paymentType, setPaymentType] = useState('SAT');
  const [notes, setNotes] = useState('');
  const [socialMediaLink, setSocialMediaLink] = useState('');
  const [screenshot, setScreenshot] = useState(null);
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

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

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  const handleSubmit = async () => {
    if (!firstName.trim() || !lastName.trim() || !socialMediaLink.trim()) {
      Alert.alert('Error', 'Please fill in all required fields (First Name, Last Name, and Social Media Link).');
      return;
    }

    const bookingDetails = {
      firstName,
      lastName,
      paymentType,
      notes,
      socialMediaLink,
      screenshot,
      date: date.toISOString(),
    };

    try {
      const docRef = await addDoc(collection(db, 'bookings'), bookingDetails);
      Alert.alert('Success', 'Booking Scheduled Successfully!');
      console.log("Document written with ID: ", docRef.id);

      setFirstName('');
      setLastName('');
      setPaymentType('SAT');
      setNotes('');
      setSocialMediaLink('');
      setScreenshot(null);
      setDate(new Date());
    } catch (error) {
      console.error("Error adding document: ", error);
      Alert.alert('Error', 'Failed to schedule the booking');
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: lightTheme.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={[styles.title, { color: lightTheme.text }]}>Schedule a Payment Booking</Text>

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
          <Picker.Item label="Duolingo English Test" value="Duolingo English Test" />
          <Picker.Item label="SAT" value="SAT" />
          <Picker.Item label="Facebook Boost" value="Facebook Boost" />
          <Picker.Item label="DHA Exam" value="DHA" />
          <Picker.Item label="PLAB Exam" value="PLAB" />
          <Picker.Item label="OTHERS" value="OTHERS" />
        </Picker>

        <TextInput
          style={[styles.input, { backgroundColor: lightTheme.secondary, color: lightTheme.text }]}
          placeholder="Social Media Link"
          placeholderTextColor="#888"
          value={socialMediaLink}
          onChangeText={setSocialMediaLink}
        />

        <TouchableOpacity style={[styles.datePickerButton, { backgroundColor: lightTheme.primary }]} onPress={() => setShowDatePicker(true)}>
          <Text style={styles.buttonText}>Pick a Date</Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={onChange}
          />
        )}
        <Text style={{ color: lightTheme.text, marginBottom: 20 }}>Selected Date: {date.toDateString()}</Text>

        <TextInput
          style={[styles.notesInput, { backgroundColor: lightTheme.secondary, color: lightTheme.text }]}
          placeholder="Additional Notes (Optional)"
          placeholderTextColor="#888"
          value={notes}
          onChangeText={setNotes}
          multiline={true}
        />

        <TouchableOpacity style={[styles.imagePickerButton, { backgroundColor: lightTheme.primary }]} onPress={pickImage}>
          <Text style={styles.buttonText}>Upload Screenshot (Optional)</Text>
        </TouchableOpacity>

        {screenshot && <Image source={{ uri: screenshot }} style={styles.screenshot} />}

        <TouchableOpacity style={[styles.button, { backgroundColor: lightTheme.primary }]} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit Booking</Text>
        </TouchableOpacity>
        </ScrollView>
        <View style={[styles.footer, { backgroundColor: lightTheme.background }]}>
          <TouchableOpacity onPress={() => navigation.navigate('Home')} style={[styles.footerItem, styles.activeFooterItem]}>
            <Icon name="home" size={34} color={lightTheme.text} />
            {/* <Text style={[styles.footerText, { color: lightTheme.text, fontWeight: 'bold' }]}>Home</Text> */}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Booking')} style={[styles.footerItem, styles.activeFooterItem]}>
            <Icon name="schedule" size={45} color={lightTheme.text} />
            {/* <Text style={[styles.footerText, { color: lightTheme.text, fontWeight: 'bold' }]}>Booking</Text> */}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Request')} style={styles.footerItem}>
            <Icon name="payment" size={34} color={lightTheme.text} />
            {/* <Text style={[styles.footerText, { color: lightTheme.text }]}>Request</Text> */}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={styles.footerItem}>
            <Icon name="person" size={34} color={lightTheme.text} />
            {/* <Text style={[styles.footerText, { color:lightTheme.text }]}>Profile</Text> */}
          </TouchableOpacity>
        </View>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
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
  datePickerButton: {
    padding: 15,
    borderRadius: 25,
    width: '80%',
    alignItems: 'center',
    marginBottom: 20,
  },
  notesInput: {
    borderRadius: 15,
    padding: 15,
    width: '90%',
    height: 100,
    marginBottom: 20,
    textAlignVertical: 'top',
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
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingVertical: 15,
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  footerItem: {
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    marginTop: 5,
  },
  activeFooterItem: {
    elevation: 5,
    shadowColor: '#007aff',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  activeIcon: {
    transform: [{ scale: 1.2 }],
  },
});

export default BookingScreen;
