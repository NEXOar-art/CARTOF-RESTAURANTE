// Catálogo transcripto de las capturas adjuntas. Los importes se conservan como aparecen.
const catalog = [];
function addGroup(menu, category, rows, note='') {
  for (const [name, price=null] of rows) {
    const id = `${menu}-${name}`.toLocaleLowerCase('es').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
    catalog.push({id,name,price,menu,category,note});
  }
}

// Carta nocturna «¡Que comience el show!»
addGroup('Carta nocturna · ¡Que comience el show!','Entradas',[
  ['Tabla de jamón de jabalí y ciervo con focaccia de tomates',800],
  ['Ensalada de ricota de cabra, manzana y nueces',620],
  ['Burratina, tapenade de empeltre, tomate y albahaca',680],
  ['Salmorejo andaluz con jamón serrano',500],
  ['Tartar de salmón rosado',620],
  ['Papas fritas, huevo pochado, jamón de jabalí y aceite trufado',630],
  ['Atún en tempura (San Uri)',710],
  ['Ceviche de merluza y langostinos con caviar de pepino',730],
  ['Nems vietnamitas de pollo con sweet chili (2 unidades)',550],
  ['Mollejas garrapiñadas sobre emulsión de papas',650],
  ['Ssam de bondiola coreana',500]
], 'Importes copiados de una captura de carta; confirmar vigencia.');
addGroup('Carta nocturna · ¡Que comience el show!','Principales',[
  ['Carrillada de vaca con cous-cous de remolacha',600],
  ['Salmón teriyaki con ensalada de quinoa',750],
  ['Wok de bondiola al pastor (2 unidades)',550],
  ['Risotto con carpaccio de pulpo',750],
  ['Kebab de cordero y chips de yuca (2 unidades)',600],
  ['Ñoquis en su tinta con calamar y salmón',570],
  ['Wok de matambre en salsa de ajo, cebolla asada y hongos confitados',710]
], 'Importes copiados de una captura de carta; confirmar vigencia.');
addGroup('Carta nocturna · ¡Que comience el show!','Postres',[
  ['Cremoso de queso, manzana asada, toffee y nueces garrapiñadas',350],
  ['Soufflé de chocolate caliente con helado de crema de arándanos',400]
], 'Importes copiados de una captura de carta; confirmar vigencia.');

// Carta con precios en pesos que aparece en la captura separada «¡Dulce final!»
addGroup('Carta · captura de precios','Principales',[
  ['Risotto con carpaccio de pulpo',26000],
  ['Risotto con hongos confitados',16000],
  ['Milanesa de lomo jugosa a caballo con cremoso de papas y parmesano',26000],
  ['Carrillada de vaca en larga cocción sobre puré de cabutia',17000],
  ['Cordero braseado a la coreana con cous-cous de remolacha',24000],
  ['Rabo y osobuco de vaca con salsa de asado, tuétano y noodles de hongos',24000],
  ['Yakitori de bife de chorizo y panceta en salsa Chuzu con cheddar y kale crujiente',18000]
], 'Precios tal como se leen en la foto; confirmar vigencia.');
addGroup('Carta · captura de precios','Postres',[
  ['Cremoso de chocolate blanco y queso, manzana asada, toffee y nueces garrapiñadas',9000],
  ['Soufflé de chocolate caliente con helado de americana y arándanos',11000],
  ['Pavlova con ganache de arándanos y bizcocho exprés de frutos rojos',12000],
  ['Milhojas de manzana asada y crema de naranja',9000],
  ['Almendrado de brownie con dulce de leche y crema de maní',9000]
], 'Precios tal como se leen en la foto; confirmar vigencia.');

// Menús ejecutivos fotografiados: opciones agrupadas por plato.
addGroup('Ejecutivo · captura A','Entradas',[
  ['Mini pao de pollo agripicante, pickles y mix de semillas'],
  ['Arepa reina pepiada'],
  ['Bagna cauda con vegetales asados']
]);
addGroup('Ejecutivo · captura A','Principales',[
  ['Matambre al limón con cremoso de maíz'],
  ['Pesca del día con crema de queso azul, cremoso de boniato y cúrcuma'],
  ['Burrito de roast beef, poroto negro y pimientos asados'],
  ['Ojo de bife con salsa criolla, rúcula, tomate cherry y parmesano (+$6.000)',6000]
]);
addGroup('Ejecutivo · captura A','Postres',[
  ['Mini crepe de choconut, manzana caramelizada y nueces'],
  ['Macarrón de frutos rojos, hibiscus y salted caramel'],
  ['Café Nespresso'],['Té en hebras Amaiti']
]);

