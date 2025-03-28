import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Pokedex.css';

// Mock data for testing without a backend
const MOCK_POKEMON_DATA = [
  {
    pokemon: {
      pokemonId: 1,
      name: 'Bulbasaur',
      hp: 45,
      attack: 49,
      defense: 49,
      special_attack: 65,
      special_defense: 65,
      speed: 45,
      primary_type: 'Grass',
      secondary_type: 'Poison',
      ability1: 'Overgrow',
      ability2: null,
      hidden_ability: 'Chlorophyll',
      generation: 1,
      height: 0.7,
      weight: 6.9,
      capture_rate: 45,
      legendary: false
    },
    location: {
      type: 'Point',
      coordinates: [-97.460829, 20.525745]
    }
  },
  {
    pokemon: {
      pokemonId: 4,
      name: 'Charmander',
      hp: 39,
      attack: 52,
      defense: 43,
      special_attack: 60,
      special_defense: 50,
      speed: 65,
      primary_type: 'Fire',
      secondary_type: null,
      ability1: 'Blaze',
      ability2: null,
      hidden_ability: 'Solar Power',
      generation: 1,
      height: 0.6,
      weight: 8.5,
      capture_rate: 45,
      legendary: false
    },
    location: {
      type: 'Point',
      coordinates: [-97.123456, 20.123456]
    }
  },
  {
    pokemon: {
      pokemonId: 7,
      name: 'Squirtle',
      hp: 44,
      attack: 48,
      defense: 65,
      special_attack: 50,
      special_defense: 64,
      speed: 43,
      primary_type: 'Water',
      secondary_type: null,
      ability1: 'Torrent',
      ability2: null,
      hidden_ability: 'Rain Dish',
      generation: 1,
      height: 0.5,
      weight: 9.0,
      capture_rate: 45,
      legendary: false
    },
    location: {
      type: 'Point',
      coordinates: [-96.987654, 20.987654]
    }
  },
  {
    pokemon: {
      pokemonId: 25,
      name: 'Pikachu',
      hp: 35,
      attack: 55,
      defense: 40,
      special_attack: 50,
      special_defense: 50,
      speed: 90,
      primary_type: 'Electric',
      secondary_type: null,
      ability1: 'Static',
      ability2: null,
      hidden_ability: 'Lightning Rod',
      generation: 1,
      height: 0.4,
      weight: 6.0,
      capture_rate: 190,
      legendary: false
    },
    location: {
      type: 'Point',
      coordinates: [-97.345678, 20.345678]
    }
  },
  {
    pokemon: {
      pokemonId: 144,
      name: 'Articuno',
      hp: 90,
      attack: 85,
      defense: 100,
      special_attack: 95,
      special_defense: 125,
      speed: 85,
      primary_type: 'Ice',
      secondary_type: 'Flying',
      ability1: 'Pressure',
      ability2: null,
      hidden_ability: 'Snow Cloak',
      generation: 1,
      height: 1.7,
      weight: 55.4,
      capture_rate: 3,
      legendary: false
    },
    location: {
      type: 'Point',
      coordinates: [-97.777777, 20.777777]
    }
  }
  
];

