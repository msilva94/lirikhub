import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiriknchilleditComponent } from './liriknchilledit.component';

describe('LiriknchilleditComponent', () => {
  let component: LiriknchilleditComponent;
  let fixture: ComponentFixture<LiriknchilleditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiriknchilleditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiriknchilleditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
