import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {DataModel} from "../../models/data.model";
import {ComboService} from "../../services/combo.service";
import {Combo} from "../../models/combo.model";

@Component({
  selector: 'app-combos-table',
  templateUrl: './combos-table.component.html',
  styleUrls: ['./combos-table.component.scss']
})
export class CombosTableComponent implements OnChanges {
  @Input() dataModel: DataModel|undefined;

  combos: Combo[] = []
  setNames: Set<string> = new Set();

  constructor(
    private comboService: ComboService
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    this.combos = [];
    this.setNames.clear();

    if (this.dataModel) {
      this.combos = this.comboService.listCombos(this.dataModel);
    }
    for (const combo of this.combos) {
      Object.keys(combo).forEach(key => {
        this.setNames.add(key);
      });
    }

  }


}
