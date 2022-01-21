export interface RouteNavigator {
  nagivate(screenId: string, insideContainer?: boolean, forceDynamic?: boolean);
  destroyRoute(url: string);
}
