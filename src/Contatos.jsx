import React from "react";
import { motion } from "framer-motion";
import style from "./Contatos.module.css";

import enfeiteTitulo from "../docs/imagens/enfeiteTitulo.png";
import enfeiteTitulo2 from "../docs/imagens/enfeiteTitulo2.png";

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

        <motion.img
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: .8 }}
          src={enfeiteTitulo2}
          alt="Enfeite"
          className={style["enfeite-titulo2"]}
        />

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
                <p>(11) 99999-9999</p>
              </div>

            </div>

            <div className={style["info-item"]}>

              <div className={style["container-icone"]}>
                <FaWhatsapp className={style.icone}/>
              </div>

              <div className={style["info-texto"]}>
                <h3>WhatsApp</h3>

                <p>(11) 99999-9999</p>

                <a
                  href="#"
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

                <p>Rua das Cestas, 123</p>
                <p>Centro</p>
                <p>São Paulo - SP</p>
                <p>CEP: 01234-567</p>

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
                <h2>Nos acompanhe</h2>
              </div>

              <div className={style["redes-sociais"]}>

                <a href="#" className={style["wrapper-social"]}>
                  <FaInstagram />
                </a>

                <a href="#" className={style["wrapper-social"]}>
                  <FaFacebookF />
                </a>

                <a href="#" className={style["wrapper-social"]}>
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