import React, {useEffect, useState} from 'react';
import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {enableScreens} from 'react-native-screens';
import theme from '../../themes/theme';

enableScreens(true);
const ProfileScreen = () => {
  const [name, setName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [address, setAddress] = useState<string>();
  const [avatar, setAvatar] = useState<string>();
  const [phoneNumber, setPhoneNumber] = useState<string>();

  const handleSubmit = () => {};

  useEffect(() => {
    const profile = {
      name: 'Jane Doe',
      email: 'jane.doe@example.com',
      phoneNumber: '0399812700',
      address: 'Software engineer and cat lover',
      avatar: 'https://www.bootdey.com/img/Content/avatar/avatar3.png',
    };
    setAvatar(profile.avatar);
    setEmail(profile.email);
    setAddress(profile.address);
    setName(profile.name);
    setPhoneNumber(profile.phoneNumber);
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={styles.wrapper}>
          <View style={styles.avatarContainer}>
            <Image
              style={styles.avatar}
              source={{
                uri: avatar,
              }}
            />
            <TouchableOpacity
              style={styles.changeAvatarButton}
              onPress={() => {
                /* open image picker */
              }}>
              <Text style={styles.changeAvatarButtonText}>Change Avatar</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.inputView}>
            <Text style={styles.label}>Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Name"
              value={name}
              onChangeText={setName}
            />
          </View>
          <View style={styles.inputView}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Email"
              value={email}
              onChangeText={setEmail}
            />
          </View>
          <View style={styles.inputView}>
            <Text style={styles.label}>Phone number</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Your Phone Number"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
            />
          </View>
          <View style={styles.inputView}>
            <Text style={styles.label}>Address</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Address"
              value={address}
              onChangeText={setAddress}
            />
          </View>
          <View style={styles.buttonView}>
            <Pressable style={styles.button} onPress={() => handleSubmit()}>
              <Text style={styles.buttonText}>SAVE</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: theme.colors.white,
  },
  wrapper: {
    width: '100%',
  },
  avatarContainer: {
    height: 200,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    height: 100,
    width: 100,
    borderRadius: 100,
  },
  changeAvatarButton: {
    marginVertical: 10,
  },
  changeAvatarButtonText: {
    color: theme.colors.blue,
  },
  inputView: {
    gap: 5,
    width: '100%',
    paddingHorizontal: 40,
    marginBottom: 15,
  },
  label: {
    color: theme.colors.primaryBlue,
  },
  input: {
    height: 50,
    paddingHorizontal: 20,
    borderColor: theme.colors.primaryBlue,
    backgroundColor: theme.colors.white,
    borderWidth: 1,
    borderRadius: 10,
  },
  button: {
    backgroundColor: theme.colors.primaryYellow,
    height: 50,
    borderColor: theme.colors.primaryYellow,
    borderWidth: 1,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonView: {
    width: '100%',
    paddingHorizontal: 40,
    marginTop: 15,
  },
});
