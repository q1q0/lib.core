export interface RouteNavigator {
    nagivate(screenId: string, insideContainer?: boolean, forceDynamic?: boolean): any;
    destroyRoute(url: string): any;
}
