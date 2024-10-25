import { View, Text, StyleSheet, Image, StatusBar, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, ScrollView, ActivityIndicator } from 'react-native';
import React, { useRef, useState } from 'react';
import { Octicons } from '@expo/vector-icons'; // Import Octicons
import { useRouter } from 'expo-router'; // Import useRouter for navigation
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useAuth } from '../context/authContext'; // Ensure correct path to AuthContext
import { doc, setDoc } from 'firebase/firestore'; // Import Firestore functions
import { db } from '../firebaseConfig'; // Ensure correct import for Firestore instance

export default function SignUp() {
    const router = useRouter(); // Initialize router
    const { register } = useAuth(); // Get register function from AuthContext

    const [loading, setLoading] = useState(false); // Add loading state

    const usernameRef = useRef("");
    const emailRef = useRef("");
    const passwordRef = useRef("");
    const profilePictureRef = useRef(""); // New ref for profile picture URL

    const handleSignUp = async () => {
        const username = usernameRef.current.trim();
        const email = emailRef.current.trim();
        const password = passwordRef.current;
        const profilePicture = profilePictureRef.current.trim(); // Get the profile picture URL

        if (!username || !email || !password || !profilePicture) {
            Alert.alert('Sign Up', "Please fill all the fields!");
            return;
        }

        setLoading(true); // Set loading to true when sign-up starts

        try {
            // Call the register function from your AuthContext
            const response = await register(email, password, username, profilePicture);

            if (!response.success) {
                Alert.alert('Sign Up', response.msg);
            } else {
                // Get the user ID from the response
                const userId = response.userId; 
                
                // Create a document in the Firestore 'users' collection
                await setDoc(doc(db, 'users', userId), {
                    username,
                    email,
                    profilePicture, // Store the provided profile picture URL
                    createdAt: new Date() // Optional: record the creation time
                });

                Alert.alert('Sign Up', 'Account created successfully!');
                router.push('/home'); // Navigate to the home page after successful sign-up
            }
        } catch (error) {
            console.error("Error during sign up: ", error);
            Alert.alert('Sign Up Error', 'An error occurred. Please try again.');
        } finally {
            setLoading(false); // Set loading to false when sign-up finishes
        }
    };

    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <StatusBar style="dark" />
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.innerContainer}>
                    {/* Image */}
                    <View style={styles.imageContainer}>
                        <Image
                            style={styles.image}
                            resizeMode='contain'
                            source={require('../assets/images/signup.jpeg')} // Ensure you have this image
                        />
                    </View>

                    <View style={styles.textContainer}>
                        <Text style={styles.text}>Sign Up</Text>
                        {/* Inputs */}
                        <View style={{ gap: hp(2) }}>
                            <View style={styles.inputContainer}>
                                <Octicons name="person" size={hp(2.7)} color="gray" />
                                <TextInput
                                    onChangeText={(value) => usernameRef.current = value}
                                    style={styles.textInput}
                                    placeholder='Username'
                                    placeholderTextColor={'gray'}
                                />
                            </View>
                            <View style={styles.inputContainer}>
                                <Octicons name="mail" size={hp(2.7)} color="gray" />
                                <TextInput
                                    onChangeText={(value) => emailRef.current = value}
                                    style={styles.textInput}
                                    placeholder='Email Address'
                                    placeholderTextColor={'gray'}
                                />
                            </View>
                            <View style={styles.inputContainer}>
                                <Octicons name="lock" size={hp(2.7)} color="gray" />
                                <TextInput
                                    onChangeText={(value) => passwordRef.current = value}
                                    style={styles.textInput}
                                    placeholder='Password'
                                    placeholderTextColor={'gray'}
                                    secureTextEntry
                                />
                            </View>
                            <View style={styles.inputContainer}>
                                <Octicons name="link" size={hp(2.7)} color="gray" />
                                <TextInput
                                    onChangeText={(value) => profilePictureRef.current = value}
                                    style={styles.textInput}
                                    placeholder='Profile Picture URL'
                                    placeholderTextColor={'gray'}
                                />
                            </View>
                        </View>

                        {/* Sign Up Button */}
                        <TouchableOpacity onPress={handleSignUp} style={styles.button} disabled={loading}>
                            {loading ? (
                                <ActivityIndicator size="small" color="#FFFFFF" />
                            ) : (
                                <Text style={styles.buttonText}>Sign Up</Text>
                            )}
                        </TouchableOpacity>

                        {/* Sign In Link */}
                        <TouchableOpacity onPress={() => router.push('signIn')}>
                            <Text style={styles.signInText}>
                                Already have an account?{' '}
                                <Text style={styles.signInLink}>Sign In</Text>
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
    },
    innerContainer: {
        flex: 1,
        gap: 12,
        paddingTop: hp(8),
        paddingHorizontal: wp(5),
    },
    imageContainer: {
        alignItems: 'center',
    },
    image: {
        height: hp(25),
    },
    textContainer: {
        paddingVertical: 10,
    },
    text: {
        fontSize: hp(4),
        textAlign: 'center',
        fontWeight: 'bold',
        letterSpacing: 1,
        color: '#2D3748',
    },
    inputContainer: {
        height: hp(4),
        flexDirection: 'row',
        paddingHorizontal: wp(4),
        backgroundColor: '#F7FAFC',
        alignItems: 'center',
        borderRadius: 16,
    },
    textInput: {
        flex: 1,
        fontSize: hp(2),
        fontWeight: '600',
        color: '#4A5568',
        marginLeft: wp(2),
    },
    button: {
        marginTop: hp(3),
        backgroundColor: '#3182CE', // Blue color for the button
        paddingVertical: hp(1.5),
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: hp(2),
        fontWeight: 'bold',
    },
    signInText: {
        marginTop: hp(2),
        textAlign: 'center',
        color: '#4A5568', // Neutral color for the text
    },
    signInLink: {
        color: '#3182CE', // Blue color for the link
        fontWeight: 'bold',
    },
});
