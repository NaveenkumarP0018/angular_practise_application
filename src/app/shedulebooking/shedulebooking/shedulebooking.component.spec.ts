import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShedulebookingComponent } from './shedulebooking.component';

describe('ShedulebookingComponent', () => {
  let component: ShedulebookingComponent;
  let fixture: ComponentFixture<ShedulebookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShedulebookingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShedulebookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
