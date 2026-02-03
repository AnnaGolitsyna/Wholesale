// src/hooks/useAuth.js
import { useState, useEffect, createContext, useContext } from 'react';
import { auth, onAuthStateChanged } from '../../../api/firestore';

const AuthContext = createContext();

// Helper to extract contractor ID from email
const extractContractorId = (email) => {
  if (!email) return null;

  // Pattern 1: dybenko10@client.local -> extract "10"
  // Pattern 2: contractor15@client.local -> extract "15"
  const username = email.split('@')[0];
  const match = username.match(/(\d+)$/);
  return match ? match[1] : null;
};

// Helper to determine role
const getUserRole = (email, uid) => {
  // Hardcoded admin
  if (
    uid === 'twCdDW9nwIa1oWlwUExBFj8ZYtq1' ||
    email === '110576gav@gmail.com'
  ) {
    return 'admin';
  }

  // Hardcoded operator
  if (email === 'balanutsa.nv@gmail.com') {
    return 'operator';
  }

  // If email ends with @client.local, it's a client
  if (email && email.endsWith('@client.local')) {
    return 'client';
  }

  // Default: no access
  return null;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [contractorId, setContractorId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Determine role
        const role = getUserRole(user.email, user.uid);
        setUserRole(role);

        // Extract contractor ID for clients
        if (role === 'client') {
          const id = extractContractorId(user.email);
          setContractorId(id);
        }

        setCurrentUser(user);
      } else {
        setCurrentUser(null);
        setUserRole(null);
        setContractorId(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const value = {
    currentUser,
    userRole,
    contractorId,
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
