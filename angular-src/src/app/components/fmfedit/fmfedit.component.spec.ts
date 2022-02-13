import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FmfeditComponent } from './fmfedit.component';

describe('FmfeditComponent', () => {
  let component: FmfeditComponent;
  let fixture: ComponentFixture<FmfeditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FmfeditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FmfeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
