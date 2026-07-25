import { 
    inject,
    Injector
} from "@angular/core";
import { StSceneService } from "../scene/st-scene.service";


export class StGroupDeferredDepsClass {
    private injector: Injector = inject(Injector);
    
    getStSceneService(): StSceneService 
        {
            let stSceneService: StSceneService = this.injector.get(StSceneService);
    
            return stSceneService;
        }
}
