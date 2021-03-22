import { TokenModel } from "nativescript-ui-autocomplete";

export interface Pokemon extends TokenModel {
    id: number;
    name?: string;
    src?: string;
    description?: string;
  }
