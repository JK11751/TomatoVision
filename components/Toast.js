import Toast from "react-native-toast-message";

export const showToast = (type, text) => {
  Toast.show({
    type: type, 
    text1: text,
    visibilityTime: 4000, 
  });
};
