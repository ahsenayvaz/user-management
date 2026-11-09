import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { API_URL } from '../api';
import { AuthService, User } from '../auth.service';

interface UserForm {
  id?: number;
  username: string;
  password: string;
  fullName: string;
  role: 'admin' | 'user';
}

@Component({
  selector: 'app-users',
  imports: [FormsModule],
  templateUrl: './users.component.html',
})
export class UsersComponent {
  private http = inject(HttpClient);
  auth = inject(AuthService);

  users = signal<User[]>([]);
  selected = signal<User | null>(null);
  form = signal<UserForm | null>(null);
  error = signal('');

  constructor() {
    this.loadUsers();
  }

  loadUsers() {
    this.http.get<User[]>(`${API_URL}/users`).subscribe((users) => this.users.set(users));
  }

  showDetail(id: number) {
    this.http.get<User>(`${API_URL}/users/${id}`).subscribe((user) => this.selected.set(user));
  }

  newUser() {
    this.form.set({ username: '', password: '', fullName: '', role: 'user' });
  }

  editUser(user: User) {
    this.form.set({ ...user, password: '' });
  }

  save() {
    const { id, ...body } = this.form()!;
    const data: Partial<UserForm> = { ...body };
    if (id && !data.password) delete data.password;

    const request = id
      ? this.http.put(`${API_URL}/users/${id}`, data)
      : this.http.post(`${API_URL}/users`, data);

    request.subscribe({
      next: () => {
        this.form.set(null);
        this.error.set('');
        this.loadUsers();
      },
      error: (err) => this.error.set([err.error?.message].flat().join(', ')),
    });
  }

  deleteUser(user: User) {
    if (!confirm(`${user.username} silinsin mi?`)) return;

    this.http.delete(`${API_URL}/users/${user.id}`).subscribe({
      next: () => this.loadUsers(),
      error: (err) => this.error.set(err.error?.message || 'Silinemedi'),
    });
  }
}
