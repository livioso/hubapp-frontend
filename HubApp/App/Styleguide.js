/* @flow weak */
/* eslint-disable no-alert, no-console, max-len */
import React from 'react';
import ReactNative from 'react-native';
import { Button, SquareButton } from './Styles/button';
import { color } from './Styles/color';
import { Text, HeaderText } from './Styles/text';

const {
  View,
  ScrollView,
  StyleSheet
} = ReactNative;

export const Styleguide = () => {
  return (
    <ScrollView>
      <View style={styles.container}>
        <HeaderText style={styles.sectionHeader}>Living Styleguide</HeaderText>

        <Text style={styles.sectionHeader}>Fonts</Text>

        <Text style={styles.sectionHeader}>Colors</Text>
        <View style={[styles.colorContainer, { backgroundColor: color.red }] }>
          <Text style={styles.colorDescription}>#99b149</Text>
        </View>
        <View style={[styles.colorContainer, { backgroundColor: color.green }] }>
          <Text style={styles.colorDescription}>#e46648</Text>
        </View>
        <View style={[styles.colorContainer, { backgroundColor: color.blue }] }>
          <Text style={styles.colorDescription}>#198caa</Text>
        </View>
        <View style={[styles.colorContainer, { backgroundColor: color.dark }] }>
          <Text style={styles.colorDescription}>#000000</Text>
        </View>
        <View style={[styles.colorContainer, { borderWidth: 1, backgroundColor: color.white }] }>
          <Text>#fffff</Text>
        </View>

        <Text style={styles.sectionHeader}>Buttons</Text>
        <Button style={{ backgroundColor: color.red }} onPress={() => alert('🚀')}>Button</Button>
        <Button style={{ backgroundColor: color.green }} onPress={() => alert('🚀')}>Button</Button>
        <Button style={{ backgroundColor: color.blue }} onPress={() => alert('🚀')}>Button</Button>
        <SquareButton style={{ backgroundColor: color.red }} onPress={() => alert('🚀')}>Button</SquareButton>
        <SquareButton style={{ backgroundColor: color.green }} onPress={() => alert('🚀')}>Button</SquareButton>
        <SquareButton style={{ backgroundColor: color.blue }} onPress={() => alert('🚀')}>Button</SquareButton>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 60,
    paddingBottom: 100,
    alignItems: 'center',
    backgroundColor: 'white'
  },
  sectionHeader: {
    paddingBottom: 30,
    paddingTop: 30
  },
  colorContainer: {
    width: 240,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center'
  },
  colorDescription: {
    color: color.light
  }
});
