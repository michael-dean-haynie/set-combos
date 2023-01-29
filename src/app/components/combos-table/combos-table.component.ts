import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {DataModel} from "../../models/data.model";
import {ComboService} from "../../services/combo.service";
import {Combo} from "../../models/combo.model";

export interface ComboColumn {
  setId: string;
  setName: string;
}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-combos-table',
  templateUrl: './combos-table.component.html',
  styleUrls: ['./combos-table.component.scss']
})
export class CombosTableComponent implements OnChanges {
  @Input() dataModel: DataModel|undefined;

  displayedColumns: string[] = [];
  data: Combo[] = [];

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

    // FOR NEW TABLE
    this.data = [];
    this.displayedColumns = [];
    this.data = this.combos;
    this.displayedColumns = this.colNames;
  }

  get colNames(): string[] {
    return [ ...this.setNamesToIdsMap.keys() ];
  }

  getSetIdByName(name: string): string {
    return this.setNamesToIdsMap.get(name) || '';

  }
}
