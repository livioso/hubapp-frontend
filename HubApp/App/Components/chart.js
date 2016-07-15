import React, { PropTypes  } from 'react';
import { View, Platform, StyleSheet, Dimensions } from 'react-native';
import { Surface, Shape, Path, Group  } from 'ReactNativeART';
import MetricsPath from 'art/metrics/path';
import { color } from '../Styles/color';
import { Text } from '../Styles/text';

export const ProfileChart = ({ percentage = 0 }) => {
  const backgroundPath = circlePath(radius, radius, radius - width / 2, 0, 360);
  const percentagePath = circlePath(radius, radius, radius - width / 2, 0, 360 * cleanPercentage(percentage) / 100);
  return (
    <View style={{flex: 1}}>
      <Surface width={diameter} height={diameter}>
        <Group rotation={-90} originX={radius} originY={radius}>
          <Shape d={backgroundPath} stroke={backgroundColor} strokeWidth={width}/>
          <Shape d={percentagePath} stroke={percentageColor} strokeWidth={width} strokeCap="butt"/>
        </Group>
      </Surface>
      <View style={styles.wrap}>
        <View style={styles.percentage}>
          <Text style={styles.text}>{percentage}%</Text>
        </View>
      </View>
    </View>
  )
};
  const circlePath = (cx, cy, r, startDegree, endDegree) => {
    const MOVE_TO = 0;
    const ARC = 4;
    const COUNTER_CLOCK_WISE = 1;
    const toRadiant = (degree) => (degree * Math.PI / 180);
    const p = Path();
    p.path.push(MOVE_TO, cx + r, cy);
    p.path.push(ARC, cx, cy, r, toRadiant(startDegree), toRadiant(endDegree), COUNTER_CLOCK_WISE);
    return p;
  }

  const cleanPercentage = (percentage) => {
    return Math.min(100, Math.max(0, percentage));
  }

ProfileChart.propTypes = {
  percentage: PropTypes.number.isRequired,
}
const diameter = Dimensions.get('window').width * 0.4;
const radius = diameter / 2;
const width = diameter/6;
const percentageColor = '4CD862';
const backgroundColor = 'C8C8C8';
const styles = StyleSheet.create({
    percentage: {
      flex: 1,
      flexDirection: 'row',
      backgroundColor: 'transparent',
      alignItems: 'center',
      justifyContent: 'center',
    },
    wrap: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: diameter,
      height: diameter,
      backgroundColor: 'transparent',
    },
    text: {
      textAlign: 'center',
      color: color.light,
      fontSize: diameter / 5.5,
      backgroundColor: "transparent"
    }
})
