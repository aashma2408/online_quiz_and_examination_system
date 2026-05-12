import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviousAttempts } from './previous-attempts';

describe('PreviousAttempts', () => {
  let component: PreviousAttempts;
  let fixture: ComponentFixture<PreviousAttempts>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreviousAttempts],
    }).compileComponents();

    fixture = TestBed.createComponent(PreviousAttempts);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
