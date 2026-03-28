import { 
    inject,
    Injector
} from "@angular/core";
import { StRendererService } from "../renderer/st-renderer.service";

/**
 * Centralizes deferred dependency resolution.
 *
 * This pattern is intentionally used in scenarios where constructor-based
 * injection is not practical (e.g., circular dependencies or runtime-only
 * access). Use sparingly and prefer standard DI when possible because a side
 * effect of using standard DI is creating the Service.
 */

export class StSceneDeferredDepsClass {

    private injector: Injector = inject(Injector);

    getStRendererService(): StRendererService 
    {
        let stRendererService: StRendererService = this.injector.get(StRendererService);

        if (stRendererService === null) { // If the service has not been created then create it.
            stRendererService = inject(StRendererService);
        }

        return stRendererService;

    }
}
