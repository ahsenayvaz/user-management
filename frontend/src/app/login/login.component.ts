import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  private auth = inject(AuthService);
  private router = inject(Router);

  username = '';
  password = '';
  error = signal('');

  login() {
    this.auth.login(this.username, this.password).subscribe({
      next: () => this.router.navigate(['/users']),
      error: (err) => this.error.set(err.error?.message || 'Giriş yapılamadı'),
    });
  }
}
