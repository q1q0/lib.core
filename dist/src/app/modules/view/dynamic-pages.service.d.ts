import { ViewContainerRef, ComponentFactoryResolver, Type } from '@angular/core';
import { ViewComponent } from './view.component';
import { SessionService } from '../session/session.service';
/**
 * Class for managing dynamic views
 */
export declare class DynamicPagesService {
    private viewFactory;
    private sessionService;
    private viewContainer;
    private dynamicViewsMap;
    static onCreateViewCloser: (sessionService: SessionService, viewType: Type<ViewComponent>, routeId: string) => void;
    /**
     *
     * @param viewFactory
     */
    constructor(viewFactory: ComponentFactoryResolver, sessionService: SessionService);
    /**
     * Set the [[viewContainer]] property to reference a [[ViewContainer]]
     * @param viewContainer
     */
    registerViewContainer(viewContainer: ViewContainerRef): void;
    /**
     * Create a new [[ViewComponent]] instance
     * @param viewType
     * @param routeId
     */
    createDynamicView(viewType: Type<ViewComponent>, routeId?: string): Promise<ViewComponent>;
    /**
     * Destroy [[ViewComponent]] instance reference
     * @param viewToRemove
     * @param immediate
     */
    removeView(viewToRemove: ViewComponent, immediate: boolean): void;
}
