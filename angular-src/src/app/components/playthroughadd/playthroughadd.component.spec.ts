import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaythroughaddComponent } from './playthroughadd.component';

describe('PlaythroughaddComponent', () => {
  let component: PlaythroughaddComponent;
  let fixture: ComponentFixture<PlaythroughaddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaythroughaddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaythroughaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
