import React, { useState } from 'react';
import style from './Contatos.module.css';

function Contatos () {
    return (
        <main className="contato">




            {/*Hora do Cabeçalho*/}
            <section className="contato-header">

                <h1>Contate-nos</h1>

                <p>
                    Estamos prontos para ajudar você a montar
                    a cesta perfeita ou tirar qualquer dúvida.
                </p>

            </section>




            {/*Hora do Conteúdo*/}
            <section className="contato-conteudo">



                {/* Hora das Informações */}
                <div className="contato-info">


                    <h2>Entre em Contato</h2>


                    <div>
                        <h3>telefone</h3>
                        <p>(11) 99999-9999</p>
                    </div>


                    <div>
                        <h3>WhatsApp</h3>
                        <p>(11) 99999-9999</p>
                    </div>


                    <div>
                        <h3>Endereço</h3>
                        <p>Rua Exemplo, 123 - São Paulo/SP</p>
                    </div>


                    <div>
                        <h3>Horário de Atendimento</h3>
                        <p>Segunda a Sexta: 9h às 18h</p>
                    </div>

                </div>



                {/* Hora do Formulário */}
                <div className="contato-formulario">

                    <form>

                        <label>Nome Completo</label>
                        <input type="text" name="nome" />

                        <label>Email</label>
                        <input type="email" name="email" />

                        <label>Endereço</label>
                        <input type="text" name="endereco" />

                        <label>Assunto</label>
                        <select>
                            <option>Selecione um Assunto</option>
                        </select>

                        <label>Mensagem</label>
                        <textarea rows="6" name="mensagem"></textarea> {/*minimo 6 linhas*/}

                        <button type="submit">Enviar</button>

                    </form>

                </div>


            </section>

        </main>
    );
}

export default Contatos;