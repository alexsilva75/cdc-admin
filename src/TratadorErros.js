import PubSub from 'pubsub-js';
export default class TratadorErros{

    publicaErros(erros){
        erros.errors.forEach( err => {
            PubSub.publish('erro-validacao',err);
        });

    }//publicaErros
}