addGroup('Ejecutivo · captura B','Entradas',[
  ['Ensalada de peras asadas, queso azul y nueces'],
  ['Taco de cerdo BBQ'],['Choripán']
]);
addGroup('Ejecutivo · captura B','Principales',[
  ['Matambre de cerdo con chutney y puré de batatas'],
  ['Risotto de pulpo'],
  ['Besugo al pastor con ensalada de pico de gallo'],
  ['Ojo de bife al chimichurri con criolla, rúcula y parmesano (+$200)',200]
]);
addGroup('Ejecutivo · captura B','Postres',[
  ['Baklava de frutos rojos'],['Gulab yamun con cremoso de rompope'],['Café Lavazza'],['Té en hebras Amaiti']
]);

addGroup('Ejecutivo · captura C','Entradas',[
  ['Taco de bondiola al pastor'],['Crema de remolacha y stracciatella'],['Steak tartar']
]);
addGroup('Ejecutivo · captura C','Principales',[
  ['Bondiola de cerdo a la cerveza negra con cous-cous'],
  ['Pesca del día con puré de batata, crema de choclo y tofu marinado'],
  ['Milanesa jugosa de ternera, cremoso de papa y vegetales salteados'],
  ['Ojo de bife con salsa criolla, rúcula, cherry y parmesano (+$600)',600]
]);
addGroup('Ejecutivo · captura C','Postres',[
  ['Mil hojas de manzana'],['Baklava de frutos rojos'],['Café Nespresso'],['Té en hebras Amaiti']
]);

addGroup('Ejecutivo · captura D','Entradas',[
  ['Bao de langostinos crispy'],['Rabas con alioli de ajo negro'],['Tacos dorados de pollo']
]);
addGroup('Ejecutivo · captura D','Principales',[
  ['Carrillada de vaca con puré de batatas'],
  ['Cordon bleu con salsa de puerro y coles fritas'],
  ['Bondiola al pastor con ensalada de pico de gallo'],
  ['Ojo de bife con criolla y ensalada de rúcula (+$200)',200]
]);
addGroup('Ejecutivo · captura D','Postres',[
  ['Peras al Malbec con chantilly de queso'],['Strudel de manzana'],['Café Lavazza'],['Té en hebras Amaiti']
]);

addGroup('Ejecutivo · captura E','Entradas',[
  ['Ensalada de peras, queso azul y nueces'],['Salbut de bondiola al pastor'],['Arepa reina pepiada']
]);
addGroup('Ejecutivo · captura E','Principales',[
  ['Canelones de carne y espinaca con salsa mixta'],
  ['Panga con verduras en papillote'],
  ['Pollo frito relleno de queso con arroz'],
  ['Ojo de bife con salsa criolla y ensalada de rúcula, cherry y parmesano (+$300)',300]
]);
addGroup('Ejecutivo · captura E','Postres',[
  ['Tarta de ricota y naranja'],['Torta Chajá'],['Café Lavazza'],['Té en hebras Amaiti']
]);

addGroup('Ejecutivo · captura F','Entradas',[
  ['Trucha curada en cítricos, pepinos encurtidos y sour cream'],
  ['Taco de panceta agripicante y cebolla morada'],
  ['Langostino encevichado, arroz frito y plátano macho']
]);
addGroup('Ejecutivo · captura F','Principales',[
  ['Ribs de cerdo en barbacoa de durazno, churros de papa y labneh de pickles'],
  ['Pesca del día en crema de queso azul, hojas verdes, mango, melón y aceite ahumado'],
  ['Lasaña de cordero, crema de lima y nieve de yogurt'],
  ['Ojo de bife con salsa criolla, rúcula, tomate cherry y parmesano (+$6.000)',6000]
]);
addGroup('Ejecutivo · captura F','Postres',[
  ['French toast y curd de durazno'],['Tarta gota de miel'],['Café Nespresso'],['Selección de té']
]);
addGroup('Ejecutivo · captura F','Menús',[
  ['Menú ejecutivo completo · precio por persona',23000]
], 'La captura indica $23.000 por persona. Precio editable.');

