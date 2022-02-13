import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HotlineeditComponent } from './hotlineedit.component';

describe('HotlineeditComponent', () => {
  let component: HotlineeditComponent;
  let fixture: ComponentFixture<HotlineeditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HotlineeditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotlineeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
