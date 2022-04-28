import "react-native-gesture-handler";
import React, { useState, useEffect, useMemo } from "react";
import { Asset } from "expo-asset";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import { Root } from "native-base";
import { LogBox, StatusBar } from "react-native";
import AppPreLoader from "./application/components/AppPreLoader";
import firebaseConfig from "./application/utils/Firebase";
import * as firebase from "firebase";
firebase.initializeApp(firebaseConfig);
import { RootSiblingParent } from "react-native-root-siblings";
import { NavigationContainer } from "@react-navigation/native";
import GuestNavigation from "./application/navigations/Guest";
import LoggedNavigation from "./application/navigations/Navigation";

LogBox.ignoreLogs([
  "VirtualizedLists should never be nested inside plain ScrollViews with the same orientation because it can break windowing and other functionality - use another VirtualizedList-backed container instead.",
  "Setting a timer for a long period of time, i.e. multiple minutes, is a performance and correctness issue on Android as it keeps the timer module awake, and timers can only be called when the app is in the foreground. See https://github.com/facebook/react-native/issues/12981 for more info.",
]);

const cacheImages = (images) => {
  return images.map((image) => {
    if (typeof image === "string") {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
};

const loadAssetsAsync = async () => {
  const imageAssets = cacheImages([
    require("./assets/images/header.jpg"),
    require("./assets/images/logo.png"),
    require("./assets/images/logo_dark.png"),
    require("./assets/images/emptylist.png"),
    require("./assets/images/chef.png"),
    require("./assets/images/nointernet.png"),
    require("./assets/images/contact.png"),
    require("./assets/images/servings.png"),
    require("./assets/images/calories.png"),
    require("./assets/images/checked.png"),
    require("./assets/images/cooktime.png"),
    require("./assets/images/thumb.png"),
  ]);

  await Promise.all([...imageAssets]);
};

const App = () => {
  const [isLogged, setIsLogged] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    async function checkUser() {
      await firebase.auth().onAuthStateChanged((user) => {
        if (user !== null) {
          setIsLogged(true);
          setLoaded(true);
        } else {
          setIsLogged(false);
          setLoaded(true);
        }
      });
    }

    checkUser();
  }, []);

  if (!isReady) {
    return (
      <AppLoading
        startAsync={loadAssetsAsync}
        onFinish={() => setIsReady(true)}
        onError={console.warn}
      />
    );
  }

  if (!loaded) {
    return <AppPreLoader />;
  }

  if (loaded && isReady) {
    return (
      <Root>
        <RootSiblingParent>
          <StatusBar />
          <NavigationContainer>
            {isLogged ? <LoggedNavigation /> : <GuestNavigation />}
          </NavigationContainer>
        </RootSiblingParent>
      </Root>
    );
  }
};

export default App;
