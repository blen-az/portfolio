import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MenuOption } from 'react-native-popup-menu';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

const CustomMenuItem = ({ text, action, value, icon }) => {
  return (
    <MenuOption onSelect={action} value={value}>
      <View style={styles.container}>
        {icon}
        <Text>{text}</Text>
      </View>
    </MenuOption>
  );
};

export default CustomMenuItem; // Make sure this is exported correctly

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: wp(3),
  },
});
