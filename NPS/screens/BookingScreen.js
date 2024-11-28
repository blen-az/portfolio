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
  const [firstName, setFirstMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [paymentType, setPaymentType] = useState('SAT');
  const [notes, setNotes] = useState('');
  const [socialMediaLink, setSocialMediaLink] = useState('');
  const [screenshot, setScreenshot] = useState(null);
  const [birthdate, setBirthdate] = useState(new Date());
  const [showBirthdatePicker, setShowBirthdatePicker] = useState(false);
  const [sex, setSex] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const pickImage = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permissionResult.granted) {
        Alert.alert('Permission Required', 'Please grant media library permissions to upload a screenshot.');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setScreenshot(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('Error', 'An error occurred while picking the image.');
    }
  };

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  const onChangeBirthdate = (event, selectedDate) => {
    const currentDate = selectedDate || birthdate;
    setShowBirthdatePicker(false);
    setBirthdate(currentDate);
  };

  const handleSubmit = async () => {
    if (!firstName.trim() || !lastName.trim() || !socialMediaLink.trim() || !sex) {
      Alert.alert('Error', 'Please fill in all required fields (First Name, Last Name, Social Media Link, and Sex).');
      return;
    }

    const bookingDetails = {
      firstName,
      lastName,
      sex,
      birthdate: birthdate.toISOString(),
      paymentType,
      notes,
      socialMediaLink,
      screenshot,
      date: date.toISOString(),
    };

    try {
      const docRef = await addDoc(collection(db, 'bookings'), bookingDetails);
      Alert.alert('Success', 'Booking Submitted Successfully!');
      console.log('Document written with ID: ', docRef.id);

      setFirstMiddleName('');
      setLastName('');
      setSex('');
      setPaymentType('SAT');
      setNotes('');
      setSocialMediaLink('');
      setScreenshot(null);
      setBirthdate(new Date());
      setDate(new Date());
    } catch (error) {
      console.error('Error adding document: ', error);
      Alert.alert('Error', 'Failed to schedule the booking');
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: lightTheme.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={[styles.title, { color: lightTheme.text }]}>Schedule a Payment Booking</Text>

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
          selectedValue={sex}
          style={[styles.picker, { backgroundColor: lightTheme.secondary, color: lightTheme.text }]}
          onValueChange={(itemValue) => setSex(itemValue)}
        >
          <Picker.Item label="Gender" value="" />
          <Picker.Item label="Male" value="Male" />
          <Picker.Item label="Female" value="Female" />
          <Picker.Item label="Other" value="Other" />
        </Picker>

        <TouchableOpacity style={[styles.datePickerButton, { backgroundColor: lightTheme.primary }]} onPress={() => setShowBirthdatePicker(true)}>
          <Text style={styles.buttonText}>Birthdate</Text>
        </TouchableOpacity>
        {showBirthdatePicker && (
          <DateTimePicker value={birthdate} mode="date" display="default" onChange={onChangeBirthdate} />
        )}
        <Text style={{ color: lightTheme.text, marginBottom: 20 }}>Birthdate: {birthdate.toDateString()}</Text>

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

        <TouchableOpacity style={[styles.datePickerButton, { backgroundColor: lightTheme.primary }]} onPress={() => setShowDatePicker(true)}>
          <Text style={styles.buttonText}>Payment Day</Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker value={date} mode="date" display="default" onChange={onChangeBirthdate} />
        )}
        <Text style={{ color: lightTheme.text, marginBottom: 20 }}>Payment Day: {birthdate.toDateString()}</Text>

        <TextInput
          style={[styles.input, { backgroundColor: lightTheme.secondary, color: lightTheme.text }]}
          placeholder="Your Social Media Link (Telegram, Linkedin ...)"
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
        <View style={styles.uploadContainer}>
          <TouchableOpacity style={[styles.imagePickerButton, { backgroundColor: lightTheme.primary }]} onPress={pickImage}>
            <Text style={styles.buttonText}>Upload Screenshot</Text>
          </TouchableOpacity>
          {screenshot && <Image source={{ uri: screenshot }} style={styles.screenshot} />}
        </View>

        <TouchableOpacity style={[styles.button, { backgroundColor: lightTheme.primary }]} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit Booking</Text>
        </TouchableOpacity>
      </ScrollView>
      <View style={[styles.footer, { backgroundColor: lightTheme.background }]}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.footerItem}>
          <Icon name="home" size={34} color={lightTheme.text} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Request')} style={styles.footerItem}>
          <Icon name="payment" size={34} color={lightTheme.text} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Booking')} style={styles.footerItem}>
          <Icon name="schedule" size={45} color={lightTheme.text} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={styles.footerItem}>
          <Icon name="person" size={34} color={lightTheme.text} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContainer: { flexGrow: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 24, marginBottom: 20, textAlign: 'center' },
  input: { borderRadius: 15, padding: 15, width: '90%', marginBottom: 20 },
  picker: { width: '90%', marginBottom: 20, borderRadius: 15 },
  datePickerButton: { padding: 10, borderRadius: 20, width: '60%', alignItems: 'center', marginBottom: 20 },
  imagePickerButton: { padding: 10, borderRadius: 20, width: '60%', alignItems: 'center', marginBottom: 20 },
  uploadContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  screenshot: { width: 60, height: 60, marginLeft: 15, borderRadius: 10 },
  button: { padding: 15, borderRadius: 25, width: '80%', alignItems: 'center', marginBottom: 20 },
  buttonText: { color: 'white', fontSize: 18 },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingVertical: 15,
  },
  footerItem: { alignItems: 'center' },
});

export default BookingScreen;
