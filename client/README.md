# Portfólio de Cinema & Publicidade - Guia de Customização

Este é um portfólio premium de alto impacto para **Diretores de Cinema e Videomakers**, construído utilizando **Astro**, **GSAP (ScrollTrigger)**, **Lenis (Smooth Scroll)** e **Curtains.js (WebGL Shaders)**.

O design visual, transições fluidas e efeitos de distorção de lentes WebGL já estão completamente programados e otimizados. Este documento serve como guia prático para alterar apenas o conteúdo (textos, vídeos e links) para o portfólio final.

---

## 📁 Estrutura de Conteúdo Principal

As principais áreas para edição de conteúdo estão localizadas na pasta `src/components/`:

- `Hero.astro` — Tela de entrada com o vídeo de fundo em loop e o botão de Showreel.
- `About.astro` — Textos da seção "Sobre" e imagem do set com efeito parallax.
- `Portfolio.astro` — Seção horizontal com os cards de projetos e modal de vídeo.
- `Services.astro` — Lista de especialidades (Edição, Direção, Cor) com imagens flutuantes de preview.
- `Contact.astro` — Seção de fechamento, links de rodapé e formulário de contato.

---

## 🎥 1. Como Mudar os Vídeos

Os vídeos de portfolio rodam localmente na pasta `public/videos/` para evitar bloqueios de CORS, buffering ou links externos quebrados.

### Passo a Passo:
1. Exporte seus vídeos em formato **MP4 comprimido** (recomendado usar codec H.264, resolução 1080p, com taxa de bits menor que 5-10MB para carregamento instantâneo).
2. Substitua os arquivos dentro de `public/videos/`:
   - `video1.mp4` — Vídeo exibido no Projeto 1.
   - `video2.mp4` — Vídeo exibido no Projeto 2.
   - `video3.mp4` — Vídeo exibido no Projeto 3.
   - `video4.mp4` — Vídeo exibido no Projeto 4 e de fundo no cabeçalho (Hero).
3. Se desejar adicionar mais projetos ou usar caminhos diferentes, altere os atributos `data-video-url` e as tags `<source src="...">` dentro de `src/components/Portfolio.astro`.

---

## 💼 2. Como Mudar as Imagens do Portfolio e Serviços

As imagens estáticas funcionam como "Capa" antes do hover do mouse. Elas são puxadas por URLs do Unsplash no momento, mas você pode usar imagens locais colocadas na pasta `public/images/`.

### Alterando Capas de Projeto:
No arquivo `src/components/Portfolio.astro`, localize cada tag `<img>`:
```html
<img src="/images/sua-capa.jpg" alt="Descrição do Projeto" class="project-img">
```

### Alterando Previews das Especialidades:
No arquivo `src/components/Services.astro`, localize os atributos `data-image-url`:
```html
<div class="service-item" data-image-url="/images/sua-preview.jpg">
```

---

## 📝 3. Como Mudar os Textos (Títulos e Descrições)

Todos os textos estão escritos em HTML/Astro puro, facilitando a edição. Graças ao sistema de animações que criamos, **qualquer texto que você alterar nos títulos manterá as animações de slide revelador palavra por palavra automaticamente**.

- **Sobre (Sobre o Estúdio)**: Abra `src/components/About.astro` e mude os parágrafos `<p class="about-lead">` e `<p class="about-body">`.
- **Especialidades (O que fazemos)**: Abra `src/components/Services.astro` e mude os títulos `<h3>` e parágrafos `<p>` de cada bloco.
- **Projetos**: Abra `src/components/Portfolio.astro` e edite os títulos `<h3>` e as tags `<span class="project-category">`.

---

## ✉️ 4. Como Mudar Redes Sociais, E-mail e Telefone

No final de `src/components/Contact.astro`, na tag `<footer>`, edite os blocos de contato:

- **E-mail**:
  ```html
  <a href="mailto:seu-email@dominio.com" class="footer-link">seu-email@dominio.com</a>
  ```
- **Telefone**:
  ```html
  <a href="tel:+5511999998888" class="footer-link">+55 (11) 99999-8888</a>
  ```
- **Redes Sociais** (Links do Vimeo, YouTube, Instagram, etc.):
  Edite os links `<a>` na div `<div class="footer-social-links">`.

---

## ⚙️ 5. Comandos do Projeto (Astro)

Utilize seu terminal na pasta `/client` para gerenciar o projeto:

| Comando | Função |
| :--- | :--- |
| `npm run dev` | Inicia o servidor local em `http://localhost:4321` |
| `npm run build` | Compila o site para produção na pasta `/dist` |
| `npm run preview` | Testa localmente a pasta de produção compilada `/dist` |

*Dica: Sempre que fizer alterações finais e for subir o site para hospedagem (Vercel, Netlify ou Hostgator), certifique-se de rodar `npm run build` para consolidar o código compilado.*
