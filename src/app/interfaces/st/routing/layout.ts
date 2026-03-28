import { ST_TYPES } from "../../base/dictionary/base-dicts";
import { LayoutType } from "../../layout/layout-types";

export type RoutingLayoutType = LayoutType | 'data' | '';

export const ROUTING_LAYOUT_DETAIL_TYPES = [
  ...ST_TYPES,
  'entities',
  ''
] as const;

export type RoutingLayoutDetailType =
  typeof ROUTING_LAYOUT_DETAIL_TYPES[number];
