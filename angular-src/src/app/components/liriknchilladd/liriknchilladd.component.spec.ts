import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiriknchilladdComponent } from './liriknchilladd.component';

describe('LiriknchilladdComponent', () => {
  let component: LiriknchilladdComponent;
  let fixture: ComponentFixture<LiriknchilladdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiriknchilladdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiriknchilladdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
