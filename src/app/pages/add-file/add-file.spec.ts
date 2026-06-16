import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFile } from './add-file';

describe('AddFile', () => {
  let component: AddFile;
  let fixture: ComponentFixture<AddFile>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddFile],
    }).compileComponents();

    fixture = TestBed.createComponent(AddFile);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
