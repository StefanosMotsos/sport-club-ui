import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberControls } from './member-controls';

describe('MemberControls', () => {
  let component: MemberControls;
  let fixture: ComponentFixture<MemberControls>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MemberControls],
    }).compileComponents();

    fixture = TestBed.createComponent(MemberControls);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
