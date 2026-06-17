import {ChangeDetectorRef, Component, EventEmitter, inject, Output} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatDivider} from "@angular/material/list";
import {MatIcon} from "@angular/material/icon";
import {MemberFilters} from '../../../shared/interfaces/member';
import {LookupService} from '../../../shared/services/lookup.service';
import {LookupReadOnlyDTO} from '../../../shared/interfaces/lookup';

@Component({
  selector: 'app-member-controls',
    imports: [
        MatButton,
        MatDivider,
        MatIcon
    ],
  templateUrl: './member-controls.html',
  styleUrl: './member-controls.css',
})
export class MemberControls {
  @Output() filtersChange = new EventEmitter<MemberFilters>();
  currentFilters: Record<string, string> = {};
  lookupService = inject(LookupService);
  cdr = inject(ChangeDetectorRef);
  sports: LookupReadOnlyDTO[] = [];
  types: LookupReadOnlyDTO[] = [];

  ngOnInit() {
    this.lookupService.getAllSports().subscribe({
      next: (response) => {
        this.sports = response;
        this.cdr.detectChanges();
      }
    })
  }

  onSelectionChange(key: keyof MemberFilters, value: string) {
    this.currentFilters[key] = value;
    this.filtersChange.emit({...this.currentFilters} as MemberFilters);
  }

  clearFilters() {
    this.currentFilters = {};
    this.filtersChange.emit({});
  }
}
