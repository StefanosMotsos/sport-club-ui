import {Component, inject} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatDivider} from "@angular/material/list";
import {MemberService} from '../../shared/services/member.service';
import {LookupService} from '../../shared/services/lookup.service';
import {Router} from '@angular/router';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MemberInsertDTO} from '../../shared/interfaces/member';
import {LookupReadOnlyDTO} from '../../shared/interfaces/lookup';

@Component({
  selector: 'app-register-member',
  imports: [
    MatButton,
    MatDivider,
    ReactiveFormsModule
  ],
  templateUrl: './register-member.html',
  styleUrl: './register-member.css',
})
export class RegisterMember {
  memberService = inject(MemberService);
  lookupService = inject(LookupService);
  router = inject(Router);

  errorMessage: string = '';
  sports: LookupReadOnlyDTO[] = [];
  membershipTypes: LookupReadOnlyDTO[] = [];

  form = new FormGroup({
    firstname: new FormControl('', [Validators.required, Validators.minLength(2)]),
    lastname: new FormControl('', [Validators.required, Validators.minLength(2)]),
    vat: new FormControl('', Validators.pattern(/^\d{9,}$/)),  // optional, no `required`
    sportId: new FormControl('', Validators.required),
    membershipTypeId: new FormControl('', Validators.required),

    userInsertDTO: new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required, Validators.pattern(/(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&+=])^.{8,}$/)]),
    }),

    personalInfoInsertDTO: new FormGroup({
      membershipId: new FormControl('', [Validators.required, Validators.pattern(/^\d{11}$/)]),
      identityNumber: new FormControl('', Validators.required),
      placeOfBirth: new FormControl('', Validators.required),
      branchOfRegistration: new FormControl('', Validators.required),
    }),
  });

  ngOnInit() {
    this.lookupService.getAllSports().subscribe({
      next: (data) => this.sports = data,
      error: (err) => console.error('Failed to load sports', err)
    });

    this.lookupService.getAllTypes().subscribe({
      next: (data) => this.membershipTypes = data,
      error: (err) => console.error('Failed to load membership types', err)
    });
  }

  onSubmit() {
    this.errorMessage = '';
    if (this.form.invalid) return;

    const formValue = this.form.value;

    const newMember: MemberInsertDTO = {
      firstname: formValue.firstname!,
      lastname: formValue.lastname!,
      vat: formValue.vat || undefined,  // empty string → undefined if optional
      sportId: Number(formValue.sportId),
      membershipTypeId: Number(formValue.membershipTypeId),
      userInsertDTO: {
        username: formValue.userInsertDTO!.username!,
        password: formValue.userInsertDTO!.password!,
        roleId: 3  // hardcoded MEMBER
      },
      personalInfoInsertDTO: {
        membershipId: formValue.personalInfoInsertDTO!.membershipId!,
        identityNumber: formValue.personalInfoInsertDTO!.identityNumber!,
        placeOfBirth: formValue.personalInfoInsertDTO!.placeOfBirth!,
        branchOfRegistration: formValue.personalInfoInsertDTO!.branchOfRegistration!,
      }
    };

    this.memberService.registerMember(newMember).subscribe({
      next: (response) => {
        this.router.navigate(['/register', response.uuid, 'add-file']);
      },
      error: (error) => {
        this.errorMessage = error.error?.description ?? 'Registration failed. Please try again later';
      }
    });
  }
}
