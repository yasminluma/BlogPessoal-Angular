import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/model/User';
import { AuthService } from 'src/app/service/auth.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  user: User = new User
  idUser: number
  confirmarSenha: string
  tipoUsuario: string


  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(){

    window.scroll(0,0)

    if(environment.token == ''){
      this.router.navigate(['/entrar'])
    }

    this.idUser = this.route.snapshot.params['id']
    this.findyByIdUser(this.idUser)
  }

  confirmSenha(event: any){
    this.confirmarSenha = event.target.value
  }

  tipoUser(event: any) {
    this.tipoUsuario = event.target.value
  }

  atualizar(){
    this.user.tipo = this.tipoUsuario 

    if(this.user.senha != this.confirmarSenha){
      alert('As senhas estão incorretas.')
    } else{
       this.authService.cadastrar(this.user).subscribe((resp: User) => {
         this.user = resp 

         this.router.navigate(['/inicio'])

         alert('Usuario atualizado com sucesso, faça o login novamente.')
         environment.token = ''
         environment.nome = ''
         environment.foto = ''
         environment.id = 0
         this.router.navigate(['/entrar'])
       })
    }
  }

  findyByIdUser(id: number){
    this.authService.getByIdUser(id).subscribe((resp: User)=>{
      this.user = resp
    })
  }

}
