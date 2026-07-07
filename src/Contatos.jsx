import React from "react";
import { motion } from "framer-motion";
import style from "./Contatos.module.css";

import enfeiteTitulo from "../docs/imagens/logosaborraizTerracota.png";

import {
  FaPhoneAlt,
  FaWhatsapp,
  FaMapMarkerAlt,
  FaClock,
  FaInstagram,
  FaFacebookF,
  FaLinkedinIn,
  FaPaperPlane,
} from "react-icons/fa";

function Contatos() {

  const fadeUp = {
    hidden: {
      opacity: 0,
      y: 40,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut",
      },
    },
  };

  const staggerContainer = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.18,
      },
    },
  };

  return (
    <main className={style.contato}>

      {/* cabeça */}

      <section className={style["contato-header"]}>

        <motion.img
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: .8 }}
          src={enfeiteTitulo}
          alt="Enfeite"
          className={style["enfeite-titulo1"]}
        />

        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: .2 }}
          className={style.subtitulo}
        >
          ENTRE EM CONTATO
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: .8 }}
        >
          Estamos prontos para
          <br />
          ouvir você.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: .35 }}
        >
          Tire suas dúvidas, solicite uma cesta personalizada
          <br />
          ou converse com nossa equipe.
        </motion.p>

        <br /> <br />
        

      </section>





      <motion.section
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className={style["contato-conteudo"]}
      >

        {/*Card e Redes de contato*/}

        <motion.div
          variants={fadeUp}
          className={style["contato-info"]}
        >

          <div className={style["info-card"]}>

            <div className={style["titulo-area"]}>
              <span></span>
              <h2>Entre em Contato</h2>
            </div>

            <div className={style["info-item"]}>

              <div className={style["container-icone"]}>
                <FaPhoneAlt className={style.icone}/>
              </div>

              <div className={style["info-texto"]}>
                <h3>Telefone</h3>
                <p>(55) 99657-2766</p>
              </div>

            </div>

            <div className={style["info-item"]}>

              <div className={style["container-icone"]}>
                <FaWhatsapp className={style.icone}/>
              </div>

              <div className={style["info-texto"]}>
                <h3>WhatsApp</h3>

                <p>(55) 99657-2766</p>

                <a
                    href="https://wa.me/5555996572766?text=Olá!%20Gostaria%20de%20mais%20informações%20sobre%20as%20cestas%20da%20sua%20loja."
                    target="_blank"
                    rel="noopener noreferrer"
                    className={style["btn-whatsapp"]}
                >
                  <FaWhatsapp />
                  Conversar no WhatsApp
                </a>

              </div>

            </div>

            <div className={style["info-item"]}>

              <div className={style["container-icone"]}>
                <FaMapMarkerAlt className={style.icone}/>
              </div>

              <div className={style["info-texto"]}>
                <h3>Endereço</h3>

                <p>Rua Santos Dumont,</p>
                <p>820 Centro</p>
                <p>Rio Grande do Sul - RS</p>
                <p>CEP: 98780-109</p>

              </div>

            </div>
                        <div className={style["info-item"]}>

              <div className={style["container-icone"]}>
                <FaClock className={style.icone} />
              </div>

              <div className={style["info-texto"]}>

                <h3>Horário de Atendimento</h3>

                <p><strong>Segunda a Sexta</strong></p>
                <p>08:00 às 18:00</p>

                <p className={style["espaco-top"]}>
                  <strong>Sábado</strong>
                </p>

                <p>08:00 às 13:00</p>

              </div>

            </div>

            <div className={style["redes-area"]}>

              <div className={style["titulo-area"]}>
                <span></span>
                <h2>Redes Sociais</h2>
              </div>

              <div className={style["redes-sociais"]}>

                <a href="https://www.instagram.com/sabor.raizoficial/" className={style["wrapper-social"]}>
                  <FaInstagram />
                </a>

                <a href="https://www.facebook.com/p/Sabor-Raiz-61560768295582/?locale=pt_BR" className={style["wrapper-social"]}>
                  <FaFacebookF />
                </a>

                <a href="https://www.linkedin.com/company/restaurante-e-pir%C3%A3o-de-aipim-sabor-raiz/about/" className={style["wrapper-social"]}>
                  <FaLinkedinIn />
                </a>

              </div>

            </div>

          </div>

        </motion.div>

        {/* FORMULÁRIo */}

        <motion.div
          variants={fadeUp}
          className={style["contato-formulario"]}
        >

          <form className={style.formulario}>

            <div className={style["titulo-area"]}>
              <span></span>
              <h2>Envie uma mensagem</h2>
            </div>

            <label>Nome Completo</label>

            <input
              type="text"
              name="nome"
              placeholder="Digite seu nome"
            />

            <label>E-mail</label>

            <input
              type="email"
              name="email"
              placeholder="Digite seu e-mail"
            />

            <label>Endereço</label>

            <input
              type="text"
              name="endereco"
              placeholder="Digite seu endereço"
            />

            <label>Assunto</label>

            <select defaultValue="">
              <option
                value=""
                disabled
                hidden
              >
                Selecione um assunto
              </option>

              <option value="duvidas">
                Dúvidas
              </option>

              <option value="orcamento">
                Solicitar orçamento
              </option>

              <option value="personalizada">
                Cesta personalizada
              </option>

              <option value="sugestoes">
                Sugestões
              </option>

              <option value="outros">
                Outros
              </option>

            </select>

            <label>Mensagem</label>

            <textarea
              rows="6"
              name="mensagem"
              placeholder="Escreva sua mensagem aqui..."
            />

            <button
              type="submit"
              className={style["btn-enviar"]}
            >
              <FaPaperPlane />

              Enviar Mensagem

            </button>

          </form>

        </motion.div>

      </motion.section>

    </main>
  );
}

export default Contatos;