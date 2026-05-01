import React, { useState } from 'react';
import { useNavigate, Link, NavLink } from 'react-router-dom';
import axiosInstance from '../../axios';
import logoImg from '../../Assets/Images/logologinsonatrach.svg';

import reactconnet from '../../Assets/Images/logo.jpg';

function Login() {
  const [formData, updateFormData] = useState({ email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    updateFormData({ ...formData, [e.target.name]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/api/login/', {
        email: formData.email,
        password: formData.password,
      });

      const { access, refresh, role, nom_complet,photo_profil,region_id, structure_id ,region_name, structure_name ,direction_id,departement_id} = response.data;

      // Store tokens and user info
      localStorage.setItem('access_token', access);
      localStorage.setItem('refresh_token', refresh);
      localStorage.setItem('role', role); 
      localStorage.setItem('nom_complet',nom_complet);
     
      localStorage.setItem('photo_profil', photo_profil || '');
    // Stocker region_id et structure_id
    if (region_id) localStorage.setItem('region_id', region_id);
    if (structure_id) localStorage.setItem('structure_id', structure_id);
    if (direction_id) localStorage.setItem('direction_id', direction_id);
    if (departement_id) localStorage.setItem('departement_id', departement_id);


 

      

      axiosInstance.defaults.headers['Authorization'] =
        'JWT ' + localStorage.getItem('access_token');

      console.log('Connexion réussie:', response.data);
      

      // Redirection selon le rôle
   const rolePaths = {
      'admin': '/admin',
      'chef': '/chef',
      'directeur': '/directeur',
      'directeur_region': '/directeur-region',
      'responsable_structure': '/responsable-structure',
      'divisionnaire': '/divisionnaire',
       'responsable_departement': '/responsable-departement',
       'directeur_direction': '/directeur-direction', 
      'agent': '/agent'
    };
      navigate(rolePaths[role] || '/login');
  } catch (error) {
    console.error('Erreur de connexion :', error);
    setErrorMessage('Email ou mot de passe incorrect');
  }
  };

  return (
    <div className="h-[100vh] w-screen flex items-center justify-center bg-gray-100">
      <div className="w-screen h-screen flex shadow-lg rounded-lg overflow-hidden bg-white border border-gray-200">
        {/* Left Side */}
        <div className="w-1/2 h-full">
          <img className="w-full h-full object-cover" src={logoImg} alt="Login" />
        </div>
        {/* Right Side */}
        <div className="w-1/2 flex flex-col justify-center items-center px-12 bg-white rounded-lg">
          <h2 className="text-2xl font-bold text-myorange text-center mb-6">
             Sonatrach
          </h2>
          <div className="w-[80%]">
            <form className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold font-[Poppins] text-gray-700 text-left"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="mt-1 w-full px-4 py-2 border rounded-full text-myorange border-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  onChange={handleChange}
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold font-[Poppins] text-gray-700 text-left"
                >
                  Mot de passe
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="mt-1 w-full px-4 py-2 border rounded-full text-myorange border-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    onChange={handleChange}
                  />
                </div>
              </div>
              {errorMessage && (
                <p className="text-red-500 text-sm">{errorMessage}</p>
              )}
              <div className="text-sm text-myorange text-right">
                <NavLink to="/mot-de-passe-oublie" className="hover:underline">
                  Mot de passe oublié ?
                </NavLink>
              </div>
              <div className="flex items-center w-full my-2">
                <hr className="flex-grow border-gray-300" />
                <p className="mx-2 text-gray-600 text-sm">
                  vous n’aves pas compte ?{' '}
                  <Link
                    to="/login/inscription"
                    className="text-myorange hover:underline"
                  >
                    Inscrivez-vous !
                  </Link>
                </p>
                <hr className="flex-grow border-gray-300" />
              </div>
              <button
                type="submit"
                onClick={handleSubmit}
                className="w-full mt-4 py-3 font-nunito text-white bg-gradient-to-r from-myorange to-orange-400 rounded-full font-semibold text-lg shadow-md hover:opacity-90"
              >
                Se connecter
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
