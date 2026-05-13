const ALLOWED_PLACE_TYPES = ['bar', 'teatro', 'rua'];
const DEFAULT_LATITUDE = -25.4284;
const DEFAULT_LONGITUDE = -49.2733;

function normalizePlaceType(value = '') {
    const normalized = String(value || '').trim().toLowerCase();
    if (ALLOWED_PLACE_TYPES.includes(normalized)) return normalized;
    return 'bar';
}

function toNumber(value, fallback) {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) return parsed;
    return fallback;
}

function normalizePlaceInput(place = {}) {
    const latitude = toNumber(place?.latitude ?? place?.lat, DEFAULT_LATITUDE);
    const longitude = toNumber(place?.longitude ?? place?.lng, DEFAULT_LONGITUDE);

    return {
        id: String(place?.id || `pl_${Date.now()}`),
        ownerUserId: place?.ownerUserId ? String(place.ownerUserId) : '',
        name: String(place?.name || '').trim(),
        address: String(place?.address || '').trim(),
        type: normalizePlaceType(place?.type),
        latitude,
        longitude,
        lat: latitude,
        lng: longitude,
        vibe: String(place?.vibe || '').trim(),
        heat: String(place?.heat || '').trim(),
        image: place?.image || undefined,
        category: String(place?.category || '').trim(),
        description: String(place?.description || '').trim(),
        nextEvent: String(place?.nextEvent || '').trim(),
        capacity: toNumber(place?.capacity, 0),
    };
}

