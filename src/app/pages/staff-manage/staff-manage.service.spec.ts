import { TestBed, inject } from '@angular/core/testing';

import { StaffManageService } from './staff-manage.service';

describe('StaffManageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StaffManageService]
    });
  });

  it('should be created', inject([StaffManageService], (service: StaffManageService) => {
    expect(service).toBeTruthy();
  }));
});
