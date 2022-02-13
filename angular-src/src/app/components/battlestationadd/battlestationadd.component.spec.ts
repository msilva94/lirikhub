import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BattlestationaddComponent } from './battlestationadd.component';

describe('BattlestationaddComponent', () => {
  let component: BattlestationaddComponent;
  let fixture: ComponentFixture<BattlestationaddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BattlestationaddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BattlestationaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
