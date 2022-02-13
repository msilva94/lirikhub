import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FmfaddComponent } from './fmfadd.component';

describe('FmfaddComponent', () => {
  let component: FmfaddComponent;
  let fixture: ComponentFixture<FmfaddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FmfaddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FmfaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
