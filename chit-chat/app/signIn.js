import { View, Text, StyleSheet, Image, StatusBar, TextInput, TouchableOpacity, Alert } from 'react-native';
import React, { useRef, useState } from 'react';
import { Octicons } from '@expo/vector-icons'; // <-- Import Octicons here
import { useRouter } from 'expo-router'; // <-- Import useRouter for navigation
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function SignIn() {
    const router = useRouter(); // Initialize router
    const[loading, setLoading] = useState(false);

    const emailRef = useRef("");
    const passwordRef = useRef("");

    const handlelogin = async ()=>{
        if(!emailRef.current || !passwordRef.current){
            Alert.alert('Sign In', "please fill all the fields!");
        }
    }

    return (
        <View style={styles.container}>
            <StatusBar style="dark" />
            <View style={styles.innerContainer}>
                {/* image */}
                <View style={styles.imageContainer}>
                    <Image
                        style={styles.image}
                        resizeMode='contain'
                        source={require('../assets/images/login.png')}
                    />
                </View>

                <View style={styles.textContainer}>
                    <Text style={styles.text}>Sign In</Text>
                    {/* inputs */}
                    <View style={{ gap: hp(2) }}>
                        <View style={styles.mail}>
                            <Octicons name="mail" size={hp(2.7)} color="gray" />
                            <TextInput
                                onChange={value=> passwordRef.current=value}
                                style={styles.textInput}
                                placeholder='Email Address'
                                placeholderTextColor={'gray'}
                            />
                        </View>
                        <View style={styles.mail}>
                            <Octicons name="lock" size={hp(2.7)} color="gray" />
                            <TextInput
                                onChange={value=> emailRef.current=value}
                                style={styles.textInput}
                                placeholder='Password'
                                placeholderTextColor={'gray'}
                                secureTextEntry
                            />
                        </View>
                    </View>

                    {/* Forgot Password */}
                    <TouchableOpacity>
                        <Text style={styles.forgotPassword}>Forgot Password?</Text>
                    </TouchableOpacity>

                    {/* Sign In Button */}
                    
                    <TouchableOpacity onPress={handlelogin} style={styles.button}>
                        <Text style={styles.buttonText}>Sign In</Text>
                    </TouchableOpacity>

                    {/* Sign Up Link */}
                    <TouchableOpacity onPress={() => router.push('signUp')}>
                        <Text style={styles.signUpText}>
                            Don't have an account?{' '}
                            <Text style={styles.signUpLink}>Sign Up</Text>
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    mail: {
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
    forgotPassword: {
        textAlign: 'right',
        color: '#3182CE', // Blue color for the link
        marginTop: hp(1),
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
    signUpText: {
        marginTop: hp(2),
        textAlign: 'center',
        color: '#4A5568', // Neutral color for the text
    },
    signUpLink: {
        color: '#3182CE', // Blue color for the link
        fontWeight: 'bold',
    },
});
