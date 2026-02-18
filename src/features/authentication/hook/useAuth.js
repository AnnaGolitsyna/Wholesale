// src/hooks/useAuth.js
import { useState, useEffect, createContext, useContext } from 'react';
import { 
  collection, 
  query, 
  where, 
  getDocs 
} from 'firebase/firestore';
import { auth, db, onAuthStateChanged } from '../../../api/firestore';

const AuthContext = createContext();

// Hardcoded admin/operator emails
const ADMIN_EMAILS = ['110576gav@gmail.com'];
const OPERATOR_EMAILS = ['balanutsa.nv@gmail.com'];

// Helper to determine role
const getUserRole = (email) => {
  if (ADMIN_EMAILS.includes(email)) return 'admin';
  if (OPERATOR_EMAILS.includes(email)) return 'operator';
  if (email && email.endsWith('@balanutsa.client')) return 'client';
  if (email && email.endsWith('@client.local')) return 'client'; // Keep old format for backward compatibility
  return null;
};

// Load contractor data from Firestore by email
const loadContractorData = async (email) => {
  try {
    const contractorsRef = collection(db, 'balanutsa', 'catalogs', 'contractors');
    const q = query(
      contractorsRef,
      where('email', '==', email),
      where('active', '==', true)
    );

    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      console.error('No contractor found for email:', email);
      throw new Error('Контрактор не знайдено');
    }

    const doc = snapshot.docs[0];
    const data = {
      id: doc.id,
      ...doc.data(),
    };

    // Check if email field exists and is not null
    if (!data.email) {
      throw new Error('Доступ заборонено. Зверніться до адміністратора');
    }

    return data;
  } catch (error) {
    console.error('Error loading contractor:', error);
    throw error;
  }
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [contractorData, setContractorData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const role = getUserRole(user.email);
        setUserRole(role);

        // For clients, load contractor data from Firestore
        if (role === 'client') {
          try {
            const contractor = await loadContractorData(user.email);
            setContractorData(contractor);
          } catch (error) {
            console.error('Error loading contractor:', error);
            // If access denied or error, log them out
            await auth.signOut();
            setCurrentUser(null);
            setUserRole(null);
            setContractorData(null);
            setLoading(false);
            return;
          }
        }

        setCurrentUser(user);
      } else {
        setCurrentUser(null);
        setUserRole(null);
        setContractorData(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const value = {
    currentUser,
    userRole,
    contractorData,
    contractorId: contractorData?.id || null,
    isAuthenticated: !!currentUser,
    isAdmin: userRole === 'admin',
    isOperator: userRole === 'operator',
    isClient: userRole === 'client',
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};