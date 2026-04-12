import { 
    inject,
    Injector
} from "@angular/core";
import { StSceneService } from "../scene/st-scene.service";


/**
 * Centralizes deferred dependency resolution.
 *
 * This pattern is intentionally used in scenarios where constructor-based
 * injection is not practical (e.g., circular dependencies or runtime-only
 * access). Use sparingly and prefer standard DI when possible because a side
 * effect of using standard DI is creating the Service.
 */

export class StMeshDeferredDepsClass {

    private injector: Injector = inject(Injector);

    getStSceneService(): StSceneService 
    {
        return this.injector.get(StSceneService);
    }
}
