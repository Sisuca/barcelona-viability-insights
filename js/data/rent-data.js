const rentData = [
    {
        "id": "001",
        "district": "Ciutat Vella",
        "neighborhood": "Sant Pere - Santa Caterina i la Ribera",
        "type": "Estudio",
        "price": 1100
    },
    {
        "id": "002",
        "district": "Ciutat Vella",
        "neighborhood": "El Gòtic",
        "type": "Estudio",
        "price": 1000
    },
    {
        "id": "003",
        "district": "Ciutat Vella",
        "neighborhood": "El Raval",
        "type": "Estudio",
        "price": 1200
    },
    {
        "id": "004",
        "district": "Ciutat Vella",
        "neighborhood": "El Gòtic",
        "type": "Estudio",
        "price": 980
    },
    {
        "id": "005",
        "district": "Ciutat Vella",
        "neighborhood": "El Raval",
        "type": "Estudio",
        "price": 1200
    },
    {
        "id": "006",
        "district": "Ciutat Vella",
        "neighborhood": "Sant Pere - Santa Caterina i la Ribera",
        "type": "Estudio",
        "price": 1200
    },
    {
        "id": "007",
        "district": "Ciutat Vella",
        "neighborhood": "El Raval",
        "type": "Estudio",
        "price": 1400
    },
    {
        "id": "008",
        "district": "Ciutat Vella",
        "neighborhood": "La Barceloneta",
        "type": "Estudio",
        "price": 1000
    },
    {
        "id": "009",
        "district": "Ciutat Vella",
        "neighborhood": "El Raval",
        "type": "Estudio",
        "price": 920
    },
    {
        "id": "010",
        "district": "Ciutat Vella",
        "neighborhood": "Sant Pere - Santa Caterina i la Ribera",
        "type": "Estudio",
        "price": 1350
    },
    {
        "id": "011",
        "district": "Ciutat Vella",
        "neighborhood": "El Gòtic",
        "type": "1 hab.",
        "price": 1090
    },
    {
        "id": "012",
        "district": "Ciutat Vella",
        "neighborhood": "La Barceloneta",
        "type": "1 hab.",
        "price": 1050
    },
    {
        "id": "013",
        "district": "Ciutat Vella",
        "neighborhood": "El Raval",
        "type": "1 hab.",
        "price": 1100
    },
    {
        "id": "014",
        "district": "Ciutat Vella",
        "neighborhood": "Sant Pere - Santa Caterina i la Ribera",
        "type": "1 hab.",
        "price": 1190
    },
    {
        "id": "015",
        "district": "Ciutat Vella",
        "neighborhood": "El Raval",
        "type": "1 hab.",
        "price": 1700
    },
    {
        "id": "016",
        "district": "Ciutat Vella",
        "neighborhood": "Sant Pere - Santa Caterina i la Ribera",
        "type": "1 hab.",
        "price": 850
    },
    {
        "id": "017",
        "district": "Ciutat Vella",
        "neighborhood": "La Barceloneta",
        "type": "1 hab.",
        "price": 825
    },
    {
        "id": "018",
        "district": "Ciutat Vella",
        "neighborhood": "La Barceloneta",
        "type": "1 hab.",
        "price": 775
    },
    {
        "id": "019",
        "district": "Ciutat Vella",
        "neighborhood": "La Barceloneta",
        "type": "1 hab.",
        "price": 775
    },
    {
        "id": "020",
        "district": "Ciutat Vella",
        "neighborhood": "La Barceloneta",
        "type": "1 hab.",
        "price": 1100
    },
    {
        "id": "021",
        "district": "Eixample",
        "neighborhood": "La Dreta de l'Eixample",
        "type": "Estudio",
        "price": 1210
    },
    {
        "id": "022",
        "district": "Eixample",
        "neighborhood": "La Dreta de l'Eixample",
        "type": "Estudio",
        "price": 1450
    },
    {
        "id": "023",
        "district": "Eixample",
        "neighborhood": "Sant Antoni",
        "type": "Estudio",
        "price": 1480
    },
    {
        "id": "024",
        "district": "Eixample",
        "neighborhood": "La Dreta de l'Eixample",
        "type": "Estudio",
        "price": 1200
    },
    {
        "id": "025",
        "district": "Eixample",
        "neighborhood": "El Fort Pienc",
        "type": "Estudio",
        "price": 1800
    },
    {
        "id": "026",
        "district": "Eixample",
        "neighborhood": "L'Antiga Esquerra de l'Eixample",
        "type": "Estudio",
        "price": 1089
    },
    {
        "id": "027",
        "district": "Eixample",
        "neighborhood": "La Dreta de l'Eixample",
        "type": "Estudio",
        "price": 1250
    },
    {
        "id": "028",
        "district": "Eixample",
        "neighborhood": "La Dreta de l'Eixample",
        "type": "Estudio",
        "price": 2200
    },
    {
        "id": "029",
        "district": "Eixample",
        "neighborhood": "La Dreta de l'Eixample",
        "type": "Estudio",
        "price": 726
    },
    {
        "id": "030",
        "district": "Eixample",
        "neighborhood": "La Dreta de l'Eixample",
        "type": "Estudio",
        "price": 1480
    },
    {
        "id": "031",
        "district": "Eixample",
        "neighborhood": "La Nova Esquerra de l'Eixample",
        "type": "1 hab.",
        "price": 1495
    },
    {
        "id": "032",
        "district": "Eixample",
        "neighborhood": "La Nova Esquerra de l'Eixample",
        "type": "1 hab.",
        "price": 986
    },
    {
        "id": "033",
        "district": "Eixample",
        "neighborhood": "La Nova Esquerra de l'Eixample",
        "type": "1 hab.",
        "price": 980
    },
    {
        "id": "034",
        "district": "Eixample",
        "neighborhood": "La Dreta de l'Eixample",
        "type": "1 hab.",
        "price": 700
    },
    {
        "id": "035",
        "district": "Eixample",
        "neighborhood": "L'Antiga Esquerra de l'Eixample",
        "type": "1 hab.",
        "price": 1600
    },
    {
        "id": "036",
        "district": "Eixample",
        "neighborhood": "La Nova Esquerra de l'Eixample",
        "type": "1 hab.",
        "price": 1300
    },
    {
        "id": "037",
        "district": "Eixample",
        "neighborhood": "Sant Antoni",
        "type": "1 hab.",
        "price": 1504
    },
    {
        "id": "038",
        "district": "Eixample",
        "neighborhood": "La Sagrada Família",
        "type": "1 hab.",
        "price": 1350
    },
    {
        "id": "039",
        "district": "Eixample",
        "neighborhood": "La Dreta de l'Eixample",
        "type": "1 hab.",
        "price": 1400
    },
    {
        "id": "040",
        "district": "Eixample",
        "neighborhood": "La Dreta de l'Eixample",
        "type": "1 hab.",
        "price": 950
    },
    {
        "id": "041",
        "district": "Gràcia",
        "neighborhood": "El Camp d'En Grassot i Gràcia Nova",
        "type": "Estudio",
        "price": 944
    },
    {
        "id": "042",
        "district": "Gràcia",
        "neighborhood": "Vila de Gràcia",
        "type": "Estudio",
        "price": 940
    },
    {
        "id": "043",
        "district": "Gràcia",
        "neighborhood": "Vallcarca i els Penitents",
        "type": "Estudio",
        "price": 1580
    },
    {
        "id": "044",
        "district": "Gràcia",
        "neighborhood": "Vila de Gràcia",
        "type": "Estudio",
        "price": 1331
    },
    {
        "id": "045",
        "district": "Gràcia",
        "neighborhood": "Vila de Gràcia",
        "type": "Estudio",
        "price": 1350
    },
    {
        "id": "046",
        "district": "Gràcia",
        "neighborhood": "Vila de Gràcia",
        "type": "Estudio",
        "price": 1800
    },
    {
        "id": "047",
        "district": "Gràcia",
        "neighborhood": "Vila de Gràcia",
        "type": "Estudio",
        "price": 1190
    },
    {
        "id": "048",
        "district": "Gràcia",
        "neighborhood": "Vila de Gràcia",
        "type": "Estudio",
        "price": 1200
    },
    {
        "id": "049",
        "district": "Gràcia",
        "neighborhood": "La Salut",
        "type": "Estudio",
        "price": 850
    },
    {
        "id": "050",
        "district": "Gràcia",
        "neighborhood": "El Camp d'En Grassot i Gràcia Nova",
        "type": "Estudio",
        "price": 1800
    },
    {
        "id": "051",
        "district": "Gràcia",
        "neighborhood": "El Camp d'En Grassot i Gràcia Nova",
        "type": "1 hab.",
        "price": 1550
    },
    {
        "id": "052",
        "district": "Gràcia",
        "neighborhood": "Vila de Gràcia",
        "type": "1 hab.",
        "price": 1970
    },
    {
        "id": "053",
        "district": "Gràcia",
        "neighborhood": "La Salut",
        "type": "1 hab.",
        "price": 1000
    },
    {
        "id": "054",
        "district": "Gràcia",
        "neighborhood": "Vila de Gràcia",
        "type": "1 hab.",
        "price": 2500
    },
    {
        "id": "055",
        "district": "Gràcia",
        "neighborhood": "Vila de Gràcia",
        "type": "1 hab.",
        "price": 1125
    },
    {
        "id": "056",
        "district": "Gràcia",
        "neighborhood": "Vila de Gràcia",
        "type": "1 hab.",
        "price": 1500
    },
    {
        "id": "057",
        "district": "Gràcia",
        "neighborhood": "Vila de Gràcia",
        "type": "1 hab.",
        "price": 1850
    },
    {
        "id": "058",
        "district": "Gràcia",
        "neighborhood": "Vila de Gràcia",
        "type": "1 hab.",
        "price": 1200
    },
    {
        "id": "059",
        "district": "Gràcia",
        "neighborhood": "Vila de Gràcia",
        "type": "1 hab.",
        "price": 2500
    },
    {
        "id": "060",
        "district": "Gràcia",
        "neighborhood": "Vila de Gràcia",
        "type": "1 hab.",
        "price": 2350
    },
    {
        "id": "061",
        "district": "Les Corts",
        "neighborhood": "Les Corts",
        "type": "Estudio",
        "price": 1090
    },
    {
        "id": "062",
        "district": "Les Corts",
        "neighborhood": "Les Corts",
        "type": "Estudio",
        "price": 1800
    },
    {
        "id": "063",
        "district": "Les Corts",
        "neighborhood": "La Maternitat i Sant Ramon",
        "type": "Estudio",
        "price": 1200
    },
    {
        "id": "064",
        "district": "Les Corts",
        "neighborhood": "La Maternitat i Sant Ramon",
        "type": "Estudio",
        "price": 1050
    },
    {
        "id": "065",
        "district": "Les Corts",
        "neighborhood": "La Maternitat i Sant Ramon",
        "type": "Estudio",
        "price": 839
    },
    {
        "id": "066",
        "district": "Les Corts",
        "neighborhood": "Pedralbes",
        "type": "Estudio",
        "price": 850
    },
    {
        "id": "067",
        "district": "Les Corts",
        "neighborhood": "Pedralbes",
        "type": "Estudio",
        "price": 1100
    },
    {
        "id": "068",
        "district": "Les Corts",
        "neighborhood": "Les Corts",
        "type": "Estudio",
        "price": 1090
    },
    {
        "id": "069",
        "district": "Les Corts",
        "neighborhood": "Les Corts",
        "type": "Estudio",
        "price": 1452
    },
    {
        "id": "070",
        "district": "Les Corts",
        "neighborhood": "Les Corts",
        "type": "Estudio",
        "price": 1200
    },
    {
        "id": "071",
        "district": "Les Corts",
        "neighborhood": "Les Corts",
        "type": "1 hab.",
        "price": 1600
    },
    {
        "id": "072",
        "district": "Les Corts",
        "neighborhood": "Les Corts",
        "type": "1 hab.",
        "price": 1200
    },
    {
        "id": "073",
        "district": "Les Corts",
        "neighborhood": "La Maternitat i Sant Ramon",
        "type": "1 hab.",
        "price": 1353
    },
    {
        "id": "074",
        "district": "Les Corts",
        "neighborhood": "La Maternitat i Sant Ramon",
        "type": "1 hab.",
        "price": 1190
    },
    {
        "id": "075",
        "district": "Les Corts",
        "neighborhood": "La Maternitat i Sant Ramon",
        "type": "1 hab.",
        "price": 1250
    },
    {
        "id": "076",
        "district": "Les Corts",
        "neighborhood": "Les Corts",
        "type": "1 hab.",
        "price": 1100
    },
    {
        "id": "077",
        "district": "Les Corts",
        "neighborhood": "Les Corts",
        "type": "1 hab.",
        "price": 1095
    },
    {
        "id": "078",
        "district": "Les Corts",
        "neighborhood": "Les Corts",
        "type": "1 hab.",
        "price": 1400
    },
    {
        "id": "079",
        "district": "Les Corts",
        "neighborhood": "Pedralbes",
        "type": "1 hab.",
        "price": 1450
    },
    {
        "id": "080",
        "district": "Les Corts",
        "neighborhood": "Pedralbes",
        "type": "1 hab.",
        "price": 1500
    },
    {
        "id": "081",
        "district": "Sant Martí",
        "neighborhood": "El Poblenou",
        "type": "Estudio",
        "price": 1350
    },
    {
        "id": "082",
        "district": "Sant Martí",
        "neighborhood": "El Poblenou",
        "type": "Estudio",
        "price": 1550
    },
    {
        "id": "083",
        "district": "Sant Martí",
        "neighborhood": "Sant Martí de Provençals",
        "type": "Estudio",
        "price": 1100
    },
    {
        "id": "084",
        "district": "Sant Martí",
        "neighborhood": "El Poblenou",
        "type": "Estudio",
        "price": 670
    },
    {
        "id": "085",
        "district": "Sant Martí",
        "neighborhood": "El Clot",
        "type": "Estudio",
        "price": 800
    },
    {
        "id": "086",
        "district": "Sant Martí",
        "neighborhood": "El Poblenou",
        "type": "Estudio",
        "price": 800
    },
    {
        "id": "087",
        "district": "Sant Martí",
        "neighborhood": "El Poblenou",
        "type": "Estudio",
        "price": 1500
    },
    {
        "id": "088",
        "district": "Sant Martí",
        "neighborhood": "El Parc i la Llacuna del Poblenou",
        "type": "Estudio",
        "price": 1350
    },
    {
        "id": "089",
        "district": "Sant Martí",
        "neighborhood": "El Poblenou",
        "type": "Estudio",
        "price": 3000
    },
    {
        "id": "090",
        "district": "Sant Martí",
        "neighborhood": "El Parc i la Llacuna del Poblenou",
        "type": "Estudio",
        "price": 1232
    },
    {
        "id": "091",
        "district": "Sant Martí",
        "neighborhood": "El Camp de l'Arpa del Clot",
        "type": "1 hab.",
        "price": 1200
    },
    {
        "id": "092",
        "district": "Sant Martí",
        "neighborhood": "Diagonal Mar i el Front Marítim del Poblenou",
        "type": "1 hab.",
        "price": 1500
    },
    {
        "id": "093",
        "district": "Sant Martí",
        "neighborhood": "El Parc i la Llacuna del Poblenou",
        "type": "1 hab.",
        "price": 3300
    },
    {
        "id": "094",
        "district": "Sant Martí",
        "neighborhood": "El Parc i la Llacuna del Poblenou",
        "type": "1 hab.",
        "price": 1370
    },
    {
        "id": "095",
        "district": "Sant Martí",
        "neighborhood": "El Poblenou",
        "type": "1 hab.",
        "price": 1395
    },
    {
        "id": "096",
        "district": "Sant Martí",
        "neighborhood": "El Besòs",
        "type": "1 hab.",
        "price": 885
    },
    {
        "id": "097",
        "district": "Sant Martí",
        "neighborhood": "El Poblenou",
        "type": "1 hab.",
        "price": 2950
    },
    {
        "id": "098",
        "district": "Sant Martí",
        "neighborhood": "El Poblenou",
        "type": "1 hab.",
        "price": 2310
    },
    {
        "id": "099",
        "district": "Sant Martí",
        "neighborhood": "El Parc i la Llacuna del Poblenou",
        "type": "1 hab.",
        "price": 2100
    },
    {
        "id": "100",
        "district": "Sant Martí",
        "neighborhood": "El Poblenou",
        "type": "1 hab.",
        "price": 2000
    },
    {
        "id": "101",
        "district": "Sants-Montjuïc",
        "neighborhood": "Sants - Badal",
        "type": "Estudio",
        "price": 1150
    },
    {
        "id": "102",
        "district": "Sants-Montjuïc",
        "neighborhood": "El Poble Sec - Parc de Montjuïc",
        "type": "Estudio",
        "price": 900
    },
    {
        "id": "103",
        "district": "Sants-Montjuïc",
        "neighborhood": "Sants - Badal",
        "type": "Estudio",
        "price": 1680
    },
    {
        "id": "104",
        "district": "Sants-Montjuïc",
        "neighborhood": "El Poble Sec - Parc de Montjuïc",
        "type": "Estudio",
        "price": 690
    },
    {
        "id": "105",
        "district": "Sants-Montjuïc",
        "neighborhood": "El Poble Sec - Parc de Montjuïc",
        "type": "Estudio",
        "price": 1400
    },
    {
        "id": "106",
        "district": "Sants-Montjuïc",
        "neighborhood": "El Poble Sec - Parc de Montjuïc",
        "type": "Estudio",
        "price": 1300
    },
    {
        "id": "107",
        "district": "Sants-Montjuïc",
        "neighborhood": "El Poble Sec - Parc de Montjuïc",
        "type": "Estudio",
        "price": 2153
    },
    {
        "id": "108",
        "district": "Sants-Montjuïc",
        "neighborhood": "Sants",
        "type": "Estudio",
        "price": 1300
    },
    {
        "id": "109",
        "district": "Sants-Montjuïc",
        "neighborhood": "La Marina del Port",
        "type": "Estudio",
        "price": 860
    },
    {
        "id": "110",
        "district": "Sants-Montjuïc",
        "neighborhood": "Sants - Badal",
        "type": "Estudio",
        "price": 1100
    },
    {
        "id": "111",
        "district": "Sants-Montjuïc",
        "neighborhood": "Sants",
        "type": "1 hab.",
        "price": 1300
    },
    {
        "id": "112",
        "district": "Sants-Montjuïc",
        "neighborhood": "Sants - Badal",
        "type": "1 hab.",
        "price": 1050
    },
    {
        "id": "113",
        "district": "Sants-Montjuïc",
        "neighborhood": "El Poble Sec - Parc de Montjuïc",
        "type": "1 hab.",
        "price": 1100
    },
    {
        "id": "114",
        "district": "Sants-Montjuïc",
        "neighborhood": "Sants - Badal",
        "type": "1 hab.",
        "price": 1350
    },
    {
        "id": "115",
        "district": "Sants-Montjuïc",
        "neighborhood": "Sants - Badal",
        "type": "1 hab.",
        "price": 835
    },
    {
        "id": "116",
        "district": "Sants-Montjuïc",
        "neighborhood": "El Poble Sec - Parc de Montjuïc",
        "type": "1 hab.",
        "price": 1600
    },
    {
        "id": "117",
        "district": "Sants-Montjuïc",
        "neighborhood": "El Poble Sec - Parc de Montjuïc",
        "type": "1 hab.",
        "price": 1450
    },
    {
        "id": "118",
        "district": "Sants-Montjuïc",
        "neighborhood": "Sants",
        "type": "1 hab.",
        "price": 1050
    },
    {
        "id": "119",
        "district": "Sants-Montjuïc",
        "neighborhood": "Sants",
        "type": "1 hab.",
        "price": 1350
    },
    {
        "id": "120",
        "district": "Sants-Montjuïc",
        "neighborhood": "El Poble Sec - Parc de Montjuïc",
        "type": "1 hab.",
        "price": 1500
    },
    {
        "id": "121",
        "district": "Sarrià-Sant Gervasi",
        "neighborhood": "Sant Gervasi - Galvany",
        "type": "Estudio",
        "price": 2000
    },
    {
        "id": "122",
        "district": "Sarrià-Sant Gervasi",
        "neighborhood": "Sant Gervasi - Galvany",
        "type": "Estudio",
        "price": 1100
    },
    {
        "id": "123",
        "district": "Sarrià-Sant Gervasi",
        "neighborhood": "Sarrià",
        "type": "Estudio",
        "price": 1200
    },
    {
        "id": "124",
        "district": "Sarrià-Sant Gervasi",
        "neighborhood": "Les Tres Torres",
        "type": "Estudio",
        "price": 1650
    },
    {
        "id": "125",
        "district": "Sarrià-Sant Gervasi",
        "neighborhood": "El Putxet i el Farró",
        "type": "Estudio",
        "price": 795
    },
    {
        "id": "126",
        "district": "Sarrià-Sant Gervasi",
        "neighborhood": "Sant Gervasi - La Bonanova",
        "type": "Estudio",
        "price": 1400
    },
    {
        "id": "127",
        "district": "Sarrià-Sant Gervasi",
        "neighborhood": "Les Tres Torres",
        "type": "Estudio",
        "price": 1050
    },
    {
        "id": "128",
        "district": "Sarrià-Sant Gervasi",
        "neighborhood": "El Putxet i el Farró",
        "type": "Estudio",
        "price": 1290
    },
    {
        "id": "129",
        "district": "Sarrià-Sant Gervasi",
        "neighborhood": "Vallvidrera - El Tibidabo i les Planes",
        "type": "Estudio",
        "price": 3500
    },
    {
        "id": "130",
        "district": "Sarrià-Sant Gervasi",
        "neighborhood": "Sant Gervasi - Galvany",
        "type": "Estudio",
        "price": 2000
    },
    {
        "id": "131",
        "district": "Sarrià-Sant Gervasi",
        "neighborhood": "El Putxet i el Farró",
        "type": "1 hab.",
        "price": 1437
    },
    {
        "id": "132",
        "district": "Sarrià-Sant Gervasi",
        "neighborhood": "Vallvidrera - El Tibidabo i les Planes",
        "type": "1 hab.",
        "price": 1250
    },
    {
        "id": "133",
        "district": "Sarrià-Sant Gervasi",
        "neighborhood": "Sant Gervasi - La Bonanova",
        "type": "1 hab.",
        "price": 1500
    },
    {
        "id": "134",
        "district": "Sarrià-Sant Gervasi",
        "neighborhood": "Sant Gervasi - Galvany",
        "type": "1 hab.",
        "price": 1500
    },
    {
        "id": "135",
        "district": "Sarrià-Sant Gervasi",
        "neighborhood": "Sarrià",
        "type": "1 hab.",
        "price": 1148
    },
    {
        "id": "136",
        "district": "Sarrià-Sant Gervasi",
        "neighborhood": "Sant Gervasi - La Bonanova",
        "type": "1 hab.",
        "price": 2075
    },
    {
        "id": "137",
        "district": "Sarrià-Sant Gervasi",
        "neighborhood": "Sant Gervasi - Galvany",
        "type": "1 hab.",
        "price": 1800
    },
    {
        "id": "138",
        "district": "Sarrià-Sant Gervasi",
        "neighborhood": "Sant Gervasi - Galvany",
        "type": "1 hab.",
        "price": 3000
    },
    {
        "id": "139",
        "district": "Sarrià-Sant Gervasi",
        "neighborhood": "Sant Gervasi - Galvany",
        "type": "1 hab.",
        "price": 2000
    },
    {
        "id": "140",
        "district": "Sarrià-Sant Gervasi",
        "neighborhood": "El Putxet i el Farró",
        "type": "1 hab.",
        "price": 900
    }
];

window.rentData = rentData;
window.RENT_DATA = rentData;

console.log(`RENT_DATA cargado: ${rentData.length} precios de alquiler`);