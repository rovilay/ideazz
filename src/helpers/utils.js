import * as Font from 'expo-font';
import { AsyncStorage } from 'react-native';
import jwtDecode from 'jwt-decode';

import { 
    loginScreenName, signupScreenName, homeScreenName,
    jwtKey, unProtectedScreens, ideasScreenName, ideaFeedsScreenName,
} from './defaults';
import * as NavigationService from '../services/NavigationService';

export const fontLoader = () => {
    return Font.loadAsync({
        'vince': require('../../assets/fonts/vinchand.ttf'),
    });
}

export const handleNavigation = (screenName, params = {}) => {
   NavigationService.navigate(screenName, params);
}

export const isExpired = (expiredTimeInSec) => {
    if (expiredTimeInSec) {
      const now = new Date();
      const nowInSec = Math.floor(now.getTime() * 0.001); // Convert date to sec
      return nowInSec > expiredTimeInSec;
    }
  };
  
  export default isExpired;

export const getAuthPageAttributes = (routeName) => {
    let pageTitle = "log in";
    let currentAuth = loginScreenName;
    let otherAuth = signupScreenName;
    let promptMsg = "don't have an account? Sign up";

    if (routeName === signupScreenName) {
        pageTitle = "sign up";
        currentAuth = signupScreenName;
        otherAuth = loginScreenName;
        promptMsg = "already have an account? Log in"
    }

    return { pageTitle, currentAuth, otherAuth, promptMsg };
}

export const getUserDetails = async (tokn)  => {
    const token = tokn || await AsyncStorage.getItem(jwtKey);
    const userData = token ? jwtDecode(token) : null;
    const isAuthenticated = userData && !isExpired(userData.exp) ? true : false;

    if (tokn && isAuthenticated) {
        await AsyncStorage.setItem(jwtKey, tokn);
    }

    const data = {
        isAuthenticated,
        user: userData
    };

    return data;
};

export const authenticateScreen = async (navigationProp) => {
    const { routeName } = navigationProp.state;
    const token = await AsyncStorage.getItem(jwtKey);
    const userData = token ? jwtDecode(token) : null;
    const expiredUser = userData && isExpired(userData.exp);
    if ((!userData  || expiredUser) && 
        !unProtectedScreens.includes(routeName)
    ) {
        await AsyncStorage.removeItem(jwtKey);
        NavigationService.navigate(loginScreenName, { view: 'ideas' });
    } else if (unProtectedScreens.includes(routeName) &&
        userData && !expiredUser &&
        routeName !== ideaFeedsScreenName
    ) {
        NavigationService.navigate(ideaFeedsScreenName, { view: 'feeds' });
    }
}

export const getInitialRouteName = async () => {
    const userData = await getUserDetails();
    const expiredUser = userData && isExpired(userData.exp);

    if (!userData  || expiredUser) {
        return homeScreenName;
    } else {
        return ideasScreenName;
    }
}

export function apiErrorHandler(error) {
    let errorMessage;
    let validationErrors;
    // if server gets an error response, handle it
    if (error.response) {
        /**
         * using a switch statement instead of if/else because there is
         * a chance that we have to handle other error codes when we make
         * requests like GET to the server
         */
        switch (error.response.status) {
            case 500:
                errorMessage = 'Server error, try again';
                break;
            case 422:
                validationErrors = error.response.data.errors
                    .map(error => error.msg || error.message)
                    .join(', ');
                errorMessage = `${validationErrors}`;
                break;
            default:
                errorMessage = error.response.data.error || error.response.data.message;
        }
    } else {
        //  if server is down, client won't get a response
        errorMessage = 'Possible network error, please check your connection and try again';
    }
    return errorMessage;
}
