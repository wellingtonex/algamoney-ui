import { AuthService } from './../../seguranca/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  exibindoMenu = false;

  constructor(private auth: AuthService) { }

  ngOnInit() {}

  criarNovoAccessToken() {
    this.auth.obterNovoAccessToken();
  }
}
