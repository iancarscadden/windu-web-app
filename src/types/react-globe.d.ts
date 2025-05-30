declare module 'react-globe.gl' {
  interface GlobeProps {
    globeImageUrl?: string;
    bumpImageUrl?: string;
    backgroundImageUrl?: string;
    pointsData?: any[];
    pointAltitude?: number | string | ((d: any) => number);
    pointColor?: string | ((d: any) => string | undefined);
    pointRadius?: number | string | ((d: any) => number | undefined);
    pointsMerge?: boolean;
    atmosphereColor?: string;
    atmosphereAltitude?: number;
    onGlobeReady?: () => void;
    width?: number;
    height?: number;
    autoRotate?: boolean;
    autoRotateSpeed?: number;
    customThreeObject?: (d: any) => THREE.Object3D | null | undefined;
    customThreeObjectRotation?: (d: any) => [number, number, number] | undefined;
  }

  export default function Globe(props: GlobeProps): JSX.Element;
} 