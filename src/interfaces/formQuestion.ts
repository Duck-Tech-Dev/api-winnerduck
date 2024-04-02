export interface FormQuestion {
  // necessary fields
  title: string;
  description: string;
  type: "text" | "number" | "radio" | "checkbox" | "slider" | "email" | "phone" | "date";

  // optional fields
  isOptional?: boolean;

  // fields that changes based on the type
  /// text and number
  minimum?: number;
  maximum?: number;

  /// radio and checkbox
  options?: string[];

  /// slider
  start?: number;
  end?: number;
  step?: number;
  defaultValue?: number;
}
