import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BattlestationsComponent } from './battlestations.component';

describe('BattlestationsComponent', () => {
  let component: BattlestationsComponent;
  let fixture: ComponentFixture<BattlestationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BattlestationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BattlestationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
