import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatDivider} from "@angular/material/list";
import {MemberService} from '../../shared/services/member.service';
import {LookupService} from '../../shared/services/lookup.service';
import {ActivatedRoute, Router} from '@angular/router';
import {LookupReadOnlyDTO} from '../../shared/interfaces/lookup';
import {MemberInsertDTO, MemberUpdateDTO} from '../../shared/interfaces/member';

@Component({
  selector: 'app-member-edit',
    imports: [
        FormsModule,
        MatButton,
        MatDivider,
        ReactiveFormsModule
    ],
  templateUrl: './member-edit.html',
  styleUrl: './member-edit.css',
})
export class MemberEdit {
  memberService = inject(MemberService);
  lookupService = inject(LookupService);
  router = inject(Router);
  route = inject(ActivatedRoute);

  uuid = '';
  errorMessage: string = '';
  sports: LookupReadOnlyDTO[] = [];
  membershipTypes: LookupReadOnlyDTO[] = [];

  form = new FormGroup({
    firstname: new FormControl('', [Validators.required, Validators.minLength(2)]),
    lastname: new FormControl('', [Validators.required, Validators.minLength(2)]),
    vat: new FormControl('', Validators.pattern(/^\d{9,}$/)),
    sportId: new FormControl('', Validators.required),
    membershipTypeId: new FormControl('', Validators.required),

    userUpdateDTO: new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required, Validators.pattern(/(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&+=])^.{8,}$/)]),
    }),

    personalInfoUpdateDTO: new FormGroup({
      membershipId: new FormControl('', [Validators.required, Validators.pattern(/^\d{11}$/)]),
      identityNumber: new FormControl('', Validators.required),
      placeOfBirth: new FormControl('', Validators.required),
      branchOfRegistration: new FormControl('', Validators.required),
    }),
  });

  ngOnInit() {
    this.uuid = this.route.snapshot.paramMap.get('uuid') ?? '';

    this.lookupService.getAllSports().subscribe({
      next: (data) => this.sports = data,
      error: (err) => console.error('Failed to load sports', err)
    });

    this.lookupService.getAllTypes().subscribe({
      next: (data) => this.membershipTypes = data,
      error: (err) => console.error('Failed to load membership types', err)
    });

    this.memberService.getMember(this.uuid).subscribe({
      next: (member) => {
        const sport = this.sports.find(s => s.name === member.sport);
        const type = this.membershipTypes.find(t => t.name === member.membershipType);

        this.form.patchValue({
          firstname: member.firstname,
          lastname: member.lastname,
          vat: member.vat,
          sportId: String(sport?.id ?? ''),
          membershipTypeId: String(type?.id ?? ''),
          userUpdateDTO: {
            username: member.username,
            password: ''
          },
          personalInfoUpdateDTO: {
            membershipId: member.membershipId,
            identityNumber: member.identityNumber,
          }
        });
      }
    })
  }

  onSubmit() {
    this.errorMessage = '';
    if (this.form.invalid) return;

    const formValue = this.form.value;

    const editMember: MemberUpdateDTO = {
      uuid: this.uuid,
      firstname: formValue.firstname!,
      lastname: formValue.lastname!,
      vat: formValue.vat || undefined,
      sportId: Number(formValue.sportId),
      membershipTypeId: Number(formValue.membershipTypeId),
      userUpdateDTO: {
        username: formValue.userUpdateDTO!.username!,
        password: formValue.userUpdateDTO!.password!,
        roleId: 3
      },
      personalInfoUpdateDTO: {
        membershipId: formValue.personalInfoUpdateDTO!.membershipId!,
        identityNumber: formValue.personalInfoUpdateDTO!.identityNumber!,
        placeOfBirth: formValue.personalInfoUpdateDTO!.placeOfBirth!,
        branchOfRegistration: formValue.personalInfoUpdateDTO!.branchOfRegistration!,
      }
    };

    this.memberService.editMember(editMember).subscribe({
      next: () => this.router.navigate(['/members']),
      error: (error) => {
        this.errorMessage = error.error?.description ?? 'Update failed. Please try again later';
      }
    });
  }
}
