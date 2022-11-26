import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Formik, useFormik } from "formik";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  TouchableOpacity,
} from "react-native";
import {
  setModalWidth,
  getLoginModalStatus,
  setLoginModalStatus,
  getRegisterModalStatus,
  setRegisterModalStatus,
} from "../../slices/ModalSlice";
import { Button, Colors, TextInput, IconButton } from "react-native-paper";
import * as yup from "yup";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Google from "expo-auth-session/providers/google";

import { GoogleButton } from "../../components/buttons/GoogleButton";
import { FacebookButton } from "../../components/buttons/FacebookButton";
import { AppleButton } from "../../components/buttons/AppleButton";

const LoginModal = () => {
  // Google SSO
  const [accessToken, setAccessToken] = useState();
  const [userInfo, setUserInfo] = useState();
  /*
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId:
      "133962004685-73nu5ro6io492rsp9gp42b9in0i59ua1.apps.googleusercontent.com",
    iosClientId:
      "133962004685-4ggekged7pj7ph3k373pk7rcmm4u3h8p.apps.googleusercontent.com",
    expoClientId:
      "133962004685-98fhg9tjq0pjlt96cjil9onuj7ghboqo.apps.googleusercontent.com",
  });
  */

  /*
  useEffect(() => {
    if (response?.type === "success") {
      //setAccessToken(response.authentication.accessToken);
    }
  }, [response]);
*/
  async function getUserData() {
    let userInfoResponse = await fetch(
      "https://www.googleapis.com/userinfo/v2/me"
    );
    headers: {
      Authorization: `Bearer ${accessToken}`;
    }
  }

  const dispatch = useDispatch();
  const [msgSeverity, setMsgSeverity] = useState("error");
  const [isPasswordSecure, setIsPasswordSecure] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  //const { serverMessage } = useSelector(getServerResponseMessage);
  const isLoginModalOpen = useSelector(getLoginModalStatus);
  const isRegisterModalOpen = useSelector(getRegisterModalStatus);

  // Modal related
  const handleClose = () => {
    dispatch(setLoginModalStatus(false));
    dispatch(setRegisterModalStatus(false));
    //formik.values.loginUsername = "";
    //formik.values.registerEmail = "";
    //formik.values.loginPassword = "";
  };

  const processLogin = (values: { email: string; password: string }) => {
    const { email, password } = {
      email: "sdf@sdf.sdf", //values.email,
      password: "123123", //values.password,
    };
    const source = axios.CancelToken.source();
    const API_URL =
      "https://kiostart-online-authenticate.onrender.com/api/auth/";
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const response = await axios.post(API_URL + "signin", {
          email,
          password,
        });
        if (response.status === 200) {
          setIsLoading(false);
          return;
        } else {
          setMsgSeverity("error");
          throw new Error("Failed to login.");
        }
      } catch (error) {
        if (axios.isCancel(error)) {
          setMsgSeverity("error");
          console.log(error);
        } else {
          setIsLoading(false);
        }
      }
    };
    fetchUsers();
    return () => source.cancel("Data fetching cancelled");
  };

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="none"
        transparent={true}
        visible={isLoginModalOpen}
        onRequestClose={handleClose}
      >
        <TouchableOpacity
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.7)",
          }}
          onPressOut={() => {
            handleClose();
          }}
        >
          <View style={styles.centeredView}>
            <Pressable>
              <View style={styles.modalOuterView}>
                <IconButton
                  icon="close-circle"
                  size={25}
                  style={{ alignSelf: "flex-end" }}
                  onPress={handleClose}
                />
                <View style={styles.modalView}>
                  <Formik
                    validateOnMount={true}
                    validationSchema={yup.object().shape({
                      email: yup
                        .string()
                        .email("Please enter valid email")
                        .required("Email Address is Required"),
                      password: yup
                        .string()
                        .min(
                          3,
                          ({ min }) =>
                            `Password must be at least ${min} characters`
                        )
                        .required("Password is required"),
                    })}
                    initialValues={{ email: "", password: "" }}
                    onSubmit={(values) => {
                      processLogin(values);
                    }}
                  >
                    {({
                      handleChange,
                      handleBlur,
                      handleSubmit,
                      values,
                      errors,
                      touched,
                      isValid,
                    }) => (
                      <>
                        <TextInput
                          placeholder="Email Address"
                          style={styles.textInput}
                          onChangeText={handleChange("email")}
                          onBlur={handleBlur("email")}
                          value={values.email}
                          keyboardType="email-address"
                        />
                        {errors.email && touched.email && (
                          <Text style={styles.errorText}>{errors.email}</Text>
                        )}

                        <TextInput
                          placeholder="Password"
                          style={styles.textInput}
                          onChangeText={handleChange("password")}
                          onBlur={handleBlur("password")}
                          value={values.password}
                          secureTextEntry={isPasswordSecure}
                          right={
                            <TextInput.Icon
                              name={() => (
                                <MaterialCommunityIcons
                                  name={isPasswordSecure ? "eye-off" : "eye"}
                                  size={20}
                                  color={Colors.black}
                                />
                              )} // where <Icon /> is any component from vector-icons or anything else
                              onPress={() => {
                                isPasswordSecure
                                  ? setIsPasswordSecure(false)
                                  : setIsPasswordSecure(true);
                              }}
                            />
                          }
                        />
                        {errors.password && touched.password && (
                          <Text style={styles.errorText}>
                            {errors.password}
                          </Text>
                        )}
                        <Button
                          mode="contained"
                          onPress={handleSubmit}
                          disabled={!isValid || values.email === ""}
                        >
                          Login
                        </Button>
                        <GoogleButton
                          text="Continue with Google"
                          onPress={async () => {}}
                        />
                        <FacebookButton
                          text="Continue with Facebook"
                          onPress={async () => {}}
                        />
                      </>
                    )}
                  </Formik>
                </View>
              </View>
            </Pressable>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalOuterView: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 0,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: 350,
  },
  modalView: {
    padding: 20,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  textInput: {
    width: 200,
    height: 40,
    margin: 10,
    backgroundColor: "white",
    borderColor: "gray",
    borderRadius: 0,
  },
  errorText: {
    fontSize: 13,
    color: "red",
  },
});

export default LoginModal;
