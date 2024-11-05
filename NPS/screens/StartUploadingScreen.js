import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Progress from 'react-native-progress';
import { lightTheme } from './Theme';

const StartUploadingScreen = ({ navigation }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        const newProgress = Math.min(prevProgress + 0.17, 1); // Increase by 5%
        
        if (Math.round(newProgress * 100) !== Math.round(prevProgress * 100)) {
          console.log(`Progress: ${Math.round(newProgress * 100)}%`);
        }
        
        if (newProgress >= 0.99) { // Stop when very close to 1
          clearInterval(interval);
          return 1; // Set to exactly 1 to show 100%
        }
        
        return newProgress;
      });
    }, 300); // Update every 300 ms for smoother progress

    return () => clearInterval(interval);
  }, []);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: lightTheme.background }]}>
      <Image source={require('../assets/logo1.webp')} style={styles.logo} />
      <Text style={styles.title}>SurePay</Text>

      <View style={styles.progressContainer}>
        <Progress.Bar
          progress={progress}
          width={null}
          color={lightTheme.primary}
          height={15} 
          borderRadius={10} 
          borderWidth={2} 
          borderColor={lightTheme.primary}
          unfilledColor="#d3d3d3" 
          style={styles.progressBar}
        />
      </View>

      <Text style={styles.progressText}>{Math.round(progress * 100)}%</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: lightTheme.text,
    marginBottom: 20,
  },
  progressContainer: {
    width: '100%',
    marginVertical: 20,
  },
  progressText: {
    fontSize: 16,
    color: lightTheme.text,
    marginBottom: 20,
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default StartUploadingScreen;
