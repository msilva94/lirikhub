import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubsundayeditComponent } from './subsundayedit.component';

describe('SubsundayeditComponent', () => {
  let component: SubsundayeditComponent;
  let fixture: ComponentFixture<SubsundayeditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubsundayeditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubsundayeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
