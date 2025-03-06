import { Stack } from 'expo-router';
import { Text } from 'react-native';
import { Redirect } from 'expo-router';

import { useSession } from '../../ctx';

export default function AppLayout() {
  const { session, isLoading } = useSession();

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (!session) {
    // Redirigir al usuario a la pantalla de inicio de sesión
    return <Redirect href="/sign-in" />;
  }

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="todo" options={{ title: "Mis Tareas" }} />
    </Stack>
  );
}