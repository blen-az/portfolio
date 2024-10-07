import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, useColorScheme, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker'; // Date Picker Library
import { lightTheme, darkTheme } from './Theme';

const RequestScreen = ({ navigation }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [paymentType, setPaymentType] = useState('SAT');
  const [notes, setNotes] = useState('');
  const [screenshot, setScreenshot] = useState(null);
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const scheme = useColorScheme();
  const theme = scheme === 'dark' ? darkTheme : lightTheme;

  // Handle image picking
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setScreenshot(result.uri);
    }
  };

  // Handle date change
  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>Submit a Payment Request</Text>

      <TextInput
        style={[styles.input, { backgroundColor: theme.secondary, color: theme.text }]}
        placeholder="First Name"
        placeholderTextColor={theme.text}
        value={firstName}
        onChangeText={setFirstName}
      />

      <TextInput
        style={[styles.input, { backgroundColor: theme.secondary, color: theme.text }]}
        placeholder="Last Name"
        placeholderTextColor={theme.text}
        value={lastName}
        onChangeText={setLastName}
      />

      <Picker
        selectedValue={paymentType}
        style={[styles.picker, { backgroundColor: theme.secondary, color: theme.text }]}
        onValueChange={(itemValue) => setPaymentType(itemValue)}
      >
        <Picker.Item label="SAT" value="SAT" />
        <Picker.Item label="SOPHAS" value="SOPHAS" />
        <Picker.Item label="TOEFL" value="TOEFL" />
        <Picker.Item label="GRE" value="GRE" />
        <Picker.Item label="Other" value="Other" />
      </Picker>

      {/* Date Picker
      <TouchableOpacity onPress={() => setShowDatePicker(true)} style={[styles.datePickerButton, { backgroundColor: theme.secondary }]}>
        <Text style={{ color: theme.text }}>{date.toDateString()}</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={onDateChange}
        />
      )} */}

      {/* Notes Input */}
      <TextInput
        style={[styles.input, { backgroundColor: theme.secondary, color: theme.text }]}
        placeholder="Notes (Optional)"
        placeholderTextColor={theme.text}
        value={notes}
        onChangeText={setNotes}
      />

      {/* Image Picker */}
      <TouchableOpacity style={[styles.imagePickerButton, { backgroundColor: theme.primary }]} onPress={pickImage}>
        <Text style={styles.buttonText}>Upload Screenshot</Text>
      </TouchableOpacity>

      {screenshot && <Image source={{ uri: screenshot }} style={styles.screenshot} />}

      {/* Submit Request */}
      <TouchableOpacity style={[styles.button, { backgroundColor: theme.primary }]} onPress={() => alert('Request Submitted')}>
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
  datePickerButton: {
    width: '90%',
    padding: 15,
    borderRadius: 15,
    marginBottom: 20,
    alignItems: 'center',
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
