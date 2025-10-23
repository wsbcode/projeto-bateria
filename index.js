document.body.addEventListener("keyup", (event) => {
   // Adiciona um ouvinte que detecta quando qualquer tecla do teclado é solta
   playSound(event.code.toLowerCase()); // Chama a função playSound, passando o nome da tecla em letras minúsculas (ex: "keya")
});

document.querySelector(".composer button").addEventListener("click", () => {
   // Escuta o clique no botão dentro da área com classe ".composer"
   let song = document.querySelector("#input").value; // Pega o valor digitado pelo usuário no campo de texto com id="input"
   if (song !== "") {
      // Verifica se o campo não está vazio
      let songArray = song.split(""); // Se tiver algo, divide a string em letras individuais e forma um array (ex: "abc" → ["a","b","c"])
      playComposition(songArray); // Chama a função que toca a sequência das letras digitadas
   }
});

function playSound(sound) {
   // Função que toca o som correspondente à tecla
   let audioElement = document.querySelector(`#s_${sound}`); // Seleciona o elemento de áudio que tem o ID igual a "s_keya", "s_keyb", etc
   let keyElement = document.querySelector(`div[data-key='${sound}']`); // Seleciona o botão visual (elemento HTML) que representa a tecla, usando o atributo data-key

   if (audioElement) {
      // Se o áudio foi encontrado...
      audioElement.currentTime = 0; // Reinicia o áudio (caso ele esteja em meio à execução)
      audioElement.play(); // Toca o som
   }

   if (keyElement) {
      // Se o botão visual foi encontrado...
      keyElement.classList.add("active"); // Adiciona a classe "active" para ativar a animação da tecla (ex: mudança de cor ou efeito visual)
   }

   setTimeout(() => {
      // Aguarda 300 milissegundos...
      if (keyElement) {
         // ...e depois remove a classe "active" para encerrar a animação
         keyElement.classList.remove("active");
      }
   }, 300);
}

function playComposition(songArray) {
   // Função que toca uma sequência de sons com intervalo entre cada um
   let wait = 0; // Variável que controla o tempo de espera entre uma nota e outra

   for (let songItem of songArray) {
      // Para cada letra presente no array (ex: "a", "b", "c")
      setTimeout(() => {
         // Define uma pequena espera antes de tocar o som correspondente
         playSound(`key${songItem}`); // Toca o som usando o nome da tecla (ex: "keya")
      }, wait); // Aguarda o tempo calculado antes de executar

      wait += 250; // Após tocar uma nota, adiciona 250 milissegundos de espera para a próxima — assim a música não sai toda ao mesmo tempo
   }
}
