// Components/Notification/NotificationsPage.jsx
import React, { useState, useEffect } from 'react';
import { axiosInstance } from '../../axios';

const NotificationsPage = () => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all'); // all, unread, read

    useEffect(() => {
        fetchNotifications();
    }, []);

    const fetchNotifications = async () => {
        try {
            const response = await axiosInstance.get('/notifications/all');
            setNotifications(response.data.notifications || []);
        } catch (err) {
            console.error('Erreur:', err);
        } finally {
            setLoading(false);
        }
    };

    const markAsRead = async (id) => {
        try {
            await axiosInstance.put(`/notifications/${id}/read`);
            setNotifications(prev =>
                prev.map(n => n.id === id ? { ...n, read: true } : n)
            );
        } catch (err) {
            console.error('Erreur:', err);
        }
    };

    const markAllAsRead = async () => {
        try {
            await axiosInstance.put('/notifications/read-all');
            setNotifications(prev =>
                prev.map(n => ({ ...n, read: true }))
            );
        } catch (err) {
            console.error('Erreur:', err);
        }
    };

    const deleteNotification = async (id) => {
        try {
            await axiosInstance.delete(`/notifications/${id}`);
            setNotifications(prev => prev.filter(n => n.id !== id));
        } catch (err) {
            console.error('Erreur:', err);
        }
    };

    const filteredNotifications = notifications.filter(notif => {
        if (filter === 'unread') return !notif.read;
        if (filter === 'read') return notif.read;
        return true;
    });

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
            case 'validation': return 'bg-green-100';
            case 'rejet': return 'bg-red-100';
            case 'reservation': return 'bg-orange-100';
            case 'message': return 'bg-blue-100';
            case 'alert': return 'bg-yellow-100';
            default: return 'bg-gray-100';
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Notifications</h1>
                <button
                    onClick={markAllAsRead}
                    className="px-4 py-2 text-sm bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
                >
                    Tout marquer comme lu
                </button>
            </div>

            {/* Filtres */}
            <div className="flex gap-2 mb-6">
                <button
                    onClick={() => setFilter('all')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                        filter === 'all' 
                            ? 'bg-orange-500 text-white' 
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                >
                    Toutes
                </button>
                <button
                    onClick={() => setFilter('unread')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                        filter === 'unread' 
                            ? 'bg-orange-500 text-white' 
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                >
                    Non lues
                </button>
                <button
                    onClick={() => setFilter('read')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                        filter === 'read' 
                            ? 'bg-orange-500 text-white' 
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                >
                    Lues
                </button>
            </div>

            {/* Liste des notifications */}
            {loading ? (
                <div className="flex justify-center py-12">
                    <div className="w-8 h-8 border-3 border-orange-500 border-t-transparent rounded-full animate-spin" />
                </div>
            ) : filteredNotifications.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-xl shadow-sm">
                    <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                    </svg>
                    <p className="text-gray-500">Aucune notification</p>
                </div>
            ) : (
                <div className="space-y-3">
                    {filteredNotifications.map(notif => (
                        <div
                            key={notif.id}
                            className={`p-4 rounded-xl border cursor-pointer transition ${
                                notif.read 
                                    ? 'bg-white border-gray-200' 
                                    : 'bg-blue-50 border-blue-200 shadow-sm'
                            }`}
                            onClick={() => markAsRead(notif.id)}
                        >
                            <div className="flex items-start gap-3">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xl ${getNotificationColor(notif.type)}`}>
                                    {getNotificationIcon(notif.type)}
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-start">
                                        <p className="font-medium text-gray-800">{notif.title}</p>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                deleteNotification(notif.id);
                                            }}
                                            className="text-gray-400 hover:text-red-500 transition"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>
                                    <p className="text-sm text-gray-600 mt-1">{notif.message}</p>
                                    <p className="text-xs text-gray-400 mt-2">
                                        {new Date(notif.created_at).toLocaleString('fr-FR')}
                                    </p>
                                </div>
                                {!notif.read && (
                                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default NotificationsPage;