import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';

export default function Index() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      router.replace('/login');
    }
  }, [mounted]);

  // Exibe algo enquanto monta (pode ser <></> ou um loading)
  return null;
}
