import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubsundayaddComponent } from './subsundayadd.component';

describe('SubsundayaddComponent', () => {
  let component: SubsundayaddComponent;
  let fixture: ComponentFixture<SubsundayaddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubsundayaddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubsundayaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
