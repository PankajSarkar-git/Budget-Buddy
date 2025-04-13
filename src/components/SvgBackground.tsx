// SvgBackground.tsx
import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {Dimensions} from 'react-native';

const {width} = Dimensions.get('window');
const height = 98;

export default function SvgBackground({
  bgColor = '#FFFFFF',
  strokeColor = '#000',
}) {
  const tabWidth = width + 2;
  const radius = 40;

  const path = `
    M0,0 
    L${(tabWidth - 400) / 2},0 
    C${(tabWidth - 400) / 2 + 10},0 ${(tabWidth - 300) / 2 + 25},${radius} ${
    tabWidth / 2
  },${radius} 
    C${(tabWidth + 300) / 2 - 25},${radius} ${(tabWidth + 400) / 2 - 10},0 ${
    (tabWidth + 400) / 2
  },0 
    L${tabWidth},0 
    L${tabWidth},${height} 
    L0,${height} 
    Z
  `;

  return (
    <Svg
      width={tabWidth}
      height={height}
      style={{position: 'absolute', bottom: -1, left: -1}}>
      <Path d={path} stroke={strokeColor} fill={bgColor} />
    </Svg>
  );
}