addGroup('Ejecutivo · captura G','Entradas',[
  ['Ensalada de peras asadas, queso azul y nueces'],['Taco de cerdo BBQ'],['Choripán']
]);
addGroup('Ejecutivo · captura G','Principales',[
  ['Matambre de cerdo con chutney y puré de batatas'],['Risotto de pulpo'],
  ['Besugo al pastor con ensalada de pico de gallo'],
  ['Ojo de bife al chimichurri con criolla, rúcula y parmesano (+$200)',200]
]);
addGroup('Ejecutivo · captura G','Postres',[
  ['Baklava de frutos rojos'],['Gulab yamun con cremoso de rompope'],['Café Lavazza'],['Té en hebras Amaiti']
]);

addGroup('Menú degustación · captura','Degustación',[
  ['Guacamole, langostinos crispy, queso brie, manteca de ciervo y pan de masa madre'],
  ['Sashimi de salmón, ponzu y alioli de wasabi'],
  ['Causa limeña de ají amarillo y atún rojo'],
  ['Huevo pochado con crema de arvejas, tartueta y polvo de jamón crudo'],
  ['Ojo de bife, verduras de temporada y reducción de oporto'],
  ['Affogato'],['Frutas, crema inglesa y chantilly']
]);

addGroup('Menú Cartof, Sibaris y Herencia','Degustación',[
  ['Cubanito, paté de hongos de pino, taco de reina y cerdo'],
  ['Espiral de papa con tartar de atún rojo'],
  ['Ceviche de vegetales, palta y mango'],
  ['Velouté de espárragos, mollejas de cabrito y naranja'],
  ['Hongos en textura, reggianito y quinoa'],
  ['Lengua, batatas, mostaza y mermelada de pimientos'],
  ['Hongos y pato en espuma de curry rojo y cilantro'],
  ['Salmón rosado sobre crema vichyssoise, caviar negro, chauchas al jamón e hinojo'],
  ['Cordero, polenta blanca, bruselas y almendras'],
  ['Espuma de vainilla y durazno con cereales'],
  ['Grofe con cremoso de frutos rojos y Nutella']
]);

addGroup('Fusión 12 Chefs','Degustación',[
  ['Pan de cristal con hummus, kimchi de remolacha y coleslaw'],
  ['Rösti con paté de ciervo y manzana'],
  ['Tiradito de vieiras en leche de tigre de ají amarillo'],
  ['Carpaccio de langostinos con gel de cilantro y lima'],
  ['Espárragos en mousse de coliflor y pomelo'],
  ['Templado de texturas de setas'],
  ['Taco de bife de chorizo, frijoles, guacamole y salsa tatemada'],
  ['Ravioli de ricota dos leches, yema y manteca trufada'],
  ['Trucha salmonada en crema de maíz, trigo y jalea de membrillo'],
  ['Mollejas de cabrito con boniatos y almendras'],
  ['Lomo a la parrilla en salsa de pimientos y uva con papas confit'],
  ['Quesos enmohecidos, confitura de remolacha y crocante de maní'],
  ['Parfait de higos con baba cacao y diplomata veneciana']
]);

// Lista larga de carta fotografiada; los platos sin precio impreso quedan a consultar.
addGroup('Carta de bocados · captura','Entradas',[
  ['Tartar de salmón rosado'],['Steak tartar de solomillo'],
  ['Verduras de temporada salteadas y ahumadas'],
  ['Tabla de jamón crudo de jabalí y ciervo con tostadas de focaccia y tomate'],
  ['Tabla de quesos artesanales con confitura de temporada'],
  ['Escabeche caserito de conejo'],
  ['Ensalada César con pollo confit, jamón ahumado y parmesano'],
  ['Ensalada templada con milhojas'],['Croquetas de jamón ahumado'],
  ['Papas fritas, huevo pochado, jamón crudo y aceite de trufa'],
  ['Atún en tempura (San Uri)'],['Bao de pollo Chi Jau Kay'],
  ['Besugo sobre puré ahumado con verduras y aire de limón'],
  ['Bruschettas de ciervo con puré de batata, salsa y chutney de ciruelas'],
  ['Ceviche ahumado de corvina y langostino con falso caviar de pepino'],
  ['Entraña con criolla de hongos y papines con provoleta'],
  ['Langostinos a la plancha con mayonesa de soja'],
  ['Nems vietnamitas de pollo chili sauce (2 unidades)']
]);
addGroup('Carta de bocados · captura','Principales',[
  ['Canelón de carrillada y ensalada de quinoa'],
  ['Carrillada de vaca con papas a lo pobre'],
  ['Solomillo de cerdo teriyaki y cous-cous'],
  ['Ñoquis a los cuatro quesos y toque de albahaca'],
  ['Risotto con carpaccio de pulpo'],
  ['Salmón rosado y teriyaki con verduras escabechadas'],
  ['Solomillo Wellington']
]);
addGroup('Carta de bocados · captura','Postres',[
  ['Tiramisú cremoso'],
  ['Soufflé de chocolate caliente con helado de nuez'],
  ['Fina milhoja de manzana asada y dulce de leche con crema'],
  ['Cheese cake toffee']
]);

