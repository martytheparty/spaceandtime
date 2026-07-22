import {
  effect,
  inject,
  Component,
  ChangeDetectionStrategy
} from '@angular/core';
import { THREE_NATIVE_CATEGORIES } from '../../../../../services/entities/three/native/constants';
import { CommonModule } from '@angular/common';
import { ThreeDictionaryTypes } from '../../../../../interfaces/base/dictionary/base-dicts';
import { 
  MatTableDataSource,
  MatTableModule
} from '@angular/material/table';
import { CameraService } from '../../../../../services/entities/three/native/camera/camera.service';
import { GeometryService } from '../../../../../services/entities/three/native/geometry/geometry.service';
import { MaterialService } from '../../../../../services/entities/three/native/material/material.service';
import { MeshService } from '../../../../../services/entities/three/native/mesh/mesh.service';
import { RendererService } from '../../../../../services/entities/three/native/renderer/renderer.service';
import { SceneService } from '../../../../../services/entities/three/native/scene/scene.service';
import { GroupService } from '../../../../../services/entities/three/native/group/group.service';

@Component({
  selector: 'app-three-table',
  imports: [
    CommonModule,
    MatTableModule
],
  templateUrl: './three-table.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './three-table.component.scss',
})
export class ThreeTableComponent {
  threeCameraService: CameraService = inject(CameraService);
  threeGeometryService: GeometryService = inject(GeometryService);
  threeMaterialService: MaterialService = inject(MaterialService);
  threeMeshService: MeshService = inject(MeshService);
  threeRendererService: RendererService = inject(RendererService);
  threeSceneService: SceneService = inject(SceneService);
  threeGroupService: GroupService = inject(GroupService);

  readonly categoriesWithDictionaries = THREE_NATIVE_CATEGORIES;
  threeTableColumns: string[] = ["threeType", "count", "json"];
  dataSource: MatTableDataSource<ThreeTableRecord> = new MatTableDataSource();
  expandedRows: { [key: string]: boolean } = {};


  // general setup
  constructor() {
    effect(() => {
      // 📞#️⃣ this.threeCameraService.publicCameraDictionaryHash()
      // 📞 this.threeCameraService.publicCameraDictionary()

      // 📞#️⃣ this.threeGeometryService.publicGeometryDictionaryHash()
      // 📞 this.threeGeometryService.publicGeometryDictionary()

      // 📞#️⃣ this.threeMaterialService.publicMaterialDictionaryHash()
      // 📞 this.threeMaterialService.publicMaterialDictionary()

      // 📞#️⃣ this.threeMeshService.publicMeshDictionaryHash()
      // 📞 this.threeMeshService.publicMeshDictionary()

      // 📞#️⃣ this.threeRendererService.publicRendererDictionaryHash();
      // 📞 this.threeRendererService.publicRendererDictionary()

      // 📞#️⃣ this.threeSceneService.publicSceneDictionaryHash();
      // 📞 this.threeSceneService.publicSceneDictionary()

      // 📞#️⃣ this.threeGroupService.publicGroupDictionaryHash();
      // 📞 this.threeGroupService.publicGroupDictionary()

      // 📞📞📞📞📞📞 - watch for changes
      this.threeCameraService.publicCameraDictionaryHash();
      this.threeGeometryService.publicGeometryDictionaryHash();
      this.threeMaterialService.publicMaterialDictionaryHash();
      this.threeMeshService.publicMeshDictionaryHash();
      this.threeRendererService.publicRendererDictionaryHash();
      this.threeSceneService.publicSceneDictionaryHash();
      this.threeGroupService.publicGroupDictionaryHash();

      // 📊 get raw data
      const threeCameraDictionary = this.threeCameraService.publicCameraDictionary();
      const threeGeometryDictionary = this.threeGeometryService.publicGeometryDictionary();
      const threeMaterialDictionary = this.threeMaterialService.publicMaterialDictionary();
      const threeMeshDictionary = this.threeMeshService.publicMeshDictionary();
      const threeRendererDictionary = this.threeRendererService.publicRendererDictionary();
      const threeSceneDictionary = this.threeSceneService.publicSceneDictionary();
      const threeGroupDictionary = this.threeGroupService.publicGroupDictionary();

      // 🚣 get table rows
      const cameraRow: ThreeTableRecord = this.tableRowtransform('camera', threeCameraDictionary);
      const geometryRow: ThreeTableRecord = this.tableRowtransform('geometry', threeGeometryDictionary);
      const materialRow: ThreeTableRecord = this.tableRowtransform('material', threeMaterialDictionary);
      const meshRow: ThreeTableRecord = this.tableRowtransform('mesh', threeMeshDictionary);
      const rendererRow: ThreeTableRecord = this.tableRowtransform('renderer', threeRendererDictionary);
      const sceneRow: ThreeTableRecord = this.tableRowtransform('scene', threeSceneDictionary);
      const groupRow: ThreeTableRecord = this.tableRowtransform('group', threeGroupDictionary);

      // Assign raw data to the data source for the table
      this.dataSource.data = [ 
        rendererRow,
        cameraRow,
        sceneRow,
        groupRow,
        meshRow,
        geometryRow,
        materialRow,
      ];

      console.log("Three Camera Dictionary", threeCameraDictionary, this.dataSource.data);
    });

  }

  // data management/mutation
  tableRowtransform(threeType: string, threeDictionary: ThreeDictionaryTypes): ThreeTableRecord {

    const json: string = JSON.stringify(threeDictionary, null, 2);
    const count: number = Object.keys(threeDictionary).length;

    const row: ThreeTableRecord = {
      threeType, // aka key 🗝️
      count,
      json
    }; 

    return row;
  }

  // real time interactions
  toggleRow(row: ThreeTableRecord): boolean {
    if (this.expandedRows[row.threeType]) {
      this.expandedRows[row.threeType] = !this.expandedRows[row.threeType]  
    } else {
      this.expandedRows[row.threeType] = true;
    }

    return this.expandedRows[row.threeType];
  }
}

export interface ThreeTableRecord {
  threeType: string;
  count: number;
  json: string;
}
