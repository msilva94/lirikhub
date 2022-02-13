import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BattlestationeditComponent } from './battlestationedit.component';

describe('BattlestationeditComponent', () => {
  let component: BattlestationeditComponent;
  let fixture: ComponentFixture<BattlestationeditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BattlestationeditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BattlestationeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
