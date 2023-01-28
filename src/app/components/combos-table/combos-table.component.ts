import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {DataModel} from "../../models/data.model";
import {ComboService} from "../../services/combo.service";
import {Combo} from "../../models/combo.model";

export interface ComboColumn {
  setId: string;
  setName: string;
}

@Component({
  selector: 'app-combos-table',
  templateUrl: './combos-table.component.html',
  styleUrls: ['./combos-table.component.scss']
})
export class CombosTableComponent implements OnChanges {
  @Input() dataModel: DataModel|undefined;

  combos: Combo[] = []
  private setNamesToIdsMap = new Map<string, string>();

  constructor(
    private comboService: ComboService
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    this.combos = [];
    this.setNamesToIdsMap.clear()
    if (this.dataModel) {
      this.combos = this.comboService.listCombos(this.dataModel);
      console.log('combos are ', this.combos);
    }

    for (const combo of this.combos) {
      Object.keys(combo).forEach(key => {
        this.setNamesToIdsMap.set(combo[key].setName, key);
      });
    }
  }

  get colNames(): string[] {
    return [ ...this.setNamesToIdsMap.keys() ];
  }

  getSetIdByName(name: string): string {
    return this.setNamesToIdsMap.get(name) || '';

  }
}
