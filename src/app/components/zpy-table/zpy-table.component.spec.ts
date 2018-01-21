import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZpyTableComponent } from './zpy-table.component';

describe('ZpyTableComponent', () => {
  let component: ZpyTableComponent;
  let fixture: ComponentFixture<ZpyTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZpyTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZpyTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
