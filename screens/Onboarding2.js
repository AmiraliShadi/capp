import React, { useState, useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PageContainer from '../components/PageContainer';
import DotsView from '../components/DotsView';
import Button from '../components/Button';
import Onboarding1Styles from '../styles/OnboardingStyles';
import { COLORS, images } from '../constants';
import { useTheme } from '../theme/ThemeProvider';

const Onboarding2 = ({ navigation }) => {
  const [progress, setProgress] = useState(0);
  const { colors } = useTheme()

  useEffect(() => {
    const intervalId = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 1) {
          clearInterval(intervalId);
          return prevProgress;
        }
        return prevProgress + 0.5;
      });
    }, 2000);

    return () => clearInterval(intervalId);
  }, []);

   // useffect for navigation
  useEffect(() => {
    if (progress >= 1) {
      // navigate to the Onboarding3 Screen
      navigation.navigate('Onboarding3');
    }
  }, [progress, navigation]);

  return (
    <SafeAreaView style={[Onboarding1Styles.container, {
      backgroundColor: colors.background
    }]}>
      <PageContainer>
        <View style={Onboarding1Styles.contentContainer}>
          <Image
            source={images.barber2}
            resizeMode="contain"
            style={Onboarding1Styles.illustration}
          />
          <Image
            source={images.ornament}
            resizeMode='contain'
            style={Onboarding1Styles.ornament}
          />
          <View style={Onboarding1Styles.buttonContainer}>
            <View style={Onboarding1Styles.titleContainer}>
              <Text style={[Onboarding1Styles.title, { color: colors.text }]}>سهولت و کاربری آسان در </Text>
              <Text style={Onboarding1Styles.subTitle}>کالکو</Text>
            </View>

            <Text style={[Onboarding1Styles.description, { color: colors.text }]}>
            در هرکجا و هرزمانی، با چند کلیک ساده خدمات خود را دریافت کنید.
            </Text>

            <View style={Onboarding1Styles.dotsContainer}>
              {progress < 1 && <DotsView progress={progress} numDots={4} />}
            </View>
            <Button
              title="بعدی"
              filled
              onPress={() => navigation.navigate('Onboarding2')}
              style={Onboarding1Styles.nextButton}
            />
            <Button
              title="رد کردن"
              onPress={() => navigation.navigate('Login')}
              textColor={COLORS.primary}
              style={Onboarding1Styles.skipButton}
            />
          </View>
        </View>
      </PageContainer>
    </SafeAreaView>
  );
};

export default Onboarding2;