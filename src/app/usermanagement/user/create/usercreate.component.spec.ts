import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UsercreateComponent } from './usercreate.component';

describe('UsercreateComponent', () => {
  let component: UsercreateComponent;
  let fixture: ComponentFixture<UsercreateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UsercreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsercreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
