import { Injectable } from '@angular/core';
import {DataModel, Option, OptionSet} from "../models/data.model";

@Injectable({
  providedIn: 'root'
})
export class DataModelService {

  constructor() { }

  createDataModel(formValue: any): DataModel {
    const dataModel = {
      optionSets: []
    };

    if(formValue && formValue.optionSets) {
      dataModel.optionSets = formValue.optionSets.map(this.createOptionSet, this);
    }

    return dataModel;
  }

  private createOptionSet(formValue: any): OptionSet {
    return {
      name: formValue.name,
      enabled: formValue.enabled,
      options: formValue.options.map(this.createOption, this)
    };
  }

  private createOption(formValue: any): Option {
    return {
      name: formValue.name,
      enabled: formValue.enabled
    };
  }
}
