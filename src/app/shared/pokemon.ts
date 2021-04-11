import { TokenModel } from "nativescript-ui-autocomplete";

export interface Pokemon extends TokenModel {
    id: string;
    name?: string;
    src?: string;
    description?: string;
  }
