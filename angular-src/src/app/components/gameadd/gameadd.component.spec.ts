import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameaddComponent } from './gameadd.component';

describe('GameaddComponent', () => {
  let component: GameaddComponent;
  let fixture: ComponentFixture<GameaddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameaddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
