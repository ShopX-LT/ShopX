import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import '../../styles.css';
import StarsAnimated from '../StarsAnimated';

const SpaceBackground = () => {
  const canvasStyle = { position: 'fixed' };
  const cameraConfig = { position: [20, 3, 5], fov: 25 };
  const spotLightConfig = { intensity: 1, color: 0x61dbfb, position: (-20, 50, 10) };
  const pointLightConfig = { intensity: 2, color: 0x61dbfb, position: [0, 5, 5] };

  const bgColor = ({ gl }) => {
    gl.setClearColor('#1c1c1c', 1);
  };

  return (
    <Canvas id="canvas" style={canvasStyle} camera={cameraConfig} onCreated={bgColor}>
      <pointLight
        intensity={pointLightConfig.intensity}
        color={pointLightConfig.color}
        position={pointLightConfig.position}
      />
      <spotLight
        intensity={spotLightConfig.intensity}
        color={spotLightConfig.color}
        position={spotLightConfig.position}
      />
      <OrbitControls />
      <StarsAnimated />
    </Canvas>
  );
};

export default SpaceBackground;
