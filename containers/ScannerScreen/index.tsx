import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  Platform,
  PermissionsAndroid,
  Image,
  Alert,
  StyleSheet,
  View,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import {enableScreens} from 'react-native-screens';
import DocumentScanner from 'react-native-document-scanner-plugin';
import {createPdf} from 'react-native-images-to-pdf';
import RNBlobUtil from 'react-native-blob-util';
import theme from '../../themes/theme';
import {PlusLineIcon} from '../../components/IconWrapper';
import {launchImageLibrary} from 'react-native-image-picker';
import {useIsFocused} from '@react-navigation/native';

enableScreens(true);
const ScannerScreen = ({navigation}) => {
  const isFocused = useIsFocused();
  const [imagePaths, setImagePaths] = useState<(string | undefined)[]>([]);
  const [exportLoading, setExportLoading] = useState<boolean>(false);
  const [isScan, setIsScan] = useState<boolean>(isFocused);

  const scanDocument = async () => {
    if (
      Platform.OS === 'android' &&
      (await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
      )) !== PermissionsAndroid.RESULTS.GRANTED
    ) {
      Alert.alert(
        'Error',
        'User must grant camera permissions to use document scanner.',
      );
      return;
    }
    try {
      // start the document scanner
      const {scannedImages} = await DocumentScanner.scanDocument({
        croppedImageQuality: 100,
      });

      // get back an array with scanned image file paths
      if (scannedImages && scannedImages?.length > 0) {
        // set the img src, so we can view the first scanned image
        setImagePaths(scannedImages);
      }
    } catch (error) {
      setIsScan(false);
    }
  };

  const openScan = () => {
    setIsScan(true);
  };

  const openLibrary = async () => {
    try {
      const {assets} = await launchImageLibrary({
        mediaType: 'photo',
        selectionLimit: 2,
      });

      if (assets && assets.length > 0) {
        const filePaths = assets.map(img => img.uri);
        const newImagePaths = imagePaths.concat(filePaths);
        setImagePaths(newImagePaths);
      }
    } catch (error) {
      Alert.alert('Error', 'Load image fail.');
      return;
    }
  };

  const resetValues = () => {
    setImagePaths([]);
  };

  const exportPDF = async () => {
    try {
      if (!imagePaths.length) {
        Alert.alert('Error', 'Please select file.');
        return;
      }
      setExportLoading(true);
      const pages = imagePaths.map(imagePath => {
        return {
          imagePath: imagePath || '',
        };
      });
      await createPdf({
        pages: pages,
        outputPath: `file://${RNBlobUtil.fs.dirs.DocumentDir}/file.pdf`,
      });
      Alert.alert('Success', 'Export PDF successfully.');
    } catch (e) {
      Alert.alert('Error', 'Export PDF fail.');
    } finally {
      setExportLoading(false);
    }
  };

  useEffect(() => {
    if (isScan) {
      scanDocument();
    }
  }, [isScan]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={styles.wrapper}>
          {imagePaths.length > 0 &&
            imagePaths.map((imagePath, index) => (
              <View key={index} style={styles.imageWrapper}>
                <Image
                  source={{uri: imagePath}}
                  style={styles.image}
                  resizeMode="contain"
                />
              </View>
            ))}
          <View style={styles.addImage}>
            <Pressable
              style={styles.addImageButton}
              onPress={() => {
                openLibrary();
              }}>
              <PlusLineIcon
                width={40}
                height={40}
                color={theme.colors.primaryYellow}
              />
            </Pressable>
          </View>
          {imagePaths.length > 0 && (
            <View style={styles.buttonView}>
              <Pressable
                style={styles.exportButton}
                onPress={() => exportPDF()}>
                <Text style={styles.exportButtonText}>
                  <ActivityIndicator
                    animating={exportLoading}
                    size={'small'}
                    color={theme.colors.white}
                  />{' '}
                  Export PDF
                </Text>
              </Pressable>
              <Pressable
                style={styles.resetButton}
                onPress={() => resetValues()}>
                <Text style={styles.resetButtonText}>Reset</Text>
              </Pressable>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ScannerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: theme.colors.white,
  },
  wrapper: {
    width: '100%',
    paddingHorizontal: 10,
    marginTop: 15,
  },
  addImage: {
    width: '100%',
  },
  addImageButton: {
    width: '100%',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderRadius: 10,
    borderColor: theme.colors.primaryYellow,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageWrapper: {
    width: '100%',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: theme.colors.primaryYellow,
    marginVertical: 5,
  },
  image: {
    width: '100%',
    height: 300,
  },
  buttonView: {
    width: '100%',
  },
  resetButton: {
    backgroundColor: theme.colors.white,
    height: 50,
    borderColor: theme.colors.primaryYellow,
    borderWidth: 1,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  exportButton: {
    backgroundColor: theme.colors.primaryYellow,
    height: 50,
    borderColor: theme.colors.primaryYellow,
    borderWidth: 1,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  resetButtonText: {
    color: theme.colors.black,
    fontSize: 18,
    fontWeight: 'bold',
  },
  exportButtonText: {
    color: theme.colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
});
