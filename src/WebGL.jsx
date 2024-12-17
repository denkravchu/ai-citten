import { OrbitControls } from "@react-three/drei"
import { Canvas } from "@react-three/fiber";
import { Model } from "./Toon_cat";

function WebGL() {

  return (
    <Canvas
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
        camera={{ position: [-5, 5, 10], fov: 45 }}
        style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%'
        }}
    >
        <OrbitControls enablePan={false} enableZoom={false} makeDefault/>
        <pointLight position={[0, 0, 10]} intensity={100}/>
        <ambientLight intensity={2}/>
        <Model/>
    </Canvas>
  )
}

export default WebGL;