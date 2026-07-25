import * as THREE from 'three'; 

import {
    inject,
    signal,
    Service,
    WritableSignal
} from '@angular/core';
import { HashService } from '../../../../utilities/general/hash.service';
import { ThreeGroupDictionary } from '../../../../../interfaces/base/dictionary/base-dicts';

@Service()
export class GroupService {
    hashService: HashService = inject(HashService);
    private threeGroupDict: ThreeGroupDictionary = {};
    publicGroupDictionary: WritableSignal<ThreeGroupDictionary> = signal<ThreeGroupDictionary>(this.threeGroupDict);
    // dictionary hash
    publicGroupDictionaryHash: WritableSignal<string> = signal<string>("");

    createGroup(
        id: number 
    ): number
    {
        this.threeGroupDict[id] = new THREE.Group();
        this.publishGroupDictionary();
        return id;
    }

    getGroupByStGroupId(stGroupId: number): THREE.Group
    {
        const threeGroup: THREE.Group = this.threeGroupDict[stGroupId];
        return threeGroup;
    }

    deleteGroupByStGroupId(stGroupId: number): boolean {
        const deleteResult = delete this.threeGroupDict[stGroupId];
        this.publishGroupDictionary();
        return deleteResult;
    }

    publishGroupDictionary(): boolean
    {
        const dictionaryJSON = JSON.stringify(this.threeGroupDict);
        let dictionaryHash: string = "";
        const hashPromise = this.hashService.getHashString(dictionaryJSON);
        this.publicGroupDictionary.set(this.threeGroupDict);

        hashPromise.then( (result: string) => {
        dictionaryHash = result;

        // publish new hash value
        this.publicGroupDictionaryHash.set(dictionaryHash);
        } );

        return true;
    }

    addMeshToGroup(stGroupId: number, mesh: THREE.Mesh): number
    {
        const group: THREE.Group = this.getGroupByStGroupId(stGroupId);

        group.add(mesh);

        this.publishGroupDictionary();

        return stGroupId;
    }
}
