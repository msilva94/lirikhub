import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HotlineaddComponent } from './hotlineadd.component';

describe('HotlineaddComponent', () => {
  let component: HotlineaddComponent;
  let fixture: ComponentFixture<HotlineaddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HotlineaddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotlineaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
