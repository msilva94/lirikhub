import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameeditComponent } from './gameedit.component';

describe('GameeditComponent', () => {
  let component: GameeditComponent;
  let fixture: ComponentFixture<GameeditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameeditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
