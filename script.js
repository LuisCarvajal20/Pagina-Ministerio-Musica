

  const cancionesPorCantante = {
    wilson: [
      {
        titulo: "Tu me sustentas",   //hay que utilizar los backtics para hacer los saltos de linea `
        tono: "A",
        letra: `
        Que mis manos se desgasten tocando para ti
        que mis ojos se desvanescan mirandote a ti
        y que mis pies solo se cansen caminando por ti
        y que mi voz pueda adorarte eternamente (x2bis)

        Rey de reyes señor de señores 
        vida de mi vida 
        sustento de mi amor (x2bis)

        Tu me sustentas rey (x4bis)

        Que manos solos sirvan a ti
        y que mis pies solo caminen por ti 
        y que mi voz solo sea para ti 
        y que todo lo que soy 
        te alabe te alabe y que mis manos
        solo sirvan a ti y que pies solo9 caminen pór ti
        y que mi voz solo sea para ti y que todo los que soy te alabe 

        Rey de reyes señor de señores 
        vida de mi vida 
        sustento de mi amor (x4bis)
         
        Tu me sustentas rey (x4bis)
         `,
        acordes: `
        Intro: A-C#m7-D-Dm (E)
        coro: A-D-E
        Puente:A-F#m-Bm-D-E
        `
      },
      {
        titulo: "En tu Presencia",
        tono: "B",
        letra: `verso
        Digno es el cordero de Dios
        De recibir adoración
        De la muerte él nos salvo
        Con su amor él nos libero
        Compraste con tu sangre
        Todo un pueblo para Dios
        
        verso
        
        Tu estas aquí, tu estas qui
        Tu estas aquí, tu estas qui
        Puedo sentir tu corazón
        Latiendo en mí, sanándome
        Puedo sentir tu gran amor
        Entrando en mi cambiándome
        
        coro
        Toda la gloria Jesús
        Poder, riqueza y majestad
        Sentado en el trono celestial
        Bajo sus pies la tierra esta
        Toda la gloria 
        
        De toda raza pueblo y nación
        Tuyo es todo el poder`,
        acordes: `Intro:(F#) E-F#-B 
        Pre-coro:B-F#-E-F#
        coro: B-E
        Puente-compraste: E-F#-G#m-D#m-E-F#-G#m-E-F#
        `
      },
      {
        titulo: "Gloria a Dios", 
        tono: "A",  
        letra: `
        Gloria, gloria a Dios en el cielo
        y en la tierra paz a los hombres que aman al señorrr
        por tu inmensa gloria te alabamos
        te grarificamos te damos gracias
        amennnn amennn Gloria a Dios en el cieloo
        y en la tierra paz a los hombres que ama el señor
        `,
        acordes: `G  C  D  G `
      }
    ],
    juan: [
      {
        titulo: "Alma Misionera",
        tono: "A",
        letra: "Señor toma mi vida nueva...",
        acordes: "D  A  Bm  G"
      }
    ],
    luis: [
      {
        titulo: "Santo es el Señor",
        tono: "A",
        letra: "Santo, Santo, Santo es el Señor...",
        acordes: "A  E  D  A"
      }
    ],
    antonela:[
      {
        titulo: "Tu me sustentas",
        tono: "A",
        letra: "Que mis manos se desgasten tocando para ti...",
        acordes: "A  E  D  Dm"
      }
    ]
  };
  // Cargar canciones al HTML

  const btnInicio = document.getElementById("btn-inicio");
  const contenedor = document.getElementById("lista-canciones");
  const tituloCantante =document.getElementById("titulo-cantante");
  const input =document.getElementById("buscador");
  
  btnInicio.addEventListener("click",()=>{
      location.reload();
  });


  function normalizarTexto(texto) {
    return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  }
  //resalta las coincidencias
  function resaltarCoincidencias(textoOriginal, terminoBuscado) {
    const normalizadoOriginal = normalizarTexto(textoOriginal);
    const normalizadoTermino = normalizarTexto(terminoBuscado);
  
    if (!normalizadoTermino) return textoOriginal;
  
    const partes = [];
    let i = 0;
  
    while (i < textoOriginal.length) {
      const segmentoOriginal = textoOriginal.slice(i);
      const segmentoNormalizado = normalizadoOriginal.slice(i);
  
      if (segmentoNormalizado.startsWith(normalizadoTermino)) {
        const matchLength = terminoBuscado.length;
        const originalMatch = textoOriginal.slice(i, i + matchLength);
  
        partes.push(`<span class="resaltado">${originalMatch}</span>`);
        i += matchLength;
      } else {
        partes.push(textoOriginal[i]);
        i++;
      }
    }
  
    return partes.join('');
  }





  let cancionesMostradas=[];  // aquí guardamos las canciones activas
  const ContenedorBtn =document.getElementById("contenerdor-btnes");    
  function mostrarCanciones(nombre) {
    cancionesMostradas = cancionesPorCantante[nombre];
    contenedor.style.display="block";
    ContenedorBtn.style.display="none";
    input.style.display="block";
    input.value= "";
    tituloCantante.textContent="Canciones "+nombre;
    renderizarCanciones(cancionesMostradas);

  }
  function renderizarCanciones(lista, texto = "") {
    const contenedor = document.getElementById("lista-canciones");
    contenedor.innerHTML = "";

    if (lista.length === 0) {
      const mensaje = document.createElement("div");
      mensaje.className = "mensaje-vacio";
      mensaje.textContent = "No se encontraron canciones.";
      contenedor.appendChild(mensaje);
      return; // detenemos aquí
    }



    lista.forEach(cancion => {
      const tituloHTML = resaltarCoincidencias(cancion.titulo, texto);
      const letraHTML = resaltarCoincidencias(cancion.letra, texto);
  
      const div = document.createElement("div");
      div.className = "cancion";
      div.innerHTML = `
        <h2>${tituloHTML}</h2>
        <div class="transponer-container">
                 <span class="tono-original">Tono original: ${cancion.tono}</span>
                 <label>Transportar a:
                 <select class="tonoSelect">
                 ${tonos.map(t => `<option value="${t}" ${t === cancion.tono ? "selected" : ""}>${t}</option>`).join("")}
                 </select>
                 </label>
        </div>
        <pre class="acordes">${cancion.acordes}</pre>
        <pre class="letra colapsada">${letraHTML}</pre>
        <button class="toggle-letra">Ver más...</button>
      `;
      contenedor.appendChild(div);
    });
    setTimeout(() => {
      document.querySelectorAll(".tonoSelect").forEach((select, i) => {
        const divCancion = select.closest(".cancion");
        const acordesPre = divCancion.querySelector(".acordes");
        const cancion = lista[i]; // ← usamos el índice para tomar la canción original
        const tonoOriginal = cancion.tono;
  
        select.addEventListener("change", () => {
          const tonoNuevo = select.value;
          acordesPre.textContent = transportarAcordePorTono(
            cancion.acordes,
            tonoOriginal,
            tonoNuevo
          );
        });
      });
    }, 0);
    //para el botton de ver mas.. en la letra
    setTimeout(() => {
      document.querySelectorAll(".toggle-letra").forEach(boton => {
        boton.addEventListener("click", () => {
          const letra = boton.previousElementSibling;
    
          letra.classList.toggle("colapsada");
    
          if (letra.classList.contains("colapsada")) {
            boton.textContent = "Ver más...";
          } else {
            boton.textContent = "Ver menos";
          }
        });
      });
    }, 0);
    
  }
  
  // evento para filtrar canciones al escribir
  input.addEventListener("input", e => {
    const texto = normalizarTexto(e.target.value);

    const filtradas = cancionesMostradas.filter(c => {
     return normalizarTexto(c.titulo).includes(texto) ||
           normalizarTexto(c.letra).includes(texto);
    });

    renderizarCanciones(filtradas, e.target.value); // usamos el texto original aquí
  });
  //para transportar tonos
const tonos = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

function transportarAcordePorTono(acorde, tonoOriginal, tonoNuevo) {
  const regex = /([A-G](#)?)(m|maj7|7|sus2|sus4|dim|aug|add9|6|9|11|13)?/g;
  const indexOriginal = tonos.indexOf(tonoOriginal);
  const indexNuevo = tonos.indexOf(tonoNuevo);

  if (indexOriginal === -1 || indexNuevo === -1) return acorde;

  const pasos = indexNuevo - indexOriginal;

  return acorde.replace(regex, (match, base, alter, sufijo = "") => {
    let index = tonos.indexOf(base);
    if (index === -1) return match;

    let nuevaIndex = (index + pasos + 12) % 12;
    return tonos[nuevaIndex] + (sufijo || "");
  });
  
}
  
  