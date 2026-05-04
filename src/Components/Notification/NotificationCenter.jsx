// Components/Notification/NotificationCenter.jsx
import React, { useState, useEffect, useRef } from 'react';
import { axiosInstance } from '../../axios';

const NotificationCenter = ({ userRole, userId }) => {
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const dropdownRef = useRef(null);

    // Pas de Socket.io - seulement des appels HTTP

    // Charger les notifications
    useEffect(() => {
        fetchNotifications();
        
        // Rafraîchir les notifications toutes les 10 secondes
        const interval = setInterval(fetchNotifications, 10000);
        return () => clearInterval(interval);
    }, []);

    // Fermer le dropdown au clic en dehors
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const fetchNotifications = async () => {
        setIsLoading(true);
        try {
            const response = await axiosInstance.get('/notifications');
            setNotifications(response.data.notifications || []);
            setUnreadCount(response.data.unread_count || 0);
        } catch (err) {
            console.error('Erreur chargement notifications:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const markAsRead = async (notificationId) => {
        try {
            await axiosInstance.put(`/notifications/${notificationId}/read`);
            setNotifications(prev =>
                prev.map(notif =>
                    notif.id === notificationId ? { ...notif, read: true } : notif
                )
            );
            setUnreadCount(prev => Math.max(0, prev - 1));
        } catch (err) {
            console.error('Erreur marquage lu:', err);
        }
    };

    const markAllAsRead = async () => {
        try {
            await axiosInstance.put('/notifications/read-all');
            setNotifications(prev =>
                prev.map(notif => ({ ...notif, read: true }))
            );
            setUnreadCount(0);
        } catch (err) {
            console.error('Erreur marquage tout lu:', err);
        }
    };

    const getNotificationIcon = (type) => {
        switch (type) {
            case 'validation': return '✅';
            case 'rejet': return '❌';
            case 'reservation': return '🔄';
            case 'message': return '💬';
            case 'alert': return '⚠️';
            default: return '📋';
        }
    };

    const getNotificationColor = (type) => {
        switch (type) {
            case 'validation': return 'bg-green-100 border-green-300';
            case 'rejet': return 'bg-red-100 border-red-300';
            case 'reservation': return 'bg-orange-100 border-orange-300';
            case 'message': return 'bg-blue-100 border-blue-300';
            case 'alert': return 'bg-yellow-100 border-yellow-300';
            default: return 'bg-gray-100 border-gray-300';
        }
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                {unreadCount > 0 && (
                    <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full">
                        {unreadCount > 99 ? '99+' : unreadCount}
                    </span>
                )}
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-xl border border-gray-200 z-50 overflow-hidden">
                    <div className="flex justify-between items-center px-4 py-3 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
                        <h3 className="font-semibold text-gray-800">Notifications</h3>
                        {unreadCount > 0 && (
                            <button
                                onClick={markAllAsRead}
                                className="text-xs text-orange-500 hover:text-orange-600 transition"
                            >
                                Tout marquer comme lu
                            </button>
                        )}
                    </div>

                    <div className="max-h-96 overflow-y-auto">
                        {isLoading ? (
                            <div className="flex justify-center items-center py-8">
                                <div className="w-6 h-6 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
                            </div>
                        ) : notifications.length === 0 ? (
                            <div className="text-center py-8 text-gray-500">
                                <svg className="w-12 h-12 mx-auto text-gray-300 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                                </svg>
                                <p>Aucune notification</p>
                            </div>
                        ) : (
                            notifications.map((notif) => (
                                <div
                                    key={notif.id}
                                    className={`p-3 border-b border-gray-100 hover:bg-gray-50 transition cursor-pointer ${!notif.read ? 'bg-blue-50' : ''}`}
                                    onClick={() => markAsRead(notif.id)}
                                >
                                    <div className="flex items-start gap-3">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-lg ${getNotificationColor(notif.type)}`}>
                                            {getNotificationIcon(notif.type)}
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm font-medium text-gray-800">{notif.title}</p>
                                            <p className="text-xs text-gray-500 mt-1">{notif.message}</p>
                                            <p className="text-xs text-gray-400 mt-1">
                                                {new Date(notif.created_at).toLocaleString('fr-FR')}
                                            </p>
                                        </div>
                                        {!notif.read && (
                                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                        )}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    <div className="px-4 py-2 border-t border-gray-200 text-center">
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-xs text-orange-500 hover:text-orange-600 transition"
                        >
                            Voir toutes les notifications
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NotificationCenter;