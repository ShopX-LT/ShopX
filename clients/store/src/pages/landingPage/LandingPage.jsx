import React, { useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import './styles.css';
import axios from 'axios';
import StarsAnimated from './components/StarsAnimated';
import Main from './Main';

const LandingPage = () => {
  useEffect(() => {
    try {
      axios.get('https://myshopx.net/api/newvisit');
    } catch (error) {}
  }, []);
  const bgColor = ({ gl }) => {
    gl.setClearColor('#1c1c1c', 1);
  };
  return (
    <>
      <Canvas id="canvas" style={{ position: 'fixed' }} camera={{ position: [20, 3, 5], fov: 25 }} onCreated={bgColor}>
        <pointLight intensity={2} color={0x61dbfb} position={[0, 5, 5]} />
        <spotLight intensity={1} color={0x61dbfb} position={(-20, 50, 10)} />
        <OrbitControls />
        <StarsAnimated />
      </Canvas>
      <Main />
    </>
  );
};

export default LandingPage;
