// Holds numbers
export interface NumberDictionary {
  [id: number]: number;
}

// Holds strings
export interface StringDictionary {
  [id: number]: string;
}

// Holds booleans
export interface BooleanDictionary {
  [id: number]: boolean;
}

// In the future we can create object specific dictions ie CameraDict { [id: number]: StCamera}