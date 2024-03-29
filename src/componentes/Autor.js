import React,{ Component } from "react";
import $ from 'jquery';
import InputCustomizado from './InputCustomizado';
import SubmitCustomizado from './SubmitCustomizado';
import PubSub from 'pubsub-js';
import TratadorErros from '../TratadorErros';


class FormularioAutor extends Component{

    constructor(){
        super();
        this.state = {nome:'', email: '', senha: ''};

        this.enviaForm = this.enviaForm.bind(this);
        this.setNome = this.setNome.bind(this);
        this.setEmail = this.setEmail.bind(this);
        this.setSenha = this.setSenha.bind(this);
    }

    render(){
        return(
            <div className="pure-form pure-form-aligned">
                <form className="pure-form pure-form-aligned" onSubmit={this.enviaForm} method="POST">
                
                <InputCustomizado id="nome" type="text" name="nome" value={this.state.nome} label="Nome" onChange={this.setNome}/>
                <InputCustomizado id="email" type="email" name="email" value={this.state.email} label="E-mail" onChange={this.setEmail}/>
                <InputCustomizado id="senha" type="password" name="senha" value={this.state.senha} label="Senha" onChange={this.setSenha}/>
                
                <SubmitCustomizado label="Gravar"/>
                </form>             

            </div>
        );
    }

    enviaForm(event){
        event.preventDefault();
        console.log('Envia form.....');
        $.ajax({
            url: "http://localhost:8080/api/autores",
            contentType: "application/json",
            dataType: "json",
            type: "post",
            data: JSON.stringify({nome: this.state.nome, email: this.state.email, senha: this.state.senha}),
            success: novaListagem => {console.log('enviou com sucesso');
                                    PubSub.publish('atualiza-lista-autores',novaListagem);
                                    this.setState({nome:'', email:'',senha:''});
                                    
                                },
            error: resposta =>{
                if(resposta.status == 400){
                    new TratadorErros().publicaErros(resposta.responseJSON);
                }
                console.log('Deu erro....')
            
            },//error
            beforeSend: () =>{
                            PubSub.publish('limpa-erros',{});
            }

        });
    }


    setNome(evento){
        console.log(`This: ${this}`);
        this.setState({nome: evento.target.value});
    }

    setEmail(evento){
        this.setState({email: evento.target.value});
    }

    setSenha(evento){
        this.setState({senha: evento.target.value});
    }

}//class FormularioAutor

class TabelaAutores extends Component{

    constructor(){
        super();
        

    }

    


    render(){
        return(
            <div>            
                <table className="pure-table">
                <thead>
                    <tr>
                    <th>Nome</th>
                    <th>email</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.props.lista.map(autor => {
                            return (<tr key={autor.id}>
                                <td>{autor.nome}</td>
                                <td>{autor.email}</td>
                            </tr>);
                        })
                    }
                </tbody>
                </table> 
            </div>       
        );
    }
}//class TabelaAutores

export default class AutorBox extends Component{

    constructor(){
        super();
        this.state = {lista: []};
        this.componentDidMount();
       
    }


    componentDidMount(){
        $.ajax({
            url:"http://localhost:8080/api/autores",
            dataType: 'json',
            success: resposta => {
                this.setState({lista:resposta});
            }//success
        });

        PubSub.subscribe('atualiza-lista-autores', (topico, novaListagem) => {
            this.setState({lista:novaListagem});
        });
    }

    render(){
        return(
            <div>
                <FormularioAutor />
                <TabelaAutores lista={this.state.lista}/>
            </div>
        );
    }//render


    atualizaListagem(novaLista){
        this.setState({lista:novaLista});
    }

}//AutorBox