import { MessageListener } from "./message-listener";

export interface MessageService {
    subscribe(topic: string, listener: MessageListener);
    unsubscribe(topic: string, listener: MessageListener);
    setFreezePushService(freeze: boolean);
}