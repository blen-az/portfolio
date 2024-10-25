import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, useColorScheme, Image, ScrollView, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { lightTheme, darkTheme } from './Theme';
import { SafeAreaView } from 'react-native-safe-area-context';

const BookingScreen = ({ navigation }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [paymentType, setPaymentType] = useState('SAT');
  const [notes, setNotes] = useState('');
  const [amount, setAmount] = useState('');
  const [screenshot, setScreenshot] = useState(null);
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const scheme = useColorScheme();
  const theme = lightTheme;

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


  const handleSubmit = () => {
    if (!firstName.trim() || !lastName.trim() || !amount.trim()) {
      Alert.alert('Error', 'Please fill in all required fields (First Name, Last Name, and Amount).');

    }else{
      alert('Booking Scheduled');
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={[styles.title, { color: theme.text }]}>Schedule a Payment Booking</Text>

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
        <Text style={{ color: theme.text, marginBottom: 20 }}>Selected payment type: {paymentType}</Text>

        <TextInput
          style={[styles.input, { backgroundColor: theme.secondary, color: theme.text }]}
          placeholder="Amount"
          placeholderTextColor={theme.text}
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
        />

        <TouchableOpacity style={[styles.datePickerButton, { backgroundColor: theme.primary }]} onPress={() => setShowDatePicker(true)}>
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
        <Text style={{ color: theme.text, marginBottom: 20 }}>Selected Date: {date.toDateString()}</Text>

        <TextInput
          style={[styles.notesInput, { backgroundColor: theme.secondary, color: theme.text }]}
          placeholder="Additional Notes (Optional)"
          placeholderTextColor={theme.text}
          value={notes}
          onChangeText={setNotes}
          multiline={true}
        />

        <TouchableOpacity style={[styles.imagePickerButton, { backgroundColor: theme.primary }]} onPress={pickImage}>
          <Text style={styles.buttonText}>Upload Screenshot (Optional)</Text>
        </TouchableOpacity>

        {screenshot && <Image source={{ uri: screenshot }} style={styles.screenshot} />}

        <TouchableOpacity style={[styles.button, { backgroundColor: theme.primary }]} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit Booking</Text>
        </TouchableOpacity>
      </ScrollView>
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
});

export default BookingScreen;
