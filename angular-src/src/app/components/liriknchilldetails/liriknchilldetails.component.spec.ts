import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiriknchilldetailsComponent } from './liriknchilldetails.component';

describe('LiriknchilldetailsComponent', () => {
  let component: LiriknchilldetailsComponent;
  let fixture: ComponentFixture<LiriknchilldetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiriknchilldetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiriknchilldetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
