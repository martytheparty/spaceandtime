import { 
    inject,
    Injector
} from "@angular/core";
import { StSceneService } from "../scene/st-scene.service";
import { StGroupService } from "../group/st-group.service";


/**
 * Centralizes the ST MESH deferred dependency resolutions.
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

    getStGroupService(): StGroupService {
        return this.injector.get(StGroupService);
    }
}
