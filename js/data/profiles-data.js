// profiles-data.js - VERSIÓN V15.6
const PROFILES_DATA = [
    {
        "category": "Technology",
        "level": "Junior",
        "Salary": 1875
    },
    {
        "category": "Technology",
        "level": "Mid",
        "Salary": 3167
    },
    {
        "category": "Technology",
        "level": "Senior",
        "Salary": 3500
    },
    {
        "category": "Marketing",
        "level": "Junior",
        "Salary": 1917
    },
    {
        "category": "Marketing",
        "level": "Mid",
        "Salary": 2061
    },
    {
        "category": "Marketing",
        "level": "Senior",
        "Salary": 3417
    },
    {
        "category": "Design",
        "level": "Junior",
        "Salary": 1708
    },
    {
        "category": "Design",
        "level": "Mid",
        "Salary": 2021
    },
    {
        "category": "Design",
        "level": "Senior",
        "Salary": 2708
    }
];

console.log(`👥 PROFILES_DATA cargado: ${PROFILES_DATA.length} perfiles profesionales`);
console.log('📊 Salario Technology Senior:', PROFILES_DATA.find(p => p.category === 'Technology' && p.level === 'Senior')?.Salary || 'NO ENCONTRADO');