// Vinos, coctelería y bebidas que se alcanzan a leer en la fotografía.
addGroup('Vinos · captura','Vinos',[
  ['Anko · Torrontés 100%',700],['Serie A · Chardonnay/Sauvignon',1200],
  ['Luca · Chardonnay 100%',2100],['Tensión La Ribera · Chardonnay/Semillón',750],
  ['Gesha de Jade · Marsanne/Roussanne',2150],['Gran Delirio · Sauvignon Blanc',990],
  ['Doña Paula · Riesling 100%',990],['Las Perdices · Albariño',1300],
  ['Vuela · rosado Pinot Gris',900],['Navira · rosado Syrah/Merlot/Malbec (500 ml)',550],
  ['Anko · Malbec 100%',800],['Luca · Malbec 100%',850],['Cuyum · Malbec',970],
  ['Piedra Negra Reserva · Malbec',1250],['Anko · Malbec orgánico',1400],
  ['El Abrazo · Malbec',1800],['Precioso · Malbec 100%',2400],
  ['Luca · Malbec 100% · segunda etiqueta',2800],['República de Malbec',3500],
  ['Vuela espumante blanco · Pinot Gris',1300],['Vuela espumante rosé',1300],
  ['Espumante extra brut · Chardonnay/Viognier',1400],
  ['Alma Negra Brut Nature Rosé · Pinot Noir/Malbec',2000],
  ['Animal Extra Brut · Pinot Noir/Chardonnay',1300],
  ['Alma 4 · Pinot Noir/Chardonnay',1600],
  ['Ana Cordoníu · Blanc de Blancs',1800],
  ['Domaine Bousquet Gaia · Malbec/Syrah/Viognier',1250],
  ['Tensión La Ribera · Malbec/Petit Verdot',800],
  ['Humanas Reserva · Malbec/Cabernet Sauvignon',1200],
  ['Séptima Obra · Cabernet Sauvignon',950],
  ['Fabre Montmayou Reserva · Merlot',1500],
  ['Contador de Estrellas · Tempranillo',1450],
  ['Domaine Bousquet Reserva · Pinot Noir',1000],
  ['Ojo Negro · Pinot Noir',1500],
  ['Ala Colorada · Cabernet Franc',1300],
  ['Fabre Montmayou · Cabernet Franc',3500],
  ['Hermandad · Cabernet Franc',2790],
  ['Vistalba Corte B'],['Absurdo Blend · Cabernet Franc/Malbec'],
  ['Alma Negra · Blend',2100],
  ['Mosquita Muerta · Blend',1950]
], 'Nombres e importes transcritos de una foto; verificar etiquetas y vigencia.');
addGroup('Bebidas · captura','Bebidas',[
  ['Aperol Spritz · Aperol, espumante, agua gasificada'],
  ['Campari · naranja',400],['Gin tonic · Beefeater y tónica',410],
  ['Gin tonic premium',630],['Mojito · ron, lima y hierbabuena'],
  ['Caipirinha · cachaça y lima',410],['Fernet Branca con Coca-Cola',400],
  ['Cerveza Heineken pinta (500 ml)',300],['Cerveza Imperial (500 ml)',320],
  ['Sidra Peer',350],['Agua natural, gasificada o saborizada'],
  ['Limonada (1 litro)',450],['Café',150],['Café Nespresso'],['Café Lavazza'],['Té en hebras Amaiti']
]);

window.CARTOF_CATALOG = catalog;
