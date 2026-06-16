import {Component, inject, signal} from '@angular/core';
import {MatIcon} from '@angular/material/icon';
import {MatButton} from '@angular/material/button';
import {MemberService} from '../../shared/services/member.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-add-file',
  imports: [
    MatIcon,
    MatButton
  ],
  templateUrl: './add-file.html',
  styleUrl: './add-file.css',
})
export class AddFile {
  private memberService = inject(MemberService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  file = signal<File | null>(null);
  uuid = '';
  errorMessage = '';

  ngOnInit() {
    this.uuid = this.route.snapshot.paramMap.get('uuid') ?? '';
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    this.file.set(input.files?.[0] ?? null);
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.file.set(event.dataTransfer?.files[0] ?? null);
  }

  onSubmit() {
    this.errorMessage = '';
    if (!this.file()) return;

    this.memberService.addFile(this.uuid, this.file()!).subscribe({
      next: () => this.router.navigate(['/members']),
      error: (error) => this.errorMessage = error.error?.description ?? 'Upload failed. Please try again.'
    });
  }
}
