import { SequenceStTypes, StTypes } from "../../../../../interfaces/base/dictionary/base-dicts";

export interface StEntityTableRecord {
  stId: string;
  type: StTypes;
  json: string;
  stRecord: SequenceStTypes
}
