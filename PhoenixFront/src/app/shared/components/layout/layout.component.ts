import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../../models/usuario';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styles: [
  ]
})
export class LayoutComponent implements OnInit {
  usuario: Usuario;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.usuario = JSON.parse(localStorage.getItem('usuario'));
  }

  logout(): void {
    localStorage.removeItem('usuario');
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }
}
