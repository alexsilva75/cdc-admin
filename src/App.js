import React from 'react';
import logo from './logo.svg';
import './css/pure-min.css';
import './css/side-menu.css';
import { render } from 'react-dom';
import AutorBox  from './componentes/Autor';
import $ from 'jquery';
import TratadorErros from './TratadorErros';
import {Link} from 'react-router-dom';

class App extends React.Component {

    constructor(){
        super();
        
   
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
                    <li className="pure-menu-item"><Link className="pure-menu-link" to="/">Home</Link></li>
                    <li className="pure-menu-item"><Link className="pure-menu-link" to="/autor">Autor</Link></li>
                    <li className="pure-menu-item"><Link className="pure-menu-link" to="/livro">Livro</Link></li>
                                
                </ul>
            </div>
        </div>

        <div id="main">
                    <div className="header">
                    <h1>Cadastro de Autores</h1>
                    </div>
                    <div className="content" id="content">
                        <AutorBox />
                        

                      
                          
                    </div>
                </div>            
        </div>);
        }

}

export default App;
