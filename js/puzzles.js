const puzzles = [
{
    'centerLetter': 'N',
    'outerLetters': ['C', 'E', 'H', 'I', 'T', 'K'],
    'pangrams': ['KITCHEN', 'KITCHENETTE', 'THICKEN'],
    'words': ['CENT', 'CHIN', 'CINE', 'HENT', 'HINT', 'INCH', 'KEEN', 'KENT', 'KINE', 'KNEE', 'KNIT', 'NECK', 'NICE', 'NICK', 'NINE', 'NITE', 'TEEN', 'TENT', 'TEIN', 'THEN', 'THIN', 'TINE', 'TINT', 'CHICKEN', 'CHINK', 'CINCH', 'ENTENTE', 'ENTICE', 'ETHNIC', 'HEINIE', 'HENCE', 'INCITE', 'INNIE', 'INTENT', 'KINETIC',  'KITTEN','NECKTIE', 'NICHE', 'NIECE', 'NINETEEN', 'NINETEENTH', 'NINETIETH', 'NINTH', 'TENET', 'TENTH', 'THENCE', 'THINE', 'THINK', 'TINCT']
},

// JAN 31 2016
{
    'centerLetter': 'U',
    'outerLetters': ['A', 'I', 'M', 'N', 'O', 'T'],
    'pangrams': ['AMMUNITION', 'AUTOMATION', 'MOUNTAIN', 'MUTATION'],
    'words': ['AUNT', 'AUTO', 'MUON', 'MUTT', 'NAUT', 'NOUN', 'TAUT', 'TOUT', 'TUNA', 'TUTU', 'UNIT', 'UNTO', 'AMMONIUM', 'AMOUNT', 'AUTOMAT', 'AUTOMATA', 'AUTOMATION', 'AUTUMN', 'INTUIT', 'INTUITION', 'MINIMUM', 'MINUTIA', 'MOUNT', 'MUNITION', 'MUTANT', 'MUTTON', 'MUUMUU', 'NONUNION', 'OUTMAN', 'TANTAMOUNT', 'TAUNT', 'TITANIUM', 'TUITION', 'UMAMI', 'UNION']
},

// FEB 21 2016
{
    'centerLetter': 'O',
    'outerLetters': ['C', 'I', 'T', 'N', 'U', 'Y'],
    'pangrams': ['CONTINUITY'],
    'words': ['COIN', 'COOT', 'ICON', 'INTO', 'NOON', 'NOUN', 'ONTO', 'TOOT', 'TOUT', 'UNTO', 'YONI', 'YOYO', 'COCONUT', 'COCOON', 'CONCOCT', 'CONCOCTION', 'CONIC', 'COTTON', 'COTTONY', 'COUNT', 'COUNTY', 'CUTOUT', 'ICONIC', 'INTUITION', 'IONIC', 'NONUNION', 'NOTION', 'ONION', 'ONIONY', 'TONIC', 'TUITION', 'TYCOON', 'UNCTION', 'UNION']
},

// MAR 20 2016
{
    'centerLetter': 'O',
    'outerLetters': ['D', 'I', 'T', 'M', 'R', 'Y'],
    'pangrams': ['DORMITORY'],
    'words': ['DODO', 'DOOM', 'DOOR', 'DORM', 'DOTY', 'MOOD', 'MOOR', 'MOOT', 'ODOR', 'OMIT', 'OOID', 'RIOT', 'ROOD', 'ROOM', 'ROOT', 'TOOT', 'TORO', 'TORT', 'TRIO', 'TROD', 'TROT', 'TROY', 'TYRO', 'YOYO', 'DITTO', 'DOTTY', 'DROID', 'IDIOM', 'IDIOT', 'MIRROR', 'MOMMY', 'MOODY', 'MOTOR', 'MOTTO', 'ODDITY', 'ROOMY', 'ROTOR', 'TODDY', 'TOROID', 'TORRID']
},

// JAN 1 2017
{
    'centerLetter': 'N',
    'outerLetters': ['C', 'E', 'F', 'I', 'T', 'U'],
    'pangrams': ['FETTUCCINE'],
    'words': ['CENT', 'FINE', 'NICE', 'NINE', 'TEEN', 'TENT', 'TINE', 'TINT', 'TUNE', 'UNIT', 'EFFICIENT', 'ENCEINTE', 'ENNUI', 'ENTENTE', 'ENTICE', 'FEINT', 'FENCE', 'FIFTEEN', 'FINITE', 'INCITE', 'INEFFICIENT', 'INFECT', 'INFINITE', 'INTENT', 'INTUIT', 'NIECE', 'NINETEEN', 'TENET', 'TUNIC', 'UNCUT', 'UNFIT', 'UNITE', 'UNTIE']
},

// AUG 14 2016
{
    'centerLetter': 'E',
    'outerLetters': ['C', 'B', 'H', 'A', 'L', 'Y'],
    'pangrams': ['BELLYACHE'],
    'words': ['ABLE', 'ACHE', 'BABE', 'BALE', 'BELL', 'BLEB', 'CECA', 'CELL', 'EACH', 'EELY', 'HEAL', 'HEEL', 'HELL', 'LACE', 'YEAH', 'YELL', 'ABBEY', 'ALLELE', 'ALLEY', 'BABBLE', 'BEACH', 'BEACHBALL', 'BEECH', 'BELAY', 'BELCH', 'BELLE', 'BELLY', 'BLEACH', 'CABLE', 'CACHE', 'CELEB', 'CLAYEY', 'CYCLE', 'EYEBALL', 'LABEL', 'LEACH', 'LEECH', 'LYCHEE']
},

// MAR 08 2015
{
    'centerLetter': 'B',
    'outerLetters': ['E', 'I', 'L', 'M', 'O', 'Z'],
    'pangrams': ['IMMOBILIZE', 'MOBILIZE'],
    'words': ['BELL', 'BILE', 'BILL', 'BLEB', 'BLOB', 'BOIL', 'BOLL', 'BOMB', 'BOOM', 'LIMB', 'LOBE', 'OBOE', 'BELIE', 'BELLE', 'BEZEL', 'BIBLE', 'BIMBO', 'BIOME', 'BLOOM', 'BOBBLE', 'BOOBOO', 'BOOZE', 'EMBEZZLE', 'EMBLEM', 'IMBIBE', 'IMMOBILE', 'LIBEL', 'LIMBO', 'MOBILE', 'ZOMBIE']
},

// MAY 31 2015 HARD
{
    'centerLetter': 'N',
    'outerLetters': ['D', 'I', 'T', 'O', 'X', 'A'],
    'pangrams': ['ANTIXOIDANT', 'OXIDANT', 'OXIDATION'],
    'words': ['ANON', 'AXON', 'INTO', 'NOON', 'ONTO', 'TINT', 'ADDITION', 'ANION', 'ANNOTATION', 'ANOINT', 'ANTITAX', 'ANTITOXIN', 'ATTAIN', 'ATTAINT', 'AXION', 'DIOXIN', 'DONATION', 'INITIATION', 'INTONATION', 'NAIAD', 'NATION', 'ONION', 'NOTION', 'TAINT', 'TANNIN', 'TAXATION', 'TAXON', 'TITAN', 'TOXIN']
},

// JUN 14 2015
{
    'centerLetter': 'D',
    'outerLetters': ['A', 'G', 'N', 'O', 'P', 'R'],
    'pangrams': ['PROPAGANDA'],
    'words': ['DADO', 'DARN', 'DODO', 'DOOR', 'DRAG', 'DROP', 'GOAD', 'GOOD', 'ODOR', 'POND', 'PROD', 'RAND', 'ROAD', 'ROOD', 'ADRON', 'ARDOR', 'DOGNAP', 'DONOR', 'DOODAD', 'DRAGON', 'DRAGOON', 'DROOP', 'GONAD', 'GRAND', 'GRANDDAD', 'GRANDPA', 'PAGODA', 'PANDA', 'PARDON', 'RADAR', 'RADON', 'RONDO']
},

// JUL 05 2015
{
    'centerLetter': 'N',
    'outerLetters': ['C', 'I', 'E', 'P', 'R', 'X'],
    'pangrams': ['EXPERIENCE', 'INEXPERIENCE', 'REEXPERIENCE'],
    'words': ['NICE', 'NINE', 'PINE', 'REIN', 'INNER', 'INNIE', 'NICER', 'NIECE', 'NINEPIN', 'NIPPER', 'NIPPIER', 'PENCE', 'PENNE', 'PENNER', 'PICNIC', 'PINCER', 'PREEN', 'PRINCE', 'RENNIN', 'REPINE', 'RICIN', 'RIPEN', 'RIPENER']
},

// JUL 26 2015
{
    'centerLetter': 'O',
    'outerLetters': ['C', 'I', 'P', 'S', 'U', 'A'],
    'pangrams': ['AUSPICIOUS', 'CAPACIOUS', 'SPACIOUS'],
    'words': ['COOP', 'COOS', 'COPS', 'COUP', 'OOPS', 'POOP', 'POPS', 'SOAP', 'SOPS', 'SOUP', 'APOS', 'CAPO', 'CIAO', 'COPS', 'COUP', 'OCAS', 'OPAS', 'OPUS', 'POIS', 'SCOP', 'SOAP', 'SOCA', 'SOUP', 'CACAO', 'CACAOS', 'CAPOS', 'COCAS', 'COCOA', 'COOPS', 'COPIOUS', 'COUPS', 'COUSCOUSE', 'OASIS', 'PIOUS', 'POOPS', 'POPPA', 'POPPAS', 'SCOOP', 'SCOOPS', 'SOAPS', 'SOUPS', 'SUSPICIOUS']
},

// AUG 16 2015
{
    'centerLetter': 'F',
    'outerLetters': ['C', 'E', 'G', 'N', 'R', 'A'],
    'pangrams': ['FRAGRANCE'],
    'words': ['AFAR', 'CAFE', 'FACE', 'FANE', 'FANG', 'FARE', 'FEAR', 'FERN', 'FRAE', 'FREE', 'GAFF', 'REEF', 'FRAG', 'CARAFE', 'CAREFREE', 'CARFARE', 'EFFACE', 'FANFARE', 'FANNER', 'FARCE', 'FENCE', 'FENCER', 'FRANC', 'FREER', 'GAFFE', 'GAFFER', 'GANEF', 'REEFER', 'REFACE', 'REFER', 'REFEREE', 'REFERENCE']
},

// OCT 25 2015
{
    'centerLetter': 'I',
    'outerLetters': ['C', 'E', 'L', 'O', 'T', 'V'],
    'pangrams': ['COLLECTIVE'],
    'words': ['CITE', 'COIL', 'EVIL', 'LICE', 'LITE', 'LIVE', 'LOCI', 'TILE', 'TILL', 'TOIL', 'VEIL', 'VICE', 'VILE', 'CELLI', 'CIVET', 'CIVIC', 'CIVIL', 'COLIC', 'COLLIE', 'COOLIE', 'COOTIE', 'ECLECTIC', 'ELECTIVE', 'ELICIT', 'ELITE', 'ETOILE', 'EVICT', 'EVICTEE', 'ICICLE', 'ILLICIT', 'LICIT', 'LITTLE', 'OLEIC', 'OLIVE', 'TITLE', 'TITTLE', 'TOILE', 'TOILET', 'TOILETTE', 'VIOLET', 'VOICE', 'VOILE', 'VOTIVE']
},

// NOV 15 2015
{
    'centerLetter': 'B',
    'outerLetters': ['D', 'O', 'R', 'T', 'U', 'A'],
    'pangrams': ['OUTBOARD', 'TROUBADOUR'],
    'words': ['ABUT', 'BARB', 'BARD', 'BAUD', 'BOAR', 'BOAT', 'BOOR', 'BOOT', 'BOUT', 'BRAD', 'BRAT', 'BUBO', 'BURR', 'BUTT', 'DAUB', 'DRAB', 'TUBA', 'ABBOT', 'ABOARD', 'ABORT', 'ABOUT', 'ABROAD', 'ARBOR', 'ARBOUR', 'BAOBAB', 'BOARD', 'BROAD', 'BROOD', 'BUBBA', 'BURRO', 'DARTBOARD', 'DOUBT', 'ROBOT', 'TABOO', 'TABOR', 'TURBO', 'TURBOT']
},
{
     'centerLetter': 'C',
     'outerLetters': ['B', 'E', 'L', 'M', 'R', 'U'],
     'pangrams': ['CEREBELLUM', 'CRUMBLE'],
     'words': ['CELEB', 'CELLULE', 'CEREBRUM', 'CREEL', 'CREME', 'CRUEL', 'CRUELER', 'CRULLER', 'CRUMB', 'CUCUMBER', 'CURER', 'CURLER', 'EMCEE', 'LUCRE', 'RECUR', 'ULCER', 'BECUMBER', 'BECURL', 'BURLECUE', 'CELL', 'CELLULE', 'CELURE', 'CERULEUM', 'CLERUM', 'CLUB', 'CLUBBER', 'CLUE', 'CREEM', 'CURE', 'CURL', 'ELEC', 'LUCRUM', 'CUBE', 'CULL', 'ECRU', 'CURB']
 }
]
