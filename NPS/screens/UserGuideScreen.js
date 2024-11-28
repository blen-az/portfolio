import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { lightTheme } from './Theme';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { doc, setDoc } from '@firebase/firestore';
import { db } from '../firebase';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../context/AuthContext';

const theme = lightTheme;

const guideSteps = [
  {
    key: 'makeRequest',
    icon: 'payment',
    title: 'Make a Request',
    description: 'Submit a payment request by entering your details, selecting a payment type, picking a time.',
  },
  {
    key: 'scheduleBooking',
    icon: 'schedule',
    title: 'Schedule a Payment',
    description: 'Schedule a payment-related booking by entering your details, selecting a payment type, picking a date.',
  },
  {
    key: 'chat',
    icon: 'chat',
    title: 'Chat',
    description: 'Tap here to communicate with support. This feature is ideal for quick assistance.',
  },
  {
    key: 'information',
    icon: 'info',
    title: 'Information',
    description: 'Access important information about the app and its features. Use this button for guidance and FAQs.',
  },
];

const UserGuideScreen = () => {
  const { user, setUser } = useContext(AuthContext);
  const [currentStep, setCurrentStep] = useState(0);
  const navigation = useNavigation();

  const markGuideAsSeen = async () => {
    try {
      if (!user || !user.uid) {
        throw new Error('User ID not found');
      }

      const userId = user?.uid;          
      await setDoc(doc(db, 'users', userId), { hasSeenGuide: true }, { merge: true });
      
      setUser((prev) => ({ ...prev, hasSeenGuide: true }));      
    } catch (error) {
      console.error('Failed to mark guide as seen:', error);
    }
  };

  const handleNext = () => {
    if (currentStep < guideSteps.length) {
      setCurrentStep(currentStep + 1);
    } else {
      markGuideAsSeen();
    }
  };  

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={require('../assets/New BG.png')} style={styles.backgroundImage}>
        {/* Welcome Step - Full Screen */}
        {currentStep === 0 && (
          <ImageBackground source={require('../assets/WelcomeBG.jpg')} style={styles.welcomeContainer}>
            <Text style={styles.welcomeTitle}>Welcome to SurePay App!</Text>
            <Text style={styles.welcomeDescription}>
              This guide will take you through the key features and functions of the app.
            </Text>
            <TouchableOpacity style={styles.startButton} onPress={handleNext}>
              <Text style={styles.startButtonText}>Start Guide</Text>
            </TouchableOpacity>
          </ImageBackground>
        )}


        {/* Guide Steps */}
        {currentStep > 0 && currentStep <= guideSteps.length && (
          <View style={styles.middleSection}>
            <View style={styles.header}>
              <Text style={styles.headerTitle}>Step {currentStep} of {guideSteps.length}</Text>
            </View>

            <View style={styles.buttonsContainer}>
            {/* First Row */}
            <View style={styles.buttonRow}>
              {guideSteps.slice(0, 2).map((step, index) => {
                const isCurrent = currentStep === index + 1;
                const nonActiveColor = '#71060c'; // Non-active color for all steps
                return (
                  <View key={step.key} style={[styles.buttonContainer, isCurrent && styles.activeButton]}>
                    <TouchableOpacity style={styles.button}>
                      <Icon name={step.icon} size={55} color={isCurrent ? '#71060c' : nonActiveColor} />
                      <Text style={[styles.buttonText, { color: isCurrent ? '#71060c' : nonActiveColor }]}>
                        {step.title}
                      </Text>
                    </TouchableOpacity>
                    {isCurrent && <Text style={styles.descriptionText}>{step.description}</Text>}
                  </View>
                );
              })}
            </View>

            {/* Second Row */}
            <View style={styles.buttonRow}>
              {guideSteps.slice(2, 4).map((step, index) => {
                const isCurrent = currentStep === index + 3;
                const nonActiveColor = '#71060c'; // Non-active color for all steps
                return (
                  <View key={step.key} style={[styles.buttonContainer, isCurrent && styles.activeButton]}>
                    <TouchableOpacity style={styles.button}>
                      <Icon name={step.icon} size={55} color={isCurrent ? '#71060c' : nonActiveColor} />
                      <Text style={[styles.buttonText, { color: isCurrent ? '#71060c' : nonActiveColor }]}>
                        {step.title}
                      </Text>
                    </TouchableOpacity>
                    {isCurrent && (
                      <View style={styles.descriptionContainer}>
                        <Text style={styles.descriptionText}>{step.description}</Text>
                      </View>
                    )}
                  </View>
                );
              })}
            </View>

            </View>
          </View>
        )}

        {/* Navigation Buttons */}
        {currentStep > 0 && currentStep <= guideSteps.length && (
          <View style={styles.navigation}>
            <TouchableOpacity
              onPress={handlePrevious}
              disabled={currentStep === 1}
              style={[styles.navButton, currentStep === 1 && styles.disabledButton]}
            >
              <Text style={styles.navButtonText}>Previous</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleNext}
              style={styles.navButton}
            >
              <Text style={styles.navButtonText}>
                {currentStep === guideSteps.length ? 'Done' : 'Next'}
              </Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={[styles.footer, { backgroundColor: theme.background }]}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Home')}
          disabled={currentStep >= 0 && currentStep <= guideSteps.length} // Disable during guide steps
          style={[styles.footerItem, currentStep > 0 && currentStep <= guideSteps.length && styles.disabledButton]}>
          <Icon name="home" size={34} color={currentStep > 0 && currentStep <= guideSteps.length ? '#71060c' : theme.text} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('Request')}
          disabled={currentStep >= 0 && currentStep <= guideSteps.length} // Disable during guide steps
          style={[styles.footerItem, currentStep > 0 && currentStep <= guideSteps.length && styles.disabledButton]}>
          <Icon name="payment" size={34} color={currentStep > 0 && currentStep <= guideSteps.length ? '#71060c' : theme.text} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('Booking')}
          disabled={currentStep >= 0 && currentStep <= guideSteps.length} // Disable during guide steps
          style={[styles.footerItem, currentStep > 0 && currentStep <= guideSteps.length && styles.disabledButton]}>
          <Icon name="schedule" size={34} color={currentStep > 0 && currentStep <= guideSteps.length ? '#71060c' : theme.text} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('Profile')}
          disabled={currentStep >= 0 && currentStep <= guideSteps.length} // Disable during guide steps
          style={[styles.footerItem, currentStep > 0 && currentStep <= guideSteps.length && styles.disabledButton]}>
          <Icon name="person" size={34} color={currentStep > 0 && currentStep <= guideSteps.length ? '#71060c' : theme.text} />
        </TouchableOpacity>

        </View>

      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'space-between',
  },
  welcomeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#71060c',
  },
  welcomeDescription: {
    fontSize: 18,
    color: '#71060c',
    textAlign: 'center',
    marginVertical: 20,
    paddingHorizontal: 30, 
  },
  startButton: {
    backgroundColor: '#71060c',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  startButtonText: {
    color: '#e5e5dd',
    fontWeight: 'bold',
    fontSize: 16,
  },
  middleSection: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
    paddingHorizontal: 20,
  },  
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 75,
  },
  buttonsContainer: {
    flex: 1,
    justifyContent: 'space-evenly',
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginHorizontal: 10,
    marginTop: 80,
  },
  activeButton: {
    marginBottom: 30,
  },
  disabledButton: {    
    opacity: 0.5,
  },  
  button: {
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 15,
    marginTop: 5,
    fontWeight: '500',
    textAlign: 'center',
  },
  descriptionText: {    
    fontSize: 14,
    textAlign: 'center',
    color: '#71060c',
    lineHeight: 20,
  },
  descriptionContainer: {
    marginTop: 15,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 30,
    marginBottom: 20,
  },
  navButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#71060c',
    borderRadius: 5,
  },
  navButtonText: {
    color: '#e5e5dd',
    fontSize: 16,
  },
  disabledButton: {
    backgroundColor: '#e5e5dd',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingBottom: 15,
  },
  footerItem: {
    alignItems: 'center',
  },
});

export default UserGuideScreen;