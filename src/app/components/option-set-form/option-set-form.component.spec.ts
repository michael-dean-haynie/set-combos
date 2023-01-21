import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionSetFormComponent } from './option-set-form.component';

describe('OptionSetFormComponent', () => {
  let component: OptionSetFormComponent;
  let fixture: ComponentFixture<OptionSetFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OptionSetFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OptionSetFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
