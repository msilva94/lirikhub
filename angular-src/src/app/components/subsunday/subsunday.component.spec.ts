import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubsundayComponent } from './subsunday.component';

describe('SubsundayComponent', () => {
  let component: SubsundayComponent;
  let fixture: ComponentFixture<SubsundayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubsundayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubsundayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
