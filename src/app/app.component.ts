import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup} from '@angular/forms';

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

  model = {
    optionSets: []
  }

  constructor() {
  }

  ngOnInit(): void {
  }

  get options(): FormArray {
    return this.optionSet.get('options') as FormArray;
  }

  handleFormChanges(changes: any): void {
    this.model = changes;
  }
}
