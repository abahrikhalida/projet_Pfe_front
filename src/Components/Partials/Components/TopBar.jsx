import React from 'react'
import '../Styles/TopBar.css'
import { ReactComponent as NotificationIcon } from '../../../Assets/Icons/remindersonatrach.svg'
import defaultAccountPicture from '../../../Assets/Images/default_picture.jpeg';

function TopBar() {
    const nom_complet = localStorage.getItem('nom_complet') || '';
   // const userPrenom = localStorage.getItem('user_prenom') || '';
    const role = localStorage.getItem('role') || '';
    const profilePicture = localStorage.getItem('photo_profil');
      const imageSrc = profilePicture && profilePicture !== 'null' && profilePicture !== '' 
        ? profilePicture 
        : defaultAccountPicture;

    return (
        <div className='topbar-container'>
            <div className='topbar-wrapper'>
                <div className="user-params-box">
                    <div className="param-box">
                        <NotificationIcon className='icon' />
                    </div>
                    <div className="user-line-box">
                        <div className="user-account">
                            <img 
                    src={imageSrc} 
                    alt="Profile" 
                    className="profile-picture"
                    onError={(e) => {
                        e.target.onerror = null; // Évite la boucle infinie
                        e.target.src = defaultAccountPicture; // Image de secours en cas d'erreur
                    }}
                />
                        </div>
                        <div className="user-props">
                            <span style={{ fontSize: "0.9rem", fontWeight: "550" }}>
                                {/* {userNom} {userPrenom} */}
                                {nom_complet}
                               
                            </span>
                            <span style={{ fontSize: "0.75rem", fontWeight: "430", color: "#00000050" }}>
                                {/* {userType} */}
                                {role}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TopBar