import React, { useState } from 'react';
import { View, ScrollView, Text, TextInput, Button, StyleSheet, SafeAreaView, StatusBar, Platform, TouchableOpacity, Image } from 'react-native';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { MaterialIcons } from '@expo/vector-icons';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email format').required('Email is required'),
  password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
});

const FormScreen = ({ navigation }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleGoogleSignIn = () => {
    // Handle Google Sign-In here
    console.log('Google Sign-In');
  };

  const handleAppleSignIn = () => {
    // Handle Apple Sign-In here
    console.log('Apple Sign-In');
  };

  const handleSignUp = () => {
    // Navigate to the SignUp screen
    navigation.navigate('SignUpScreen');
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />
        
        <Image source={require('../../../assets/images/Frame18.png')} style={styles.topImage} />

        <Formik
          initialValues={{ name: '', email: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            console.log(values);
            navigation.navigate('AlbumsScreen');
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <View style={styles.formContainer}>
              <Text style={styles.boxTitle}>FULL NAME</Text>
              <TextInput
                style={styles.input}
                placeholder="Name"
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                value={values.name}
              />
              {touched.name && errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
              
              <Text style={styles.boxTitle}>EMAIL</Text>
              <TextInput
                style={styles.input}
                placeholder="Email"
                keyboardType="email-address"
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
              />
              {touched.email && errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
              
              <Text style={styles.boxTitle}>PASSWORD</Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={[styles.passwordInput]}
                  placeholder="Password"
                  secureTextEntry={!passwordVisible}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                />
                <TouchableOpacity
                  style={styles.eyeIcon}
                  onPress={() => setPasswordVisible(!passwordVisible)}
                >
                  <MaterialIcons
                    name={passwordVisible ? 'visibility' : 'visibility-off'}
                    size={24}
                    color="gray"
                  />
                </TouchableOpacity>
              </View>
              {touched.password && errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

              <TouchableOpacity
                onPress={handleSubmit}
                style={styles.signUpButton}
                disabled={!values.name || !values.email || !values.password}>
                <Text style={styles.signUpButtonText}>Sign Up</Text>
              </TouchableOpacity>
              
              <View style={styles.separator}>
                <View style={styles.line} />
                <Text style={styles.separatorText}>Continue with</Text>
                <View style={styles.line} />
              </View>

              <View style={styles.socialButtonsContainer}>
                <TouchableOpacity style={styles.socialButton} onPress={handleAppleSignIn}>
                  <Image source={require('../../../assets/images/apple.png')} style={styles.socialIcon} />
                  <Text style={styles.socialButtonText}>Apple</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialButton} onPress={handleGoogleSignIn}>
                  <Image source={require('../../../assets/images/google.png')} style={styles.socialIcon} />
                  <Text style={styles.socialButtonText}>Google</Text>
                </TouchableOpacity>
              </View>
              
              <Text style={styles.promptText}>
                HAVEN'T AN ACCOUNT?
                <Text style={styles.signUpText} onPress={handleSignUp}> SIGN UP</Text>
              </Text>
            </View>
          )}
        </Formik>
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  topImage: {
    width: '100%',
    height: 160,
    resizeMode: 'contain',
  },
  formContainer: {
    flex: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: '#D9D9D9',
    padding: 15,
    borderRadius: 20,
    backgroundColor: 'white',
    marginBottom: 10,
  },
  passwordContainer: {
    borderColor: '#D9D9D9',
    padding: 15,
    borderRadius: 20,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
  },
  passwordInput: {
    flex: 1,
    marginRight: 10,
  },
  eyeIcon: {},
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  separator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  line: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#A6A6A6',
    backgroundColor: 'gray',
  },
  separatorText: {
    marginHorizontal: 10,
    fontSize: 16,
    fontWeight: '500',
    color: '#A6A6A6',
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  socialButton: {
    backgroundColor: '#e5e5e5',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 15,
    flex: 1,
    marginHorizontal: 5,
    justifyContent: 'center',
  },
  socialIcon: {
    height: 30,
    width: 30,
    resizeMode: 'contain',
    marginRight: 10,
  },
  boxTitle:{
    color: '#A6A6A6',
    fontSize: 16,
    fontWeight: '500',
  },
  socialButtonText: {
    fontSize: 20,
  },
  promptText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 13,
    color: '#A6A6A6',
  },
  signUpText: {
    fontSize: 13,
    color: '#12143D',
  },
  signUpButton: {
    backgroundColor: '#D3F36B',
    padding: 15,
    borderRadius: 20,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signUpButtonText: {
    fontSize: 20,
    fontWeight: '500',
  },
});

export default FormScreen;
