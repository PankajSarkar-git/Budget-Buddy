import * as React from 'react';
import Svg, {G, Ellipse, Defs} from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: filter */

function LoginBgIcon(props: any) {
  return (
    <Svg
      width={237}
      height={830}
      viewBox="0 0 237 830"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <G filter="url(#filter0_d_309_19)">
        <Ellipse
          cx={268.5}
          cy={409}
          rx={264.5}
          ry={413}
          fill="#A48EE5"
          fillOpacity={0.14}
          //shapeRendering="crispEdges"
        />
      </G>
      <Defs></Defs>
    </Svg>
  );
}

export default LoginBgIcon;