const Pokedex = () => {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    primaryType: '',
    secondaryType: '',
    minHeight: '',
    maxHeight: '',
    minWeight: '',
    maxWeight: '',
    minCaptureRate: '',
    maxCaptureRate: '',
    legendary: ''
  });
  const [sortOption, setSortOption] = useState('No.');
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonPerPage] = useState(20);
  const navigate = useNavigate();

  // Type colors for Pokemon card backgrounds
  const typeColors = {
    Normal: '#A8A878',
    Fire: '#F08030',
    Water: '#6890F0',
    Electric: '#F8D030',
    Grass: '#78C850',
    Ice: '#98D8D8',
    Fighting: '#C03028',
    Poison: '#A040A0',
    Ground: '#E0C068',
    Flying: '#A890F0',
    Psychic: '#F85888',
    Bug: '#A8B820',
    Rock: '#B8A038',
    Ghost: '#705898',
    Dragon: '#7038F8',
    Dark: '#705848',
    Steel: '#B8B8D0',
    Fairy: '#EE99AC',
  };

  // Generate types for filter dropdowns
  const allTypes = [
    'Normal', 'Fire', 'Water', 'Electric', 'Grass', 'Ice', 
    'Fighting', 'Poison', 'Ground', 'Flying', 'Psychic', 
    'Bug', 'Rock', 'Ghost', 'Dragon', 'Dark', 'Steel', 'Fairy'
  ];

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        setPokemon(MOCK_POKEMON_DATA);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching Pokemon data:', error);
        setLoading(false);
      }
    };

    fetchPokemon();
  }, []);

  // Handle search input
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page on new search
  };

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value
    });
    setCurrentPage(1); // Reset to first page on new filter
  };

  // Handle sort option
  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  // Apply filters to the pokemon list
  const filteredPokemon = pokemon
    .filter((poke) => {
      // Search filter (case-insensitive, partial word support)
      const nameMatch = poke.pokemon?.name.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Type filters
      const primaryTypeMatch = !filters.primaryType || 
                              poke.pokemon?.primary_type === filters.primaryType;
      
      const secondaryTypeMatch = !filters.secondaryType || 
                                poke.pokemon?.secondary_type === filters.secondaryType;
      
      // Height filter
      const heightMatch = 
        (!filters.minHeight || poke.pokemon?.height >= parseFloat(filters.minHeight)) &&
        (!filters.maxHeight || poke.pokemon?.height <= parseFloat(filters.maxHeight));
      
      // Weight filter
      const weightMatch = 
        (!filters.minWeight || poke.pokemon?.weight >= parseFloat(filters.minWeight)) &&
        (!filters.maxWeight || poke.pokemon?.weight <= parseFloat(filters.maxWeight));
      
      // Capture rate filter
      const captureRateMatch = 
        (!filters.minCaptureRate || poke.pokemon?.capture_rate >= parseInt(filters.minCaptureRate)) &&
        (!filters.maxCaptureRate || poke.pokemon?.capture_rate <= parseInt(filters.maxCaptureRate));
      
      // Legendary filter
      const legendaryMatch = 
        filters.legendary === '' || 
        (filters.legendary === 'true' && poke.pokemon?.legendary) ||
        (filters.legendary === 'false' && !poke.pokemon?.legendary);
      
      return nameMatch && primaryTypeMatch && secondaryTypeMatch && 
             heightMatch && weightMatch && captureRateMatch && legendaryMatch;
    })
    .sort((a, b) => {
      // Sort based on selected option
      switch (sortOption) {
        case 'No.':
          return a.pokemon?.pokemonId - b.pokemon?.pokemonId;
        case 'Name':
          return a.pokemon?.name.localeCompare(b.pokemon?.name);
        case 'HP':
          return b.pokemon?.hp - a.pokemon?.hp;
        case 'Attack':
          return b.pokemon?.attack - a.pokemon?.attack;
        case 'Defense':
          return b.pokemon?.defense - a.pokemon?.defense;
        case 'Speed':
          return b.pokemon?.speed - a.pokemon?.speed;
        case 'Height':
          return b.pokemon?.height - a.pokemon?.height;
        case 'Weight':
          return b.pokemon?.weight - a.pokemon?.weight;
        case 'Capture Rate':
          return a.pokemon?.capture_rate - b.pokemon?.capture_rate;
        default:
          return a.pokemon?.pokemonId - b.pokemon?.pokemonId;
      }
    });

  // Pagination
  const indexOfLastPokemon = currentPage * pokemonPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonPerPage;
  const currentPokemon = filteredPokemon.slice(indexOfFirstPokemon, indexOfLastPokemon);
  const totalPages = Math.ceil(filteredPokemon.length / pokemonPerPage);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);


  if (loading) {
    return <div className="loading">Loading Pokédex...</div>;
  }

  return (
    <div className="pokedex-container">
      <h1>Pokédex</h1>
      
      <div className="search-container">
        <input
          type="text"
          placeholder="Search Pokémon..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
      </div>
      
      <div className="filters-container">
        <h3>Filters</h3>
        <div className="filter-grid">
          <div className="filter-group">
            <label htmlFor="primaryType">Primary Type</label>
            <select 
              id="primaryType" 
              name="primaryType" 
              value={filters.primaryType} 
              onChange={handleFilterChange}
            >
              <option value="">All Types</option>
              {allTypes.map(type => (
                <option key={`primary-${type}`} value={type}>{type}</option>
              ))}
            </select>
          </div>
          
          <div className="filter-group">
            <label htmlFor="secondaryType">Secondary Type</label>
            <select 
              id="secondaryType" 
              name="secondaryType" 
              value={filters.secondaryType} 
              onChange={handleFilterChange}
            >
              <option value="">All Types</option>
              {allTypes.map(type => (
                <option key={`secondary-${type}`} value={type}>{type}</option>
              ))}
            </select>
          </div>
          
          <div className="filter-group">
            <label htmlFor="minHeight">Min Height (m)</label>
            <input 
              type="number" 
              id="minHeight" 
              name="minHeight" 
              min="0" 
              step="0.1" 
              value={filters.minHeight} 
              onChange={handleFilterChange} 
            />
          </div>
          
          <div className="filter-group">
            <label htmlFor="maxHeight">Max Height (m)</label>
            <input 
              type="number" 
              id="maxHeight" 
              name="maxHeight" 
              min="0" 
              step="0.1" 
              value={filters.maxHeight} 
              onChange={handleFilterChange} 
            />
          </div>
          
          <div className="filter-group">
            <label htmlFor="minWeight">Min Weight (kg)</label>
            <input 
              type="number" 
              id="minWeight" 
              name="minWeight" 
              min="0" 
              step="0.1" 
              value={filters.minWeight} 
              onChange={handleFilterChange} 
            />
          </div>
          
          <div className="filter-group">
            <label htmlFor="maxWeight">Max Weight (kg)</label>
            <input 
              type="number" 
              id="maxWeight" 
              name="maxWeight" 
              min="0" 
              step="0.1" 
              value={filters.maxWeight} 
              onChange={handleFilterChange} 
            />
          </div>
          
          <div className="filter-group">
            <label htmlFor="minCaptureRate">Min Capture Rate</label>
            <input 
              type="number" 
              id="minCaptureRate" 
              name="minCaptureRate" 
              min="0" 
              max="255" 
              value={filters.minCaptureRate} 
              onChange={handleFilterChange} 
            />
          </div>
          
          <div className="filter-group">
            <label htmlFor="maxCaptureRate">Max Capture Rate</label>
            <input 
              type="number" 
              id="maxCaptureRate" 
              name="maxCaptureRate" 
              min="0" 
              max="255" 
              value={filters.maxCaptureRate} 
              onChange={handleFilterChange} 
            />
          </div>
          
          <div className="filter-group">
            <label htmlFor="legendary">Legendary</label>
            <select 
              id="legendary" 
              name="legendary" 
              value={filters.legendary} 
              onChange={handleFilterChange}
            >
              <option value="">All Pokémon</option>
              <option value="true">Legendary Only</option>
              <option value="false">Non-Legendary Only</option>
            </select>
          </div>
          
          <div className="filter-group">
            <label htmlFor="sortOption">Sort By</label>
            <select 
              id="sortOption" 
              name="sortOption" 
              value={sortOption} 
              onChange={handleSortChange}
            >
              <option value="No.">Number</option>
              <option value="Name">Name</option>
              <option value="HP">HP</option>
              <option value="Attack">Attack</option>
              <option value="Defense">Defense</option>
              <option value="Speed">Speed</option>
              <option value="Height">Height</option>
              <option value="Weight">Weight</option>
              <option value="Capture Rate">Capture Rate</option>
            </select>
          </div>
        </div>
      </div>

      <div className="pokemon-grid">
        {currentPokemon.length === 0 ? (
          <div className="no-results">No Pokémon found matching your criteria</div>
        ) : (
          currentPokemon.map((poke) => (
            <div 
              key={poke.pokemon?.pokemonId} 
              className="pokemon-card"
              style={{
                background: `linear-gradient(to bottom, ${typeColors[poke.pokemon?.primary_type]} 0%, #fff 100%)`
              }}
            >
              <div className="card-header">
                <span className="pokemon-number">#{poke.pokemon?.pokemonId.toString().padStart(3, '0')}</span>
                <h2 className="pokemon-name">{poke.pokemon?.name}</h2>
              </div>
              
              <div className="pokemon-image">
                <img 
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${poke.pokemon?.pokemonId}.png`}
                  alt={poke.pokemon?.name} 
                  
                  onError={(e) => {
                    e.target.onerror = null; 
                    e.target.src = 'https://via.placeholder.com/150?text=Pokemon';
                  }}
                />
              </div>
              
              <div className="pokemon-types">
                <span 
                  className="type" 
                  style={{ backgroundColor: typeColors[poke.pokemon?.primary_type] }}
                >
                  {poke.pokemon?.primary_type}
                </span>
                
                {poke.pokemon?.secondary_type && (
                  <span 
                    className="type" 
                    style={{ backgroundColor: typeColors[poke.pokemon?.secondary_type] }}
                  >
                    {poke.pokemon?.secondary_type}
                  </span>
                )}
              </div>
              
              <div className="pokemon-stats">
                <div className="stat">
                  <span className="stat-name">HP</span>
                  <span className="stat-value">{poke.pokemon?.hp}</span>
                </div>
                <div className="stat">
                  <span className="stat-name">ATK</span>
                  <span className="stat-value">{poke.pokemon?.attack}</span>
                </div>
                <div className="stat">
                  <span className="stat-name">DEF</span>
                  <span className="stat-value">{poke.pokemon?.defense}</span>
                </div>
                <div className="stat">
                  <span className="stat-name">SPD</span>
                  <span className="stat-value">{poke.pokemon?.speed}</span>
                </div>
              </div>
              
              <div className="pokemon-metrics">
                <div className="metric">
                  <span className="metric-name">Height</span>
                  <span className="metric-value">{poke.pokemon?.height} m</span>
                </div>
                <div className="metric">
                  <span className="metric-name">Weight</span>
                  <span className="metric-value">{poke.pokemon?.weight} kg</span>
                </div>
                <div className="metric">
                  <span className="metric-name">Capture</span>
                  <span className="metric-value">{poke.pokemon?.capture_rate}</span>
                </div>
              </div>
              
              {poke.pokemon?.legendary && (
                <div className="legendary-badge">Legendary</div>
              )}
              
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      <div className="pagination">
        <button 
          onClick={() => paginate(currentPage - 1)} 
          disabled={currentPage === 1}
        >
          Previous
        </button>
        
        <span className="page-info">
          Page {currentPage} of {totalPages || 1}
        </span>
        
        <button 
          onClick={() => paginate(currentPage + 1)} 
          disabled={currentPage === totalPages || totalPages === 0}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pokedex;