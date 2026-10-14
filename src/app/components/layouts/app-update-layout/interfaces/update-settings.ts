export type UpdatePresentationModes = "configured" | "maximized";

export interface EditDimensions {
  width: number;
  height: number;
  top: number;
  left: number;
  presentationMode: UpdatePresentationModes;
}