import React from 'react';
import style from './Contatos.module.css';

import {
    FaPhoneAlt,
    FaWhatsapp,
    FaMapMarkerAlt,
    FaClock,
    FaInstagram,
    FaFacebookF,
    FaLinkedinIn,
    FaPaperPlane
} from "react-icons/fa";

function Contatos () {
    return (
        <main className={style["contato"]}>

            {/* Cabeçalho */}
            <section className={style["contato-header"]}>
                <h1>CONTATE-NOS</h1>
                <p>
                    Estamos prontos para ajudar você a montar<br />
                    a cesta perfeita ou tirar qualquer dúvida.
                </p>
            </section>

            {/* Conteúdo Principal */}
            <section className={style["contato-conteudo"]}>

                {/* Coluna da Esquerda (Informações) */}
                <div className={style["contato-info"]}>
                    <h2>ENTRE EM CONTATO</h2>

                    <div className={style["info-item"]}>
                        <div className={style["container-icone"]}>
                            <FaPhoneAlt className={style["icone"]}/>
                        </div>
                        <div className={style["info-texto"]}>
                            <h3>TELEFONE</h3>
                            <p>(11) 99999-9999</p>
                        </div>
                    </div>
                    
                    <div className={style["info-item"]}>
                        <div className={style["container-icone"]}>
                            <FaWhatsapp className={style["icone"]}/>
                        </div>
                        <div className={style["info-texto"]}>
                            <h3>WHATSAPP</h3>
                            <p>(11) 99999-9999</p>
                            <a href="#" className={style["btn-whatsapp"]}>
                                <FaWhatsapp /> Conversar no WhatsApp
                            </a>
                        </div>
                    </div>

                    <div className={style["info-item"]}>
                        <div className={style["container-icone"]}>
                            <FaMapMarkerAlt className={style["icone"]}/>
                        </div>
                        <div className={style["info-texto"]}>
                            <h3>ENDEREÇO</h3>
                            <p>Rua das Cestas, 123</p>
                            <p>Centro</p>
                            <p>São Paulo - SP</p>
                            <p>CEP: 01234-567</p>
                        </div>
                    </div>
                       
                    <div className={style["info-item"]}>
                        <div className={style["container-icone"]}>
                            <FaClock className={style["icone"]}/>
                        </div>
                        <div className={style["info-texto"]}>
                            <h3>HORÁRIO DE ATENDIMENTO</h3>
                            <p><strong>Segunda a Sexta</strong></p>
                            <p>08:00 às 18:00</p>
                            <p><strong>Sábado</strong></p>
                            <p>08:00 às 13:00</p>
                        </div>
                    </div>

                    {/* Redes Sociais */}
                    <h2 className={style["titulo-redes"]}>NOS ACOMPANHE</h2>
                    <div className={style["redes-sociais"]}>
                        <div className={style["wrapper-social"]}><FaInstagram /></div>
                        <div className={style["wrapper-social"]}><FaFacebookF /></div>
                        <div className={style["wrapper-social"]}><FaLinkedinIn /></div>
                    </div>
                </div>

                {/* Coluna da Direita (Formulário) */}
                <div className={style["contato-formulario"]}>
                    <form>
                        <label>NOME COMPLETO</label>
                        <input type="text" name="nome" placeholder="Digite seu nome" />

                        <label>E-MAIL</label>
                        <input type="email" name="email" placeholder="Digite seu e-mail" />

                        <label>ENDEREÇO</label>
                        <input type="text" name="endereco" placeholder="Digite seu endereço" />

                        <label>ASSUNTO</label>
                        <select defaultValue="">
                            <option value="" disabled hidden>Selecione um assunto</option>
                            <option value="duvidas">Dúvidas</option>
                            <option value="sugestoes">Sugestões</option>
                        </select>

                        <label>MENSAGEM</label>
                        <textarea rows="6" name="mensagem" placeholder="Escreva sua mensagem aqui..."></textarea>

                        <button type="submit">
                            <FaPaperPlane style={{marginRight: '8px'}} /> ENVIAR
                        </button>
                    </form>
                </div>

            </section>
        </main>
    );
}

export default Contatos;
