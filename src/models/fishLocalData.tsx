import { Fish } from "./fish.model.tsx";

export const fishData: Fish[] = [
    {
      id: 0,
      name: "Bar",
      scientificName: "Dicentrarchus labrax",
      // category: "Démersaux",
      minSizeCm: "25",
      faoCode: "BSS",
      physicalDescription: "Corps rond, très grosse tête, grande bouche, dos sombre, ventre argenté. Pointe de la pectorale au milieu des 2 dorsales, la 2ème nageoire dorsale et l’anale sont de taille similaire, pinnules jaunes, bordées d’un fin liseré noir, large carène sur le pédoncule caudal.",
      particularity: "Nageoire dorsale vers la tête dotée avec une dizaine de rayons épineux + nageoire anale avec trois épines et 10 ou 12 rayons mous + tâche noire diffuse sur l'opercule + flancs argentés avec le dos et la queue plus sombres. Grandes écailles.",
      mouth:
      {
        id: 0,
        forme: 'terminale modérément protractile'
      },
      bodyType: { id: 0, name: 'oval' },
      fins: [{ id: 0, type: 'caudale', shape: 'échancrée', color: '', size: '' },
        { id: 1, type: 'dorsale', shape: 'double', color: '', size: '' },
        { id: 2, type: 'pectorale', shape: 'longue pointue', color: '', size: '' },
        { id: 3, type: 'pelvienne', shape: 'N/A', color: '', size: 'longue' }
      ],
      eyes: { id: 0, forme: 'rond', size: '', position: '' },
      img: '/api/image/BSS/0',
      additionalImages: [
        { id: 1, url: '/api/image/BSS/1' },
        { id: 2, url: '/api/image/BSS/2' },
        { id: 3, url: '/api/image/BSS/3' },
        { id: 4, url: '/api/image/BSS/4' },
      ]
    },
    {
      id: 1,
      name: "Sparaillon",
      scientificName: "Diplodus annularis",
      // category: "Scombridés",
      minSizeCm: "12",
      faoCode: "ANN",
      physicalDescription: "Corps ovale, dos et ventre bombés, tête courte, la bouche, petite et arrondie se termine en avant de l’œil, petites dents pointues. Couleur bronze-argenté. Les nageoires pelviennes et l’annale sont jaunes, la tâche noire entoure le pédoncule caudal. Confusion possible avec le SAR.",
      particularity: "Nageoire pelvienne et début de la nageoire anale de couleur jaune + tâche sombre en forme d'anneau presque complet sur le pédoncule caudal + coloration générale gris argenté, avec des reflets jaunes. Confusion possible avec le Sar.",
      mouth:
      {
        id: 0,
        forme: 'modérément protractile '
      },
      bodyType: { id: 0, name: 'oval plat' },
      fins: [{ id: 0, type: 'caudale', shape: 'fourchue', color: '', size: '' },
        { id: 1, type: 'dorsale', shape: 'épineuse', color: '', size: '' },
        { id: 2, type: 'pectorale', shape: 'longue pointue', color: '', size: '' },
        { id: 3, type: 'pelvienne', shape: 'N/A', color: 'jaune', size: 'longue' }
      ],
      eyes: { id: 0, forme: 'rond', size: 'gros', position: "à l'avant" },
      img: '/api/image/ANN/0',
      additionalImages: [
        { id: 1, url: '/api/image/ANN/1' },
        { id: 2, url: '/api/image/ANN/2' },
        { id: 3, url: '/api/image/ANN/3' },
        { id: 4, url: '/api/image/ANN/4' },
      ]
    },
    {
      id: 2,
      name: "Sar à Museau Pointu",
      scientificName: "Diplodus puntazzo",
      // category: "Démersaux",
      minSizeCm: "18",
      faoCode: "SHR",
      physicalDescription: "Corps ovale, assez épais, tête petite et museau arrondi, grosses lèvres, dos et ventre arrondis. Couleur argent, bronze et rosé. Il est zébré de 5 bandes larges depuis l’arrière de la tête jusqu’au pédoncule caudal, 1 nageoire dorsale.",
      particularity: "Une seule tâche autour de la nageoire caudale, une dizaine de bandes verticales plus ou moins sombres.",
      mouth:
      {
        id: 0,
        forme: 'petite'
      },
      bodyType: { id: 0, name: 'oval' },
      fins: [{ id: 0, type: 'caudale', shape: 'échancrée', color: 'noir', size: '' },
        { id: 1, type: 'dorsale', shape: 'épineuse', color: '', size: '' },
        { id: 2, type: 'pectorale', shape: 'pointue tâche', color: '', size: '' },
        { id: 3, type: 'pelvienne', shape: 'épineuse', color: '', size: '' }
      ],
      eyes: { id: 0, forme: 'rond', size: '', position: '' },
      img: '/api/image/SHR/0',
      additionalImages: [
        { id: 1, url: '/api/image/SHR/1' },
        { id: 2, url: '/api/image/SHR/2' },
        { id: 3, url: '/api/image/SHR/3' },
        { id: 4, url: '/api/image/SHR/4' },
      ]
    },
    {
      id: 3,
      name: "Sar Commun",
      scientificName: "Diplodus sargus",
      // category: "Démersaux",
      minSizeCm: "23",
      faoCode: "SWA",
      physicalDescription: "Corps ovale, peu épais, tête courte, museau pointu, bouche munie d’incisives coupantes, couleur gris-argenté zébré de rayures verticales noires. Dos rond, 1 nageoire dorsale, les pelviennes sont de couleur blanc et noir, la partie ventrale est moins bombée que chez la dorade grise, il a une tâche noire sur le pédoncule caudal. Il existe plusieurs espèces (à museau pointu, à tête noire... ). Confusion possible avec la dorade grise.",
      particularity: "Tâche noire sur le pédoncule caudal. ",
      mouth:
      {
        id: 0,
        forme: 'pointue petite incisives pointue'
      },
      bodyType: { id: 0, name: 'oval' },
      fins: [{ id: 0, type: 'caudale', shape: 'échancrée', color: '', size: '' },
        { id: 1, type: 'dorsale', shape: 'épineuse', color: '', size: '' },
        { id: 2, type: 'pectorale', shape: 'pointue', color: '', size: '' },
        { id: 3, type: 'pelvienne', shape: '', color: 'différence de coloration bien marquée : noire en bas et claire en haut', size: '' }
      ],
      eyes: { id: 0, forme: 'rond', size: '', position: '' },
      img: '/api/image/SWA/0',
      additionalImages: [
        { id: 1, url: '/api/image/SWA/1' },
        { id: 2, url: '/api/image/SWA/2' },
        { id: 3, url: '/api/image/SWA/3' },
        { id: 4, url: '/api/image/SWA/4' },
      ]
    },
    {
      id: 4,
      name: "Sar à Tête Noire",
      scientificName: "Diplodus vulgaris",
      // category: "Démersaux",
      minSizeCm: "18",
      faoCode: "CTB",
      physicalDescription: "Corps ovale, peu épais, tête pointue, couleur gris-argenté, 1 nageoire dorsale. Il a une tâche noire très marquée sur la nuque et sur le pédoncule caudal. Il existe plusieurs espèces : à museau pointu, commun... ils peuvent être confondus en eux.",
      particularity: "2 barres noires très marquées : sur la nuque et à la base de la nageoire caudale.",
      mouth:
      {
        id: 0,
        forme: 'pointue petite'
      },
      bodyType: { id: 0, name: 'oval' },
      fins: [{ id: 0, type: 'caudale', shape: 'échancrée', color: '', size: '' },
        { id: 1, type: 'dorsale', shape: 'épineuse', color: '', size: '' },
        { id: 2, type: 'pectorale', shape: 'pointue', color: '', size: '' },
        { id: 3, type: 'pelvienne', shape: '', color: 'noir', size: '' }
      ],
      eyes: { id: 0, forme: 'rond', size: '', position: '' },
      img: '/api/image/CTB/0',
      additionalImages: [
        { id: 1, url: '/api/image/CTB/1' },
        { id: 2, url: '/api/image/CTB/2' },
        { id: 3, url: '/api/image/CTB/3' },
        { id: 4, url: '/api/image/CTB/4' },
      ]
    },
    {
      id: 5,
      name: "Anchois",
      scientificName: "Engraulis encrasicolus",
      // category: "Pélagiques / Migrateurs",
      minSizeCm: "9/13",
      faoCode: "ANE",
      physicalDescription: "Corps ovale qui est moins large que la sardine, une tête reconnaissable, l’œil à l’extrémité de la tête, une très grande ouverture des mâchoires, des opercules très larges, dos bleu sombre, à l’examen de la tête on ne peut pas confondre les anchois avec les autres poissons bleus.",
      particularity: "Tâche noire à l'arrière de l'œil, marque dorée sous le museau.",
      mouth:
      {
        id: 0,
        forme: 'conique et mâchoire supérieure proéminente (= bouche supère)'
      },
      bodyType: { id: 0, name: 'oval' },
      fins: [{ id: 0, type: 'caudale', shape: 'fourchue homocerque', color: '', size: '' },
        { id: 1, type: 'dorsale', shape: 'unique', color: '', size: '' },
        { id: 2, type: 'pectorale', shape: 'peu développée', color: '', size: '' },
        { id: 3, type: 'pelvienne', shape: '', color: '', size: 'petite' }
      ],
      eyes: { id: 0, forme: '', size: 'grand', position: 'extrémité de la tête' },
      img: '/api/image/ANE/0',
      additionalImages: [
        { id: 1, url: '/api/image/ANE/1' },
        { id: 2, url: '/api/image/ANE/2' },
        { id: 3, url: '/api/image/ANE/3' },
        { id: 4, url: '/api/image/ANE/4' },
      ]
    },
    {
      id: 6,
      name: "Mérou",
      scientificName: "Mycteroperca rubra",
      // category: "Pélagiques / Migrateurs",
      minSizeCm: '45',
      faoCode: "BSX",
      physicalDescription: "Corps rond, très grosse tête, grande bouche, dos sombre, ventre argenté. Pointe de la pectorale au milieu des 2 dorsales, la 2ème nageoire dorsale et l’anale sont de taille similaire, pinnules jaunes, bordées d’un fin liseré noir, large carène sur le pédoncule caudal.",
      particularity: "Corps recouvert d'écailles rugueuses, même sur la base des nageoires.",
      mouth:
      {
        id: 0,
        forme: 'machoire inférieure proéminente deux rangées de dents  '
      },
      bodyType: { id: 0, name: 'oval' },
      fins: [{ id: 0, type: 'caudale', shape: 'droite', color: '', size: '' },
        { id: 1, type: 'dorsale', shape: "en deux parties : épineuse à l'avant, rayons souples à l'arrière", color: '', size: '' },
        { id: 2, type: 'pelvienne', shape: "épineuse, rayons mous", color: '', size: '' } // position: proches
      ],
      eyes: { id: 0, forme: '', size: 'petit', position: '' },
      img: '/api/image/BSX/0',
      additionalImages: [
        { id: 1, url: '/api/image/BSX/1' },
        { id: 2, url: '/api/image/BSX/2' },
        { id: 3, url: '/api/image/BSX/3' },
        { id: 4, url: '/api/image/BSX/4' },
      ]
    },
    {
      id: 7,
      name: "Marbré",
      scientificName: "Lithognathus mormyrus",
      // category: "Amphihalins",
      minSizeCm: "20",
      faoCode: "SSB",
      physicalDescription: "Corps ovale, épais, grosse tête, œil bien en retrait de la bouche, dos plus bombé que le ventre. Couleur argentée avec des bandes verticales marron, 1 nageoire dorsale. Confusion possible avec le pageot commun.",
      particularity: "Teinte argentée, dos zébré d'une quinzaine de bandes sombres, étroites et verticales.",
      mouth:
      {
        id: 0,
        forme: 'protractile pointu et long plusieurs rangées de dents pointues'
      },
      bodyType: { id: 0, name: 'oval' },
      fins: [{ id: 0, type: 'caudale', shape: 'fourchue échancrée', color: '', size: '' },
        { id: 1, type: 'dorsale', shape: 'unique, longue et épineuse, ses 3ères épines sont graduellement croissantes', color: '', size: '' },
        { id: 2, type: 'pelvienne', shape: 'épineuse, rayons mous', color: '', size: '' }
      ],
      eyes: { id: 0, forme: '', size: '', position: 'bien en retrait de la bouche' },
      img: '/api/image/SSB/0',
      additionalImages: [
        { id: 1, url: '/api/image/SSB/1' },
        { id: 2, url: '/api/image/SSB/2' },
        { id: 3, url: '/api/image/SSB/3' },
        { id: 4, url: '/api/image/SSB/4' },
      ]
    },
    {
      id: 8,
      name: "Merlu Commun",
      scientificName: "Merluccius merluccius",
      // category: "Démersaux",
      minSizeCm: "20",
      faoCode: "HKE",
      physicalDescription: "Corps rond, épais, grande tête et grande bouche munie de petites dents acérées, la mâchoire se termine sous le milieu de l’œil. Dos marron sombre à gris suivant le mode de pêche, ventre argenté, 2 nageoires dorsales longues, ligne latérale fine et sombre. Confusion possible avec le merlan de chalut.",
      particularity: "Crêtes osseuses sur le dessus de la tête.",
      mouth:
      {
        id: 0,
        forme: 'prognathe, grande et fendue de carnassier, grandes dents pointues et à mandibule proéminente, intérieur foncé'
      },
      bodyType: { id: 0, name: 'rond' },
      fins: [{ id: 0, type: 'caudale', shape: 'arrondie ronde', color: '', size: '' },
        { id: 1, type: 'dorsale', shape: "double nageoire dorsale, 1ère triangulaire et courte, 2nde longue et plus haute à l'arrière", color: '', size: '' }
      ],
      eyes: { id: 0, forme: 'rond', size: '', position: '' },
      img: '/api/image/HKE/0',
      additionalImages: [
        { id: 1, url: '/api/image/HKE/1' },
        { id: 2, url: '/api/image/HKE/2' },
        { id: 3, url: '/api/image/HKE/3' },
        { id: 4, url: '/api/image/HKE/4' },
      ]
    },
    {
      id: 9,
      name: "Rouget Barbet de Roche",
      scientificName: "Mullus surmuletus",
      // category: "Benthiques",
      minSizeCm: "11",
      faoCode: "MUR",
      physicalDescription: "Corps ovale, tête moyenne, la bouche se termine à la perpendiculaire de l’avant de l’œil, front busqué, dos et flancs rouge dégradé, ventre blanc, 2 nageoires dorsales zébrées et colorées, 3 lignes longitudinales jaunes visibles sur les flancs (sur les poissons pêchés aux filets). œil rouge, iris noir, présence de 2 longs barbillons blancs. Peuvent être confondus avec le rouget du Sénégal, le rouget à tâche noire... Les rougets pêchés au chalut sont très souvent abîmés.",
      particularity: "Juvéniles de couleur bleue, corps avec de grosses écailles, bouche avec 2 barbillons mentonniers qui peuvent se loger dans une gouttière.",
      mouth:
      {
        id: 0,
        forme: 'subterminale, modérément protractile, de petite taille'
      },
      bodyType: { id: 0, name: 'oval' },
      fins: [{ id: 0, type: 'caudale', shape: 'fourchue arrondie', color: 'jaune', size: '' },
        { id: 1, type: 'dorsale', shape: 'double, la première a 8 épines et est marquée de bandes marron et jaune', color: 'jaune', size: '' }
      ],
      eyes: { id: 0, forme: '', size: '', position: '' }, // couleur: Oeil rouge et iris noir
      img: '/api/image/MUR/0',
      additionalImages: [
        { id: 1, url: '/api/image/MUR/1' },
        { id: 2, url: '/api/image/MUR/2' },
        { id: 3, url: '/api/image/MUR/3' },
        { id: 4, url: '/api/image/MUR/4' },
      ]
    },
    {
      id: 10,
      name: "Pageot Acarné",
      scientificName: "Pagellus acarne",
      // category: "Démersaux",
      minSizeCm: "17",
      faoCode: "SBA",
      physicalDescription: "Corps ovale, pas très épais, tête plus fine que chez les autres sparidés, la bouche à l’aplomb du milieu de l’œil, le dos et les nageoires sont rouge orangé, 1 nageoire dorsale, il a une petite tâche noire sur la nageoire pectorale. Confusion possible avec avec la dorade rose (tâche noire sur la ligne latérale) et le pageot commun.",
      particularity: "1 tâche noire ou rouge sombre à la base haute de la nageoire pectorale. Couleur grisâtre, reflets rosés, flancs plus clairs, bosse de la tête rosatre.",
      mouth:
      {
        id: 0,
        forme: "terminale, orangée à l'intérieur, plusieurs rangées de petites dents à l'avant des machoires, et à l'arrière plusieurs séries de molaires"
      },
      bodyType: { id: 0, name: 'oval' },
      fins: [{ id: 0, type: 'caudale', shape: 'fourchue', color: 'rose, orange', size: '' },
        { id: 1, type: 'dorsale', shape: 'simple', color: "translucide à reflets rosatres, peut être bordée d'orange sombre", size: '' },
        { id: 2, type: 'pelvienne', shape: '', color: "peut être bordée de blanc, nageoire translucide à reflets rosatres", size: '' }
      ],
      eyes: { id: 0, forme: '', size: 'moyenne', position: '' },
      img: '/api/image/SBA/0',
      additionalImages: [
        { id: 1, url: '/api/image/SBA/1' },
        { id: 2, url: '/api/image/SBA/2' },
        { id: 3, url: '/api/image/SBA/3' },
        { id: 4, url: '/api/image/SBA/4' },
      ]
    },
    {
      id: 11,
      name: "Dorade Rose",
      scientificName: "Pagellus bogaraveo",
      // category: "Démersaux",
      minSizeCm: "40",
      faoCode: "SBR",
      physicalDescription: "Corps ovale, assez épais, tête courte, bouche à l’aplomb de l’avant de l’œil qui est gros, dos et ventre arrondis, elle a une tâche noire sur la ligne latérale. Le dos est rouge orangé ainsi que les nageoires pectorales et caudale, la partie ventrale est argentée. Confusion possible avec le pageot acarne et le pageot commun.",
      particularity: "1 tâche noire à la base haute de la ligne latérale. Dos rougeatre, flancs blanc argenté, ventre blanc, nageoires roses. Juvéniles de couleur blanche.",
      mouth:
      {
        id: 0,
        forme: 'terminale '
      },
      bodyType: { id: 0, name: 'oval' },
      fins: [{ id: 0, type: 'caudale', shape: 'fourchue', color: 'rose', size: '' }],
      eyes: { id: 0, forme: '', size: 'grand', position: '' },
      img: '/api/image/SBR/0',
      additionalImages: [
        { id: 1, url: '/api/image/SBR/1' },
        { id: 2, url: '/api/image/SBR/2' },
        { id: 3, url: '/api/image/SBR/3' },
        { id: 4, url: '/api/image/SBR/4' },
      ]
    },
    {
      id: 12,
      name: "Pageot Commun",
      scientificName: "Pagellus erythrinus",
      // category: "Démersaux",
      minSizeCm: "15",
      faoCode: "PAC",
      physicalDescription: "Corps ovale, grosse tête, museau pointu et allongé, œil bien en retrait de la bouche, marque rouge foncé sur l’opercule. Couleur rose et argentée, 1 nageoire dorsale. Confusion possible avec la dorade rose, le pageot acarne, le pagre.",
      particularity: "1 tâche rougeatre à la base des pectorales, des fois une tâche à la base des derniers rayons de la nageoire dorsale. Couleur rose argenté avec des reflets bleutés, petits points bleus sur la partie supérieur du corps, dos et dessus de tête plus foncés. Jeunes plus rosés que les adultes. Bord externe de l'opercule marqué d'un rouge carmin.",
      mouth:
      {
        id: 0,
        forme: "petite position basse et inclinée dents pointues et à l'arrière 2/3 rangées de molaires"
      },
      bodyType: { id: 0, name: 'oval' },
      fins: [{ id: 0, type: 'caudale', shape: 'fourchue', color: '', size: '' },
        { id: 1, type: 'dorsale', shape: 'simple, épineuse, 12 épines et 10 à 11 rayons mous', color: '', size: '' },
        { id: 2, type: 'pectorale', shape: 'longue', color: '', size: '' },
        { id: 3, type: 'pelvienne', shape: 'épines et rayons mous ', color: '', size: 'longue' } // position: Rapprochée des pectorales
      ],
      eyes: { id: 0, forme: '', size: 'diamètre inférieur à la longueur du museau', position: '' },
      img: '/api/image/PAC/0',
      additionalImages: [
        { id: 1, url: '/api/image/PAC/1' },
        { id: 2, url: '/api/image/PAC/2' },
        { id: 3, url: '/api/image/PAC/3' },
        { id: 4, url: '/api/image/PAC/4' },
      ]
    },
    {
      id: 13,
      name: "Pagre Commun",
      scientificName: "Pagrus pagrus",
      // category: "Démersaux",
      minSizeCm: "18",
      faoCode: "RPG",
      physicalDescription: "Corps ovale, massif. Grosse tête, front busqué, l’œil en retrait de la bouche, une ligne rouge sombre sur l’opercule. De couleur rose/rouge et argentée. Ligne latérale plus sombre et légèrement arquée, les nageoires pectorales sont longues, 1 nageoire dorsale, la caudale a des tâches blanches aux extrémités.",
      particularity: "",
      mouth:
      {
        id: 0,
        forme: ''
      },
      bodyType: { id: 0, name: 'oval' },
      fins: [{ id: 0, type: 'caudale', shape: 'échancrée', color: '', size: '' },
        { id: 1, type: 'dorsale', shape: 'épineuse', color: '', size: '' },
        { id: 2, type: 'pectorale', shape: 'longue pointue', color: '', size: '' },
        { id: 3, type: 'pelvienne', shape: 'épineuse', color: '', size: 'longue' }
      ],
      eyes: { id: 0, forme: '', size: '', position: '' },
      img: '/api/image/RPG/0',
      additionalImages: [
        { id: 1, url: '/api/image/RPG/1' },
        { id: 2, url: '/api/image/RPG/2' },
        { id: 3, url: '/api/image/RPG/3' },
        { id: 4, url: '/api/image/RPG/4' },
      ]
    },
    {
      id: 14,
      name: "Cernier Atlantique",
      scientificName: "Polyprion americanus",
      // category: "EEP",
      minSizeCm: "45",
      faoCode: "WRF",
      physicalDescription: "Corps ovale, très épais, tête osseuse, un décroché entre le front et le dos, mandibule saillante, très grande bouche, couleur grise, ligne latérale fine, 1 dorsale, toutes les nageoires sont sombres, 2 épines anales. Confusion très facile avec le mérou.",
      particularity: "",
      mouth:
      {
        id: 0,
        forme: 'machoire inférieure proéminente'
      },
      bodyType: { id: 0, name: 'oval' },
      fins: [{ id: 0, type: 'caudale', shape: 'arrondie', color: '', size: '' },
        { id: 1, type: 'dorsale', shape: 'double', color: '', size: '' }
      ],
      eyes: { id: 0, forme: '', size: '', position: '' },
      img: '/api/image/WRF/0',
      additionalImages: [
        { id: 1, url: '/api/image/WRF/1' },
        { id: 2, url: '/api/image/WRF/2' },
        { id: 3, url: '/api/image/WRF/3' },
        { id: 4, url: '/api/image/WRF/4' },
      ]
    },
    {
      id: 15,
      name: "Sardine",
      scientificName: "Sardina pilchardus",
      // category: "Pélagiques / Migrateurs",
      minSizeCm: "11",
      faoCode: "PIL",
      physicalDescription: "Corps ovale, épais, couleur bleue / verte, argentée, 1 nageoire dorsale, la mâchoire s’arrête sous le milieu de l’œil, les opercules sont striés marqués en leur milieu d’un petit point noir. Les écailles se détâchent facilement et on observe alors des tâches noires sur la ligne latérale.",
      particularity: "Corps blanc et noir.",
      mouth:
      {
        id: 0,
        forme: 'terminale'
      },
      bodyType: { id: 0, name: 'oval' },
      fins: [{ id: 0, type: 'caudale', shape: 'échancrée', color: '', size: '' },
        { id: 1, type: 'dorsale', shape: 'simple', color: '', size: '' },
        { id: 2, type: 'pectorale', shape: '', color: '', size: '' }, // position: basse,
        { id: 3, type: 'pelvienne', shape: '', color: '', size: '' } // position: Attachée sur la base de la nageoire dorsale
      ],
      eyes: { id: 0, forme: '', size: '', position: '' },
      img: '/api/image/PIL/0',
      additionalImages: [
        { id: 1, url: '/api/image/PIL/1' },
        { id: 2, url: '/api/image/PIL/2' },
        { id: 3, url: '/api/image/PIL/3' },
        { id: 4, url: '/api/image/PIL/4' },
      ]
    },
    {
      id: 16,
      name: "Maquereau",
      scientificName: "Scomber scombrus",
      // category: "Pélagiques / Migrateurs",
      minSizeCm: "18",
      faoCode: "MAC",
      physicalDescription: "Corps ovale, lisse, épais, couleurs variées, dos bleu, gris, vert, rayures noires, ventre argenté, petites écailles, 2 nageoires dorsales, pectorales courtes, présence de pinnules. Il peut être confondu très facilement avec le maquereau blanc (ex espagnol).",
      particularity: "Dos vert-bleu zébré de lignes sombres.",
      mouth:
      {
        id: 0,
        forme: ''
      },
      bodyType: { id: 0, name: 'oval' },
      fins: [{ id: 0, type: 'caudale', shape: 'échancrée', color: '', size: '' },
        { id: 1, type: 'dorsale', shape: 'épineuse', color: '', size: '' },
        { id: 2, type: 'pelvienne', shape: 'une seule nageoire', color: '', size: 'courte' }
      ],
      eyes: { id: 0, forme: "couvert d'une paupière", size: 'grand', position: '' },
      img: '/api/image/MAC/0',
      additionalImages: [
        { id: 1, url: '/api/image/MAC/1' },
        { id: 2, url: '/api/image/MAC/2' },
        { id: 3, url: '/api/image/MAC/3' },
        { id: 4, url: '/api/image/MAC/4' },
      ]
    },
    {
      id: 17,
      name: "Sole Commune",
      scientificName: "Solea vulgaris",
      // category: "Benthiques",
      minSizeCm: "20",
      faoCode: "SOL",
      physicalDescription: "Corps plat et ovale, petite tête, couleur beige à marron, selon son biotope présence de tâches noires sur le dos, ventre blanc, très petites écailles. Une tâche noire sur la pectorale, 1 dorsale qui commence de la queue et se termine au niveau du milieu de l’œil. Elle peut être confondue avec la sole sénégalaise, blonde ou les céteaux.",
      particularity: "Tâche noire à l'extrémité de la nageoire pectorale. Face du dessous de couleur blanche.",
      mouth:
      {
        id: 0,
        forme: 'bouche située à droite du corps'
      },
      bodyType: { id: 0, name: 'plat' },
      fins: [{ id: 0, type: 'caudale', shape: 'arrondie', color: '', size: '' },
        { id: 1, type: 'dorsale', shape: 'simple', color: '', size: '' },
        { id: 2, type: 'pectorale', shape: '', color: 'tâche noire', size: '' },
        { id: 3, type: 'pelvienne', shape: 'arrondie et bordée de petites barbilles', color: '', size: '' }
      ],
      eyes: { id: 0, forme: '', size: '', position: "oeil gauche du côté droit de l'animal" },
      img: '/api/image/SOL/0',
      additionalImages: [
        { id: 1, url: '/api/image/SOL/1' },
        { id: 2, url: '/api/image/SOL/2' },
        { id: 3, url: '/api/image/SOL/3' },
        { id: 4, url: '/api/image/SOL/4' },
      ]
    },
    {
      id: 18,
      name: "Dorade Royale",
      scientificName: "Sparus aurata",
      // category: "EEP",
      minSizeCm: "20",
      faoCode: "SBG",
      physicalDescription: "Corps ovale, tête colorée (jaune, noire, orange sur l’opercule), la bouche est à l’aplomb de l’avant de l’œil, une ‘’couronne’’ est bien visible au niveau des yeux, dos arrondi, ventre plat, couleur argenté clair à sombre, 1 nageoire dorsale, et une ligne sombre sur l’ extrémité de la caudale.",
      particularity: "Bande dorée au niveau du front et grande tâche noire allongée au niveau de l'opercule. Front bombé.",
      mouth:
      {
        id: 0,
        forme: 'petite et arquée'
      },
      bodyType: { id: 0, name: 'oval' },
      fins: [{ id: 0, type: 'caudale', shape: 'fourchue', color: '', size: '' },
        { id: 1, type: 'dorsale', shape: 'épineuse', color: '', size: '' },
        { id: 2, type: 'pelvienne', shape: 'Implanté dans le même axe que la nageoire pectorale', color: '', size: '' }
      ],
      eyes: { id: 0, forme: 'rond', size: 'petit', position: '' },
      img: '/api/image/SBG/0',
      additionalImages: [
        { id: 1, url: '/api/image/SBG/1' },
        { id: 2, url: '/api/image/SBG/2' },
        { id: 3, url: '/api/image/SBG/3' },
        { id: 4, url: '/api/image/SBG/4' },
      ]
    },
    {
      id: 19,
      name: "Chinchard",
      scientificName: "Trachurus trachurus",
      // category: "Pélagiques / Migrateurs",
      minSizeCm: "15",
      faoCode: "HOM",
      physicalDescription: "Corps ovale, épais, la bouche se termine à l’aplomb du milieu de l’œil, couleurs : bleue, gris verdâtre, argentée, tâches noires à l’arrière des opercules, 2 nageoires dorsales, les pectorales dépassent la 2ème dorsale, 2 courtes mais fortes épines anales. Les lignes latérales du chinchard sont constituées d’écailles épaisses en chevrons : les scutelles sont plus larges que chez le HMM, présence de lignes latérales secondaire longues. Les différentes espèces de chinchards se distinguent par la hauteur des scutelles et la position de la brisure de la ligne latérale.",
      particularity: "Couleur argentée plus foncée sur le haut, tâche noire au niveau des opercules.",
      mouth:
      {
        id: 0,
        forme: 'protractile'
      },
      bodyType: { id: 0, name: 'oval' },
      fins: [{ id: 0, type: 'caudale', shape: 'fourchue', color: '', size: '' },
        { id: 1, type: 'dorsale', shape: 'double', color: '', size: '' },
        { id: 2, type: 'pectorale', shape: 'longue fine', color: '', size: '' },
        { id: 3, type: 'pelvienne', shape: 'très rapprochée des nageoires pectorales', color: '', size: 'longue' }
      ],
      eyes: { id: 0, forme: 'rond', size: '', position: '' },
      img: '/api/image/HOM/0',
      additionalImages: [
        { id: 1, url: '/api/image/HOM/1' },
        { id: 2, url: '/api/image/HOM/2' },
        { id: 3, url: '/api/image/HOM/3' },
        { id: 4, url: '/api/image/HOM/4' },
      ]
    }
  ];