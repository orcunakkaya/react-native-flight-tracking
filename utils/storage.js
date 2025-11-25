import dateParse from '@/helpers/dateParse.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
const TICKETS_KEY = 'my_tickets';

export const saveTicket = async (ticket) => {
  try {
    const existingTickets = await getTickets();
    const newTicket = {
      ...ticket,
      ticketId: `TICKET_${Date.now()}`, // Benzersiz ID
      purchaseDate: new Date().toISOString(),
      status: 'active', // active | completed
    };
    
    existingTickets.push(newTicket);
    await AsyncStorage.setItem(TICKETS_KEY, JSON.stringify(existingTickets));
    
    return { success: true, ticket: newTicket };
  } catch (error) {
    console.error('Bilet kaydedilemedi:', error);
    return { success: false, error };
  }
};

export const getTickets = async () => {
  try {
    const tickets = await AsyncStorage.getItem(TICKETS_KEY);
    return tickets ? JSON.parse(tickets) : [];
  } catch (error) {
    console.error('Biletler okunamadı:', error);
    return [];
  }
};

export const getActiveTickets = async () => {
  try {
    const allTickets = await getTickets();
    const now = new Date();
    return allTickets.filter(ticket => {
      if (!ticket.date) return false;
    const flightDate = dateParse(ticket.date);
      return flightDate >= now && ticket.status === 'active';
    });
  } catch (error) {
    console.error('Aktif biletler alınamadı:', error);
    return [];
  }
};

export const getPastTickets = async () => {
  try {
    const allTickets = await getTickets();
    const now = new Date();
    
    return allTickets.filter(ticket => {
      if (!ticket.date) return false;
      const flightDate = dateParse(ticket.date);
      return flightDate < now || ticket.status === 'completed';
    });
  } catch (error) {
    console.error('Geçmiş biletler alınamadı:', error);
    return [];
  }
};

export const getTicketById = async (ticketId) => {
  try {
    const allTickets = await getTickets();
    return allTickets.find(ticket => ticket.ticketId === ticketId);
  } catch (error) {
    console.error('Bilet bulunamadı:', error);
    return null;
  }
};

export const deleteTicket = async (ticketId) => {
  try {
    const allTickets = await getTickets();
    const updatedTickets = allTickets.filter(ticket => ticket.ticketId !== ticketId);
    await AsyncStorage.setItem(TICKETS_KEY, JSON.stringify(updatedTickets));
    return { success: true };
  } catch (error) {
    console.error('Bilet silinemedi:', error);
    return { success: false, error };
  }
};

export const clearAllTickets = async () => {
  try {
    await AsyncStorage.removeItem(TICKETS_KEY);
    return { success: true };
  } catch (error) {
    console.error('Biletler temizlenemedi:', error);
    return { success: false, error };
  }
};