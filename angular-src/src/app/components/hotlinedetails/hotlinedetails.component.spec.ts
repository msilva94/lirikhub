import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HotlinedetailsComponent } from './hotlinedetails.component';

describe('HotlinedetailsComponent', () => {
  let component: HotlinedetailsComponent;
  let fixture: ComponentFixture<HotlinedetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HotlinedetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotlinedetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
