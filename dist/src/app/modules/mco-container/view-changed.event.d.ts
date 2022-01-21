import { ViewComponent } from "../view/view.component";
export interface ViewChangedEvent {
    views: Array<ViewComponent>;
    activeView: ViewComponent;
    minMaxEvent?: boolean;
    isModalActive?: boolean;
}
