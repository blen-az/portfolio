import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { lightTheme } from './Theme';
import { saveRequest } from '../services/requestService';
import { AuthContext } from '../context/AuthContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase';

const RequestScreen = ({ navigation }) => {
  const theme = lightTheme;
  const [firstName, setFirstMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [sex, setSex] = useState('');
  const [birthdate, setBirthdate] = useState(new Date());
  const [showBirthdatePicker, setShowBirthdatePicker] = useState(false);
  const [paymentType, setPaymentType] = useState('');
  const [notes, setNotes] = useState('');
  const [socialMediaLink, setSocialMediaLink] = useState('');
  const [screenshot, setScreenshot] = useState(null);
  const [time, setTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);
  const { user } = useContext(AuthContext);

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaType.IMAGE,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.canceled) {
        const localUri = result.assets[0].uri;
        console.log('Selected Image URI:', localUri);

        // Copy image to a local temporary file using expo-file-system
        const fileName = localUri.split('/').pop();
        const newPath = `${FileSystem.cacheDirectory}${fileName}`;
        await FileSystem.copyAsync({
          from: localUri,
          to: newPath,
        });
        console.log('Temporary Path:', newPath);
        setScreenshot(newPath);
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('Error', 'An error occurred while picking the image.');
    }
  };

  const uploadScreenshot = async () => {
    if (!screenshot) {
      Alert.alert('Error', 'No screenshot selected.');
      return null;
    }

    try {
      const fileName = `screenshots/${new Date().getTime()}_${screenshot.split('/').pop()}`;
      const imageRef = ref(storage, fileName);

      console.log('Uploading from Temporary Path:', screenshot);

      const fileBlob = await FileSystem.readAsStringAsync(screenshot, {
        encoding: FileSystem.EncodingType.Base64,
      });
      const buffer = Uint8Array.from(atob(fileBlob), (c) => c.charCodeAt(0));

      await uploadBytes(imageRef, buffer);
      const downloadURL = await getDownloadURL(imageRef);
      console.log('Uploaded Image URL:', downloadURL);
      return downloadURL;
    } catch (error) {
      console.error('Error uploading image:', error);
      Alert.alert('Error', 'Failed to upload the image. Please try again.');
      return null;
    }
  };


  const handleTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || time;
    setShowTimePicker(false);
    setTime(currentTime);
  };

  const handleBirthdateChange = (event, selectedDate) => {
    const currentBirthdate = selectedDate || birthdate;
    setShowBirthdatePicker(false);
    setBirthdate(currentBirthdate);
  };

  const handleSubmit = async () => {
    if (!user) {
      Alert.alert('Error', 'User not logged in');
      return;
    }

    if (!firstName.trim() || !lastName.trim() || !paymentType || !sex) {
      Alert.alert('Error', 'Please fill all the required fields (First Name, Last Name, Payment Type, and Sex)');
      return;
    }
    let screenshotUrl = null;
    if (screenshot) {
      screenshotUrl = await uploadScreenshot();
      if (!screenshotUrl) return;
    }

    
    const requestDetails = {
      firstName,
      lastName,
      sex,
      birthdate: birthdate.toISOString(),
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
        console.log('Submitting request details:', requestDetails);
        Alert.alert('Success', 'Request Submitted Successfully');
        setFirstMiddleName('');
        setLastName('');
        setSex('');
        setBirthdate(new Date());
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
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={[styles.title, { color: theme.text }]}>Submit a Payment Request</Text>
        <Text style={[styles.title2, { color: theme.text }]}>Payment Made Within 24 Hours</Text>

        <TextInput
          style={[styles.input, { backgroundColor: theme.secondary, color: theme.text }]}
          placeholder="First Name"
          placeholderTextColor="#888"
          value={firstName}
          onChangeText={setFirstMiddleName}
        />
        <TextInput
          style={[styles.input, { backgroundColor: theme.secondary, color: theme.text }]}
          placeholder="Last Name"
          placeholderTextColor="#888"
          value={lastName}
          onChangeText={setLastName}
        />

        {/* Sex Picker */}
        <Picker
          selectedValue={sex}
          style={[styles.picker, { backgroundColor: theme.secondary, color: theme.text }]}
          onValueChange={(itemValue) => setSex(itemValue)}
        >
          <Picker.Item label="Gender" value="" />
          <Picker.Item label="Male" value="Male" />
          <Picker.Item label="Female" value="Female" />
          <Picker.Item label="Other" value="Other" />
        </Picker>

        {/* Birthdate Picker */}
        <TouchableOpacity
          style={[styles.datePickerButton, { backgroundColor: theme.primary }]}
          onPress={() => setShowBirthdatePicker(true)}
        >
          <Text style={styles.buttonText}>Birthdate</Text>
        </TouchableOpacity>
        {showBirthdatePicker && (
          <DateTimePicker
            value={birthdate}
            mode="date"
            display="default"
            onChange={handleBirthdateChange}
          />
        )}
        <Text style={{ color: theme.text, marginBottom: 20 }}>Birthdate: {birthdate.toDateString()}</Text>

        <Picker
          selectedValue={paymentType}
          style={[styles.picker, { backgroundColor: theme.secondary, color: theme.text }]}
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
        <TouchableOpacity
          style={[styles.timePickerButton, { backgroundColor: theme.primary }]}
          onPress={() => setShowTimePicker(true)}
        >
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
        <Text style={{ color: theme.text, marginBottom: 20 }}>Selected Time: {time.toLocaleTimeString()}</Text>

        <TextInput
          style={[styles.input, { backgroundColor: theme.secondary, color: theme.text }]}
          placeholder="Your Social Media Link (Telegram, Linkedin ...)"
          placeholderTextColor="#888"
          value={socialMediaLink}
          onChangeText={setSocialMediaLink}
        />
        <TextInput
          style={[styles.input, { backgroundColor: theme.secondary, color: theme.text }]}
          placeholder="Additional Guide Notes (Optional)"
          placeholderTextColor="#888"
          value={notes}
          onChangeText={setNotes}
        />


        <View style={styles.uploadContainer}>
          <TouchableOpacity
            style={[styles.imagePickerButton, { backgroundColor: theme.primary }]}
            onPress={pickImage}
          >
            <Text style={styles.buttonText}>Upload Screenshot</Text>
          </TouchableOpacity>
          {screenshot && <Image source={{ uri: screenshot }} style={styles.screenshot} />}
        </View>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: theme.primary }]}
          onPress={handleSubmit}
        >
          <Text style={styles.buttonText}>Submit Request</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Footer */}
      <View style={[styles.footer, { backgroundColor: theme.background }]}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.footerItem}>
          <Icon name="home" size={34} color={theme.text} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Request')} style={styles.footerItem}>
          <Icon name="payment" size={45} color={theme.text} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Booking')} style={styles.footerItem}>
          <Icon name="schedule" size={34} color={theme.text} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={styles.footerItem}>
          <Icon name="person" size={45} color={theme.text} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1 
  },
  scrollContainer: {
    flexGrow: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: 20 
  },
  title: { fontSize: 24, marginBottom: 20, textAlign: 'center' },
  input: { borderRadius: 15, padding: 15, width: '90%', marginBottom: 20 },
  picker: { width: '90%', marginBottom: 20, borderRadius: 15 },
  datePickerButton: { padding: 10,
    borderRadius: 20,
    width: '60%',
    alignItems: 'center', },
  timePickerButton: { padding: 10,
    borderRadius: 20,
    width: '60%',
    alignItems: 'center',},
  imagePickerButton: { padding: 10,
    borderRadius: 20,
    width: '60%',
    alignItems: 'center', },
    footer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      width: '100%',
      paddingVertical: 15,
    },
  uploadContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  screenshot: { width: 60, height: 60, marginLeft: 15, borderRadius: 10 },
  button: { padding: 15, borderRadius: 25, width: '80%', alignItems: 'center' },
  buttonText: { color: 'white', fontSize: 18 },
});

export default RequestScreen;