import "react-native-gesture-handler";
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import AppNavigator from "./src/navigation/AppNavigator";
import SplashScreen from "./src/screens/SplashScreen";
import OnboardingScreen from "./src/screens/OnboardingScreen";
import AuthScreen from "./src/screens/AuthScreen";
import SignUpScreen from "./src/screens/SignUpScreen";

export default function App() {
  const [stage, setStage] = useState("splash");

  const handleSplashFinish = () => setStage("onboarding");
  const handleOnboardingFinish = () => setStage("auth");
  const handleAuthBack = () => setStage("onboarding");
  const handleAuthContinue = () => setStage("app");
  const handleSignup = () => setStage("signup");
  const handleSignupBack = () => setStage("auth");
  const handleSignupComplete = () => setStage("app");

  let content = null;
  switch (stage) {
    case "splash":
      content = <SplashScreen onFinish={handleSplashFinish} />;
      break;
    case "onboarding":
      content = (
        <OnboardingScreen
          onSkip={handleOnboardingFinish}
          onDone={handleOnboardingFinish}
        />
      );
      break;
    case "auth":
      content = (
        <AuthScreen
          onContinue={handleAuthContinue}
          onBack={handleAuthBack}
          onSignup={handleSignup}
        />
      );
      break;
    case "signup":
      content = (
        <SignUpScreen
          onBack={handleSignupBack}
          onComplete={handleSignupComplete}
        />
      );
      break;
    default:
      content = (
        <>
          <AppNavigator />
          <StatusBar style="dark" />
        </>
      );
  }

  return <GestureHandlerRootView style={{ flex: 1 }}>{content}</GestureHandlerRootView>;
}
