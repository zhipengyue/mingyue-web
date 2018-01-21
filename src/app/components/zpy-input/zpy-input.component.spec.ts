import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZpyInputComponent } from './zpy-input.component';

describe('ZpyInputComponent', () => {
  let component: ZpyInputComponent;
  let fixture: ComponentFixture<ZpyInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZpyInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZpyInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
