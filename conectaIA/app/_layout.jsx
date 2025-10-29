import { Slot } from 'expo-router';

export default function RootLayout() {
  return (
    <>
      {/* Pode ter seus headers ou outros componentes */}
      <Slot />
      {/* Pode ter footer aqui */}
    </>
  );
}
