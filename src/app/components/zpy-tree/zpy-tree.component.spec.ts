import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZpyTreeComponent } from './zpy-tree.component';

describe('ZpyTreeComponent', () => {
  let component: ZpyTreeComponent;
  let fixture: ComponentFixture<ZpyTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZpyTreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZpyTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
