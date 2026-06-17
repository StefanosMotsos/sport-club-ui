import {AfterViewInit, ChangeDetectorRef, Component, inject, OnInit, ViewChild} from '@angular/core';
import {MatIcon} from '@angular/material/icon';
import {MatIconButton} from '@angular/material/button';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable
} from '@angular/material/table';
import {MemberFilters, MemberReadOnlyDTO} from '../../shared/interfaces/member';
import {MatPaginator} from '@angular/material/paginator';
import {MemberService} from '../../shared/services/member.service';
import {UserService} from '../../shared/services/user.service';
import {MemberControls} from './member-controls/member-controls';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmDialog} from './confirm-dialog/confirm-dialog';

@Component({
  selector: 'app-member-list',
  imports: [
    MatIcon,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatHeaderCellDef,
    MatCellDef,
    MatTable,
    MatHeaderRow,
    MatRow,
    MatHeaderRowDef,
    MatRowDef,
    MatPaginator,
    MatIconButton,
    MemberControls,
  ],
  templateUrl: './member-list.html',
  styleUrl: './member-list.css',
})
export class MemberList implements OnInit, AfterViewInit{
  userService = inject(UserService);
  memberService = inject(MemberService);
  cdr = inject(ChangeDetectorRef);
  router = inject(Router);
  dialog = inject(MatDialog);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  members: MemberReadOnlyDTO[] = [];
  totalElements = 0;
  currentPage = 0;
  pageSize = 5;
  errorMessage = '';

  ngOnInit() {
    this.loadMembers();
  }

  ngAfterViewInit() {
    this.paginator.page.subscribe(event => {
      this.currentPage = event.pageIndex;
      this.loadMembers();
    });
  }

  loadMembers(filters?: MemberFilters) {
    this.memberService.membersList(this.currentPage, filters).subscribe({
      next: (data) => {
        console.log('content:', data.content);
        this.members = [...data.content];
        this.totalElements = data.totalElements;
        this.cdr.detectChanges();
      },
      error: (error) => {
        this.errorMessage = error.error?.description ?? 'Member list fetch Failed. Please try again later';
      }
    });
  }

  getRowNumber(index: number): number {
    return this.currentPage * this.pageSize + index + 1;
  }

  displayedColumns = ['no', 'name', 'sport', 'membershipType', 'activity', 'more', 'actions'];

  onDelete(uuid: string) {
    const dialogRef = this.dialog.open(ConfirmDialog);

    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.memberService.deleteMember(uuid).subscribe(() => {
          this.loadMembers();
        });
      }
    });
  }
}
