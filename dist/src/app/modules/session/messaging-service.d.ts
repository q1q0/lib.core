import { MessageListener } from "./message-listener";
export interface MessageService {
    subscribe(topic: string, listener: MessageListener): any;
    unsubscribe(topic: string, listener: MessageListener): any;
    setFreezePushService(freeze: boolean): any;
}
