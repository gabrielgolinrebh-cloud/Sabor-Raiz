const INFOS_SABOR_RAIZ = {
  'Sobre Entregas': {
    titulo: 'Sobre Entregas',
    conteudo: (
      <div className="space-y-4 text-sm leading-relaxed text-gray-700">
        <p>Sabemos que nossas cestas não entregam apenas produtos, mas sim sentimentos e momentos inesquecíveis. Por isso, nossa logística é pensada com o máximo de cuidado.</p>
        <ul className="list-disc pl-5 space-y-3">
          <li><strong>Prazos e Regiões:</strong> Realizamos entregas expressas (em até 24 horas) para toda a Grande Belo Horizonte. Para outras regiões do estado, o prazo é calculado diretamente no carrinho de compras, variando de 2 a 5 dias úteis.</li>
          <li><strong>Agendamento:</strong> Quer que a cesta chegue em uma data comemorativa específica? Você pode selecionar a data exata de entrega na página de finalização do pedido.</li>
          <li><strong>Transporte Especializado:</strong> Como trabalhamos com itens artesanais e perecíveis (como queijos e embutidos frescos), nossa frota é 100% climatizada, garantindo que tudo chegue em temperatura ideal e com a apresentação impecável.</li>
          <li><strong>Tentativas de Entrega:</strong> Caso o destinatário não esteja no local, nossa equipe entrará em contato com o comprador para reagendar. Evitamos deixar cestas com perecíveis em portarias sem aviso prévio.</li>
        </ul>
      </div>
    )
  },
  'Formas de Pagamento': {
    titulo: 'Formas de Pagamento',
    conteudo: (
      <div className="space-y-4 text-sm leading-relaxed text-gray-700">
        <p>Garantimos um ambiente de pagamento 100% seguro e criptografado para que você possa presentear com total tranquilidade.</p>
        <ul className="list-disc pl-5 space-y-3">
          <li><strong>PIX:</strong> A forma mais rápida de liberar o seu pedido. A aprovação é imediata e você ainda ganha <strong>5% de desconto</strong> no valor total dos produtos.</li>
          <li><strong>Cartão de Crédito:</strong> Aceitamos as principais bandeiras do mercado (Visa, Mastercard, Elo, Amex, Hipercard). Suas compras podem ser parceladas em até <strong>3x sem juros</strong> ou em até 12x com acréscimo da operadora.</li>
          <li><strong>Faturamento Corporativo:</strong> Para empresas que desejam presentear colaboradores ou clientes em volume, oferecemos faturamento via Boleto Bancário com prazos estendidos, mediante análise cadastral prévia.</li>
        </ul>
      </div>
    )
  },
  'Trocas e Devoluções': {
    titulo: 'Trocas e Devoluções',
    conteudo: (
      <div className="space-y-4 text-sm leading-relaxed text-gray-700">
        <p>Nosso maior compromisso é com a sua total satisfação e a alegria de quem recebe nossas cestas. Nossa política respeita integralmente o Código de Defesa do Consumidor.</p>
        <ul className="list-disc pl-5 space-y-3">
          <li><strong>Produtos Perecíveis:</strong> Devido à natureza sensível dos alimentos frescos, recomendamos que a cesta seja inspecionada no momento da entrega. Caso note qualquer avaria ou alteração, recuse o recebimento e comunique nosso suporte em até 24 horas para substituição imediata.</li>
          <li><strong>Arrependimento (Itens Não Perecíveis):</strong> Para produtos duráveis (como tábuas de madeira, cestos de palha, xícaras e acessórios), você tem o direito de solicitar a devolução em até 7 dias corridos após o recebimento. O item deve estar na embalagem original e sem indícios de uso.</li>
          <li><strong>Estornos:</strong> Os reembolsos são processados na mesma forma de pagamento utilizada na compra, em até 5 dias úteis após a aprovação da devolução pela nossa equipe de qualidade.</li>
        </ul>
      </div>
    )
  },
  'Perguntas Frequentes': {
    titulo: 'Perguntas Frequentes (FAQ)',
    conteudo: (
      <div className="space-y-5 text-sm leading-relaxed text-gray-700">
        <div>
          <h5 className="font-bold text-gray-900 text-base mb-1">1. É possível personalizar os itens de uma cesta pronta?</h5>
          <p>Sim! Além das nossas cestas fechadas, temos a opção "Monte sua Cesta", onde você seleciona individualmente cada produto, a embalagem e até o estilo do laço.</p>
        </div>
        <div>
          <h5 className="font-bold text-gray-900 text-base mb-1">2. Vocês enviam cartão de mensagens junto com o presente?</h5>
          <p>Com certeza. Oferecemos gratuitamente um lindo cartão artesanal. Você digita a mensagem no momento da compra e nós transcrevemos com caligrafia clássica à mão.</p>
        </div>
        <div>
          <h5 className="font-bold text-gray-900 text-base mb-1">3. Vocês possuem opções para restrições alimentares?</h5>
          <p>Sim. Valorizamos a inclusão e possuímos linhas exclusivas de produtos sem glúten, zero lactose, sem adição de açúcares e opções 100% veganas. Basta buscar por essas categorias em nosso catálogo.</p>
        </div>
        <div>
          <h5 className="font-bold text-gray-900 text-base mb-1">4. Como funcionam as encomendas para grandes eventos ou brindes corporativos?</h5>
          <p>Temos um setor exclusivo para B2B. Personalizamos as embalagens com a logo da sua empresa e oferecemos descontos progressivos para compras acima de 10 unidades. Entre em contato pela página "Empresariais" para orçamentos.</p>
        </div>
      </div>
    )
  },
  'Política de Privacidade': {
    titulo: 'Política de Privacidade',
    conteudo: (
      <div className="space-y-4 text-sm leading-relaxed text-gray-700">
        <p>A sua confiança é o nosso ingrediente mais valioso. A SaborRaiz Cestas garante o sigilo total das suas informações e atua em estrita conformidade com a Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018).</p>
        <ul className="list-disc pl-5 space-y-3">
          <li><strong>Coleta e Uso de Dados:</strong> Solicitamos apenas os dados essenciais para o faturamento e entrega do seu pedido. Seu e-mail e telefone são utilizados exclusivamente para enviar atualizações sobre o rastreio da compra e, caso você autorize, novidades e promoções exclusivas.</li>
          <li><strong>Compartilhamento:</strong> Sob nenhuma hipótese vendemos, alugamos ou repassamos seus dados pessoais para terceiros, exceto para as empresas parceiras responsáveis pela logística de entrega.</li>
          <li><strong>Segurança Financeira:</strong> Não armazenamos dados de cartão de crédito em nossos servidores. Todas as transações são processadas em ambiente criptografado (SSL) diretamente pelos gateways de pagamento homologados pelo Banco Central.</li>
        </ul>
      </div>
    )
  }
};