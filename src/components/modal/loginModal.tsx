import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Formik, useFormik } from "formik";
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";
import {
  setModalWidth,
  getLoginModalStatus,
  setLoginModalStatus,
  getRegisterModalStatus,
  setRegisterModalStatus,
} from "../../slices/modalSlice";
import { Button, Colors, TextInput } from "react-native-paper";
import * as yup from "yup";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { red200 } from "react-native-paper/lib/typescript/styles/colors";

const LoginModal = () => {
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

  const login = (values) => {
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

  const loginValidationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Please enter valid email")
      .required("Email Address is Required"),
    password: yup
      .string()
      .min(8, ({ min }) => `Password must be at least ${min} characters`)
      .required("Password is required"),
  });

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="none"
        transparent={true}
        visible={isLoginModalOpen}
        onRequestClose={() => {
          handleClose();
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Button onPress={handleClose}>Close</Button>
            <Formik
              validateOnMount={true}
              validationSchema={loginValidationSchema}
              initialValues={{ email: "", password: "" }}
              onSubmit={(values) => login(values)}
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
                    name="email"
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
                    name="password"
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
                    <Text style={styles.errorText}>{errors.password}</Text>
                  )}

                  <Button
                    onPress={handleSubmit}
                    disabled={!isValid || values.email === ""}
                  >
                    Login
                  </Button>
                </>
              )}
            </Formik>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
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
