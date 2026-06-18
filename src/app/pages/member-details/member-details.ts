import {ChangeDetectorRef, Component, inject} from '@angular/core';
import {MatDivider} from '@angular/material/list';
import {MemberService} from '../../shared/services/member.service';
import {ActivatedRoute} from '@angular/router';
import {MemberReadOnlyDTO} from '../../shared/interfaces/member';

@Component({
  selector: 'app-member-details',
  imports: [
    MatDivider
  ],
  templateUrl: './member-details.html',
  styleUrl: './member-details.css',
})
export class MemberDetails {
  memberService = inject(MemberService);
  route = inject(ActivatedRoute);
  cdr = inject(ChangeDetectorRef);

  uuid = '';
  member: MemberReadOnlyDTO | null = null;

  ngOnInit() {
    this.uuid = this.route.snapshot.paramMap.get('uuid') ?? '';

    this.memberService.getMember(this.uuid).subscribe(member => {
      this.member = member;
      this.cdr.detectChanges()
    })
  }
}
