import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CombosTableComponent } from './combos-table.component';

describe('CombosTableComponent', () => {
  let component: CombosTableComponent;
  let fixture: ComponentFixture<CombosTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CombosTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CombosTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
