import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup} from '@angular/forms';
import {ComboService} from "./services/combo.service";
import {DataModel} from "./models/data.model";
import {DataModelService} from "./services/data-model.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'set-combos';
  optionSet = new FormGroup<{
    name: FormControl<string|null>,
    options: FormArray<FormControl<string|null>>
  }>({
    name: new FormControl('Chord Root'),
    options: new FormArray([
      new FormControl('A'),
      new FormControl('B')
    ])
  });

  dataModel: DataModel|undefined;

  constructor(
    private dataModelService: DataModelService
  ) {}

  ngOnInit(): void {
  }

  get options(): FormArray {
    return this.optionSet.get('options') as FormArray;
  }

  handleFormChanges(changes: any): void {
    this.dataModel = this.dataModelService.createDataModel(changes);
  }
}
