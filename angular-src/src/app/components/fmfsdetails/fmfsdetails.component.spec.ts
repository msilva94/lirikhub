import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FmfsdetailsComponent } from './fmfsdetails.component';

describe('FmfsdetailsComponent', () => {
  let component: FmfsdetailsComponent;
  let fixture: ComponentFixture<FmfsdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FmfsdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FmfsdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
