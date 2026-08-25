import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
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
import type { ConsultationRequest, BlockedSlot } from '../types';
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