export const PLACES = [
    normalizePlaceInput({
        id: '202',
        type: 'bar',
        name: 'Porão do Jazz',
        vibe: 'Melancolia',
        heat: 'Morno',
        image: 'https://images.unsplash.com/photo-1514525253440-b393452e8d26?q=80&w=800',
        category: 'Local / Santuário',
        address: 'Centro Histórico, Curitiba - PR',
        description: 'Ambiente intimista com jazz noir, luz baixa e carta especial de drinks.',
        nextEvent: 'Sexta-feira • 22:00',
        capacity: 180,
        latitude: -25.4284,
        longitude: -49.2733,
        ownerUserId: '',
    }),
    normalizePlaceInput({
        id: '204',
        type: 'bar',
        name: 'Inferno Club',
        vibe: 'Euforia',
        heat: 'Ardendo',
        image: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?q=80&w=800',
        category: 'Casa de Show',
        address: 'Rua das Brasas, 147 - Curitiba - PR',
        description: 'Pista intensa, line-up pesado e noites de alta energia.',
        nextEvent: 'Sábado • 23:30',
        capacity: 420,
        latitude: -25.4354,
        longitude: -49.2713,
        ownerUserId: '',
    }),
    normalizePlaceInput({
        id: '301',
        type: 'teatro',
        name: 'Teatro das Sombras',
        vibe: 'Sombras',
        heat: 'Frio',
        image: 'https://images.unsplash.com/photo-1503095392237-fc70339a2881?q=80&w=800',
        category: 'Teatro',
        address: 'Alameda das Máscaras, 90 - Curitiba - PR',
        description: 'Espaço para peças experimentais e performances autorais.',
        nextEvent: 'Domingo • 20:00',
        capacity: 260,
        latitude: -25.44,
        longitude: -49.28,
        ownerUserId: '',
    }),
    normalizePlaceInput({
        id: 'place_oracle_1',
        type: 'bar',
        name: 'Pizzaria Gótica',
        vibe: 'Gótica',
        heat: 'Morno',
        image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=800',
        category: 'Pizzaria',
        address: 'Rua das Sombras, 1313 - Centro',
        description: 'Pizzas artesanais, decoração sombria e noites para bandas intensas.',
        nextEvent: 'Sexta-feira • 19:00',
        capacity: 120,
        latitude: -25.42,
        longitude: -49.27,
        ownerUserId: '',
    }),
    normalizePlaceInput({
        id: 'place_oracle_2',
        type: 'bar',
        name: 'Casa de Rock',
        vibe: 'Rock Clássico',
        heat: 'Ardendo',
        image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=800',
        category: 'Bar',
        address: 'Av. do Amplificador, 45 - Distrito Musical',
        description: 'Palco vibrante, chope gelado e espaço para shows autorais e covers.',
        nextEvent: 'Sábado • 22:00',
        capacity: 300,
        latitude: -25.43,
        longitude: -49.26,
        ownerUserId: '',
    }),
    normalizePlaceInput({
        id: 'place_oracle_3',
        type: 'bar',
        name: 'Clube Underground',
        vibe: 'Underground',
        heat: 'Frio',
        image: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?q=80&w=800',
        category: 'Casa de Shows',
        address: 'Travessa do Subsolo, 77 - Galeria Central',
        description: 'Espaço para experimental, noise, eletrônico e noites fora da curva.',
        nextEvent: 'Sexta-feira • 23:59',
        capacity: 250,
        latitude: -25.45,
        longitude: -49.29,
        ownerUserId: '',
    }),
    normalizePlaceInput({
        id: 'place_dragon',
        type: 'bar',
        name: 'Taverna do Dragão',
        vibe: 'Medieval Folk',
        heat: 'Ardendo',
        image: 'https://images.unsplash.com/photo-1514525253440-b393452e8d26?q=80&w=800',
        category: 'Taverna',
        address: 'Rua dos Bardos, 12 - Bairro Antigo',
        description: 'Canecas de barro, lareira acesa e hidromel artesanal gelado.',
        nextEvent: 'Hoje • 20:00',
        capacity: 150,
        latitude: -25.421,
        longitude: -49.271,
        ownerUserId: '',
    }),
    normalizePlaceInput({
        id: 'place_relampago',
        type: 'bar',
        name: 'Casa do Relâmpago',
        vibe: 'Eletrizante',
        heat: 'Ardendo',
        image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=800',
        category: 'Casa de Shows',
        address: 'Rua dos Tambores, 77 - Centro',
        description: 'Sistema de som potente, iluminação imersiva e line-up focado na nova cena.',
        nextEvent: 'Sexta-feira • 23:00',
        capacity: 220,
        latitude: -25.432,
        longitude: -49.265,
        ownerUserId: '',
    }),
    normalizePlaceInput({
        id: 'place_lunar',
        type: 'bar',
        name: 'Palco Lunar',
        vibe: 'Etéreo',
        heat: 'Morno',
        image: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=800',
        category: 'Café & Palco',
        address: 'Praça da Lua, 8 - Alto da Glória',
        description: 'Voz e violão, recitais e apresentações intimistas ao entardecer.',
        nextEvent: 'Quinta-feira • 18:30',
        capacity: 90,
        latitude: -25.415,
        longitude: -49.26,
        ownerUserId: '',
    }),
    normalizePlaceInput({
        id: 'place_luar_jazz',
        type: 'bar',
        name: 'Luar do Jazz',
        vibe: 'Elegante',
        heat: 'Morno',
        image: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=800',
        category: 'Jazz Club',
        address: 'Alameda dos Improvisos, 88 - Bairro Antigo',
        description: 'Sofisticação em luz azul, mesas à luz de velas e jam sessions inesquecíveis.',
        nextEvent: 'Segunda-feira • 22:30',
        capacity: 140,
        latitude: -25.425,
        longitude: -49.282,
        ownerUserId: '',
    }),
    normalizePlaceInput({
        id: 'place_beco',
        type: 'rua',
        name: 'Beco das Almas',
        vibe: 'Sombria',
        heat: 'Frio',
        image: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?q=80&w=800',
        category: 'Speakeasy',
        address: 'Passagem Oculta, S/N - Subsolo',
        description: 'Coquetelaria enfumaçada, ausência de placas na porta e som selecionado a dedo.',
        nextEvent: 'Sexta-feira • 21:00',
        capacity: 60,
        latitude: -25.438,
        longitude: -49.275,
        ownerUserId: '',
    }),
    normalizePlaceInput({
        id: 'place_cripta',
        type: 'bar',
        name: 'Cripta Sonora',
        vibe: 'Underground',
        heat: 'Ardendo',
        image: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?q=80&w=800',
        category: 'Porão de Ruído',
        address: 'Rua das Criptas, 13 - Subsolo',
        description: 'Paredes brutas, caixas de som empilhadas e liberdade total para distorções.',
        nextEvent: 'Sexta-feira • 22:00',
        capacity: 100,
        latitude: -25.442,
        longitude: -49.288,
        ownerUserId: '',
    }),
    normalizePlaceInput({
        id: 'place_oasis',
        type: 'bar',
        name: 'Oásis de Neón',
        vibe: 'Synthwave',
        heat: 'Ardendo',
        image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=800',
        category: 'Clube Imersivo',
        address: 'Galeria Central, Subsolo 2',
        description: 'Estética oitentista, lasers, fliperamas clássicos e graves sintéticos potentes.',
        nextEvent: 'Sábado • 23:00',
        capacity: 300,
        latitude: -25.431,
        longitude: -49.269,
        ownerUserId: '',
    }),
    normalizePlaceInput({
        id: 'place_templo',
        type: 'bar',
        name: 'Templo do Caos',
        vibe: 'Caótica',
        heat: 'Ardendo',
        image: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?q=80&w=800',
        category: 'Casa de Shows',
        address: 'Rua da Desordem, 666 - Zona Norte',
        description: 'Hardcore, punk e mosh pits insanos. O santuário definitivo para quem busca catarse coletiva.',
        nextEvent: 'Sábado • 22:00',
        capacity: 350,
        latitude: -25.412,
        longitude: -49.255,
        ownerUserId: '',
    }),
    normalizePlaceInput({
        id: 'place_jardim',
        type: 'bar',
        name: 'Jardim dos Sussurros',
        vibe: 'Mística',
        heat: 'Morno',
        image: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=800',
        category: 'Lounge Místico',
        address: 'Bosque Escondido, 7 - Fim da Trilha',
        description: 'Chás de infusão exótica, incensos relaxantes e apresentações de harpa e liras ao ar livre.',
        nextEvent: 'Domingo • 16:00',
        capacity: 80,
        latitude: -25.445,
        longitude: -49.295,
        ownerUserId: '',
    }),
];

export function getAllPlaces() {
    return PLACES.map((place) => ({ ...place }));
}

export function getPlaceById(id) {
    if (!id) return null;
    const found = PLACES.find((place) => place.id === String(id));
    return found ? { ...found } : null;
}

export function createNewPlace(placeData = {}) {
    const normalized = normalizePlaceInput({
        ...placeData,
        id: placeData?.id || `pl_${Date.now()}`,
    });

    if (!normalized.name) {
        throw new Error('Informe o nome do local.');
    }

    if (!normalized.address) {
        throw new Error('Informe o endereço do local.');
    }

    PLACES.unshift(normalized);
    return { ...normalized };
}

export function updatePlace(placeId, placeData = {}) {
    if (!placeId) {
        throw new Error('Informe o local a ser atualizado.');
    }

    const index = PLACES.findIndex((place) => place.id === String(placeId));
    if (index === -1) {
        throw new Error('Local não encontrado.');
    }

    const normalized = normalizePlaceInput({
        ...PLACES[index],
        ...placeData,
        id: String(placeId),
    });

    PLACES[index] = normalized;
    return { ...normalized };
}