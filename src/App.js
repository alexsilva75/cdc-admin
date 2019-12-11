import React from 'react';
import logo from './logo.svg';
import './css/pure-min.css';
import './css/side-menu.css';
import { render } from 'react-dom';
import $ from 'jquery';
import InputCustomizado from './componentes/InputCustomizado';

class App extends React.Component {

    constructor(){
        super();

        this.state = {lista: [], nome:'', email: '', senha: ''};

        this.componentDidMount();
        this.enviaForm = this.enviaForm.bind(this);
        this.setNome = this.setNome.bind(this);
        this.setEmail = this.setEmail.bind(this);
        this.setSenha = this.setSenha.bind(this);
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
            success: resposta => {console.log('enviou com sucesso');
                                    this.setState({lista:resposta})
                                },
            error: resposta =>{console.log('Deu erro....')}


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


    componentDidMount(){
        $.ajax({
            url:"http://localhost:8080/api/autores",
            dataType: 'json',
            success: resposta => {
                this.setState({lista:resposta});
            }//success
        });
    }

    render(){
        return (
        <div id="layout">
        
        <a href="#menu" id="menuLink" className="menu-link">
            
            <span></span>
        </a>

        <div id="menu">
            <div className="pure-menu">
                <a className="pure-menu-heading" href="#">Company</a>

                <ul className="pure-menu-list">
                    <li className="pure-menu-item"><a href="#" className="pure-menu-link">Home</a></li>
                    <li className="pure-menu-item"><a href="#" className="pure-menu-link">Autor</a></li>
                    <li className="pure-menu-item"><a href="#" className="pure-menu-link">Livro</a></li>
                                
                </ul>
            </div>
        </div>

        <div id="main">
                    <div className="header">
                    <h1>Cadastro de Autores</h1>
                    </div>
                    <div className="content" id="content">
                    <div className="pure-form pure-form-aligned">
                        <form className="pure-form pure-form-aligned" onSubmit={this.enviaForm} method="POST">
                        
                        <InputCustomizado id="nome" type="text" name="nome" value={this.state.nome} label="Nome" onChange={this.setNome}/>
                        <InputCustomizado id="email" type="email" name="email" value={this.state.email} label="E-mail" onChange={this.setEmail}/>
                        <InputCustomizado id="senha" type="password" name="senha" value={this.state.senha} label="Senha" onChange={this.setSenha}/>
                        
                        <div className="pure-control-group">                                  
                            <label></label> 
                            <button type="submit" className="pure-button pure-button-primary">Gravar</button>                                    
                        </div>
                        </form>             

                    </div>  
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
                                this.state.lista.map(autor => {
                                    return (<tr key={autor.id}>
                                        <td>{autor.nome}</td>
                                        <td>{autor.email}</td>
                                    </tr>);
                                })
                            }
                        </tbody>
                        </table> 
                    </div>             
                    </div>
                </div>            
        </div>);
        }

}

export default App;
