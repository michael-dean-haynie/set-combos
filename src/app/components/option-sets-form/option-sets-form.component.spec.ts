import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionSetsFormComponent } from './option-sets-form.component';

describe('OptionSetsFormComponent', () => {
  let component: OptionSetsFormComponent;
  let fixture: ComponentFixture<OptionSetsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OptionSetsFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OptionSetsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
