import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function SignUpScreen() {
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    address: '',
    addressNickname: '',
    city: '',
    state: '',
    zipCode: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    address: '',
    addressNickname: '',
    city: '',
    state: '',
    zipCode: '',
  });

  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateStep1 = () => {
    const newErrors = {
      ...errors,
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    };

    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Invalid email format';
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
      isValid = false;
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const validateStep2 = () => {
    const newErrors = {
      ...errors,
      phone: '',
      address: '',
      addressNickname: '',
      city: '',
      state: '',
      zipCode: '',
    };

    let isValid = true;

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
      isValid = false;
    } else if (formData.phone.length !== 10) {
      newErrors.phone = 'Phone number must be 10 digits';
      isValid = false;
    }

    if (!formData.addressNickname.trim()) {
      newErrors.addressNickname = 'Address nickname is required';
      isValid = false;
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
      isValid = false;
    }

    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
      isValid = false;
    }

    if (!formData.state.trim()) {
      newErrors.state = 'State is required';
      isValid = false;
    }

    if (!formData.zipCode.trim()) {
      newErrors.zipCode = 'ZIP code is required';
      isValid = false;
    } else if (formData.zipCode.length !== 6) {
      newErrors.zipCode = 'ZIP code must be 6 digits';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleNext = () => {
    if (validateStep1()) {
      setStep(2);
    }
  };

  const handleBack = () => {
    setStep(1);
  };

  const handleSignUp = async () => {
    if (validateStep2()) {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 400));
      setIsLoading(false);
      
      Alert.alert(
        "Success! 🎉",
        "Account Created!",
        [
          {
            text: "OK",
            onPress: () => router.push('/(auth)/login'),
          }
        ]
      );
    }
  };

  const renderStep1 = () => (
    <>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Full Name</Text>
        <TextInput
          style={[styles.input, errors.name && styles.inputError]}
          placeholder="Enter your full name"
          value={formData.name}
          onChangeText={(text) => {
            setFormData({ ...formData, name: text });
            if (errors.name) setErrors({ ...errors, name: '' });
          }}
          autoCapitalize="words"
        />
        {errors.name ? <Text style={styles.errorText}>{errors.name}</Text> : null}
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={[styles.input, errors.email && styles.inputError]}
          placeholder="Enter your email"
          value={formData.email}
          onChangeText={(text) => {
            setFormData({ ...formData, email: text });
            if (errors.email) setErrors({ ...errors, email: '' });
          }}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={[styles.passwordInput, errors.password && styles.inputError]}
            placeholder="Enter your password"
            value={formData.password}
            onChangeText={(text) => {
              setFormData({ ...formData, password: text });
              if (errors.password) setErrors({ ...errors, password: '' });
            }}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setShowPassword(!showPassword)}
          >
            <MaterialCommunityIcons
              name={showPassword ? 'eye-off' : 'eye'}
              size={24}
              color="#9C8CF9"
            />
          </TouchableOpacity>
        </View>
        {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Confirm Password</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={[styles.passwordInput, errors.confirmPassword && styles.inputError]}
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChangeText={(text) => {
              setFormData({ ...formData, confirmPassword: text });
              if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: '' });
            }}
            secureTextEntry={!showConfirmPassword}
          />
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            <MaterialCommunityIcons
              name={showConfirmPassword ? 'eye-off' : 'eye'}
              size={24}
              color="#9C8CF9"
            />
          </TouchableOpacity>
        </View>
        {errors.confirmPassword ? <Text style={styles.errorText}>{errors.confirmPassword}</Text> : null}
      </View>

      <TouchableOpacity style={styles.button} onPress={handleNext}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </>
  );

  const renderStep2 = () => (
    <>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Phone Number</Text>
        <TextInput
          style={[styles.input, errors.phone && styles.inputError]}
          placeholder="Enter your phone number"
          value={formData.phone}
          onChangeText={(text) => {
            setFormData({ ...formData, phone: text.replace(/[^0-9]/g, '') });
            if (errors.phone) setErrors({ ...errors, phone: '' });
          }}
          keyboardType="phone-pad"
          maxLength={10}
        />
        {errors.phone ? <Text style={styles.errorText}>{errors.phone}</Text> : null}
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Address Nickname</Text>
        <TextInput
          style={[styles.input, errors.addressNickname && styles.inputError]}
          placeholder="e.g., Home, Office, etc."
          value={formData.addressNickname}
          onChangeText={(text) => {
            setFormData({ ...formData, addressNickname: text });
            if (errors.addressNickname) setErrors({ ...errors, addressNickname: '' });
          }}
          autoCapitalize="words"
        />
        {errors.addressNickname ? <Text style={styles.errorText}>{errors.addressNickname}</Text> : null}
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Street Address</Text>
        <TextInput
          style={[styles.input, errors.address && styles.inputError]}
          placeholder="Enter your street address"
          value={formData.address}
          onChangeText={(text) => {
            setFormData({ ...formData, address: text });
            if (errors.address) setErrors({ ...errors, address: '' });
          }}
        />
        {errors.address ? <Text style={styles.errorText}>{errors.address}</Text> : null}
      </View>

      <View style={styles.row}>
        <View style={[styles.inputContainer, { flex: 1, marginRight: 8 }]}>
          <Text style={styles.label}>City</Text>
          <TextInput
            style={[styles.input, errors.city && styles.inputError]}
            placeholder="City"
            value={formData.city}
            onChangeText={(text) => {
              setFormData({ ...formData, city: text });
              if (errors.city) setErrors({ ...errors, city: '' });
            }}
          />
          {errors.city ? <Text style={styles.errorText}>{errors.city}</Text> : null}
        </View>
        <View style={[styles.inputContainer, { flex: 1, marginLeft: 8 }]}>
          <Text style={styles.label}>State</Text>
          <TextInput
            style={[styles.input, errors.state && styles.inputError]}
            placeholder="State"
            value={formData.state}
            onChangeText={(text) => {
              setFormData({ ...formData, state: text });
              if (errors.state) setErrors({ ...errors, state: '' });
            }}
          />
          {errors.state ? <Text style={styles.errorText}>{errors.state}</Text> : null}
        </View>
      </View>

      <View style={[styles.inputContainer, { width: '50%' }]}>
        <Text style={styles.label}>ZIP Code</Text>
        <TextInput
          style={[styles.input, errors.zipCode && styles.inputError]}
          placeholder="ZIP Code"
          value={formData.zipCode}
          onChangeText={(text) => {
            setFormData({ ...formData, zipCode: text.replace(/[^0-9]/g, '') });
            if (errors.zipCode) setErrors({ ...errors, zipCode: '' });
          }}
          keyboardType="numeric"
          maxLength={6}
        />
        {errors.zipCode ? <Text style={styles.errorText}>{errors.zipCode}</Text> : null}
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.navBackButton} onPress={handleBack}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#9C8CF9" />
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.button, { flex: 1, marginLeft: 12 }, isLoading && styles.buttonDisabled]} 
          onPress={handleSignUp}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" size="small" />
          ) : (
            <Text style={styles.buttonText}>Sign Up</Text>
          )}
        </TouchableOpacity>
      </View>
    </>
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <MaterialCommunityIcons name="arrow-left" size={24} color="#9C8CF9" />
          </TouchableOpacity>
          <Text style={styles.title}>Create Account</Text>
        </View>

        <View style={styles.progressContainer}>
          <View style={[styles.progressDot, { backgroundColor: '#9C8CF9' }]} />
          <View style={[styles.progressLine, { backgroundColor: step === 2 ? '#9C8CF9' : '#E0DFF5' }]} />
          <View style={[styles.progressDot, { backgroundColor: step === 2 ? '#9C8CF9' : '#E0DFF5' }]} />
        </View>

        <Text style={styles.stepTitle}>
          {step === 1 ? 'Personal Information' : 'Address Information'}
        </Text>

        <View style={styles.form}>
          {step === 1 ? renderStep1() : renderStep2()}
        </View>

        <TouchableOpacity
          style={styles.loginLink}
          onPress={() => router.push('/(auth)/login')}
        >
          <Text style={styles.loginText}>
            Already have an account? <Text style={styles.loginTextBold}>Log In</Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F5FF',
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
    paddingTop: 60,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  backButton: {
    padding: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 16,
  },
  form: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#F4F2FE',
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    color: '#333',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#9C8CF9',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    marginTop: 24,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  loginLink: {
    marginTop: 16,
    alignItems: 'center',
  },
  loginText: {
    fontSize: 16,
    color: '#666',
  },
  loginTextBold: {
    color: '#9C8CF9',
    fontWeight: '600',
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  inputError: {
    borderWidth: 1,
    borderColor: '#ff4d4d',
  },
  errorText: {
    color: '#ff4d4d',
    fontSize: 12,
    marginTop: 4,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  progressDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  progressLine: {
    flex: 1,
    height: 2,
    marginHorizontal: 8,
  },
  stepTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 24,
  },
  navBackButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 16,
    backgroundColor: '#F4F2FE',
  },
  backButtonText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '600',
    color: '#9C8CF9',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F4F2FE',
    borderRadius: 12,
  },
  passwordInput: {
    flex: 1,
    padding: 12,
    fontSize: 16,
    color: '#333',
  },
  eyeIcon: {
    padding: 12,
  },
}); 