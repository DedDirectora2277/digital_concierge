import { ref } from 'vue';
import {showMessage} from "src/utils/showMessage.js";

import { WEBSOCKET_MESSAGES } from "src/constants/webSocketConsts.js";

export function useWebSocket(url, options = {}) {
  const socket = ref(null);
  const connected = ref(false);
  const connecting = ref(false);
  const error = ref(null);
  const streamFrame = ref(null);

  const connect = () => {
    if (connected.value) return;

    connecting.value = true;
    const wsUrl = typeof url === 'string' ? url : url.value;
    socket.value = new WebSocket(wsUrl);

    socket.value.onopen = () => {
      connected.value = true;
      connecting.value = false;
      //socket.value.send(WEBSOCKET_MESSAGES.READY);
    };

    socket.value.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data?.frame?.startsWith('data:image')) {
          streamFrame.value = data.frame;
        }
        options.onMessage?.(data);
      } catch (e) {
        console.error('Error parsing message:', e);
      }
    };

    socket.value.onerror = (err) => {
      error.value = err;
      connecting.value = false;
      showMessage("Ошибка!", "Ошибка получения данных с Камеры!");
      options.onError?.(err);
    };

    socket.value.onclose = () => {
      connected.value = false;
      connecting.value = false;
    };
  };

  const disconnect = () => {
    if (socket.value) {
      socket.value.send(WEBSOCKET_MESSAGES.DISCONNECT);
      socket.value.close();
      socket.value = null;
    }
  };

  return {
    connect,
    disconnect,
    connected,
    connecting,
    error,
    imageData: streamFrame,
  };
}
