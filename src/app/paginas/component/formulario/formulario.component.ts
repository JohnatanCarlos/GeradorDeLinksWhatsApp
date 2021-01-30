import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'form-cadastro',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent {
  @ViewChild("link") link; //Selecionar o textarea do formulario através da variavel

  form: FormGroup;
  btnNome = 'GERAR LINK';
  mostraMenssagem = false;
  URL_WPP;
  read = false;

  constructor( private formBuilder: FormBuilder, private toastr: ToastrService){
    this.form = this.formBuilder.group({
      numero: [null, [Validators.required]],
      descricao: ['']
    })
  }


  gerarLink(){
    if(this.form.value.descricao){
      this.form.value.descricao = this.form.value.descricao.replaceAll(' ', '%20');
    }

    this.URL_WPP = `https://api.whatsapp.com/send?phone=55${this.form.value.numero}&text=${this.form.value.descricao}`;

    this.mostraMenssagem = true;
    this.btnNome = 'COPIAR LINK';
    this.toastr.success('Copie e compartilhe com usuários do Whatsapp!', 'Pronto!', {
      timeOut: 5000,
      positionClass: 'toast-top-center'
    });

    this.read = true

  }

  copiarLink(){
    const selecionarlink = this.link.nativeElement.select();
    document.execCommand("copy");

    this.toastr.success('Link Copiado Com Sucesso!', 'COPIADO', {
      timeOut: 5000,
      positionClass: 'toast-top-center'
    });
  }

  novoLink(){
    this.mostraMenssagem = false;
    this.form.reset();
    this.btnNome = 'GERAR LINK';
  }


}
