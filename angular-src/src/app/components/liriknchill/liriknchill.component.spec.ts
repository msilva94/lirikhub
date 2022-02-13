import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiriknchillComponent } from './liriknchill.component';

describe('LiriknchillComponent', () => {
  let component: LiriknchillComponent;
  let fixture: ComponentFixture<LiriknchillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiriknchillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiriknchillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
