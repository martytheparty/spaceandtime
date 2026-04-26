import { 
    inject,
    Injector
} from "@angular/core";

import { StMeshService } from '../mesh/st-mesh.service';

/**
 * Centralizes the ST ANIMATION deferred dependency resolutions.
 *
 * This pattern is intentionally used in scenarios where constructor-based
 * injection is not practical (e.g., circular dependencies or runtime-only
 * access). Use sparingly and prefer standard DI when possible because a side
 * effect of using standard DI is creating the Service.
 */


export class StAnimationDeferredDepsClass {

        private injector: Injector = inject(Injector);
    
        getStMeshService(): StMeshService 
        {
            return this.injector.get(StMeshService);
        }
}
