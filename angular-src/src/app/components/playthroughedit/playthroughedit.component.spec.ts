import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaythrougheditComponent } from './playthroughedit.component';

describe('PlaythrougheditComponent', () => {
  let component: PlaythrougheditComponent;
  let fixture: ComponentFixture<PlaythrougheditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaythrougheditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaythrougheditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
