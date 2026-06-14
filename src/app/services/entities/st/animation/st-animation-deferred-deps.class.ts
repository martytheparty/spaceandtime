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
        errorCount = 0;
    
        getStMeshService(): StMeshService | undefined
        {
            // try catch
            let ms = undefined;
            try {
                ms = this.injector.get(StMeshService);
            } catch(error){
                if (this.errorCount === 0)
                {
                    this.errorCount++;
                    console.log("Attempted to access the injector after it was gone - StAnimationDefferedClass");
                }
            }
            
            return ms;
        }
}
