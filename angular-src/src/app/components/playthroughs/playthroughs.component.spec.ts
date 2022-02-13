import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaythroughsComponent } from './playthroughs.component';

describe('PlaythroughsComponent', () => {
  let component: PlaythroughsComponent;
  let fixture: ComponentFixture<PlaythroughsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaythroughsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaythroughsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
