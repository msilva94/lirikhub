import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaythroughdetailsComponent } from './playthroughdetails.component';

describe('PlaythroughdetailsComponent', () => {
  let component: PlaythroughdetailsComponent;
  let fixture: ComponentFixture<PlaythroughdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaythroughdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaythroughdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
