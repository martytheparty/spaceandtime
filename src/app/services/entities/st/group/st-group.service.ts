import { 
    inject,
    Service
} from '@angular/core';

import * as THREE from 'three';

import { StGroupDictionary } from '../../../../interfaces/base/dictionary/base-dicts';
import { RecyclableSequenceService } from '../../../utilities/general/recyclable-sequence-service.service';
import { MeshService } from '../../three/native/mesh/mesh.service';
import { GroupService } from '../../three/native/group/group.service';
import { StAnimationService } from '../animation/st-animation.service';
import { StMeshService } from '../mesh/st-mesh.service';
import { StGroup } from '../../../../interfaces/st';
import { StGroupDeferredDepsClass } from './st-group-deferred-deps.class';
import { StSceneService } from '../scene/st-scene.service';

@Service()
export class StGroupService {
    private stGroupDict: StGroupDictionary = {};

    // must defer loading
    //private stSceneService: StSceneService = inject(StSceneService);
    private stGroupDeferredDepsClass: StGroupDeferredDepsClass = new StGroupDeferredDepsClass(); 


    // utilities services
    private recyclableSequenceService: RecyclableSequenceService = inject(RecyclableSequenceService);
    
    // three services
    private groupService: GroupService = inject(GroupService);
    private threeMeshService: MeshService = inject(MeshService);

    private stAnimationService: StAnimationService = inject(StAnimationService);

    // st services
    private stMeshService: StMeshService = inject(StMeshService);

    // 🐣 Base GROUP
    createBaseGroup(): number
    {
        const stGroupId = this.recyclableSequenceService.generateStId();

        const stGroup: StGroup = {
            type: 'st-group',
            stGroupId,
            stPosition: {stX: 0, stY: 0, stZ: 0},
            stRotation: {stX: 0, stY: 0, stZ: 0},
            stAnimationIds: [],
            stMeshIds: [],
        };

        this.groupService.createGroup(stGroupId);

        const baseMeshId: number = this.stMeshService.createBaseMesh();
        stGroup.stMeshIds.push(baseMeshId);
        
        const threeMesh: THREE.Mesh = this.threeMeshService.getMeshByStMeshId(baseMeshId);
        
        if (threeMesh) {
              const mesh: THREE.Mesh = threeMesh;
        
              // 3️⃣ writes to ThreeJS
              this.groupService.addMeshToGroup(stGroupId, mesh);
            }
        

        this.stGroupDict[stGroupId] = stGroup;
        this.recyclableSequenceService.associateStObjectToId(stGroupId, stGroup)

        return stGroupId;
    }

    getStGroupById(stId: number): StGroup
    {
        const group: StGroup = this.stGroupDict[stId];

        return group;
    }

    deleteGroupForSceneId(stGroupId: number, stSceneId: number): boolean
    {
        let shouldDelete = false;
        // q1. who needs to be checked in with before a delete?
        // a1. st scene service


        const stSceneService: StSceneService = this.stGroupDeferredDepsClass.getStSceneService();
        const allSceneIds = stSceneService.getScenesForGroupId(stGroupId);

        // get a list 📋 of scenes using this groupId and if there are other than the passed in scene
        const otherScenes = allSceneIds.filter( (stSceneIdValue: number) => stSceneIdValue !== stSceneId );
        
        // then don't delete.... otherwise ❔ attempt to delete 💥 the children and delete & recycle both.
        shouldDelete = !this.hasOtherScenes(otherScenes);

        if (shouldDelete) {
            this.deleteGroup(stGroupId);
        }

        return shouldDelete;
    }

    deleteGroup(
        stGroupId: number
    ): boolean
    {
        let deleted = true;

        // delete associated meshes
        const currentStGroup: StGroup = this.stGroupDict[stGroupId];
        currentStGroup.stMeshIds.forEach(
            (stMeshId: number) => {
                this.stMeshService.deleteMeshForGroupId(stMeshId, stGroupId);
            }
        );

        // 1) Remove the Group From The Dictionary
        delete this.stGroupDict[stGroupId];
        // 2) Delete the Three Scene
        this.groupService.deleteGroupByStGroupId(stGroupId);
        // 3) Recycle the SceneId
        this.recyclableSequenceService.recycleId(stGroupId);
        this.recyclableSequenceService.logSequenceDictionary();

        return deleted;
    }

    getGroupsForMeshId(stMeshId: number): number[] {
        const stGroups: number[] = [];

        const allStGroups: StGroup[] = Object.values(this.stGroupDict);

        allStGroups.forEach(
            (stGroup: StGroup) => {
                const stMeshes: number[] = stGroup.stMeshIds;
                const meshIdWasFound = stMeshes.find( (stTestMeshId: number) => { return stTestMeshId === stMeshId; });
                if( meshIdWasFound )
                {
                    stGroups.push(stGroup.stGroupId);
                }
             }
        );

        return stGroups;
    }

    hasOtherScenes(sceneIds: number[]): boolean {
        return sceneIds.length > 0; 
    }

}
