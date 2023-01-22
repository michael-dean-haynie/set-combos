import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-combos-table',
  templateUrl: './combos-table.component.html',
  styleUrls: ['./combos-table.component.scss']
})
export class CombosTableComponent {
  @Input() model = {} as any; // TODO make better
}
