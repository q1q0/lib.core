export interface MessageListener {
    onMessage(topic: string, data: any): any;
}
