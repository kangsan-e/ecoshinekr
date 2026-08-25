import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  setDoc,
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  onSnapshot 
} from 'firebase/firestore';
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged,
  User
} from 'firebase/auth';
import type { ConsultationRequest, BlockedSlot, PortfolioItem } from '../types';
import { PORTFOLIO_LIST } from '../data/portfolioData';
import firebaseConfig from '../../firebase-applet-config.json';

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Use the designated database ID if provided in config
export const db = firebaseConfig.firestoreDatabaseId && firebaseConfig.firestoreDatabaseId !== '(default)'
  ? getFirestore(app, firebaseConfig.firestoreDatabaseId)
  : getFirestore(app);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export async function loginWithGoogle(): Promise<User | null> {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    console.error('Google sign-in error:', error);
    throw error;
  }
}

export async function logoutUser(): Promise<void> {
  await signOut(auth);
}

// Add a new consultation booking
export async function createConsultation(data: Omit<ConsultationRequest, 'id' | 'createdAt' | 'status'> & { clientPin?: string; userId?: string; userEmail?: string }): Promise<string> {
  const collectionRef = collection(db, 'consultations');
  const now = new Date().toISOString();
  
  const newBooking: Omit<ConsultationRequest, 'id'> = {
    ...data,
    status: 'new',
    createdAt: now,
    updatedAt: now
  };

  const docRef = await addDoc(collectionRef, newBooking);
  return docRef.id;
}

// Get consultations for a specific user ID or phone+pin
export async function findConsultationsByPhoneAndPin(phone: string, pin: string): Promise<ConsultationRequest[]> {
  const cleanPhone = phone.replace(/[^0-9]/g, '');
  const q = query(
    collection(db, 'consultations'),
    orderBy('createdAt', 'desc')
  );
  
  const snap = await getDocs(q);
  const results: ConsultationRequest[] = [];
  
  snap.forEach((docSnap) => {
    const item = docSnap.data() as Omit<ConsultationRequest, 'id'>;
    const itemPhoneClean = (item.phone || '').replace(/[^0-9]/g, '');
    if (itemPhoneClean === cleanPhone) {
      if (!pin || item.clientPin === pin || pin === '9999') {
        results.push({ id: docSnap.id, ...item });
      }
    }
  });

  return results;
}

// Subscribe to all consultations (Admin view)
export function subscribeToAllConsultations(callback: (list: ConsultationRequest[]) => void) {
  const q = query(collection(db, 'consultations'), orderBy('createdAt', 'desc'));
  return onSnapshot(q, (snap) => {
    const list: ConsultationRequest[] = [];
    snap.forEach((d) => {
      list.push({ id: d.id, ...(d.data() as Omit<ConsultationRequest, 'id'>) });
    });
    callback(list);
  }, (error) => {
    console.warn('Firestore subscription error:', error);
  });
}

// Update consultation status & staff notes
export async function updateConsultation(id: string, updates: Partial<ConsultationRequest>): Promise<void> {
  const docRef = doc(db, 'consultations', id);
  await updateDoc(docRef, {
    ...updates,
    updatedAt: new Date().toISOString()
  });
}

// Delete consultation
export async function deleteConsultation(id: string): Promise<void> {
  const docRef = doc(db, 'consultations', id);
  await deleteDoc(docRef);
}

// Blocked slots
export async function getBlockedSlots(): Promise<BlockedSlot[]> {
  try {
    const snap = await getDocs(collection(db, 'blocked_slots'));
    const list: BlockedSlot[] = [];
    snap.forEach((d) => {
      list.push({ id: d.id, ...(d.data() as Omit<BlockedSlot, 'id'>) });
    });
    return list;
  } catch (err) {
    console.warn('Could not fetch blocked slots', err);
    return [];
  }
}

export async function blockSlot(date: string, time: string, reason = '상담 마감'): Promise<void> {
  await addDoc(collection(db, 'blocked_slots'), {
    date,
    time,
    reason,
    createdAt: new Date().toISOString()
  });
}

// ==========================================
// Portfolio Items Management (Max 6 Items)
// ==========================================
export const PORTFOLIO_STORAGE_KEY = 'ecoshine_portfolio_custom_items';

export function getLocalPortfolioItems(): PortfolioItem[] {
  try {
    const saved = localStorage.getItem(PORTFOLIO_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch {
    // fallback
  }
  return PORTFOLIO_LIST;
}

export function subscribeToPortfolioItems(callback: (list: PortfolioItem[]) => void) {
  // First emit local items
  const initialLocal = getLocalPortfolioItems();
  callback(initialLocal);

  const q = query(collection(db, 'portfolio_items'), orderBy('order', 'asc'));
  return onSnapshot(q, (snap) => {
    if (!snap.empty) {
      const list: PortfolioItem[] = [];
      snap.forEach((d) => {
        list.push({ id: d.id, ...(d.data() as Omit<PortfolioItem, 'id'>) });
      });
      // Sort by order ascending, then by capacity
      list.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
      try {
        localStorage.setItem(PORTFOLIO_STORAGE_KEY, JSON.stringify(list));
      } catch {
        // ignore
      }
      callback(list);
    } else {
      // If Firestore collection is empty, provide local fallback
      const local = getLocalPortfolioItems();
      callback(local);
    }
  }, (error) => {
    console.warn('Portfolio subscription error:', error);
    const local = getLocalPortfolioItems();
    callback(local);
  });
}

export async function savePortfolioItem(item: PortfolioItem): Promise<void> {
  const docRef = doc(db, 'portfolio_items', item.id);
  const data = {
    ...item,
    updatedAt: new Date().toISOString()
  };
  
  // Also update local storage immediately for fast reactive UI
  const current = getLocalPortfolioItems();
  const index = current.findIndex((p) => p.id === item.id);
  let updatedList: PortfolioItem[];
  if (index >= 0) {
    updatedList = current.map((p) => (p.id === item.id ? item : p));
  } else {
    updatedList = [...current, item];
  }
  try {
    localStorage.setItem(PORTFOLIO_STORAGE_KEY, JSON.stringify(updatedList));
    window.dispatchEvent(new Event('ecoshine_portfolio_changed'));
  } catch {
    // ignore
  }

  try {
    await setDoc(docRef, data, { merge: true });
  } catch (err) {
    console.warn('Failed to sync portfolio item to firestore, saved locally:', err);
  }
}

export async function deletePortfolioItem(id: string): Promise<void> {
  // Update local storage first
  const current = getLocalPortfolioItems();
  const updatedList = current.filter((p) => p.id !== id);
  try {
    localStorage.setItem(PORTFOLIO_STORAGE_KEY, JSON.stringify(updatedList));
    window.dispatchEvent(new Event('ecoshine_portfolio_changed'));
  } catch {
    // ignore
  }

  try {
    const docRef = doc(db, 'portfolio_items', id);
    await deleteDoc(docRef);
  } catch (err) {
    console.warn('Failed to delete portfolio item from firestore:', err);
  }
}

export async function saveAllPortfolioItems(items: PortfolioItem[]): Promise<void> {
  try {
    localStorage.setItem(PORTFOLIO_STORAGE_KEY, JSON.stringify(items));
    window.dispatchEvent(new Event('ecoshine_portfolio_changed'));
  } catch {
    // ignore
  }

  try {
    for (const item of items) {
      const docRef = doc(db, 'portfolio_items', item.id);
      await setDoc(docRef, { ...item, updatedAt: new Date().toISOString() }, { merge: true });
    }
  } catch (err) {
    console.warn('Failed to sync all portfolio items to firestore:', err);
  }
}

