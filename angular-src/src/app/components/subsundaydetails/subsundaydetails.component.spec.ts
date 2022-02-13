import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubsundaydetailsComponent } from './subsundaydetails.component';

describe('SubsundaydetailsComponent', () => {
  let component: SubsundaydetailsComponent;
  let fixture: ComponentFixture<SubsundaydetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubsundaydetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubsundaydetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
