import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useAppDispatch, useAppSelector } from "../app/Hooks";
import { decrement, increment } from "../features/counter/Counter";
import { Button } from "react-native-paper";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackParams } from "../common/StackParams";

type Props = NativeStackScreenProps<StackParams, "Home">;

export const HomeScreen = ({ navigation }: Props) => {
  const count = useAppSelector((state) => state.counter.count);
  const dispatch = useAppDispatch();

  const incrementHandler = () => {
    dispatch(increment());
  };
  const decrementHandler = () => {
    dispatch(decrement());
  };

  return (
    <View style={styles.container}>
      <View style={styles.counterView}>
        <Text style={styles.count}>{count}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <View style={styles.button}>
          <Button mode="contained" onPress={decrementHandler}>
            Decrement
          </Button>
        </View>
        <View style={styles.button}>
          <Button mode="contained" onPress={incrementHandler}>
            Increment
          </Button>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  count: {
    fontSize: 20,
  },
  counterView: {
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  button: {
    marginHorizontal: 10,
    marginTop: 20,
  },
});
