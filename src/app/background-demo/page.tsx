import Background from '../../components/Background';

export default function BackgroundDemo() {
  return (
    <div className="min-h-screen">
      <Background>
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Background Component Demo</h1>
            <p className="text-xl">This is the default white-blue gradient background</p>
          </div>
        </div>
      </Background>
    </div>
  );
} 