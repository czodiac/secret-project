import React, { useState, useEffect, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { Formik, useFormik } from "formik";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import {
  getLoginModalStatus,
  setLoginModalStatus,
  getRegisterModalStatus,
  setRegisterModalStatus,
} from "../slices/modalSlice";
import {
  Button,
  Colors,
  TextInput,
  IconButton,
  Divider,
} from "react-native-paper";
import * as yup from "yup";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { GoogleButton } from "../components/buttons/GoogleButton";
import { useAuth } from "../app/useAuth";
import {
  loginAsync,
  getAuthErrMessage,
  getAuthIsLoading,
  setAuthErrMessage,
} from "../slices/authSlice";

const LoginModal = () => {
  const { googleAuth } = useAuth();
  const isLoading = useAppSelector(getAuthIsLoading);
  const authErrorMsg = useAppSelector(getAuthErrMessage);
  const dispatch = useAppDispatch();
  const [msgSeverity, setMsgSeverity] = useState("error");
  const [isPasswordSecure, setIsPasswordSecure] = useState(true);
  //const { serverMessage } = useSelector(getServerResponseMessage);
  const isLoginModalOpen = useAppSelector(getLoginModalStatus);
  const isRegisterModalOpen = useAppSelector(getRegisterModalStatus);

  // Modal related
  const handleClose = () => {
    dispatch(setLoginModalStatus(false));
    dispatch(setRegisterModalStatus(false));
    dispatch(setAuthErrMessage(""));
  };

  const processLogin = (values: { email: string; password: string }) => {
    dispatch(loginAsync(values));
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
                  {authErrorMsg != "" ? (
                    <View style={styles.errorView}>{authErrorMsg}</View>
                  ) : (
                    ""
                  )}
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
                          loading={isLoading}
                          disabled={
                            !isValid || values.email === "" || isLoading
                          }
                        >
                          Login
                        </Button>
                        <Divider />
                        <GoogleButton
                          text="Continue with Google"
                          onPress={async () => await googleAuth()}
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
  errorView: {
    borderRadius: 4,
    border: "1px #ecd8d8 solid",
    paddingTop: 7,
    paddingBottom: 15,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: "rgb(253, 237, 237)",
    color: "rgb(95, 33, 32)",
    fontWeight: 400,
    height: 35,
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
