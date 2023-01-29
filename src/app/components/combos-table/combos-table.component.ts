import {AfterViewInit, Component, Input, OnChanges, SimpleChanges, ViewChild} from '@angular/core';
import {DataModel} from "../../models/data.model";
import {ComboService} from "../../services/combo.service";
import {Combo} from "../../models/combo.model";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";

export interface ComboColumn {
  setId: string;
  setName: string;
}

@Component({
  selector: 'app-combos-table',
  templateUrl: './combos-table.component.html',
  styleUrls: ['./combos-table.component.scss']
})
export class CombosTableComponent implements OnChanges, AfterViewInit {
  @Input() dataModel: DataModel|undefined;

  displayedColumns: string[] = [];
  // data: Combo[] = [];
  data = new MatTableDataSource<Combo>()

  combos: Combo[] = []
  private setNamesToIdsMap = new Map<string, string>();

  @ViewChild(MatPaginator) paginator: MatPaginator|undefined;

  constructor(
    private comboService: ComboService
  ) {}

  ngAfterViewInit(): void {
    if (this.paginator) {
      this.data.paginator = this.paginator;
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.paginator) {
      this.data.paginator = this.paginator;
    }

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
    this.data.data = [];
    this.displayedColumns = [];
    this.data.data = this.combos;
    this.displayedColumns = this.colNames;
  }

  get colNames(): string[] {
    return [ ...this.setNamesToIdsMap.keys() ];
  }

  getSetIdByName(name: string): string {
    return this.setNamesToIdsMap.get(name) || '';

  }
}
