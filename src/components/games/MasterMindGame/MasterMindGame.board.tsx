import React, { createRef, useRef, useState } from 'react';
import { BoxBufferGeometry, Color, Group, Mesh, MeshBasicMaterial, MeshStandardMaterial } from "three";
import { Canvas, MeshProps, useFrame } from '@react-three/fiber'

const backgroundColor = "#F1E3CE";
const materials = {
  default: new MeshBasicMaterial({color: '#464646'}),
  rr: new MeshBasicMaterial({color: '#DCDCDC'}),
  rw: new MeshBasicMaterial({color: '#8C8C8C'}),
  ww: new MeshBasicMaterial({color: '#464646'})
};

const Box: React.FC<MeshProps> = (props) => {
  // This reference gives us direct access to the THREE.Mesh object
  const ref = createRef<Mesh>()
  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false)
  const [clicked, click] = useState(false)
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => (ref.current!!.rotation.x += 0.01))
  // Return the view, these are regular Threejs elements expressed in JSX
  return (
      <mesh
          {...props}
          ref={ref}
          scale={clicked ? 1.5 : 1}
          onClick={(event) => click(!clicked)}
          onPointerOver={(event) => hover(true)}
          onPointerOut={(event) => hover(false)}>
        <boxGeometry args={[1, 1, 1]}/>
        <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'}/>
      </mesh>
  )
}

const MasterMindGameBoard = () => {

  const group = new Group();
  const geo = new BoxBufferGeometry(2, 2, 2);
  const mat = new MeshStandardMaterial({color: 0x1fbeca});
  const mesh = new Mesh(geo, mat);
  group.position.set(0, 0.1, 0.1);
  group.add(mesh);

  const color = new Color(backgroundColor);


  return <Canvas>
    <ambientLight/>
    <group position={[0, 0.1, 0.1]}>
      <mesh>
        <boxBufferGeometry attach="geometry" args={[0.047, 0.5, 0.29]}/>
        <meshStandardMaterial attach="material" color={0xf95b3c}/>
      </mesh>
    </group>
    <Box position={[-1.2, 0, 0]}/>
    <Box position={[1.2, 0, 0]}/>
  </Canvas>;
};

export default MasterMindGameBoard;
