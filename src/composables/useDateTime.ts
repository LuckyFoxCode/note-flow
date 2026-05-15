import { onMounted, onUnmounted, ref } from 'vue';

export function useDateTime() {
  const currentTime = ref('');
  let timer: ReturnType<typeof setInterval>;

  const updateTime = () => {
    const now = new Date();

    const datePart = Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(now);

    const dateTime = Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    }).format(now);

    currentTime.value = `${datePart}, ${dateTime}`;
  };

  onMounted(() => {
    updateTime();

    timer = setInterval(updateTime, 60000);
  });
  onUnmounted(() => {
    if (timer) clearInterval(timer);
  });

  return { currentTime };
}
