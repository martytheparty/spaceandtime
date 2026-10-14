import { effect, inject, Service } from '@angular/core';
import { NgVizComponentDictionary } from '../../../interfaces/base/dictionary/base-dicts';
import { StVisualization, StVizComponent } from '../../../interfaces/st';
import { RecyclableSequenceService } from '../../utilities/general/recyclable-sequence-service.service';
import { StPublisherService } from '../st/publish/st-publisher.service';

@Service()
export class NgVizComponentService {
    // This is intented to be a bridge between angular and ST
    private ngVizComponentDict: NgVizComponentDictionary = {};

    stPublisherService: StPublisherService = inject(StPublisherService);
    recyclableSequenceService: RecyclableSequenceService = inject(RecyclableSequenceService);


    constructor() {
        effect( () => {
            // 📞 listening for new visualization created
            this.associateNgVizToStVisualization(this.stPublisherService.newStVisualizationCreated());
        } )
    }

    associateNgVizToStVisualization(visualization: StVisualization | undefined): void {
        if (visualization) {
            this.ngVizComponentDict[visualization.stVizComponentId].stVisualizationId = visualization.stVisualizationId;
        }
    }

    // create NgVizComponents
    createNgVizComponent(stVizComponentId: number, stVisualizationId: number ): StVizComponent
    {
        const ngVizComponent: StVizComponent = { 
          type: 'st-viz-component',
          stVizComponentId: stVizComponentId,
          stVisualizationId: stVisualizationId
        };

        this.ngVizComponentDict[stVizComponentId] = ngVizComponent;

        this.recyclableSequenceService.associateStObjectToId(stVizComponentId, ngVizComponent);

        return ngVizComponent
    }

    deleteNgVizComponent(stVizComponentId: number): boolean
    {
        const deleted = delete this.ngVizComponentDict[stVizComponentId];
        this.recyclableSequenceService.recycleId(stVizComponentId);
        
        return deleted;
    }  
}
