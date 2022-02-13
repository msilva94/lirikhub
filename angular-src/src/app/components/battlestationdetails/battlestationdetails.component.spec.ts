import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BattlestationdetailsComponent } from './battlestationdetails.component';

describe('BattlestationdetailsComponent', () => {
  let component: BattlestationdetailsComponent;
  let fixture: ComponentFixture<BattlestationdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BattlestationdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BattlestationdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
