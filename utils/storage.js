import AsyncStorage from '@react-native-async-storage/async-storage';

const TICKETS_KEY = 'my_tickets';

// Bilet Kaydet
export const saveTicket = async (ticket) => {
  try {
    // Mevcut biletleri al
    const existingTickets = await getTickets();
    
    // Yeni bilet objesi oluştur
    const newTicket = {
      ...ticket,
      ticketId: `TICKET_${Date.now()}`, // Benzersiz ID
      purchaseDate: new Date().toISOString(),
      status: 'active', // active | completed
    };
    
    // Listeye ekle
    existingTickets.push(newTicket);
    // Kaydet
    await AsyncStorage.setItem(TICKETS_KEY, JSON.stringify(existingTickets));
    
    return { success: true, ticket: newTicket };
  } catch (error) {
    console.error('Bilet kaydedilemedi:', error);
    return { success: false, error };
  }
};

// Tüm Biletleri Al
export const getTickets = async () => {
  try {
    const tickets = await AsyncStorage.getItem(TICKETS_KEY);
    return tickets ? JSON.parse(tickets) : [];
  } catch (error) {
    console.error('Biletler okunamadı:', error);
    return [];
  }
};
 
// Aktif Biletleri Al
export const getActiveTickets = async () => {
  try {
    const allTickets = await getTickets();
    const now = new Date();
    return allTickets.filter(ticket => {
      if (!ticket.date) return false;
     const dateParts = ticket.date.split('.');
      let flightDate;
      if (dateParts.length === 3) {
        const day = parseInt(dateParts[0]);
        const month = parseInt(dateParts[1]) - 1;
        const year = parseInt(dateParts[2]);
        flightDate = new Date(year, month, day);
      } else {
        flightDate = new Date(ticket.date);
      }
      flightDate.setHours(23, 59, 59, 999);
      return flightDate >= now && ticket.status === 'active';
    });
  } catch (error) {
    console.error('Aktif biletler alınamadı:', error);
    return [];
  }
};

// Geçmiş Biletleri Al
export const getPastTickets = async () => {
  try {
    const allTickets = await getTickets();
    const now = new Date();
    
    // Uçuş tarihi geçmiş veya completed olan biletler
    return allTickets.filter(ticket => {
      const flightDate = new Date(ticket.date);
      return flightDate < now || ticket.status === 'completed';
    });
  } catch (error) {
    console.error('Geçmiş biletler alınamadı:', error);
    return [];
  }
};

// Tek Bilet Al (ID ile)
export const getTicketById = async (ticketId) => {
  try {
    const allTickets = await getTickets();
    return allTickets.find(ticket => ticket.ticketId === ticketId);
  } catch (error) {
    console.error('Bilet bulunamadı:', error);
    return null;
  }
};

// Bilet Sil
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

// Tüm Biletleri Sil (Test için)
export const clearAllTickets = async () => {
  try {
    await AsyncStorage.removeItem(TICKETS_KEY);
    return { success: true };
  } catch (error) {
    console.error('Biletler temizlenemedi:', error);
    return { success: false, error };
  }
};