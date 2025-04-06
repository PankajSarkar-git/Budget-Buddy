import * as React from 'react';
import Svg, {Rect} from 'react-native-svg';

function TopBarIcon(props:any) {
  return (
    <Svg
      width={90}
      height={3}
      viewBox="0 0 90 3"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Rect width={90} height={3} rx={1.5} fill="#D9D9D9" />
    </Svg>
  );
}

export default TopBarIcon;
