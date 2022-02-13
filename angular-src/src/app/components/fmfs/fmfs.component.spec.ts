import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FmfsComponent } from './fmfs.component';

describe('FmfsComponent', () => {
  let component: FmfsComponent;
  let fixture: ComponentFixture<FmfsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FmfsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FmfsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
