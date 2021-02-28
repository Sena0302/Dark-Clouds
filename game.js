

const textElement = document.getElementById('text')
const btnsElement = document.getElementById('option-buttons')

 





function start() {
  state = {}
  displayText(1)
}



function displayText(textStuffIndex) {
  const textStuff = textStuffs.find(textStuff => textStuff.id === textStuffIndex)
  textElement.innerText = textStuff.text
  while (btnsElement.firstChild) {
    btnsElement.removeChild(btnsElement.firstChild)
  }

  textStuff.options.forEach(option => {
    if (displayOption(option)) {
      const button = document.createElement('button')
      button.innerText = option.text
      button.classList.add('btn')
      button.addEventListener('click', () => chooseOption(option))
      btnsElement.appendChild(button)
    }
  })
}


function chooseOption(option) {
  const nexttextStuffId = option.nextText
  if (nexttextStuffId <= 0) {
    return start()
  }
  state = Object.assign(state, option.setState)
  displayText(nexttextStuffId)
}

function displayOption(option) {
  return option.requiredState == null || option.requiredState(state)
}



const textStuffs = [
  {
    id: 1,
  
    text: 'Du wachst in einer verlassenen Lagerhalle auf. Ein Messer und eine Atemmaske liegen neben dir.',
    options: [
      {
        text: 'Du nimmst beides an dich.',
        setState: { beides: true },
        nextText: 2
      },
      {
        text: 'Du nimmst nichts davon.',
        nextText: 2
      },
    
    ]
  },
  {
    id: 2,
    text: 'Es ist noch Dunkel draußen.',
    options: [
      {
        text: 'Du entscheidest dich zu warten, bis es hell wird.',
        
        nextText: 3
      },
      {
        text: 'Du verlässt die Lagerhalle',
     
        nextText: 4
      },
     
    ]
  },

  {
    id: 3,
    text: 'Es vergehen Stunden, doch keine Spur von der Sonne oder etwas Licht.',
    options: [
      {
        text: 'Du verlässt die Lagerhalle.',
        nextText: 4
      },
      {
        text: 'Du wartest weiterhin.',
        nextText: 5
      },
     
    ]
  },
  {
    id: 4,
    text: 'Dunkle Wolken verdecken den gesamten Himmel und lassen keinen Lichtstrahl hindurch. Vor dir erstreckt sich trockenes Ödland und nicht nur das... deine Lungen fangen an zu brennen.',
    options: [
      {
        text: 'Setze die Atemmaske auf.',
        requiredState: (currentState) => currentState.beides,
        setState: { beides:false},
        nextText: 7
      },
      {
        text: 'Schau dich um.',
        nextText: 6
      }
    ]
  },
  {
    id: 5,
    text: 'Tage vergehen und du verhungerst.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },

  {
    id: 6,
    text: 'Nach bereits zwei Minuten ist das Brennen nicht mehr auszuhalten. Deine Sicht verschwimmt. Bevor du nach der Maske greifen kannst, geben deine Beine nach. Ein letzter qualvoller Atemzug.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },

  {
    id: 7,
    text: 'Du wanderst lange umher, doch die Welt bleibt dunkel. Die Wolken sind an jeder Stelle unnatürlich dicht. Nach Stunden erreichst du eine Kleinstadt. Sie ist nur noch mit Ungeziefern und Staub bewohnt. Du entdeckst einen kleinen Supermarkt, eingebrochen, aber nicht ganz ausgeplündert.',
    options: [
      {
        text: 'Schau dich um und hol dir etwas Nahrung.',
        nextText: 9
      },
      {
        text: 'Ignorier es.',
        nextText: 12
      }
    ]
  },

  {
    id: 8,
    text: 'Dunkle Wolken verdecken den gesamten Himmel und lassen keinen einzigen Lichstrahl hindurch. Vor dir erstreckt sich trockenes Ödland und nicht nur das... deine Lungen fangen an zu brennen.',
    options: [
      {
        text: 'Schau dich um.',
        nextText: 6
      },

      {
        text: 'Gehe zurück zur Lagerhalle.',
        nextText: 1
      }
    ]
  },

  {
    id: 9,
    text: 'Du wirst im Supermarkt fündig. Du findest Konservierungsdosen und Wasserflaschen. Doch du kannst dich nichtall zu lange freuen. Die Tür wird aufgestoßen. Vier fremde Männer mit denselben Atemmasken stehen vor dir. Und sie sind bis zu den Zähnen bewaffnet.',
    options: [
      {
        text: 'Greif sie an.',
        nextText: 10
      },

       {
        text: 'Begrüße sie.',
        nextText: 13
      },

       {
        text: 'Renn weg.',
        nextText: 14
      },
    ]
  },

  {
    id: 10,
    text: 'Gegen vier Männer kommst du nicht an, selbst mit einem Messer nicht. Und sie halten nicht zurück. RIP.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },

  {
    id: 12,
    text: 'Die Kleinstadt besitzt nur einen Supermarkt: So schnell wirst du woanders keine Nahrung finden.',
    options: [
      {
        text: 'Gehe zurück zum Supermarkt.',
        nextText: 9
      },

        {
        text: 'Du kannst dein Magenknurren gut ignorieren.',
        nextText: 5
      }

    ]
  },
  {
    id: 13,
    text: 'Skeptisch beäugen sie dich. Einer tritt hervor und stellt sich als der Anführer vor "Ich bin Devan und das sind meine Soldaten. Bist du allein oder gehörst du zu einer Gruppe Überlebender?"',
    options: [
      {
        text: '"Überlebende? Was redest du da?" Du erklärst ihnen dass du keine Ahnung hast und nicht verstehst was passiert ist. Du erinnerst dich an nichts.',
        nextText: 15
      },

      {
        text: '"Meine Gruppe ... hat sich aufgelöst." Du lügst.',
        setState: { freund:false },
        nextText: 15
      },

       {
        text: '"Ich bin alleine." Mehr brauchen sie nicht zu wissen.',
        setState: { freund:false },
        nextText: 15
      }
    ]
  },

  {
    id: 14,
    text: 'Du rennst durch den gesamten Laden und findest einen Hinterausgang. Einer der Männer schreit dir verwirrt hinterher "Wieso rennst du weg? Wir sind Menschen!".',
    options: [
      {
        text: 'Du fühlst dich etwas dämlich und bleibst stehen. Niemand rennt dir hinterher. Peinlich berührt gehst du wieder in den Supermarkt.',
        nextText: 13
      },
      {
        text: 'Du rennst so weit bis dich deine Füße tragen. Bald kannst du nicht mehr und musst Rast halten, dabei trinkst du dein ganzes Wasser.',
        setState: { unfreund:true },
        nextText: 16
      }
    ]
  },

  {
    id: 15,
    text: 'Devan und seine Soldaten trauen dir nicht ganz. "Wir können dich mitnehmen, wenn du möchtest. Unsere Gemeinde ist zwar klein, aber sie heißt jeden Menschen mit offenen Armen willkommen. Natürlich, aber nur wenn du dein Messer aushändigst."',
    options: [
      {
        text: 'Du weigerst dich und sie lassen dich zurück.',
       setState: { unfreund:true },
        nextText: 16
      },
      {
        text: 'Du gibst ihnen deinen Messer und folgst ihnen heraus. Zu fünft quetscht ihr euch in einen Volvo. Die Fahrt dauert drei Stunden.',
        setState: {freund:true},
        nextText: 17
      }
    ]
  },

    {
    id: 16,
    text: 'Wo auch immer du bist, es ist die Pampa. Die Kleinstadt lag isoliert und du überlegst oft einfach zurck zulaufen und deine Tage dort zu verbringen. Doch dann entdeckst du ein Schild am Straßenrand. "Für die Einsamen und verlorenen, Gemeinde Laststation. 20 Kilometer.',
    options: [
      {
        text: '20 Kilometer werden dich ungefähr Acht stunden Kosten. Dein Essen reicht dafür aus.',
        nextText: 17
      },
      {
        text: 'Du entscheidest dich dem Schild nicht zu folgen.',
        nextText: 16.1
      }
    ]
  },

  {
    id: 16.1,
    text: ' Du hast kein Essen und Trinken mehr. Und du bist zu weit von der Kleinstadt und der Gemeinde entfernt um dir Nachschub zu holen. Das wird ein langsamer, qualvoller Tod.',
    options: [
      {
        text: 'Restart.',
        nextText: -1
      }
  
    ]
  },

   {
    id: 17,
    text: 'Die Gemeinde besteht aus heruntergekommen Häusern und einem Haufen Menschen mit Atemmasken. Niemand hinterfragt deine Anwesenheit. Ein alter Mann, der in den Himmel starrt erlangt deine Aufmerksamkeit.',
    options: [
      {
        text: 'Du sprichst ihn an.',
        setState: { Wissen:true },
        nextText: 18
      },
      {
        text: 'Du ignorierst ihn.',
        setState: { Unwissen:true },
        nextText: 22
      }
    ]
  },

  {
    id: 18,
    text: '"Oh, ein neues Gesicht! Wie kann ich dir helfen?',
    options: [
      {
        text: '"Wo sind die ganzen Menschen?"',
        nextText: 19
      },

      {
        text: '"Wieso trägt jeder eine Maske?"',
        nextText: 20
      },

       {
        text: '"Wie sind diese Wolken entstanden?"',
        nextText: 20
      }
    ]
  },

   {
    id: 19,
    text: '"Menschen? Da siehst du sie. So viele sind übriggeblieben. Es gibt weitere Gemeinden und Gruppen von Überlebenden, doch auch sie besitzen auch nur eine handvoll Leute. Das Gift in der Luft kriegt jeden, die Atemmasken verzögern nur das Unaufhaltsame."',
    options: [
      {
        text: '"Wie sind diese Wolken entstanden?"',
        nextText: 20
      }
    
    ]
  },

     {
    id: 20,
    text: 'Der alte Mann wird ganz nervös und fangt an zu stottern. "Oh, oh ja, die Wolken! Schlimme Sache, ganz schlimme Sache. Vergiften die Luft. Werk dieser... dieser Wesen, sag ich dir!"' ,
      options: [ 
      {
        text: '"Wesen?"',
        nextText: 21
      },
      {
        text: 'Du lässt ihn in Ruhe.',
        nextText: 22

      },
  
    ]
  },

  {
    id: 21,
    text: '"Oh, wir reden nicht über sie! Wir reden niemals über sie." Der alte Mann beginnt mit seinem Oberkörper hin und her zu wippen. Seine Augen wirr und glasig. Er ist nicht mehr ansprechbar.' ,
      options: [ 
      {
        text: 'Du lässt ihn in Ruhe.',
        nextText: 22

      },

       {
        text: 'Du versuchst ihn zu beruhigen.',
        nextText: 23
      }
  
    ]
  },

    {
    id: 22,
    text: 'Du triffst wieder auf die Männer aus dem Supermarkt. Devan und seine Soldaten, wie du erfahren hast. Sie beschützen die kleine Gemeinde mit eigener Faust.' ,
      options: [ 
      {
        text: 'Du begrüßt sie und fragst sie was sie vorhaben.',
        requiredState: (currentState) => currentState.freund,
        setState: { freund: false },
        nextText: 24
      },

       {
        text: 'Du ignorierst sie.',
       nextText: 30
      },

       {
        text: 'Du entschuldigst dich für vorhin.',
        requiredState: (currentState) => currentState.unfreund,
        setState: { unfreund:false },
       nextText: 22.1
      },
  
    ]
  },

  {
    id: 22.1,
    text: 'Sie verzeihen dir in dem sie dich auslachen.' ,
      options: [ 
      {
        text: 'Du fragst sie was sie vorhaben.',
        nextText: 24
      },

       {
        text: 'Du verziehst dich beleidigt.',
        setState: {freund: false},
       nextText: 30
      },

      
  
    ]
  },

  {
    id: 23,
    text: 'Der alte Mann rennt weg.' ,
      options: [ 
      {
        text: 'Du lässt ihn in Ruhe.',
        nextText: 22
      },
    ]
  },

   {
    id: 24,
    text: '"Heute? Nichts mehr." Erklärt Devan, der Anführer. "Der Wind ist zu Stark und wirbelt das Gift wild herum, das wird den Filterungen unserer Atemmasken zusetzen. Doch morgen ist es soweit. Morgen greifen wir sie an".' ,
      options: [ 
      {
        text: 'Diese Wesen? Wieso?',
        requiredState: (currentState) => currentState.Wissen,
           setState: { Wissen: false },
        nextText: 24.1
      },
  {
        text: 'Wen?',
        requiredState: (currentState) => currentState.Unwissen,
           setState: { Unwissen: true },
        nextText: 24.1
      },


       {
        text: '"Okay. Na dann, viel Spaß."',
        nextText: 30
      },

    {
        text: '"Alles klar, ich komm mit!"',
        nextText: 24.2
      },

        ]
  },

      {
    id: 24.1,
    text: '"Aliens, Wesen, Dämonen. Nenn sie wie du möchtest. Sie versuchen uns zu vergiften und keiner weiß genau warum. Ich habe mal gehört, das ihr Anführer es liebt Planeten zu sammeln. Sie nennen ihn den Imperator. So ein idiotischer Titel. Das hier soll nicht sein erstes Genozid sein. Also, bist du dabei? ".' ,
      options: [ 
      {
        text: '"Natürlich!"',
        nextText: 24.2
      },

       {
        text: '"Nein, danke."',
        nextText: 30
      }
    ]
  },

   

{
    id: 24.2,
    text: 'Der Anführer lässt dich in seiner Hütte übernachten und am nächsten Morgen fährt ihr gesträrkt los. Die Wesen wurden vor ein paar Tagen unweit von der Gemeinde gesichtet. Du erfährst, das sie bereits von den Männern angegriffen wurden, doch ein paar haben es geschafft zu fliehen. Die Männer suchen seit ihren letzten Angriff nach den letzten Überlebenden. Devan erklärt, das sie manchmal zwischen den Wolken herabsteigen, um sich ihr grausames Werk anzuschauen. Das sind die einzigen Momente in denen Menschen sie angreifen können. Nach mehreren Stunden fahrt erkennst du einen Haufen verbeulten Metall in der Ferne. Ein fremdes Flugobjekt.' ,
      options: [ 
      {
        text: 'Sage nichts.',
        nextText: 24.3
      },

       {
        text: 'Überrede Devan stehen zu bleiben. Wenn sich diese Wesen in der Nähe aufhalten, dann werden sie euren schicken Volvo hören.',
        nextText: 26
      }
    ]
  },

  {
    id: 24.3,
    text: 'Etwas knallt! Das Auto schlittert wie verrückt über die Straße und die Welt steht mit einem Mal auf dem Kopf. Der Volvo ist umgekippt. Du versuchst durch ein zerstörtes Fenster zu kriechen, aber die schwere Gestalt von einen der Männer liegt bewusstlos auf dir. Draußen ertönen Schritte.' ,
      options: [ 
      {
        text: 'Kämpf dich raus!',
        nextText: 24.5
      },

       {
        text: 'Halte Still und spiele tot.',
        nextText: 24.6
      }
    ]
  },



  {
    id: 24.5,
    text: 'Du hast es geschafft! Aber die Freude hält nur kurz. Gestalten in schwarzen ganzkörper Anzügen haben dich umzingelt. Devan hat auf der Fahrt erwähnt, das keiner weiß wie die Wesen wirklich aussehen. Nur die Wesen können sich aus den Anzügen befreien, doch kein Mensch ist je Zeuge davon geworden.' ,
      options: [ 
      {
        text: 'Greif sie an! Es sind nur drei.',
        nextText: 24.7
      },

       {
        text: 'Versuch wegzurennen!',
        nextText: 24.8
      }
    ]
  },

  {
    id: 24.6,
    text: 'Die Tür wird aufgerissen. Mit der Spitze seiner Waffe geht eines der Wesen sicher, das auch niemand bei Bewusstsein ist. Du spürst das kalte Metall an deiner Schläfe und dein Herz rast. "Das ist doch...!" Die Waffe berührt dich nicht mehr, aber dafür greifen urplötzlich Hände nach dir.' ,
      options: [ 
      {
        text: 'Kämpfe dagegen an!',
        nextText: 24.8
      },

       {
        text: 'Halte still',
        nextText: 24.9
      }
    ]
  },

  {
    id: 24.7,
    text: 'Gegen die Mehrzahl der Wesen kommst du nicht an. Einer hebt blitzschnell seine Waffe und deine Innereien fließen auf den Boden! Doch zu deiner Überraschung sind die anderen schockiert. Du hörst sie entsetzt schreien, bevor du stirbst. "Weiß du, wen du gerade umgebracht hast?!"' ,
      options: [ 
      {
        text: 'Restart.',
        nextText: -1
      }
    ]
  },

  {
    id: 24.8,
    text: 'Du schaffst dich zu befreíen, da wird dir eine Waffenspitze vor die Nase gehalten. Sofort greifst du nach deinem Messer, den du auf der Fahrt von Devan bekommen hast. "Lass die Waffe fallen!"',
      
options: [
      {
        text: 'Greif sie an.',
        nextText: 24.9,
      },

       {
        text: 'Lass sie fallen.',
        nextText: 24.9,
      },

    ]
  },

  {
    id: 24.9,
    text: 'Vielleicht bist du doch ein wenig übermütig. Bevor du dich versiehst, spürst du einen explosiven Schmerz am Hinterkopf. Die Welt färbt sich schwarz.',
      
options: [
      {
        text: '...',
        nextText: 25,
      }


    ]
  },

    {
    id: 24.4,
    text: 'Als du zu dir kommst, blendet dich das klare Blau des Himmels. War das alles etwa ein Traum? Aber wo befindest du dich dann jetzt schon wieder? Schnell erkennst du, das du doch tatsächlich im Himmel bist und das dank dem Flugobjekt, der über den Wolken schwebt. Ein Räuspern ertönt hinter dir. Verwirrt drehst du dich um. Ein älterer Mann, der dir ziemlich bekannt vor kommt schaut dich lächelnd an. "Willkommen zuhause, mein Kind."',
      
options: [
      {
        text: 'Wer bist du?',
        nextText: 25.1,
      },

      {
        text: ' Bin ich Tod?',
        nextText: 25.1,
      },


    ]
  },

    {
    id: 25,
    text: 'Als du zu dir kommst, blendet dich das klare Blau des Himmels. War das alles etwa ein Traum? Aber wo befindest du dich dann? Schnell erkennst du, das du doch tatsächlich im Himmel bist und das dank dem Flugobjekt, der über den Wolken schwebt. Ein Räuspern ertönt hinter dir. Verwirrt drehst du dich um. Ein älterer Mann, der dir ziemlich bekannt vor kommt schaut dich lächelnd an. "Willkommen zuhause, mein Kind."',
      
options: [
      {
        text: 'Wer bist du?',
        nextText: 25.1,
      },

      {
        text: ' Bin ich Tod?',
        nextText: 25.1,
      },


    ]
  },

  {
    id: 25.1,
    text: 'Der Mann lacht. "Sie haben dir ziemlich zugeschlagen. Aber keine Sorge, jetzt bist du sicher. Trotzdem werden diese Ungeziefer dafür zahlen. Niemand wagt es ungestraft den Kind, des großen Imperators anzugreifen!',
      
options: [
      {
        text: 'Fin',
        nextText: -1,
      },


    ]
  },



//Strang 1 Ende






//Strang 2


  {
    id: 26,
    text: 'Devan hört auf dich und ihr haltet an. Zusammen mit deinen Freunden steigst du aus und einer überreicht dir dein Messer und eine Schießwaffe. Du entdeckst eine lange improvisierte Nagelsperre auf der Straße, die kaum zwischen dem Geröll auffällt. Das war knapp gewesen! "Dort." Flüsterst du Devon zu. Zwischen ausgetrockneten Büschen und Bäumen huschen dunkle Schatten.' ,
      options: [ 
      {
        text: '"Umzingeln wir sie."',
        nextText: 26.1
      },

       {
        text: 'Renn wild drauf los und schieß.',
        nextText: 24.7
      }
    ]
  },
 

 {
    id: 26.1,
    text: 'Zusammen verteilt ihr euch auf leisen Sohlen um die Wesen herum, die ahnungslos dennoch aufmerksam die Straße beobachten. Die Wesen sind eingepackt mit dicken, schwarzen Anzügen. Das Gift muss auch für sie tödlich sein. Devan hat auf der Fahrt erwähnt, das keiner weiß wie die Wesen wirklich aussehen. Nur die Wesen können sich aus den Anzügen befreien, doch kein Mensch ist je Zeuge davon geworden. Mit gehobener Waffe näherst du dich bis einer aufsieht. Statt die Hände zu heben, zieht er eine fremdartige Waffe hervor. Du hälst deinen Atem an, bereit zu schießen, da donnert Devan dem Wesen eine Kugel in den Schädel. Sofort springen die anderen auf die Füße, doch es zu spät. Nacheinander fallen sie tod zu boden, angeschossen. Nur einer hebt die Arme in Ergebenheit.' ,
      options: [ 
      {
        text: 'Töte es.',
        nextText: 26.2
      },

       {
        text: 'Nimmt es gefangen.',
        nextText: 26.3
      }
    ]
  },

  {
    id: 26.2,
    text: 'Leblos fällt es zu Boden. "Ein dutzend weniger. Gut gemacht Männer. Morgen machen wir weiter!" Devan klopft dir auf die Schulter. Du versuchst zu lächeln, aber es fühlt sich falsch an. Erinnerungen von einem warmen Lächeln eines älteren Mannes kommen dir in den Sinn. Dein Vater. Der...',
    options: [ 
      {
        text: '"Imperator." FIN',
        nextText: -1
      },
    ]
  },

  //Strang 2 Ende

  //Strang 3

  {
    id: 26.3,
    text: 'Das Wesen, das ihr entwaffnet und mit einem Seil festbindet, schiebt ihr in den Kofferraum des Autos. Du bemerkst, dass das Wesen in deine Richtung schaut.',
     options: [ 
      {
        text: 'Ignorier es.',
        nextText: 26.4
      },

      {
        text: '"Was schaust du so?".',
        nextText: 26.5
      }
    ]
  },

  {
    id: 26.4,
    text: 'Die Fahrt zurück verläuft ruhig, aber du wirst das Gefühl nicht los das etwas nicht stimmt. Devan verspricht dir mit einem Lächeln, das er dir als Belohnung morgen bei seiner nächsten Nahrungssuche etwas besonders schmackhaftes bringen wird, aber selbst das beruhigt dein unruhiges Gemüt nicht.',
     options: [ 
      {
        text: 'Suche das Wesen später im geheimen auf.',
        nextText: 26.6
      },

      {
        text: 'Vergiss es.',
        nextText: 30.4
      }
    ]
  },

  {
    id: 26.5,
    text: 'Das Wesen zögert. "Du musst deine Erinnerungen verloren haben..." Erstaunt willst du mehr fragen, doch Devan knallt den Kofferraum zu. "Ich verstehe nie, was diese Aliens von sich geben. So eine beschissen eigenartige Sprache." Du bist überrascht, lässt dir aber nichts anmerken. Wieso kannst du die Wesen verstehen? Devan verspricht dir mit einem Lächeln, das er dir als Belohnung morgen bei seiner nächsten Nahrungssuche etwas besonders schmackhaftes bringen wird, aber selbst das beruhigt dein unruhiges Gemüt nicht.',
     options: [ 
      {
        text: 'Suche das Wesen später im geheimen auf.',
        nextText: 26.6
      },

      {
        text: 'Vergiss es.',
        nextText: 30.4
      }
    ]
  },

  {
    id: 26.6,
    text: 'Es ist dunkel wie immer, aber die meisten schlafen. Du schleichst dich in die Hütte mit den stabilsten Wänden, das als Gefängnis für das Wesen dient. Es ist wach. "Ich habe auf dich gewartet."',
    options: [ 
      {
        text: 'Woher kennst du mich?.',
        nextText: 26.7
      },

      {
        text: 'Was willst du von mir?',
        nextText: 26.7
      }
    ]
  },

  {
    id: 26.7,
    text: '"Ich bin nicht dein Feind. Und du gehörst nicht hier her. Wenn du mir hilfst, dann zeige ich dir alles."',
    options: [ 
      {
        text: 'Vertrau ihm.',
        nextText: 26.8
      },

      {
        text: 'Weigere dich.',
        nextText: 26.9
      }
    ]
  },

  {
    id: 26.8,
    text: 'Du hilfst es aus der Hütte. "Du hast doch nicht geglaubt, das wir ihn unbewacht lassen." Devan steht vor dir.',
    options: [ 
      {
        text: 'Renn zusammen mit dem Wesen weg.',
        nextText: 27
      },

        {
        text: 'Hebe deine Waffe.',
        nextText: 28
      },


      {
        text: 'Erkläre, das du die Wesen verstehen kannst.',
        nextText: 28
      }
    ]
  },

{
    id: 26.9,
    text: '"Dann komm näher. Du willst sicherlich wissen, wieso du mich verstehen kannst."',
    options: [ 
      {
        text: 'Du hast dein Messer bei dir und bist überzeugt, das du es gegen es aufnehmen kannst sollte es Probleme bereiten. Du tritts näher.',
        nextText: 24.9
      },

        {
        text: 'Du bleibst wo du bist.',
        nextText: 27.1
      },

         ]
  },

{
    id: 27.1,
    text: '"Wenn du nicht einmal das tun kannst, dann kann ich dir nicht helfen."',
    options: [ 
      {
        text: 'Du gibst nach, das Messer griffbereit für den Notfall.',
        nextText: 24.9
      },

        {
        text: 'Du verlässt die Hütte.',
        nextText: 27.2
      },

  
    ]
  },

  {
    id: 27.2,
    text:' Zu deiner Überraschung steht Devan vor der Hütte und grinst dich an. "Wolltest dem Scheißer angst machen, hm?" Devan klopft dir auf die Schulter. Du versuchst zu lächeln, aber es fühlt sich falsch an. Erinnerungen von einem warmen Lächeln eines älteren Mannes kommen dir in den Sinn. Dein Vater. Der...',
    options: [ 
      {
        text: '"Imperator." FIN',
        nextText: -1
      },
    ]
  },

  {
    id: 27,
    text:'Ihr könnt Devan abschütteln, doch ihr habt nicht viel Zeit. Ihr seid zu Fuß und Devan und seine Freunde haben einen Volvo. Doch das Wesen scheint nicht besorgt. "Keine Sorge. Gleich sollte ein Schiff ankommen. Wir haben den ganzen Tag darauf gewartet, bevor die Menschen uns angegriffen haben." Er vermeidet es zu erwähnen, das auch du sie angegriffen hast. Es dauert nicht lange und die Wolken teilen sich wirklich für einen Moment. Du siehst glitzernde Sterne, die jedoch gleich wieder von den Wolken verdeckt werden. Riesige Flugobjekte steigen aus dem Himmel. Du hörst die Menschen von weiten schreien.',
    options: [ 
      {
        text: 'Ignorier sie.',
        nextText: 27.3
      },

         {
        text: 'Renn zurück.',
        nextText: 28
      },
    ]
  },

  {
    id: 27.3,
    text:'Das Flugobjekt landet direkt vor deiner Nase. Mehr Wesen in schwarzen Anzügen steigen aus und sind erfreut dich zu sehen. "Du lebst! Dein Vater, unser geliebter Imperator, war dabei den Planeten auf den Kopf zu stellen, um dich zu finden!"',
    options: [ 
      {
        text: 'FIN',
        nextText: -1
      }
    ]
  },

//Strang 3 Ende


{
    id: 28,
    text:'"Du Verräter!" Devan hebt seine Waffe. Du hast nicht einmal Zeit um zu reagieren.',
    options: [ 
      {
        text: 'Fail. Restart',
        nextText: -1
      }
      ]
  },




//Strang 4

{
    id: 30,
    text:'Die Menschen in der Gemeinde schmeißen Devan und seinen Soldaten ein kleines Fest. Morgen werden sie ihren Rachezug ausüben und die restlichen Wesen erledigen, die ihren letzten Angriff überlebt haben.',
    options: [ 
      {
        text: 'Finde jemanden, der dir erkärt wer diese Wesen sind.',
        requiredState: (currentState) => currentState.Unwissen,
        setState: {Unwissen:true},
        nextText: 30.2
      },

       {
        text: 'Feier mit.',
      
        nextText: 30.4
      },

      {
        text: 'Du suchst dir einen Schlafplatz.',
        nextText: 30.4

      }

     
      ]
  },
{
    id: 30.2,
    text:'Du findest Kinder, die lebhaft herum spielen.',
    options: [ 
      {
        text: 'Sprich sie an.',
        
        nextText: 30.3
      },

       {
        text: 'Ignorier sie und such dir einen Schlafplatz.',
          nextText: 30.4
      },

     
      ]
  },

{
    id: 30.3,
    text: '"Oh, ein neues Gesicht! Was willst du?',
    options: [
      {
        text: '"Wo sind die ganzen Menschen?"',
        nextText: 30.5
      },

      {
        text: '"Wieso trägt jeder eine Maske?"',
        nextText: 30.6
      },

       {
        text: '"Wie sind diese Wolken entstanden?"',
        nextText: 30.6
      }
    ]
  },

   {
    id: 30.5,
    text: '"Menschen? Da siehst du sie. So viele sind übrig geblieben. Es gibt weitere Bezirke, doch die besitzen auch nur eine Handvoll Leute. Opa sagt, das Gift in den Luft kriegt jeden zu fassen, die Atemmasken verzögern nur das Unaufhaltsame."',
    options: [
      {
        text: '"Wie sind diese Wolken entstanden?"',
        nextText: 30.6
      }
    
    ]
  },

     {
    id: 30.6,
    text: 'Die Kinder werden ganz nervös und fangen an zu stottern. "Wolken? Oh, oh ja, die Wolken! Schlimme Sache, ganz schlimme Sache. Vergiften die Luft. Werk dieser... dieser Wesen!"' ,
      options: [ 
      {
        text: '"Wesen?"',
        nextText: 30.7
      },
      {
        text: 'Du lässt sie in Ruhe und suchst dir einen Schlafplatz.',
        nextText: 30.4

      },
  
    ]
  },

  {
    id: 30.7,
    text: '"Oh, wir dürfen nicht über sie reden! Wir reden niemals über sie!" Die Kinder schauen sich panisch um. Ein paar Erwachsene schenken ihnen warnenden Blicke.' ,
      options: [ 
      {
        text: 'Du lässt sie in Ruhe und suchst dir einen Schlafplatz.',
        nextText: 30.4

      },

       {
        text: 'Du versuchst sie zu beruhigen.',
        nextText: 30.6
      },

      ]

    },

      {
    id: 30.6,
    text: 'Die Kinder rennen weg.' ,
      options: [ 
      {
        text: 'Du suchst dir einen Schlafplatz.',
        nextText: 30.4

      }

      ]

    },


      {
    id: 30.4,
    text: 'Der Frieden hält nicht lange. Als Devan und seine Soldaten am nächsten Tag losfahren, dauert es nicht lange bis die Hölle ausbricht. Du kannst deinen Augen nicht trauen, aber die Wolken teilen sich. Für einen kurzen Moment siehst du das strahlenden blau des Himmels, bevor es schon wieder von etwas bedeckt wird. Ein gewaltiges Flugobjekt. In dem Moment kommt Devan her gerannt, blutig und mit den Kräften zu Ende. Angestrengt fängt er an zu Keuchen: "Hinterhalt... Bastarde haben ... alle tot." Er fällt um, bewusstlos und unwissend das er die Wesen hergelockt hat.' ,
      options: [ 
      {
        text: 'Versteck dich!',
        nextText: 31

      },

        {
        text: 'Stell dich gegen die Wesen!',
        nextText: 31.2

      }

      ]

    },

    {
    id: 31,
    text: 'Du versteckst dich und siehst dabei zu, wie das Flugobjekt sicher landet. Menschen schreien und wissen nicht wohin, den bald folgen immer mehr Flugobjekte die die Gemeinde umzingeln. Devan und seine Soldaten waren wohl für eine lange Zeit ein Dorn im Auge für die Wesen. Gestalten in schwarzen ganzekörper Anzügen verlassen das Flugobjekt und fangen an auf die Menschen zu schießen. Du siehst wie Kinder und ein älterer Mann blutig erschossen werden.' ,
      options: [ 
      {
        text: 'Stell dich gegen sie und kämpfe!',
        nextText: 31.2

      },

        {
        text: 'Du hast freie Bahn zu einen der Flugobjekte! Versuch dein Glück und fliehe!',
        nextText: 31.3

      }

      ]

    },

     {
    id: 31.2,
    text: 'Tapfer rennst auf einen der Wesen zu. Du triffst ihn an der Brust, doch dein Heldentum bleibt nicht für lange. Einer der Wesen schießt dir in den Rücken.' ,
      options: [ 
      {
        text: 'Fail. Restart.',
        nextText: -1

      },

   

      ]

    },

    {
    id: 31.3,
    text: 'Du hast es geschafft! Du hast dich in einen der Flugobjekte geschliechen! Unsicher setzt du dich auf den Pilotensitz und versuchst den Kontrolldisplay zu entziffern. Aber warte... das brauchst du nicht. Mit geübten Touchberührungen schwebt das Flugobjekt bereits in der Luft! Erfreut steuerst du das Objekt über die Wolken. Aber woher weißt du es zu steuern? Es fühlt sich beinahe wie eine Muskelerinnerung an... Mit leichtigkeit schwebst du zwischen den Wolken hinauf und staunst nicht schlecht. Der blaue Himmel ist atemberaubend, aber so auch das große Mutterschiff, das aus einer riesigen Röhre dunkles Gas heraus stößt... so entstehen also die Wolken. "Wer bist du?!" Erschrocken drehst du dich um. Ein Wesen zielt mit seiner Waffe auf dich, doch es schießt nicht. "Warte, du..."' ,
      options: [ 
      {
        text: 'Greif es an.',
        nextText: 24.9

      },

      {
        text: 'Hör es dir an.',
        nextText: 31.4

      },


   

      ]

    },

    {
    id: 31.4,
    text: '"Da bist du ja! Der Imperator wird erfreut sein!".' ,
      options: [ 
      {
        text: '"Der Imperator?',
        nextText: 31.5

      },

       {
        text: '"Woher kennst du mich?',
        nextText: 31.5

      },

   

      ]

    },

      {
    id: 31.5,
    text: '"Machst du Witze? Du bist das leibeigene Kind des Imperators! Du wurdest bei deiner letzten Inspektion von diesen Ungeziefern angegriffen! Aber keine Sorge bald ist dieser Planet bereinigt und wir werden ein neues und besseres daraus machen. Ohne diese garstigen Menschen! Wir sollten schnell zum Imperator! Er wird sich freuen, wenn er dich sieht!"' ,
      options: [ 
      {
        text: "Setze dich wieder auf den Pilotensitz.",
        nextText: 31.6

      },

       {
        text: 'Lass das Wesen dich zum Mutterschiff fliegen.',
        nextText: 31.7

      },

   

      ]

    },

     {
    id: 31.6,
    text: 'Du bist das Kind des Imperators. Und dieser Imperator ist der Anführer dieser... Wesen. Du kannst...',
    options: [ 
      {
        text: "...endlich Nachhause.",
        nextText: 31.7

      },

       {
        text: '... die Schuld nicht ertragen. Dein Vater und dein Volk und auch du sind für ein Genozid verantwortlich.',
        nextText: 31.8

      }

   

      ]

    },

    {
    id: 31.7,
    text: 'Der Imperator, dein Vater, lächelt dich warm an, als er dich endlich in den Armen hält. "Die Menschen haben dir ziemlich zugeschlagen. Aber keine Sorge, jetzt bist du sicher. Diese Ungeziefer werden dafür zahlen. Niemand wagt es ungestraft das Kind des großen Imperators anzugreifen!"' ,
    options: [ 
      {
        text: "Fin",
        nextText: -1

      },

    
   

      ]

    },

     {
    id: 31.8,
    text: 'Du steurst dein Schiff direkt auf das Mutterschiff zu. Dein Ziel: die große Röhre, die das Gift in der Luft verursacht. Kurz vor den Aufprall schließt du die Augen. Das ist das mindeste, was du tun kannst. ',
    options: [ 
      {
        text: "Fin.",
        nextText: -1

      }

    
   

      ]

    }



//Strang 4 Ende
      

  
    



]

start()